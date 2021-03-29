<template>
  <el-container>
    <el-main>
      <div class="head">
        <p>筛 选 查 询</p>
      </div>
      <el-form :inline="true" :model="form" class="fromer">
        <el-select v-model="form.deptId" placeholder="请选择系别">
          <el-option
            v-for="item in deptList"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId">
          </el-option>
        </el-select>

        <el-select v-model="form.termId" placeholder="请选择学期">
          <el-option
            v-for="item in termsList"
            :key="item.termId"
            :label="item.termName"
            :value="item.termId">
          </el-option>
        </el-select>
        <el-button type="primary" class="search_bottoner" plain @click="get()">查 询</el-button>
      </el-form>

      <div class="head" style="margin-top: 50px; margin-bottom: 30px">
        <p>课程详情</p>
      </div>

      <el-table
        :data="TCList"
        v-loading="loading"
        border
        :style="{ width: tr }">
        <el-table-column
          prop="courseName"
          label="课程名称"
          align="center"
          :width="tr / n">
        </el-table-column>
        <el-table-column
          prop="courseNo"
          label="课程编号"
          align="center"
          :width="tr / n">
        </el-table-column>
        <el-table-column
          prop="teacherName"
          label="任课教师"
          align="center"
          :width="tr / n">
        </el-table-column>
        <el-table-column
          align="center"
          prop="teacherNo"
          label="任课教师编号"
          :width="tr / n">
        </el-table-column>
        <el-table-column
          align="center"
          prop="termId"
          label="课程学期"
          :width="tr / n">
        </el-table-column>
        <el-table-column
          align="center"
          prop="credit"
          label="课程学分"
          :width="tr / n">
        </el-table-column>

        <el-table-column
          align="center"
          prop="courseHour"
          label="课程总学时"
          :width="tr / n">
        </el-table-column>
        <el-table-column
          label="学生评价结果"
          align="center"
          :width="tr / n">
          <template slot-scope="scope">
            <el-button
              class="el-icon-zoom-in"

              @click="
                more(
                  scope.row.tcId,
                  scope.row.courseName,
                  scope.row.teacherName
                )">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br /><br />
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        style="text-align: center"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
export default {
  //  查看所有评价结果
  name: 'ViewStudentEvaluationResults',
  components: {},
  data () {
    return {
      loading: null,
      tr: '1250px',
      n: 5,
      currentPage: 1,
      totalCount: 1,
      pageSizes: [10, 20, 50, 100],
      PageSize: 5,
      deptList: [
        {
          deptId: '',
          deptName: ''
        }
      ],
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
      TCList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    more (tcId, courseName, teacherName) {
      this.$router.push({
        name: 'ViewStudentEvaluationResultsDetails',
        params: {
          tcId: tcId,
          courseName: courseName,
          teacherName: teacherName
        }
      })
    },
    async getTerms () {
      this.loading = true
      this.termsList = []
      const res = await this.$http.post('/getTerms').then(res => {
        if (res.data.resultCode === 1) {
          this.termsList = res.data.data
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
    handleSizeChange (val) {
      this.PageSize = val
      this.get()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.get()
    }
  }
}
</script>

<style scoped lang='less'>
.fromer {
  margin-top: 20px;
}
.input_searcher {
  width: 220px;
}
.search_bottoner {
  display: inline;
  width: 150px;
  margin-left: 40px;
}
.head {
  height: 50px;
  background: #f3f3f3;
  border: 1px #d9d9d9 solid;
  font-weight: bold;
  color: #666666;
  text-align: center;
}
</style>
