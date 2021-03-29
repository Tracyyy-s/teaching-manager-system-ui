<template>
  <el-container>
    <!-- <el-header> -->
      <!-- <MyHeader></MyHeader> -->
    <!-- </el-header> -->
    <el-main>
      <MainSchedule></MainSchedule>
    </el-main>
  </el-container>
</template>

<script>
import MyHeader from '@/components/teacherComponents/header/Header.vue'
import MainSchedule from '@/components/teacherComponents/teacherSchedule/MainSchedule.vue'
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
