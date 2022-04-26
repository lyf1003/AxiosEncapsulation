<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-view />
    {{getUser}}
  </div>
</template>
<script>
//导入api
import api from "./api/index.js"
export default {
  components: {
  },
  data:{
    return {
      getUser:{}
    }
  },
  created:function(){
    //指定组件,以便于绑定属性到该组件的data上
    api.v(this)
    //请求方式,传入的参数就是configs参数
    api.user.getUser({data:{userId:7},type:"post",success:function(res){console.log(res)}})
    console.log("APP.vue",this)
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
