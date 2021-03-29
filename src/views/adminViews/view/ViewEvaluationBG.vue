<template>
  <el-container>
    <el-col
      :xs="{ span: 20, offset: 2 }"
      :sm="{ span: 18, offset: 3 }"
      :md="{ span: 16, offset: 4 }"
      :lg="{ span: 18, offset: 3 }"
      :xl="{ span: 22, offset: 1 }">
      <div class="head-select">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/viewStudentEvaluationResults' }"><span style="color: #666666">查看学生评价教师结果</span></el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/viewAllEvaluationResults' }"><span style="color: #666666">查看所有评价教师结果</span></el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider class="divider"></el-divider>
      <router-view></router-view>
    </el-col>
  </el-container>
</template>

<script>
export default {
  name: 'ViewEvaluationBG',
  data () {
    return {
      data () {}
    }
  },
  created () {},
  methods: {}
}
</script>

<style scoped>
.head-select {
  margin-top: 15px;
  margin-left: 15px;
}
.divider {
  width: 1320px;
}
</style>
