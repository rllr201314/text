<template>
  <img :hidden="is_line" @click="$common.linkServer()" class="link-server" src="../../../static/img/link_server.png"/>
</template>

<script>
  export default {
    name: "LinkServer"
  }
</script>

<style scoped>
  .link-server {
    position: fixed;
    width: 0.9rem;
    height: 0.9rem;
    top: 4.5rem;
    right: 0.1rem;
  }
</style>
