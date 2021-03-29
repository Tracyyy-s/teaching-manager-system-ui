<template>
  <el-container>
    <el-col :xs="{ span:20, offset:2 }" :sm="{ span:18, offset:3 }" :md="{ span:16, offset:4 }" :lg="{ span:18, offset:3 }" :xl="{ span:22, offset:1 }">
    <el-main>
      <br>
      <MyUpload></MyUpload>
      <div class="head" style="margin-top: 50px">
        <p style="text-align: center">筛 选 查 询</p>
      </div>
      <div class="head2">
        <el-form :inline="true" :model="form" class="fromer">
          <el-select v-model="form.deptId" style="top: 15px" placeholder="学院">
            <el-option
              v-for="item in deptList"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId">
            </el-option>
          </el-select>

          <el-select v-model="form.termId" style="top: 15px" placeholder="学期">
            <el-option
              v-for="item in termsList"
              :key="item.termId"
              :label="item.termName"
              :value="item.termId">
            </el-option>
          </el-select>
          <el-input v-model="input" size="small" placeholder="输入课程号进行查询" style="width: 220px; top: 15px"></el-input>
          <el-button type="primary" class="search_bottoner" plain @click="get()">查 询</el-button>
        </el-form>
        <el-alert
          title="查询结果实时显示"
          type="info"
          center
          style="margin-top: 40px"
          show-icon>
        </el-alert>
      </div>
      <div class="head" style="margin-top: 100px">
        <p style="text-align: center">课 程 列 表</p>
      </div>
      <br>
      <el-table
        :data="filterTCList"
        stripe
        style="width: 1050px">
        <el-table-column label="课程编号" width="150">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <p size="medium">{{ scope.row.courseNo }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" width="150">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.courseName }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="教师名称" width="150">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <p size="medium">{{ scope.row.teacherName }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学期" width="150">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <p size="medium">{{ scope.row.termId }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="开始周" width="100">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <p size="medium">{{ scope.row.beginWeek }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="结束周" width="100">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <p size="medium">{{ scope.row.endWeek }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学时" width="100">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <p size="medium">{{ scope.row.courseHour }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="其它" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogFormVisible">
        <div slot="title">
          <i class="el-icon-document"></i>
          <span>查看课程信息</span>
        </div>
        <div style="margin-left: 200px">
          <p>课程唯一编号：&nbsp&nbsp&nbsp{{ courseTcId }}</p>
          <p>教师编号：&nbsp&nbsp&nbsp{{ teaNo }}</p>
          <p>上课地址：&nbsp&nbsp&nbsp{{ courseAddress }}</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button
            size="small"
            plain
            icon="el-icon-close"
            @click="dialogFormVisible = false">返 回</el-button>
        </div>
      </el-dialog>
      <br>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        style="text-align: center"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"/>
    </el-main>
    </el-col>
  </el-container>
</template>

<script>
import MyUpload from '@/components/adminComponents/upload/TimeTableUpload.vue'

let select1 = [
  { value: '110', label: '计算机科学学院' },
  { value: '111', label: '经济与管理学院' },
  { value: '112', label: '地理与资源学院' },
  { value: '113', label: '文学院' },
  { value: '114', label: '商学院' }
]

let allrole = [
  { value: '11001', pro: '110', label: '计算机科学与技术' }, { value: '11002', pro: '110', label: '网络工程'}, { value: '11003', pro: '110', label: '软件工程'}, { value: '11004', pro: '110', label: '电子商务' }, { value: '11005', pro: '110', label: '教育技术' },
  { value: '11101', pro: '111', label: '经济学' }, { value: '11102', pro: '111', label: '工商管理' }, { value: '11103', pro: '111', label: '国际经济与贸易专业' },
  { value: '11201', pro: '112', label: '地理科学' }, { value: '11202', pro: '112', label: '自然地理与资源环境' }, { value: '11203', pro: '112', label: '人文地理与城乡规划' },
  { value: '11301', pro: '113', label: '汉语言文学' },
  { value: '11401', pro: '114', label: '审计学'}, { pro: '114', label: '财务管理' }
]

export default {
  name: 'TimetableImporting',
  components: {
    MyUpload
  },
  data () {
    return {
      currentPage: 1,
      totalCount: 1,
      pageSizes: [5, 10, 20, 50, 100],
      PageSize: 5,
      value: '',
      college: this.$store.state.deptId,
      select1: select1,
      select2: [],
      roles: [],
      savedList: [],
      input: '',
      major: '',
      dialogFormVisible: false,
      courseTcId: '',
      courseAddress: '',
      credit: '',
      teaNo: '',
      termsList: [
        {
          beginDate: '',
          endDate: '',
          termId: '',
          termName: ''
        }
      ],
      form: {
        deptId: '',
        termId: ''
      },
      deptList: [
        {
          deptId: '',
          deptName: ''
        }
      ],
      timetables: [
        {
          courseNo: '',
          courseName: '',
          teacherNo: '',
          teacherName: '',
          termId: '',
          address: '',
          credit: '',
          courseHour: '',
          beginWeek: '',
          endWeek: '',
          tcId: ''
        }
      ],
      TCList: []
    }
  },

  created () {
    // 获取当前用户管理学院
    this.$http.post('admin/getDeptsOfUser', {
      userId: this.$cookies.get('account')
    }).then(res => {
      this.manageList = res.data.data
      for (var i = 0; i < this.select1.length; i++) {
        for (var j = 0; j < this.manageList.length; j++) {
          if (this.select1[i].value === this.manageList[j].deptId) {
            this.savedList.push({ 'value': this.select1[i].value, 'label': this.select1[i].label })
          }
        }
      }
    })
    this.init()
  },

  computed: {
    filterTCList () {
      // 取出相关数据
      const { input, TCList } = this
      // 最终需要显示的数组
      let tc
      // 对timetables进行过滤
      tc = TCList.filter(p => p.courseNo.indexOf(this.input) >= 0)
      return tc
    }
  },

  methods: {
    get () {
      this.loading = true
      if (this.form.deptId === '' || this.form.termId === '') {
        this.$message({
          showClose: true,
          message: '未获取到查询参数（学期和学院）',
          type: 'warning'
        })
        return
      }
      this.$http.post('admin/getCoursesOfDeptInTerm', {
        pageNum: this.currentPage,
        pageSize: this.PageSize,
        deptId: this.form.deptId,
        termId: this.form.termId
      }).then(res => {
        // 待删除
        if (res.data.resultCode === 1) {
          this.TCList = res.data.data
          this.totalCount = res.data.data.length
        } else {
          this.TCList = []
          this.totalCount = 0
          this.$message({
            showClose: true,
            message: '没有查询到获取到课程列表，该学期没有课程列表' +
              '(' +
              res.data.data +
              ')',
            type: 'warning'
          })
        }
      }).catch(res => {
        this.loading = false
        alert('服务器出错了')
      })
      this.loading = false
    },
    async getTerms () {
      this.loading = true
      this.termsList = []
      const res = await this.$http.post('/getTerms').then(res => {
        if (res.data.resultCode === 1) {
          this.termsList = res.data.data
          console.log(this.termsList)
        } else {
          this.$message({
            showClose: true,
            message: '获取可管理学期列表失败，后台繁忙' + '(' + res.data.data + ')',
            type: 'warning'
          })
        }
      })
      this.loading = false
      this.form.termId = this.termsList[0].termId
    },
    async getDept () {
      this.loading = true
      this.deptList = []
      const res = await this.$http.post('admin/getDeptsOfUser', {

      }).then(res => {
        if (res.data.resultCode === 1) {
          this.deptList = res.data.data
        } else {
          this.$message({
            showClose: true,
            message:
              '获取可管理系列表失败，后台繁忙' + '(' + res.data.data + ')',
            type: 'warning'
          })
        }
      })
      this.loading = false
      this.form.deptId = this.deptList[0].deptId
    },
    async init () {
      await this.getDept()
      await this.getTerms()
      await this.get()
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.get()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.get()
    },
    handleClick (index, row) {
      this.courseTcId = this.TCList[index].tcId
      this.courseAddress = this.TCList[index].address
      this.teaNo = this.TCList[index].teacherNo
      this.dialogFormVisible = true
      // console.log(row)
    }
  }
}
</script>

<style scoped>
  .head {
    margin-top: 120px;
    height: 50px;
    background: #f3f3f3;
    border: 1px #d9d9d9 solid;
    font-weight: bold;
    color: #666666;
  }
  .head2 {
    height: 72px;
  }
  .search_bottoner {
    display: inline;
    width: 150px;
    margin-left: 40px;
  }
</style>
