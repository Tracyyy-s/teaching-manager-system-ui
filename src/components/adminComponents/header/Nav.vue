<template>
  <div>
    <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect" text-color="#666666">
      <el-menu-item index="1" @click="adminIndex">
        <i class="el-icon-user"></i>
        首页
      </el-menu-item>

      <el-menu-item index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>导入信息</span>
        </template>
        <el-submenu index="2">
          <el-menu-item index="2-1" @click="studentImporting">
            <template slot="title">导入学生名单</template>
          </el-menu-item>
          <el-menu-item index="2-2" @click="timetableImporting">
            <template slot="title">导入课表</template>
          </el-menu-item>
          <el-menu-item index="2-3" @click="teacherImporting">
            <template slot="title">导入教师名单</template>
          </el-menu-item>
        </el-submenu>
      </el-menu-item>

      <el-menu-item index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>管理信息</span>
        </template>
        <el-submenu index="3">
          <el-menu-item index="3-1" @click="teacherFileManagement">
            <template slot="title">管理教师档案</template>
          </el-menu-item>
          <el-menu-item index="3-2" @click="viewAllEvaluationResults">
            <template slot="title">查看所有评价结果</template>
          </el-menu-item>
          <el-menu-item index="3-3" @click="modifyEvaluationForm">
            <template slot="title">修改评价表的信息</template>
          </el-menu-item>
        </el-submenu>
      </el-menu-item>

      <el-menu-item index="4" @click="set">
        <i class="el-icon-setting"></i>
        设置
      </el-menu-item>
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
  created () {
    if (this.$route.path === '/adminSet') {
      this.activeIndex = '4'
    } else if (this.$route.path === '/teacherFileManagement' || this.$route.path === '/viewAllEvaluationResults' || this.$route.path === '/modifyEvaluationForm') {
      this.activeIndex = '3'
    } else if (this.$route.path === '/studentImporting' || this.$route.path === '/timetableImporting' || this.$route.path === '/teacherImporting') {
      this.activeIndex = '2'
    } else if (this.$route.path === 'adminIndex') {
      this.activeIndex = '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    adminIndex () {
      this.$router.replace('/adminIndex')
    },
    studentImporting () {
      this.$router.replace('/studentListImporting')
    },
    timetableImporting () {
      this.$router.replace('/timetableImporting')
    },
    teacherImporting () {
      this.$router.replace('/teacherListImporting')
    },
    teacherFileManagement () {
      this.$router.replace('teacherFileManagement')
    },
    viewAllEvaluationResults () {
      this.$router.replace('viewAllEvaluationResults')
    },
    modifyEvaluationForm () {
      this.$router.replace('/modifyEvaluationForm')
    },
    set () {
      this.$router.replace('/adminSet')
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
