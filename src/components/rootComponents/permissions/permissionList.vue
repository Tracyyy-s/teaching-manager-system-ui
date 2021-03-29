<template>
  <el-form ref="form" :model="form" label-width="150px">
    <el-form-item label="导入信息">
      <el-checkbox-group v-model="form.import">
        <el-checkbox label="导入教师信息" name="type"></el-checkbox>
        <el-checkbox label="导入学生信息" name="type"></el-checkbox>
        <el-checkbox label="导入课表" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="查看课表">
      <el-radio-group v-model="form.schedule">
        <el-radio label="仅能查看自己教授的课程的课表" name="type"></el-radio>
        <el-radio label="可查看所有课程的课表" name="type"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="查看评价结果">
      <el-radio-group v-model="form.evaluation">
        <el-radio label="仅能查看自己教授的课程的评价结果" name="type"></el-radio>
        <el-radio label="可查看所有课程的评价结果" name="type"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="修改学生信息">
      <el-radio-group v-model="form.stuinfo">
        <el-radio label="仅能查看学生信息"></el-radio>
        <el-radio label="可修改学生的个人信息"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="修改教师信息">
      <el-radio-group v-model="form.tinfo">
        <el-radio label="仅能修改本人的教师信息"></el-radio>
        <el-radio label="可修改其他教师信息">
          <!--          此处可选择该教师可修改教师的范围,e.g.计科,生科,...,全部或多个或一个学院-->
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="修改评价指标">
      <el-checkbox-group v-model="form.index">
        <el-checkbox label="修改老师对老师的评价指标" name="type"></el-checkbox>
        <el-checkbox label="修改学生对老师的评价指标" name="type">
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'permissionList',
  data () {
    return {
      form: {
        import: [],
        schedule: [],
        evaluation: [],
        stuinfo: [],
        tinfo: [],
        index: []
      }
    }
  }
}
</script>

<style scoped>

</style>
