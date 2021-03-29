<template>
  <el-container>
    <el-header>
      <MyHeader></MyHeader>
    </el-header>
    <el-main>
      <el-row :gutter="10">
        <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}" :lg="{span:18,offset:3}" :xl="{span:22,offset:1}">
          <MainPwd></MainPwd>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import MyHeader from '@/components/studentComponents/header/Header.vue'
import MainPwd from '@/components/studentComponents/pwd/MainPwd.vue'
export default {
  name: 'pwd',
  components: {
    MyHeader, MainPwd
  }
}
</script>

<style scoped>

</style>
