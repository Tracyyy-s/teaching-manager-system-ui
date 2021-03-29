<template>
  <el-container>
<!--    <el-header>-->
<!--      &lt;!&ndash; <MyHeader></MyHeader> &ndash;&gt;-->
<!--    </el-header>-->
    <el-main>
      <MainSchedule></MainSchedule>
    </el-main>
  </el-container>
</template>

<script>
import MyHeader from '@/components/studentComponents/header/Header.vue'
import MainSchedule from '@/components/studentComponents/schedule/MainSchedule.vue'
export default {
  name: 'Schedule',
  components: {
    MyHeader,
    MainSchedule
  }
}
</script>

<style scoped>

</style>
