<template>
    <el-container>
        <el-header>
        <MyHeader></MyHeader>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
import MyHeader from '@/components/teacherComponents/header/Header.vue'

export default {
  name: 'teacherIndex',
  components: {
    MyHeader
  }
}
</script>

<style scoped>

</style>
