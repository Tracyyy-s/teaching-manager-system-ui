<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}" :lg="{span:18,offset:3}" :xl="{span:22,offset:1}">
        <div class="grid-content">
          <EvaluationList></EvaluationList>
        </div>
<!--        <div class="block">          -->
<!--        </div>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EvaluationList from '@/components/studentComponents/evaluation/EvaluationList.vue'
export default {
  name: 'MainEvaluationList',
  data () {
    return {
    }
  },
  components: {
    EvaluationList
  }
}
</script>
<style scoped>
  .block{
    text-align:center
  }
</style>
