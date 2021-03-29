<template>
  <div>
    <el-row :gutter="10">
<!--    <el-row>-->
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content">
          <!--        <name></name>-->
<!--          1-->
          <Logo></Logo>
        </div>
      </el-col>
      <el-col :xs="8" :sm="12" :md="16" :lg="18" :xl="22">
        <div class="grid-content">
<!--          2-->
          <Nav></Nav>
          <!--        <header></header>-->
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content">
<!--          3-->
          <Exit></Exit>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Nav from './Nav'
import Exit from '@/common/components/header/Exit.vue'
import Logo from '@/common/components/header/Logo.vue'
export default {
  name: 'Header',
  components: {
    Exit, Nav, Logo
  }
}
</script>

<style scoped>

</style>
