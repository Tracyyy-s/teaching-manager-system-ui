<template>
  <div>
    <el-menu
     :default-active="activeIndex"
     class="el-menu-demo"
     active-text-color="#ffd04b"
     mode="horizontal"
     @select="handleSelect"
     >
      <!-- 课程 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          教师功能
        </template>
        <el-menu-item index="1-1" @click="teacherSchedule">
          我的课程
        </el-menu-item>
        <el-menu-item index="1-2" @click="teacherEvaluation">
          教师互评
        </el-menu-item>
      </el-submenu>
      <!-- 设置 -->
      <el-submenu  index="2" >
        <template slot="title">
            <i class="el-icon-setting"></i>
            设置
          </template>
        <el-menu-item index="2-1" @click="teacherInfo" >
          我的信息
        </el-menu-item>
        <el-menu-item index="2-2" @click="teacherCard">
          资料卡片
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    teacherSchedule () {
      this.$router.replace('/teacherSchedule')
    },
    teacherEvaluation () {
      this.$router.replace('/teacherEvaluation')
    },
    teacherInfo () {
      this.$router.replace('/teacherInfo')
    },
    teacherCard () {
      this.$router.replace('/teacherCard')
    }
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: bold;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
