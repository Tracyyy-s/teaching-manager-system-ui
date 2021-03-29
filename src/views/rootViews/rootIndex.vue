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
import MyHeader from '@/components/rootComponents/header/Header.vue'

export default {
  name: 'rootIndex',
  components: {
    MyHeader
  }
  // mounted() {
  //   this.$router.push('/user_role_list')
  // },
}
</script>

<style scoped>

</style>
