<template>
  <div>
    <div>
        <el-container style="height: 700px; border: 1px solid #eee">
            <!-- style="background-color: rgb(238, 241, 246)" -->
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)"  >
            <!-- <el-menu :default-openeds="['1', '3']"> -->
                <el-menu :default-openeds="['1']">

                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-menu"></i>教师管理</template>

                        <el-menu-item-group>
                            <el-menu-item index="2-1">
                                  <p @click="gotolink1" >我的课程</p>
                                  <!-- <router-link :to="{name:'teacherManager_teacherCourse'}">我的课程</router-link> -->
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <p @click="gotolink2" >教师评价</p>
                                <!-- <router-link :to="{name:'teacherManager_getViews'}">教师评价</router-link> -->
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
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
      msg: '教师管理子页面'
    }
  },
  methods: {
    gotolink1 () {
      // 点击跳转至上次浏览页面
      // this.$router.go(-1)
      // 指定跳转地址
      this.$router.replace('teacherCourse')
    },
    gotolink2 () {
      // 点击跳转至上次浏览页面
      // this.$router.go(-1)
      // 指定跳转地址
      this.$router.replace('getViews')
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
