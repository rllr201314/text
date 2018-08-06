/*
 *  BarCode Coder Library (BCC Library)
 *  BCCL Version 2.0
 *    
 *  Porting : jQuery barcode plugin 
 *  Version : 2.0.2
 *   
 *  Date  : March 01, 2011
 *  Author  : DEMONTE Jean-Baptiste <jbdemonte@gmail.com>
 *            HOUREZ Jonathan
 *             
 *  Web site: http://barcode-coder.com/
 *  dual licence :  http://www.cecill.info/licences/Licence_CeCILL_V2-fr.html
 *                  http://www.gnu.org/licenses/gpl.html
 */
(function(b) {
	var a = {
		settings: {
			barWidth: 1,
			barHeight: 50,
			moduleSize: 5,
			showHRI: true,
			addQuietZone: true,
			marginHRI: 5,
			bgColor: "#FFFFFF",
			color: "#000000",
			fontSize: 10,
			output: "css",
			posX: 0,
			posY: 0
		},
		intval: function(d) {
			var c = typeof(d);
			if(c == "string") {
				d = d.replace(/[^0-9-.]/g, "");
				d = parseInt(d * 1, 10);
				return isNaN(d) || !isFinite(d) ? 0 : d
			}
			return c == "number" && isFinite(d) ? Math.floor(d) : 0
		},
		i25: {
			encoding: ["NNWWN", "WNNNW", "NWNNW", "WWNNN", "NNWNW", "WNWNN", "NWWNN", "NNNWW", "WNNWN", "NWNWN"],
			compute: function(g, j, f) {
				if(!j) {
					if(g.length % 2 != 0) {
						g = "0" + g
					}
				} else {
					if((f == "int25") && (g.length % 2 == 0)) {
						g = "0" + g
					}
					var h = true,
						c, e = 0;
					for(var d = g.length - 1; d > -1; d--) {
						c = a.intval(g.charAt(d));
						if(isNaN(c)) {
							return("")
						}
						e += h ? 3 * c : c;
						h = !h
					}
					g += ((10 - e % 10) % 10).toString()
				}
				return(g)
			},
			getDigit: function(k, l, h) {
				k = this.compute(k, l, h);
				if(k == "") {
					return("")
				}
				result = "";
				var f, d;
				if(h == "int25") {
					result += "1010";
					var g, e;
					for(f = 0; f < k.length / 2; f++) {
						g = k.charAt(2 * f);
						e = k.charAt(2 * f + 1);
						for(d = 0; d < 5; d++) {
							result += "1";
							if(this.encoding[g].charAt(d) == "W") {
								result += "1"
							}
							result += "0";
							if(this.encoding[e].charAt(d) == "W") {
								result += "0"
							}
						}
					}
					result += "1101"
				} else {
					if(h == "std25") {
						result += "11011010";
						var m;
						for(f = 0; f < k.length; f++) {
							m = k.charAt(f);
							for(d = 0; d < 5; d++) {
								result += "1";
								if(this.encoding[m].charAt(d) == "W") {
									result += "11"
								}
								result += "0"
							}
						}
						result += "11010110"
					}
				}
				return(result)
			}
		},
		ean: {
			encoding: [
				["0001101", "0100111", "1110010"],
				["0011001", "0110011", "1100110"],
				["0010011", "0011011", "1101100"],
				["0111101", "0100001", "1000010"],
				["0100011", "0011101", "1011100"],
				["0110001", "0111001", "1001110"],
				["0101111", "0000101", "1010000"],
				["0111011", "0010001", "1000100"],
				["0110111", "0001001", "1001000"],
				["0001011", "0010111", "1110100"]
			],
			first: ["000000", "001011", "001101", "001110", "010011", "011001", "011100", "010101", "010110", "011010"],
			getDigit: function(h, g) {
				var d = g == "ean8" ? 7 : 12;
				h = h.substring(0, d);
				if(h.length != d) {
					return("")
				}
				var k;
				for(var f = 0; f < h.length; f++) {
					k = h.charAt(f);
					if((k < "0") || (k > "9")) {
						return("")
					}
				}
				h = this.compute(h, g);
				var j = "101";
				if(g == "ean8") {
					for(var f = 0; f < 4; f++) {
						j += this.encoding[a.intval(h.charAt(f))][0]
					}
					j += "01010";
					for(var f = 4; f < 8; f++) {
						j += this.encoding[a.intval(h.charAt(f))][2]
					}
				} else {
					var e = this.first[a.intval(h.charAt(0))];
					for(var f = 1; f < 7; f++) {
						j += this.encoding[a.intval(h.charAt(f))][a.intval(e.charAt(f - 1))]
					}
					j += "01010";
					for(var f = 7; f < 13; f++) {
						j += this.encoding[a.intval(h.charAt(f))][2]
					}
				}
				j += "101";
				return(j)
			},
			compute: function(f, e) {
				var c = e == "ean13" ? 12 : 7;
				f = f.substring(0, c);
				var d = 0,
					g = true;
				for(i = f.length - 1; i > -1; i--) {
					d += (g ? 3 : 1) * a.intval(f.charAt(i));
					g = !g
				}
				return(f + ((10 - d % 10) % 10).toString())
			}
		},
		msi: {
			encoding: ["100100100100", "100100100110", "100100110100", "100100110110", "100110100100", "100110100110", "100110110100", "100110110110", "110100100100", "110100100110"],
			compute: function(c, d) {
				if(typeof(d) == "object") {
					if(d.crc1 == "mod10") {
						c = this.computeMod10(c)
					} else {
						if(d.crc1 == "mod11") {
							c = this.computeMod11(c)
						}
					}
					if(d.crc2 == "mod10") {
						c = this.computeMod10(c)
					} else {
						if(d.crc2 == "mod11") {
							c = this.computeMod11(c)
						}
					}
				} else {
					if(typeof(d) == "boolean") {
						if(d) {
							c = this.computeMod10(c)
						}
					}
				}
				return(c)
			},
			computeMod10: function(h) {
				var d, g = h.length % 2;
				var f = 0,
					e = 0;
				for(d = 0; d < h.length; d++) {
					if(g) {
						f = 10 * f + a.intval(h.charAt(d))
					} else {
						e += a.intval(h.charAt(d))
					}
					g = !g
				}
				var c = (2 * f).toString();
				for(d = 0; d < c.length; d++) {
					e += a.intval(c.charAt(d))
				}
				return(h + ((10 - e % 10) % 10).toString())
			},
			computeMod11: function(f) {
				var e = 0,
					c = 2;
				for(var d = f.length - 1; d >= 0; d--) {
					e += c * a.intval(f.charAt(d));
					c = c == 7 ? 2 : c + 1
				}
				return(f + ((11 - e % 11) % 11).toString())
			},
			getDigit: function(e, g) {
				var d = "0123456789";
				var c = 0;
				var f = "";
				e = this.compute(e, false);
				f = "110";
				for(i = 0; i < e.length; i++) {
					c = d.indexOf(e.charAt(i));
					if(c < 0) {
						return("")
					}
					f += this.encoding[c]
				}
				f += "1001";
				return(f)
			}
		},
		code11: {
			encoding: ["101011", "1101011", "1001011", "1100101", "1011011", "1101101", "1001101", "1010011", "1101001", "110101", "101101"],
			getDigit: function(d) {
				var q = "0123456789-";
				var g, l, o = "",
					h = "0";
				o = "1011001" + h;
				for(g = 0; g < d.length; g++) {
					l = q.indexOf(d.charAt(g));
					if(l < 0) {
						return("")
					}
					o += this.encoding[l] + h
				}
				var p = 0,
					e = 0,
					j = 1,
					m = 0;
				for(g = d.length - 1; g >= 0; g--) {
					p = p == 10 ? 1 : p + 1;
					j = j == 10 ? 1 : j + 1;
					l = q.indexOf(d.charAt(g));
					e += p * l;
					m += j * l
				}
				var n = e % 11;
				m += n;
				var f = m % 11;
				o += this.encoding[n] + h;
				if(d.length >= 10) {
					o += this.encoding[f] + h
				}
				o += "1011001";
				return(o)
			}
		},
		code39: {
			encoding: ["101001101101", "110100101011", "101100101011", "110110010101", "101001101011", "110100110101", "101100110101", "101001011011", "110100101101", "101100101101", "110101001011", "101101001011", "110110100101", "101011001011", "110101100101", "101101100101", "101010011011", "110101001101", "101101001101", "101011001101", "110101010011", "101101010011", "110110101001", "101011010011", "110101101001", "101101101001", "101010110011", "110101011001", "101101011001", "101011011001", "110010101011", "100110101011", "110011010101", "100101101011", "110010110101", "100110110101", "100101011011", "110010101101", "100110101101", "100100100101", "100100101001", "100101001001", "101001001001", "100101101101"],
			getDigit: function(f) {
				var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*";
				var d, c, h = "",
					g = "0";
				if(f.indexOf("*") >= 0) {
					return("")
				}
				f = ("*" + f + "*").toUpperCase();
				for(d = 0; d < f.length; d++) {
					c = e.indexOf(f.charAt(d));
					if(c < 0) {
						return("")
					}
					if(d > 0) {
						h += g
					}
					h += this.encoding[c]
				}
				return(h)
			}
		},
		code93: {
			encoding: ["100010100", "101001000", "101000100", "101000010", "100101000", "100100100", "100100010", "101010000", "100010010", "100001010", "110101000", "110100100", "110100010", "110010100", "110010010", "110001010", "101101000", "101100100", "101100010", "100110100", "100011010", "101011000", "101001100", "101000110", "100101100", "100010110", "110110100", "110110010", "110101100", "110100110", "110010110", "110011010", "101101100", "101100110", "100110110", "100111010", "100101110", "111010100", "111010010", "111001010", "101101110", "101110110", "110101110", "100100110", "111011010", "111010110", "100110010", "101011110"],
			getDigit: function(d, h) {
				var o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%____*",
					l, m = "";
				if(d.indexOf("*") >= 0) {
					return("")
				}
				d = d.toUpperCase();
				m += this.encoding[47];
				for(i = 0; i < d.length; i++) {
					l = d.charAt(i);
					index = o.indexOf(l);
					if((l == "_") || (index < 0)) {
						return("")
					}
					m += this.encoding[index]
				}
				if(h) {
					var n = 0,
						e = 0,
						g = 1,
						j = 0;
					for(i = d.length - 1; i >= 0; i--) {
						n = n == 20 ? 1 : n + 1;
						g = g == 15 ? 1 : g + 1;
						index = o.indexOf(d.charAt(i));
						e += n * index;
						j += g * index
					}
					var l = e % 47;
					j += l;
					var f = j % 47;
					m += this.encoding[l];
					m += this.encoding[f]
				}
				m += this.encoding[47];
				m += "1";
				return(m)
			}
		},
		code128: {
			encoding: ["11011001100", "11001101100", "11001100110", "10010011000", "10010001100", "10001001100", "10011001000", "10011000100", "10001100100", "11001001000", "11001000100", "11000100100", "10110011100", "10011011100", "10011001110", "10111001100", "10011101100", "10011100110", "11001110010", "11001011100", "11001001110", "11011100100", "11001110100", "11101101110", "11101001100", "11100101100", "11100100110", "11101100100", "11100110100", "11100110010", "11011011000", "11011000110", "11000110110", "10100011000", "10001011000", "10001000110", "10110001000", "10001101000", "10001100010", "11010001000", "11000101000", "11000100010", "10110111000", "10110001110", "10001101110", "10111011000", "10111000110", "10001110110", "11101110110", "11010001110", "11000101110", "11011101000", "11011100010", "11011101110", "11101011000", "11101000110", "11100010110", "11101101000", "11101100010", "11100011010", "11101111010", "11001000010", "11110001010", "10100110000", "10100001100", "10010110000", "10010000110", "10000101100", "10000100110", "10110010000", "10110000100", "10011010000", "10011000010", "10000110100", "10000110010", "11000010010", "11001010000", "11110111010", "11000010100", "10001111010", "10100111100", "10010111100", "10010011110", "10111100100", "10011110100", "10011110010", "11110100100", "11110010100", "11110010010", "11011011110", "11011110110", "11110110110", "10101111000", "10100011110", "10001011110", "10111101000", "10111100010", "11110101000", "11110100010", "10111011110", "10111101110", "11101011110", "11110101110", "11010000100", "11010010000", "11010011100", "11000111010"],
			getDigit: function(d) {
				var m = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
				var n = "";
				var k = 0;
				var e = 0;
				var h = 0;
				var g = 0;
				var o = 0;
				for(h = 0; h < d.length; h++) {
					if(m.indexOf(d.charAt(h)) == -1) {
						return("")
					}
				}
				var f = d.length > 1;
				var l = "";
				for(h = 0; h < 3 && h < d.length; h++) {
					l = d.charAt(h);
					f &= l >= "0" && l <= "9"
				}
				k = f ? 105 : 104;
				n = this.encoding[k];
				h = 0;
				while(h < d.length) {
					if(!f) {
						g = 0;
						while((h + g < d.length) && (d.charAt(h + g) >= "0") && (d.charAt(h + g) <= "9")) {
							g++
						}
						f = (g > 5) || ((h + g - 1 == d.length) && (g > 3));
						if(f) {
							n += this.encoding[99];
							k += ++e * 99
						}
					} else {
						if((h == d.length) || (d.charAt(h) < "0") || (d.charAt(h) > "9") || (d.charAt(h + 1) < "0") || (d.charAt(h + 1) > "9")) {
							f = false;
							n += this.encoding[100];
							k += ++e * 100
						}
					}
					if(f) {
						o = a.intval(d.charAt(h) + d.charAt(h + 1));
						h += 2
					} else {
						o = m.indexOf(d.charAt(h));
						h += 1
					}
					n += this.encoding[o];
					k += ++e * o
				}
				n += this.encoding[k % 103];
				n += this.encoding[106];
				n += "11";
				return(n)
			}
		},
		codabar: {
			encoding: ["101010011", "101011001", "101001011", "110010101", "101101001", "110101001", "100101011", "100101101", "100110101", "110100101", "101001101", "101100101", "1101011011", "1101101011", "1101101101", "1011011011", "1011001001", "1010010011", "1001001011", "1010011001"],
			getDigit: function(f) {
				var e = "0123456789-$:/.+";
				var d, c, h = "",
					g = "0";
				h += this.encoding[16] + g;
				for(d = 0; d < f.length; d++) {
					c = e.indexOf(f.charAt(d));
					if(c < 0) {
						return("")
					}
					h += this.encoding[c] + g
				}
				h += this.encoding[16];
				return(h)
			}
		},
		datamatrix: {
			encoding: ["101010011", "101011001", "101001011", "110010101", "101101001", "110101001", "100101011", "100101101", "100110101", "110100101", "101001101", "101100101", "1101011011", "1101101011", "1101101101", "1011011011", "1011001001", "1010010011", "1001001011", "1010011001"],
			lengthRows: [10, 12, 14, 16, 18, 20, 22, 24, 26, 32, 36, 40, 44, 48, 52, 64, 72, 80, 88, 96, 104, 120, 132, 144, 8, 8, 12, 12, 16, 16],
			lengthCols: [10, 12, 14, 16, 18, 20, 22, 24, 26, 32, 36, 40, 44, 48, 52, 64, 72, 80, 88, 96, 104, 120, 132, 144, 18, 32, 26, 36, 36, 48],
			mappingRows: [8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 88, 96, 108, 120, 132, 6, 6, 10, 10, 14, 14],
			mappingCols: [8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 88, 96, 108, 120, 132, 16, 28, 24, 32, 32, 44],
			dataCWCount: [3, 5, 8, 12, 18, 22, 30, 36, 44, 62, 86, 114, 144, 174, 204, 280, 368, 456, 576, 696, 816, 1050, 1304, 1558, 5, 10, 16, 22, 32, 49],
			solomonCWCount: [5, 7, 10, 12, 14, 18, 20, 24, 28, 36, 42, 48, 56, 68, 84, 112, 144, 192, 224, 272, 336, 408, 496, 620, 7, 11, 14, 18, 24, 28],
			dataRegionRows: [8, 10, 12, 14, 16, 18, 20, 22, 24, 14, 16, 18, 20, 22, 24, 14, 16, 18, 20, 22, 24, 18, 20, 22, 6, 6, 10, 10, 14, 14],
			dataRegionCols: [8, 10, 12, 14, 16, 18, 20, 22, 24, 14, 16, 18, 20, 22, 24, 14, 16, 18, 20, 22, 24, 18, 20, 22, 16, 14, 24, 16, 16, 22],
			regionRows: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 6, 6, 6, 1, 1, 1, 1, 1, 1],
			regionCols: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 6, 6, 6, 1, 2, 1, 2, 2, 2],
			interleavedBlocks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 4, 4, 4, 4, 6, 6, 8, 8, 1, 1, 1, 1, 1, 1],
			logTab: [-255, 255, 1, 240, 2, 225, 241, 53, 3, 38, 226, 133, 242, 43, 54, 210, 4, 195, 39, 114, 227, 106, 134, 28, 243, 140, 44, 23, 55, 118, 211, 234, 5, 219, 196, 96, 40, 222, 115, 103, 228, 78, 107, 125, 135, 8, 29, 162, 244, 186, 141, 180, 45, 99, 24, 49, 56, 13, 119, 153, 212, 199, 235, 91, 6, 76, 220, 217, 197, 11, 97, 184, 41, 36, 223, 253, 116, 138, 104, 193, 229, 86, 79, 171, 108, 165, 126, 145, 136, 34, 9, 74, 30, 32, 163, 84, 245, 173, 187, 204, 142, 81, 181, 190, 46, 88, 100, 159, 25, 231, 50, 207, 57, 147, 14, 67, 120, 128, 154, 248, 213, 167, 200, 63, 236, 110, 92, 176, 7, 161, 77, 124, 221, 102, 218, 95, 198, 90, 12, 152, 98, 48, 185, 179, 42, 209, 37, 132, 224, 52, 254, 239, 117, 233, 139, 22, 105, 27, 194, 113, 230, 206, 87, 158, 80, 189, 172, 203, 109, 175, 166, 62, 127, 247, 146, 66, 137, 192, 35, 252, 10, 183, 75, 216, 31, 83, 33, 73, 164, 144, 85, 170, 246, 65, 174, 61, 188, 202, 205, 157, 143, 169, 82, 72, 182, 215, 191, 251, 47, 178, 89, 151, 101, 94, 160, 123, 26, 112, 232, 21, 51, 238, 208, 131, 58, 69, 148, 18, 15, 16, 68, 17, 121, 149, 129, 19, 155, 59, 249, 70, 214, 250, 168, 71, 201, 156, 64, 60, 237, 130, 111, 20, 93, 122, 177, 150],
			aLogTab: [1, 2, 4, 8, 16, 32, 64, 128, 45, 90, 180, 69, 138, 57, 114, 228, 229, 231, 227, 235, 251, 219, 155, 27, 54, 108, 216, 157, 23, 46, 92, 184, 93, 186, 89, 178, 73, 146, 9, 18, 36, 72, 144, 13, 26, 52, 104, 208, 141, 55, 110, 220, 149, 7, 14, 28, 56, 112, 224, 237, 247, 195, 171, 123, 246, 193, 175, 115, 230, 225, 239, 243, 203, 187, 91, 182, 65, 130, 41, 82, 164, 101, 202, 185, 95, 190, 81, 162, 105, 210, 137, 63, 126, 252, 213, 135, 35, 70, 140, 53, 106, 212, 133, 39, 78, 156, 21, 42, 84, 168, 125, 250, 217, 159, 19, 38, 76, 152, 29, 58, 116, 232, 253, 215, 131, 43, 86, 172, 117, 234, 249, 223, 147, 11, 22, 44, 88, 176, 77, 154, 25, 50, 100, 200, 189, 87, 174, 113, 226, 233, 255, 211, 139, 59, 118, 236, 245, 199, 163, 107, 214, 129, 47, 94, 188, 85, 170, 121, 242, 201, 191, 83, 166, 97, 194, 169, 127, 254, 209, 143, 51, 102, 204, 181, 71, 142, 49, 98, 196, 165, 103, 206, 177, 79, 158, 17, 34, 68, 136, 61, 122, 244, 197, 167, 99, 198, 161, 111, 222, 145, 15, 30, 60, 120, 240, 205, 183, 67, 134, 33, 66, 132, 37, 74, 148, 5, 10, 20, 40, 80, 160, 109, 218, 153, 31, 62, 124, 248, 221, 151, 3, 6, 12, 24, 48, 96, 192, 173, 119, 238, 241, 207, 179, 75, 150, 1],
			champGaloisMult: function(d, c) {
				if(!d || !c) {
					return 0
				}
				return this.aLogTab[(this.logTab[d] + this.logTab[c]) % 255]
			},
			champGaloisDoub: function(d, c) {
				if(!d) {
					return 0
				}
				if(!c) {
					return d
				}
				return this.aLogTab[(this.logTab[d] + c) % 255]
			},
			champGaloisSum: function(d, c) {
				return d ^ c
			},
			selectIndex: function(c, d) {
				if((c < 1 || c > 1558) && !d) {
					return -1
				}
				if((c < 1 || c > 49) && d) {
					return -1
				}
				var e = 0;
				if(d) {
					e = 24
				}
				while(this.dataCWCount[e] < c) {
					e++
				}
				return e
			},
			encodeDataCodeWordsASCII: function(f) {
				var e = new Array();
				var h = 0,
					d, g;
				for(d = 0; d < f.length; d++) {
					g = f.charCodeAt(d);
					if(g > 127) {
						e[h] = 235;
						g = g - 127;
						h++
					} else {
						if((g >= 48 && g <= 57) && (d + 1 < f.length) && (f.charCodeAt(d + 1) >= 48 && f.charCodeAt(d + 1) <= 57)) {
							g = ((g - 48) * 10) + ((f.charCodeAt(d + 1)) - 48);
							g += 130;
							d++
						} else {
							g++
						}
					}
					e[h] = g;
					h++
				}
				return e
			},
			addPadCW: function(d, g, f) {
				if(g >= f) {
					return
				}
				d[g] = 129;
				var e, c;
				for(c = g + 1; c < f; c++) {
					e = ((149 * (c + 1)) % 253) + 1;
					d[c] = (129 + e) % 254
				}
			},
			calculSolFactorTable: function(c) {
				var f = new Array();
				var e, d;
				for(e = 0; e <= c; e++) {
					f[e] = 1
				}
				for(e = 1; e <= c; e++) {
					for(d = e - 1; d >= 0; d--) {
						f[d] = this.champGaloisDoub(f[d], e);
						if(d > 0) {
							f[d] = this.champGaloisSum(f[d], f[d - 1])
						}
					}
				}
				return f
			},
			addReedSolomonCW: function(c, g, l, m, h) {
				var o = 0;
				var n = c / h;
				var p = new Array();
				var f, e, d;
				for(d = 0; d < h; d++) {
					for(f = 0; f < n; f++) {
						p[f] = 0
					}
					for(f = d; f < l; f = f + h) {
						o = this.champGaloisSum(m[f], p[n - 1]);
						for(e = n - 1; e >= 0; e--) {
							if(!o) {
								p[e] = 0
							} else {
								p[e] = this.champGaloisMult(o, g[e])
							}
							if(e > 0) {
								p[e] = this.champGaloisSum(p[e - 1], p[e])
							}
						}
					}
					e = l + d;
					for(f = n - 1; f >= 0; f--) {
						m[e] = p[f];
						e = e + h
					}
				}
				return m
			},
			getBits: function(d) {
				var e = new Array();
				for(var c = 0; c < 8; c++) {
					e[c] = d & (128 >> c) ? 1 : 0
				}
				return e
			},
			next: function(h, k, d, j, g, c) {
				var f = 0;
				var l = 4;
				var e = 0;
				do {
					if((l == k) && (e == 0)) {
						this.patternShapeSpecial1(g, c, j[f], k, d);
						f++
					} else {
						if((h < 3) && (l == k - 2) && (e == 0) && (d % 4 != 0)) {
							this.patternShapeSpecial2(g, c, j[f], k, d);
							f++
						} else {
							if((l == k - 2) && (e == 0) && (d % 8 == 4)) {
								this.patternShapeSpecial3(g, c, j[f], k, d);
								f++
							} else {
								if((l == k + 4) && (e == 2) && (d % 8 == 0)) {
									this.patternShapeSpecial4(g, c, j[f], k, d);
									f++
								}
							}
						}
					}
					do {
						if((l < k) && (e >= 0) && (c[l][e] != 1)) {
							this.patternShapeStandard(g, c, j[f], l, e, k, d);
							f++
						}
						l -= 2;
						e += 2
					} while ((l >= 0) && (e < d));
					l += 1;
					e += 3;
					do {
						if((l >= 0) && (e < d) && (c[l][e] != 1)) {
							this.patternShapeStandard(g, c, j[f], l, e, k, d);
							f++
						}
						l += 2;
						e -= 2
					} while ((l < k) && (e >= 0));
					l += 3;
					e += 1
				} while ((l < k) || (e < d))
			},
			patternShapeStandard: function(g, f, h, j, e, d, c) {
				this.placeBitInDatamatrix(g, f, h[0], j - 2, e - 2, d, c);
				this.placeBitInDatamatrix(g, f, h[1], j - 2, e - 1, d, c);
				this.placeBitInDatamatrix(g, f, h[2], j - 1, e - 2, d, c);
				this.placeBitInDatamatrix(g, f, h[3], j - 1, e - 1, d, c);
				this.placeBitInDatamatrix(g, f, h[4], j - 1, e, d, c);
				this.placeBitInDatamatrix(g, f, h[5], j, e - 2, d, c);
				this.placeBitInDatamatrix(g, f, h[6], j, e - 1, d, c);
				this.placeBitInDatamatrix(g, f, h[7], j, e, d, c)
			},
			patternShapeSpecial1: function(f, e, g, d, c) {
				this.placeBitInDatamatrix(f, e, g[0], d - 1, 0, d, c);
				this.placeBitInDatamatrix(f, e, g[1], d - 1, 1, d, c);
				this.placeBitInDatamatrix(f, e, g[2], d - 1, 2, d, c);
				this.placeBitInDatamatrix(f, e, g[3], 0, c - 2, d, c);
				this.placeBitInDatamatrix(f, e, g[4], 0, c - 1, d, c);
				this.placeBitInDatamatrix(f, e, g[5], 1, c - 1, d, c);
				this.placeBitInDatamatrix(f, e, g[6], 2, c - 1, d, c);
				this.placeBitInDatamatrix(f, e, g[7], 3, c - 1, d, c)
			},
			patternShapeSpecial2: function(f, e, g, d, c) {
				this.placeBitInDatamatrix(f, e, g[0], d - 3, 0, d, c);
				this.placeBitInDatamatrix(f, e, g[1], d - 2, 0, d, c);
				this.placeBitInDatamatrix(f, e, g[2], d - 1, 0, d, c);
				this.placeBitInDatamatrix(f, e, g[3], 0, c - 4, d, c);
				this.placeBitInDatamatrix(f, e, g[4], 0, c - 3, d, c);
				this.placeBitInDatamatrix(f, e, g[5], 0, c - 2, d, c);
				this.placeBitInDatamatrix(f, e, g[6], 0, c - 1, d, c);
				this.placeBitInDatamatrix(f, e, g[7], 1, c - 1, d, c)
			},
			patternShapeSpecial3: function(f, e, g, d, c) {
				this.placeBitInDatamatrix(f, e, g[0], d - 3, 0, d, c);
				this.placeBitInDatamatrix(f, e, g[1], d - 2, 0, d, c);
				this.placeBitInDatamatrix(f, e, g[2], d - 1, 0, d, c);
				this.placeBitInDatamatrix(f, e, g[3], 0, c - 2, d, c);
				this.placeBitInDatamatrix(f, e, g[4], 0, c - 1, d, c);
				this.placeBitInDatamatrix(f, e, g[5], 1, c - 1, d, c);
				this.placeBitInDatamatrix(f, e, g[6], 2, c - 1, d, c);
				this.placeBitInDatamatrix(f, e, g[7], 3, c - 1, d, c)
			},
			patternShapeSpecial4: function(f, e, g, d, c) {
				this.placeBitInDatamatrix(f, e, g[0], d - 1, 0, d, c);
				this.placeBitInDatamatrix(f, e, g[1], d - 1, c - 1, d, c);
				this.placeBitInDatamatrix(f, e, g[2], 0, c - 3, d, c);
				this.placeBitInDatamatrix(f, e, g[3], 0, c - 2, d, c);
				this.placeBitInDatamatrix(f, e, g[4], 0, c - 1, d, c);
				this.placeBitInDatamatrix(f, e, g[5], 1, c - 3, d, c);
				this.placeBitInDatamatrix(f, e, g[6], 1, c - 2, d, c);
				this.placeBitInDatamatrix(f, e, g[7], 1, c - 1, d, c)
			},
			placeBitInDatamatrix: function(g, f, j, h, e, d, c) {
				if(h < 0) {
					h += d;
					e += 4 - ((d + 4) % 8)
				}
				if(e < 0) {
					e += c;
					h += 4 - ((c + 4) % 8)
				}
				if(f[h][e] != 1) {
					g[h][e] = j;
					f[h][e] = 1
				}
			},
			addFinderPattern: function(h, m, d, n, c) {
				var l = (n + 2) * m;
				var k = (c + 2) * d;
				var e = new Array();
				e[0] = new Array();
				for(var f = 0; f < k + 2; f++) {
					e[0][f] = 0
				}
				for(var g = 0; g < l; g++) {
					e[g + 1] = new Array();
					e[g + 1][0] = 0;
					e[g + 1][k + 1] = 0;
					for(var f = 0; f < k; f++) {
						if(g % (n + 2) == 0) {
							if(f % 2 == 0) {
								e[g + 1][f + 1] = 1
							} else {
								e[g + 1][f + 1] = 0
							}
						} else {
							if(g % (n + 2) == n + 1) {
								e[g + 1][f + 1] = 1
							} else {
								if(f % (c + 2) == c + 1) {
									if(g % 2 == 0) {
										e[g + 1][f + 1] = 0
									} else {
										e[g + 1][f + 1] = 1
									}
								} else {
									if(f % (c + 2) == 0) {
										e[g + 1][f + 1] = 1
									} else {
										e[g + 1][f + 1] = 0;
										e[g + 1][f + 1] = h[g - 1 - (2 * (parseInt(g / (n + 2))))][f - 1 - (2 * (parseInt(f / (c + 2))))]
									}
								}
							}
						}
					}
				}
				e[l + 1] = new Array();
				for(var f = 0; f < k + 2; f++) {
					e[l + 1][f] = 0
				}
				return e
			},
			getDigit: function(m, u) {
				var s = this.encodeDataCodeWordsASCII(m);
				var e = s.length;
				var h = this.selectIndex(e, u);
				var n = this.dataCWCount[h];
				var x = this.solomonCWCount[h];
				var c = n + x;
				var A = this.lengthRows[h];
				var z = this.lengthCols[h];
				var k = this.regionRows[h];
				var l = this.regionCols[h];
				var f = this.dataRegionRows[h];
				var y = this.dataRegionCols[h];
				var w = A - 2 * k;
				var j = z - 2 * l;
				var p = this.interleavedBlocks[h];
				var q = (x / p);
				var d = (n / p);
				this.addPadCW(s, e, n);
				var v = this.calculSolFactorTable(q);
				this.addReedSolomonCW(x, v, n, s, p);
				var t = new Array();
				for(var r = 0; r < c; r++) {
					t[r] = this.getBits(s[r])
				}
				var B = new Array();
				var o = new Array();
				for(var r = 0; r < j; r++) {
					B[r] = new Array();
					o[r] = new Array()
				}
				if(((w * j) % 8) == 4) {
					B[w - 2][j - 2] = 1;
					B[w - 1][j - 1] = 1;
					B[w - 1][j - 2] = 0;
					B[w - 2][j - 1] = 0;
					o[w - 2][j - 2] = 1;
					o[w - 1][j - 1] = 1;
					o[w - 1][j - 2] = 1;
					o[w - 2][j - 1] = 1
				}
				this.next(0, w, j, t, B, o);
				B = this.addFinderPattern(B, k, l, f, y);
				return B
			}
		},
		lec: {
			cInt: function(e, f) {
				var d = "";
				for(var c = 0; c < f; c++) {
					d += String.fromCharCode(e & 255);
					e = e >> 8
				}
				return d
			},
			cRgb: function(e, d, c) {
				return String.fromCharCode(c) + String.fromCharCode(d) + String.fromCharCode(e)
			},
			cHexColor: function(h) {
				var d = parseInt("0x" + h.substr(1));
				var c = d & 255;
				d = d >> 8;
				var f = d & 255;
				var e = d >> 8;
				return(this.cRgb(e, f, c))
			}
		},
		hexToRGB: function(h) {
			var d = parseInt("0x" + h.substr(1));
			var c = d & 255;
			d = d >> 8;
			var f = d & 255;
			var e = d >> 8;
			return({
				r: e,
				g: f,
				b: c
			})
		},
		isHexColor: function(d) {
			var c = new RegExp("#[0-91-F]", "gi");
			return d.match(c)
		},
		base64Encode: function(o) {
			var c = "",
				h, f, e, n, m, l, j;
			var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var g = 0;
			while(g < o.length) {
				h = o.charCodeAt(g++);
				f = o.charCodeAt(g++);
				e = o.charCodeAt(g++);
				n = h >> 2;
				m = ((h & 3) << 4) | (f >> 4);
				l = ((f & 15) << 2) | (e >> 6);
				j = e & 63;
				if(isNaN(f)) {
					l = j = 64
				} else {
					if(isNaN(e)) {
						j = 64
					}
				}
				c += d.charAt(n) + d.charAt(m) + d.charAt(l) + d.charAt(j)
			}
			return c
		},
		bitStringTo2DArray: function(f) {
			var e = [];
			e[0] = [];
			for(var c = 0; c < f.length; c++) {
				e[0][c] = f.charAt(c)
			}
			return(e)
		},
		resize: function(d, c) {
			d[0].style.padding = '0px';
			d[0].style.overflow = 'auto';
			d[0].style.width = c + 'px';
			d[0].innerHTML = '';
			return d
		},
		digitToBmpRenderer: function(t, w, o, g, n, z) {
			var e = o.length;
			var f = o[0].length;
			var u = 0;
			var r = this.isHexColor(w.bgColor) ? this.lec.cHexColor(w.bgColor) : this.lec.cRgb(255, 255, 255);
			var q = this.isHexColor(w.color) ? this.lec.cHexColor(w.color) : this.lec.cRgb(0, 0, 0);
			var d = "";
			var c = "";
			for(u = 0; u < n; u++) {
				d += r;
				c += q
			}
			var p = "";
			var C = (4 - ((n * f * 3) % 4)) % 4;
			var B = (n * f + C) * z * e;
			var v = "";
			for(u = 0; u < C; u++) {
				v += "\0"
			}
			var A = "BM" + this.lec.cInt(54 + B, 4) + "\0\0\0\0" + this.lec.cInt(54, 4) + this.lec.cInt(40, 4) + this.lec.cInt(n * f, 4) + this.lec.cInt(z * e, 4) + this.lec.cInt(1, 2) + this.lec.cInt(24, 2) + "\0\0\0\0" + this.lec.cInt(B, 4) + this.lec.cInt(2835, 4) + this.lec.cInt(2835, 4) + this.lec.cInt(0, 4) + this.lec.cInt(0, 4);
			for(var h = e - 1; h >= 0; h--) {
				var l = "";
				for(var j = 0; j < f; j++) {
					l += o[h][j] == "0" ? d : c
				}
				l += v;
				for(var s = 0; s < z; s++) {
					A += l
				}
			}
			var m = document.createElement("object");
			m.setAttribute("type", "image/bmp");
			m.setAttribute("data", "data:image/bmp;base64," + this.base64Encode(A));
			debugger
			this.resize(t, n * f + C).append(m)
		},
		digitToBmp: function(g, f, j, d) {
			var c = a.intval(f.barWidth);
			var e = a.intval(f.barHeight);
			this.digitToBmpRenderer(g, f, this.bitStringTo2DArray(j), d, c, e)
		},
		digitToBmp2D: function(f, e, g, c) {
			var d = a.intval(e.moduleSize);
			this.digitToBmpRenderer(f, e, g, c, d, d)
		},
		digitToCssRenderer: function(q, d, m, e, p, g) {
			var r = m.length;
			var c = m[0].length;
			var j = "";
			var o = '<div style="float: left; font-size: 0px; background-color: ' + d.bgColor + "; height: " + g + 'px; width: &Wpx"></div>';
			var l = '<div style="float: left; font-size: 0px; width:0; border-left: &Wpx solid ' + d.color + "; height: " + g + 'px;"></div>';
			var f, h;
			for(var k = 0; k < r; k++) {
				f = 0;
				h = m[k][0];
				for(var n = 0; n < c; n++) {
					if(h == m[k][n]) {
						f++
					} else {
						j += (h == "0" ? o : l).replace("&W", f * p);
						h = m[k][n];
						f = 1
					}
				}
				if(f > 0) {
					j += (h == "0" ? o : l).replace("&W", f * p)
				}
			}
			if(d.showHRI) {
				j += '<div style="clear:both; width: 100%; background-color: ' + d.bgColor + "; color: " + d.color + "; text-align: center; font-size: " + d.fontSize + "px; margin-top: " + d.marginHRI + 'px;">' + e + "</div>"
			}
			this.resize(q, p * c)[0].innerHTML = j
		},
		digitToCss: function(g, f, j, d) {
			var c = a.intval(f.barWidth);
			var e = a.intval(f.barHeight);
			this.digitToCssRenderer(g, f, this.bitStringTo2DArray(j), d, c, e)
		},
		digitToCss2D: function(f, e, g, c) {
			var d = a.intval(e.moduleSize);
			this.digitToCssRenderer(f, e, g, c, d, d)
		},
		digitToSvgRenderer: function(q, s, n, f, l, t) {
			var d = n.length;
			var e = n[0].length;
			var o = l * e;
			var u = t * d;
			if(s.showHRI) {
				var g = a.intval(s.fontSize);
				u += a.intval(s.marginHRI) + g
			}
			var m = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + o + '" height="' + u + '">';
			m += '<rect width="' + o + '" height="' + u + '" x="0" y="0" fill="' + s.bgColor + '" />';
			var c = '<rect width="&W" height="' + t + '" x="&X" y="&Y" fill="' + s.color + '" />';
			var r, p;
			for(var h = 0; h < d; h++) {
				r = 0;
				p = n[h][0];
				for(var j = 0; j < e; j++) {
					if(p == n[h][j]) {
						r++
					} else {
						if(p == "1") {
							m += c.replace("&W", r * l).replace("&X", (j - r) * l).replace("&Y", h * t)
						}
						p = n[h][j];
						r = 1
					}
				}
				if((r > 0) && (p == "1")) {
					m += c.replace("&W", r * l).replace("&X", (e - r) * l).replace("&Y", h * t)
				}
			}
			if(s.showHRI) {
				m += '<g transform="translate(' + Math.floor(o / 2) + ' 0)">';
				m += '<text y="' + (u - Math.floor(g / 2)) + '" text-anchor="middle" style="font-family: Arial; font-size: ' + g + 'px;" fill="' + s.color + '">' + f + "</text>";
				m += "</g>"
			}
			m += "</svg>";
			var k = document.createElement("object");
			k.setAttribute("type", "image/svg+xml");
			k.setAttribute("data", "data:image/svg+xml," + m);
			debugger
			this.resize(q, o).append(k)
		},
		digitToSvg: function(g, f, j, d) {
			var c = a.intval(f.barWidth);
			var e = a.intval(f.barHeight);
			this.digitToSvgRenderer(g, f, this.bitStringTo2DArray(j), d, c, e)
		},
		digitToSvg2D: function(f, e, g, c) {
			var d = a.intval(e.moduleSize);
			this.digitToSvgRenderer(f, e, g, c, d, d)
		},
		digitToCanvasRenderer: function(s, d, o, f, m, e, q, k) {
			var j = s.get(0);
			if(!j || !j.getContext) {
				return
			}
			var t = o.length;
			var c = o[0].length;
			var r = j.getContext("2d");
			r.lineWidth = 1;
			r.lineCap = "butt";
			r.fillStyle = d.bgColor;
			r.fillRect(m, e, c * q, t * k);
			r.fillStyle = d.color;
			for(var n = 0; n < t; n++) {
				var h = 0;
				var l = o[n][0];
				for(var p = 0; p < c; p++) {
					if(l == o[n][p]) {
						h++
					} else {
						if(l == "1") {
							r.fillRect(m + (p - h) * q, e + n * k, q * h, k)
						}
						l = o[n][p];
						h = 1
					}
				}
				if((h > 0) && (l == "1")) {
					r.fillRect(m + (c - h) * q, e + n * k, q * h, k)
				}
			}
			if(d.showHRI) {
				var g = r.measureText(f);
				r.fillText(f, m + Math.floor((c * q - g.width) / 2), e + t * k + d.fontSize + d.marginHRI)
			}
		},
		digitToCanvas: function(j, g, l, e) {
			var d = a.intval(g.barWidth);
			var f = a.intval(g.barHeight);
			var c = a.intval(g.posX);
			var k = a.intval(g.posY);
			this.digitToCanvasRenderer(j, g, this.bitStringTo2DArray(l), e, c, k, d, f)
		},
		digitToCanvas2D: function(g, f, j, d) {
			var e = a.intval(f.moduleSize);
			var c = a.intval(f.posX);
			var h = a.intval(f.posY);
			this.digitToCanvasRenderer(g, f, j, d, c, h, e, e)
		}
	};
	b.fn.barcode = function(h, m, f) {
		var o = "",
			g = "",
			d = "",
			k = true,
			n = false,
			j = false;
		if(typeof(h) == "string") {
			d = h
		} else {
			if(typeof(h) == "object") {
				d = typeof(h.code) == "string" ? h.code : "";
				k = typeof(h.crc) != "undefined" ? h.crc : true;
				n = typeof(h.rect) != "undefined" ? h.rect : false
			}
		}
		if(d == "") {
			return(false)
		}
		if(typeof(f) == "undefined") {
			f = []
		}
		for(var c in a.settings) {
			if(f[c] == undefined) {
				f[c] = a.settings[c]
			}
		}
		switch(m) {
			case "std25":
			case "int25":
				o = a.i25.getDigit(d, k, m);
				g = a.i25.compute(d, k, m);
				break;
			case "ean8":
			case "ean13":
				o = a.ean.getDigit(d, m);
				g = a.ean.compute(d, m);
				break;
			case "code11":
				o = a.code11.getDigit(d);
				g = d;
				break;
			case "code39":
				o = a.code39.getDigit(d);
				g = d;
				break;
			case "code93":
				o = a.code93.getDigit(d, k);
				g = d;
				break;
			case "code128":
				o = a.code128.getDigit(d);
				g = d;
				break;
			case "codabar":
				o = a.codabar.getDigit(d);
				g = d;
				break;
			case "msi":
				o = a.msi.getDigit(d, k);
				g = a.msi.compute(d, k);
				break;
			case "datamatrix":
				o = a.datamatrix.getDigit(d, n);
				g = d;
				j = true;
				break
		}
		if(o.length == 0) {
			return(b(this))
		}
		if(!j && f.addQuietZone) {
			o = "0000000000" + o + "0000000000"
		}
		var l = b(this);
		var e = "digitTo" + f.output.charAt(0).toUpperCase() + f.output.substr(1) + (j ? "2D" : "");
		if(typeof(a[e]) == "function") {
			a[e](l, f, o, g)
		}
		return(l)
	}
}(mui));