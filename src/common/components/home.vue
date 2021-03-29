<template>
  <el-container>
    <el-header>
      <MyHeader></MyHeader>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import MyHeader from '@/common/components/header/Header.vue'

export default {
  name: 'Home',
  components: {
    MyHeader
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
</style>
