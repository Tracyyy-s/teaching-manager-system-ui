<template>
  <div>
    <el-row :gutter="10">
<!--    <el-row>-->
    <el-col :xs="6" :sm="5" :md="4" :lg="3" :xl="1">
        <div class="grid-content">
          <!--        <name></name>-->
<!--          1-->
          <Logo></Logo>
        </div>
      </el-col>
      <el-col :xs="13" :sm="15" :md="17" :lg="19" :xl="22">
        <div class="grid-content">
<!--          2-->
          <Nav></Nav>
          <!--        <Header></Header>-->
        </div>
      </el-col>
      <el-col :xs="5" :sm="4" :md="3" :lg="2" :xl="1">
        <div class="grid-content">
<!--          3-->
          <Exit></Exit>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Exit from './Exit'
import Nav from './Nav'
import Logo from './Logo'
export default {
  name: 'Header',
  components: {
    Exit, Nav, Logo
  }
}
</script>

<style scoped>

</style>
