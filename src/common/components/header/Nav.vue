<template>
  <div>
    <!-- student -->
    <el-menu
      v-loading="loading"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      style="font-weight: bold; color: #666666"
      @select="handleSelect">
      <el-menu-item index="1" v-if="menuIf.Evaluation" @click="to('/Evaluation')">
        <i class="el-icon-edit"></i>
        <span>评价教师</span>
      </el-menu-item>

      <el-submenu v-if="menuIf.studentSchedule" index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>学生课表</span>
        </template>
        <el-menu-item :key="value.termId" v-for="(value, i) in list" :index="'2-' + (i + 1)" @click="to('/Schedule/' + value.termId)">{{ value.termName }}
        </el-menu-item>
      </el-submenu>
      <el-submenu v-if="admin1" index="5">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>导入信息</span>
        </template>
        <el-menu-item v-if="menuIf.studentListImporting" index="5-1" @click="to('/studentListImporting')">
          <template slot="title">导入学生名单</template>
        </el-menu-item>
        <el-menu-item v-if="menuIf.timetableImporting" index="5-2" @click="to('/timetableImporting')">
          <template slot="title">导入课表</template>
        </el-menu-item>

        <el-menu-item v-if="menuIf.teacherListImporting" index="5-3" @click="to('/teacherListImporting')">
          <template slot="title">导入教师名单</template>
        </el-menu-item>
      </el-submenu>

      <el-submenu v-if="admin2" index="6">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>管理信息</span>
        </template>

        <el-menu-item v-if="menuIf.viewAllEvaluationResults" index="6-1" @click="to('/viewEvaluation')">
          <template slot="title">查看评价结果</template>
        </el-menu-item>
        <el-menu-item v-if="menuIf.releaseStudentComments" index="6-2" @click="to('/releaseStudentComments')">
          <template slot="title">发布学生评价指标</template>
        </el-menu-item>
        <el-menu-item v-if="menuIf.releaseTeacherComments" index="6-3" @click="to('/releaseTeacherComments')">
          <template slot="title">发布教师评价指标</template>
        </el-menu-item>
        <!-- menuIf.releaseComments -->
        <el-menu-item v-if="false" index="6-4" @click="to('/releaseComments')">
          <template slot="title">发布评价</template>
        </el-menu-item>

        <!-- v-if="menuIf.teacherFileManagement" -->
        <el-menu-item v-if="false" index="6-5" @click="to('/releaseComments')">
          <template slot="title">管理教师档案</template>
        </el-menu-item>
      </el-submenu>

      <!-- teacher -->
      <el-submenu v-if="teacher" index="8">
        <template slot="title">
          <i class="el-icon-share"></i>
          <span>教师功能</span>
        </template>
        <el-menu-item v-if="menuIf.teacherSchedule" index="8-1" @click="to('/teacherSchedule')">
          <span>查看教师课表</span>
        </el-menu-item>
        <el-menu-item v-if="menuIf.teacherEvaluation" index="8-2" @click="to('/teacherEvaluation')">
          <span>教师互评</span>
        </el-menu-item>
      </el-submenu>

      <!-- root -->
      <el-submenu v-if="root1" index="10">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>用户管理</span>
        </template>

        <el-menu-item v-if="menuIf.user_role_list" index="10-1" @click="to('/user_role_list')">
          <span>用户列表</span>
        </el-menu-item>

        <el-menu-item v-if="menuIf.Log" index="10-2" @click="to('/Log')">
          <span>用户操作日志</span>
        </el-menu-item>

        <!-- <el-menu-item index="10-2" @click="to('/studentImporting') @click="user_add">
          添加
        </el-menu-item> -->
      </el-submenu>

      <!-- 角色与限权的管理 -->
      <el-submenu v-if="root2" index="11">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>角色管理</span>
        </template>
        <el-menu-item v-if="menuIf.role_permission_modify" index="11-1" @click="to('/role_permission_modify')">
          <span>角色限权管理</span>
        </el-menu-item>
      </el-submenu>

      <!-- 设置 -->
      <el-submenu v-if="info" index="9">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </template>
        <el-menu-item v-if="menuIf.teacherCard" index="9-2" @click="to('/teacherCard')">
          <span>资料卡片</span>
        </el-menu-item>

        <el-menu-item v-if="menuIf.studentInfo" index="9-2" @click="to('/studentInfo')">
          <span>学生信息</span>
        </el-menu-item>
      </el-submenu>

      <div style="float: right; width: 50px; height: 50px; margin: 5px;">
        <el-avatar :src="randImg()"></el-avatar>
      </div>

    </el-menu>

    <!-- router -->
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'Nav',
  created () {
    this.getMenuList()
    // this.getStudentTermsList()
  },
  watch: {
    'menuIf.studentSchedule': {
      handler (newVal, oldVal) {
        // console.log(this.$cookies.get('account'))
        this.getStudentTermsList()
      }
    }
  },
  data () {
    return {

      loading: null,
      termMap: {},
      // student菜单要保存的
      list: [],
      // 活跃的菜单栏项目
      activeIndex: '0',
      // 总菜单
      allMenuNameList: [],
      allMenuUrlList: [],
      // 我拥有过的菜单
      menuList: [],
      // 非法路由
      // illegalMenu:[],
      // 菜单显示选项

      // 下面是表头
      teacher: false,
      admin1: false,
      admin2: false,
      root1: false,
      root2: false,
      info: true,
      // 下面是表头的子菜单
      menuIf: {
        // sutdent
        Evaluation: false,
        studentInfo: false,
        studentSchedule: false,
        // admin1
        studentListImporting: false,

        timetableImporting: false,
        teacherListImporting: false,

        // admin2
        teacherFileManagement: false,
        viewAllEvaluationResults: false,
        releaseStudentComments: false,
        releaseTeacherComments: false,
        releaseComments: false,
        // teacher // leader
        teacherSchedule: false,
        teacherEvaluation: false,
        // root1
        user_role_list: false,
        Log: false,
        // root2
        role_permission_modify: false,

        // info
        // studentInfo: false,
        teacherCard: false
      }
    }
  },

  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    // 检查路由函数
    checkPath () {
      // 拿到非法路径
      var illegalMenu = []
      // console.log('打印全部菜单')
      // console.log(this.allMenuUrlList)
      // console.log('打印可用菜单')
      // console.log(this.menuList)
      for (var j = 0; j < this.allMenuUrlList.length; j++) {
        var flag = 0
        for (var i = 0; i < this.menuList.length; i++) {
          var key = this.menuList[i].permissionUrl
          if (this.allMenuUrlList[j].permissionUrl === key) {
            flag = 1
            break
          }
        }
        if (flag === 0) {
          illegalMenu.push(this.allMenuUrlList[j])
        }
      }
      // 打印非法路由
      // console.log('打印非法链接')
      // console.log(illegalMenu)
      // 查看当前路径是否在非法路径内
      for (var i = 0; i < illegalMenu.length; i++) {
        if ('/' + illegalMenu[i].permissionUrl === this.$route.path) {
          this.$message({
            showClose: true,
            message: '您没有限权访问该页面，请联系管理员',
            type: 'warning'
          })
          this.$router.push('/index')
          return true
        }
      }
    },

    // 获取菜单，并进行逻辑处理
    async getMenuList () {
      // 获取vuex内所有菜单
      this.loading = true
      this.allMenuNameList = store.state.allMenuNameList
      this.allMenuUrlList = store.state.allMenuUrlList
      await this.$http
        .post(
          '/getUserPermissions', {
            account: this.$cookies.get('account')
          }
          // 获取可以展示的菜单
        )
        .then((res) => {
          if (res.data.resultCode === 1) {
            for (var i = 0; i < res.data.data.length; i++) {
              this.menuList.push(res.data.data[i])
            }
          } else {
            this.$message({
              showClose: true,
              message: '获取菜单，后台繁忙。' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          this.loading = false
          // console.log(res.data)
          alert('服务器出错了')
          sessionStorage.removeItem('token')
          this.$router.push('/')
        })
        // 改变所有子菜单v-if
      for (var i = 0; i < this.menuList.length; i++) {
        var key = this.menuList[i].permissionUrl
        this.menuIf[key] = true
      }
      if (
        this.menuIf.studentListImporting ||
          this.menuIf.timetableImporting ||
          this.menuIf.teacherListImporting
      ) {
        this.admin1 = true
      }

      if (
      // this.menuIf.teacherFileManagement ||
      // || this.menuIf.releaseComments
        this.menuIf.viewAllEvaluationResults ||
          this.menuIf.releaseStudentComments ||
          this.menuIf.releaseTeacherComments
      ) {
        this.admin2 = true
      }
      // teacher
      if (this.menuIf.teacherSchedule || this.menuIf.teacherEvaluation) {
        this.teacher = true
      }
      if (this.menuIf.user_role_list || this.menuIf.Log) {
        this.root1 = true
      }
      if (this.menuIf.role_permission_modify) {
        this.root2 = true
      }
      if (this.menuIf.studentInfo || this.menuIf.teacherCard) {
        this.info = true
      }
      this.loading = false
      this.checkPath()
    },
    // student获取学期子菜单
    getStudentTermsList () {
      // console.log('jessica_getTerm')
      let _this = this
      _this.$http
        .post('/getTerms', {})
        .then((res) => {
          // console.log('getTerm')
          // console.log(res.data.data)
          // _this.list = res.data.data
          for (var i = 0; i < res.data.data.length; i++) {
            _this.$set(
              _this.termMap,
              res.data.data[i].termId,
              res.data.data[i].termName
            )
            let tmp = res.data.data[i].termId
            _this.$http.post('/student/getTermCourses', {
              'studentNo': _this.$cookies.get('account'),
              'termId': res.data.data[i].termId
            }).then((res) => {
              // console.log(res)
              if (res.data.resultCode === 1) {
                _this.list.push({
                  termId: tmp,
                  termName: _this.termMap[tmp]
                })
                // console.log('jessica')
                // console.log(_this.list)
              }
            })
          }
        })
    },

    // 路由跳转
    to (url) {
      this.$router.push(url)
    },

    // 随机头像
    randImg () {
      // /src/assets/img/userImg/x.jpg
      // math.random:0~1 math.round：化整数
      // var i = Math.round(Math.random() * 1)
      return require('@/assets/img/userImg/' + 0 + '.jpg')
    }
  }
}
</script>

<style>
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  h1,
  h2 {
    font-weight: normal;
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

  .el-menu-demo span {
    font-size: 16px;
  }
</style>
