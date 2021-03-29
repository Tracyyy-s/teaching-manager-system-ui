<template>
  <div class="MainEvaluationList">
    <el-row :gutter="10">
      <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}" :lg="{span:18,offset:3}" :xl="{span:22,offset:1}">
        <div class="grid-content">
          <EvaluationList></EvaluationList>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <div class="block  teacherEvalutionRow">
<!--        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination> -->
      </div>
    </el-row>
  </div>
</template>

<script>
import EvaluationList from '@/components/teacherComponents/teacherEvaluation/EvaluationList.vue'
export default {
  name: 'MainEvaluationList',
  components: {
    EvaluationList
  }
}
</script>

<style scoped>
.teacherEvalutionRow{
  margin-left: 12.5%;
}
</style>
