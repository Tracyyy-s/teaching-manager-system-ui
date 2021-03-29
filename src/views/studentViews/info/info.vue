<template>
  <el-container>
<!--    <el-header>-->
<!--      &lt;!&ndash; <MyHeader></MyHeader> &ndash;&gt;-->
<!--    </el-header>-->
    <el-main>
      <el-row :gutter="10">
        <el-col :xs="{span:12,offset:6}" :sm="{span:18,offset:3}" :md="{span:12,offset:6}" :lg="{span:14,offset:5}" :xl="{span:16,offset:4}">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <i class="el-icon-s-custom"></i>
              <span>学生资料卡片</span>
    <!--          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <div class = 'text item'>
              <MainInfo></MainInfo>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import MyHeader from '@/components/studentComponents/header/Header.vue'
import MainInfo from '@/components/studentComponents/info/MainInfo.vue'
export default {
  name: 'info',
  components: {
    MainInfo, MyHeader
  }
}
</script>

<style scoped>
  .el-card{
    left:50%;
    top:50%
  }
  .el-card-define {
    min-height: 100%;
    height: 100%;
  }
  .el-card-define >>> .el-card__body {
    height: 100%;
  }
  .clearfix{
    text-align: center;
    font-size: 20px;
    font-family: "Helvetica Neue"
  }
</style>
