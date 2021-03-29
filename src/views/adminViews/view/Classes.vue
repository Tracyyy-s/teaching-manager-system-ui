<template>
  <el-container>

    <el-main>
      <div class="head">
        <p>授课详情</p>
      </div>
      <el-table :data="tableList" border :style="{ width: tr }">
        <el-table-column
          prop="course_name"
          label="课程名称"
          align="center"
          :width="tr / n"
        >
        </el-table-column>
        <el-table-column
          prop="tc_id"
          label="教师-课程编号"
          align="center"
          :width="tr / n"
        >
        </el-table-column>
        <el-table-column
          prop="studentAppraiseScore"
          label="学生评价总分"
          align="center"
          :width="tr / n"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="studentNum"
          label="评价学生总人数"
          :width="tr / n"
        >
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
        :total="totalCount"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
export default {
  //  查看所有评价结果
  name: 'ViewAllEvaluationResults',
  components: {},
  data () {
    return {
      currentPage: 1,
      totalCount: 1,
      pageSizes: [5, 10, 20, 50, 100],
      PageSize: 5,
      tr: '1250px',
      n: 5,
      tableList: []
    }
  },
  created () {
    this.tableList = this.$route.params.classes
    for (var i = 0; i <= this.tableList.length; i++) {
      if (typeof (this.tableList[i].studentAppraiseScore) === 'undefined') {
        this.tableList[i].studentAppraiseScore = '' + '未评价过'
      }
    }
    if (typeof this.tableList === 'undefined') {
      this.$router.push('/viewAllEvaluationResults')
    }
  },

  methods: {
    handleSizeChange (val) {
      this.PageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
  }
}
</script>

<style scoped lang='less'>
.fromer {
  margin-top: -20px;
  margin-bottom: 20px;
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
  text-align: center;
  margin-top: 1px;
  margin-bottom: 40px;
  width: 1200px;
  height: 50px;
  background: #f3f3f3;
  border: 1px #d9d9d9 solid;
  font-weight: bold;
  color: #666666;
}

</style>
