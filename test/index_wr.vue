<template>
  <div class="tuzi">
    <div>
        <img class="tu" src="@/assets/vuelogo.png">
    </div>
    {{msg}}
    <div>
        <router-link :to="{name:'teacherSet_dataCard'}">teacherSet_dataCard</router-link>
        ||
        <router-link :to="{name:'teacherManager_getViews'}">teacherManager_getViews</router-link>
        ||
        <router-link :to="{name:'teacherManager_teacherData'}">teacherManager_teacherData</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: '欢迎'
    }
  }
}
// module.exports = {
//   productionSourceMap: false,
//   devServer: {
//     proxy: {
//         '/api': {
//           target: 'http://127.0.0.1:8080',
//           changeOrigin: true,
//           ws: true,
//           pathRewrite:{
//             '^/api':''
//           }
//         },
//       },
//   },
// };

</script>


<style >
.tu {
  text-align: center;
  width:5%; height:5%
}
.tuzi {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
