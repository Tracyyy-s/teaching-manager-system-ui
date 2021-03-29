<template>
  <el-container>
    <el-main>
      <MainEvaluationList></MainEvaluationList>
    </el-main>
  </el-container>
</template>

<script>

import MainEvaluationList from '@/components/teacherComponents/teacherEvaluation/MainEvaluationList.vue'
export default {
  name: 'Evaluation.vue',
  components: {
    MainEvaluationList
  }
}
</script>

<style scoped>

</style>
