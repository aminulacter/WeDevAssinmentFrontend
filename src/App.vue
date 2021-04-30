<template>
  <div id="app">
      <nav-bar />
      <router-view />
  </div>
</template>
<script>
//import axios from 'axios'

import NavBar from "./components/NavBar.vue";
export default
{
  components:{NavBar},
  created: function () {
  //  const FormData = require('form-data');
   
  //   const formData = new FormData();
  //   formData.append('email', 'aminul@aminul.com');
  //   formData.append('password', '12345678');
  //   axios.post('http://127.0.0.1:8000/login', formData, {
  //     headers: {
        
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   }).then(({data}) => console.log(data.Token))
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
