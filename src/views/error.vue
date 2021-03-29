<template>

<div class="father-card">
  <el-card class="box-card">
  <div slot="header" class="clearfix  c z">
    {{msg}}

  </div>
  <div class="z">
    <el-button type="primary" @click="go">返回主页/登录页</el-button>
  </div>

</el-card>
</div>

</template>
<script>
export default {
  name: 'error',
  data () {
    return {
      msg: '输入路径错误'
    }
  },
  methods: {
    go () {
      this.$router.push('/index')
    }
  }
}
</script>
<style >
.c{
  color:cornflowerblue;
}
.z{
  text-align: center;
}
.father-card{
  width: 500px;
  margin: 30px auto;
  margin-top: 150px;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
