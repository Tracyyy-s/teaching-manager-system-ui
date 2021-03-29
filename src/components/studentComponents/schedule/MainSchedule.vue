<template>
  <el-row :gutter="10">
    <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}" :lg="{span:18,offset:3}" :xl="{span:22,offset:1}">
      <div class="grid-content">
        <Schedule></Schedule>
      </div></el-col>
  </el-row>
</template>

<script>
import Schedule from './Schedule'
export default {
  name: 'MainSchedule',
  components: {
    Schedule
  }
}
</script>

<style scoped>

</style>
