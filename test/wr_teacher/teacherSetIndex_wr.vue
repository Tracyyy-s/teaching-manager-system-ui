
<template>
  <div>
    <div>
        <el-container style="height: 700px; border: 1px solid #eee">
            <!-- style="background-color: rgb(238, 241, 246)" -->
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)" >
            <!-- <el-menu :default-openeds="['1', '3']"> -->
                <el-menu :default-openeds="['1']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-setting"></i>设置</template>
                        <el-menu-item-group>
                                <el-menu-item index="1-1">
                                  <p @click="gotolink1" >修改信息</p>
                                    <!-- <router-link :to="{name:'teacherSet_modifyData'}">修改信息</router-link> -->
                                </el-menu-item>
                                <el-menu-item index="1-2">
                                  <p @click="gotolink2" >资料卡片</p>
                                    <!-- <router-link :to="{name:'teacherSet_dataCard'}">资料卡片</router-link> -->
                                </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            
            <el-main>
                <router-view></router-view>
                <!-- <el-table :data="tableData">
                    <el-table-column prop="date" label="日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table> -->
            </el-main>
        </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teacherManagerIndex',
  data () {
    return {
      msg: '教师设置子页面'
    }
  },
  methods: {
    gotolink1(){
          //点击跳转至上次浏览页面
         // this.$router.go(-1)
          //指定跳转地址
      this.$router.replace('modifyData')
    },
    gotolink2(){
          //点击跳转至上次浏览页面
         // this.$router.go(-1)
          //指定跳转地址
      this.$router.replace('dataCard')
    }
  }
}
</script>


<style >
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
