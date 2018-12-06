<template>
    
</template>
<script>
var that_ = this;
export default {
    name:"Global",
    data(){
        return {
            
        }
    },
    methods:{
        getStaticPath(state,arr){
            var that = this;
            var path_choice=[
                {status:1,path:'./static/img/official/'},
                {status:2,path:'./static/img/christmas/'}
            ]
            for(var i in path_choice){
                if(state == path_choice[i].status){
                    return path_choice[i].path;
                }
            }
        }
    }
}
</script>
<style scoped>

</style>
