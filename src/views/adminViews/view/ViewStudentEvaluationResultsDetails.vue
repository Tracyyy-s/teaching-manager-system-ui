<template>
  <el-container>
    <el-main>
      <div class="head" style="margin-top: 0px; margin-bottom: 30px">
        <p>教师名:{{ teacherName }} / 课程名: {{ courseName }}</p>
      </div>
      <el-table :data="evaluationList" border :style="{ width: tr }">
        <el-table-column label="课程号" align="center">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.tcId }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="班号" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.classId }}</p>
          </template>
        </el-table-column>
        <el-table-column label="学号" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.studentNo }}</p>
          </template>
        </el-table-column>
        <el-table-column label="学生姓名" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.studentName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="评价得分" align="center">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.appraiseScore }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="评价内容" align="center">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.appraiseContent }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <br /><br />
      <el-pagination
        v-show="Btn"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        style="text-align: center"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">

      </el-pagination>
      <el-button
      class="BtnQ"
        v-show="Btn"
       type="primary"
       @click="quit"
       plain>
       返 回
      </el-button>
    </el-main>
  </el-container>
</template>

<script>
export default {
  //  查看所有评价结果
  name: 'ViewStudentEvaluationResultsDetails',
  components: {},
  data () {
    return {
      Btn: null,
      tr: '1250px',
      tcId: '',
      courseName: '',
      teacherName: '',
      currentPage: 1,
      totalCount: 1,
      pageSizes: [5, 10, 20, 50, 100],
      PageSize: 5,
      evaluationList: []
    }
  },
  async created () {
    this.tcId = this.$route.params.tcId
    this.courseName = this.$route.params.courseName
    this.teacherName = this.$route.params.teacherName
    await this.get()
  },
  methods: {
    quit () {
      this.$router.push('/viewStudentEvaluationResults')
    },
    get () {
      this.$http
        .post('admin/getStudentAssessesByTcId', {
          pageNum: this.currentPage,
          pageSize: this.PageSize,
          tcId: this.tcId
        })
        .then(res => {
          if (res.data.resultCode === 1) {
            this.evaluationList = res.data.data
            this.totalCount = res.data.data.length
          } else {
            this.Btn = true
            this.$message({
              showClose: true,
              message: '该门课程没有学生进行评价过',
              type: 'warning'
            })
            // this.$router.push('/viewStudentEvaluationResults')
          }
        })
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
  .BtnQ{
    float:right;
  }

</style>
