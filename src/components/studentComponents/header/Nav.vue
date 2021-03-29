<!--<template>-->
<!--  <div>-->
<!--    <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect" router>-->

<!--      <el-menu-item index="1"  @click="to('/Evaluation')">评价教师</el-menu-item>-->

<!--      <el-submenu index="2">-->
<!--        <template slot="title">学生课表</template>-->

<!--        <el-menu-item :key="value.termId" v-for="(value) in list" @click="to('/Schedule/'+value.termId)">{{value.termName}}</el-menu-item>-->

<!--      </el-submenu>-->

<!--      <el-menu-item index="3"  @click="to('/Info')">管理中心</el-menu-item>-->

<!--    </el-menu>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Nav',-->
<!--  data () {-->
<!--    return {-->
<!--      list: [],-->
<!--      activeIndex: '1'-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    this.getlist()-->
<!--    // console.log(this.list)-->
<!--    if (this.$route.path === '/Info' || this.$route.path === '/Pwd') {-->
<!--      this.activeIndex = '3'-->
<!--    } else if (this.$route.path === '/Evaluation' || this.$route.path === '/EvaluationDetail') {-->
<!--      this.activeIndex = '1'-->
<!--    } else {-->
<!--      this.activeIndex = '2'-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    handleSelect (key, keyPath) {-->
<!--      // console.log(key, keyPath)-->
<!--    },-->
<!--    getlist () {-->
<!--      let _this = this-->
<!--      _this.$http.post('http://rap2api.taobao.org/app/mock/270774/post/getTerms', {}).then(res => {-->
<!--        _this.list = res.data.data-->
<!--        for (var i = 0; i < res.data.data.length; i++) {-->
<!--          _this.$set(_this.$store.state.termMap, res.data.data[i].termId, res.data.data[i].termName)-->
<!--        }-->
<!--        // console.log('!')-->
<!--        // console.log(_this.$store.state.termMap)-->
<!--      })-->
<!--    },-->
<!--    to (url) {-->
<!--      this.$router.replace(url)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--  .el-col {-->
<!--    border-radius: 4px;-->
<!--  }-->
<!--  .bg-purple-dark {-->
<!--    background: #99a9bf;-->
<!--  }-->
<!--  .bg-purple {-->
<!--    background: #d3dce6;-->
<!--  }-->
<!--  .bg-purple-light {-->
<!--    background: #e5e9f2;-->
<!--  }-->
<!--  .grid-content {-->
<!--    border-radius: 4px;-->
<!--    min-height: 36px;-->
<!--  }-->
<!--  h1, h2 {-->
<!--    font-weight: normal;-->
<!--  }-->
<!--  ul {-->
<!--    list-style-type: none;-->
<!--    padding: 0;-->
<!--  }-->
<!--  li {-->
<!--    display: inline-block;-->
<!--    margin: 0 10px;-->
<!--  }-->
<!--  a {-->
<!--    color: #42b983;-->
<!--  }-->
<!--</style>-->
