<template>
  <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="角色id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="角色名"
      width="180">
    </el-table-column>
    <el-table-column>
      <a href="">修改角色名</a>
      <a href="">修改权限</a>
<!--      label="修改权限"-->
<!--      prop="href"-->
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'roleForm',
  data () {
    return {
      tableData: [{
        id: '01',
        name: '教务处管理员'
      }, {
        id: '02',
        name: '督导'
      }, {
        id: '03',
        name: '普通教师'
      }]
    }
  }
}
</script>

<style scoped>

</style>
