<template>
  <div>
    <div v-show="!loading">
      <el-divider content-position="left">评教完成进度</el-divider>
      <el-progress v-show="!loading" :percentage="parseFloat(epercentage.toFixed(2))" status="success" :format="format" :text-inside="true" :stroke-width="26"></el-progress>
      <el-divider v-show="!loading"></el-divider>
    </div>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)
      "
      v-loading="loading"
      stripe
      class="mytable"
      :header-cell-style="headClass"
      :cell-style="rowClass"
      style="width: 100%"
      :row-style="{ height: '80px' }"
    >
      <!--      header-row-style="height:400px"-->
      <!--      row-style="height:400px"-->
      <!--      v-if="!(JSON.parse(JSON.stringify(this.$store.state.termMap)) === {})"-->
      <!--      >-->
      <el-table-column prop="id" label="课程编号" > </el-table-column>
      <el-table-column prop="cname" label="课程名" :render-header="renderHeader_cname"> </el-table-column>
      <el-table-column prop="date" label="课程日期" :render-header="renderHeader_date"> </el-table-column>
      <el-table-column prop="tname" label="授课教师" :render-header="renderHeader_tname"> </el-table-column>
      <el-table-column label="评价" :render-header="renderHeader_evaluation">
        <template slot-scope="scope">
          <el-button
            type="info"
            plain
            @click="to(scope.row.id)"
            v-if="!scope.row.assessed"
          >
            进行评价
          </el-button>
          <el-button
            type="info"
            plain
            @click="to(scope.row.id)"
            disabled
            v-if="scope.row.assessed"
          >
            已评价
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="!loading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'EvaluationList',
  data () {
    return {
      loading: true,
      termId: '',
      tableData: [],
      assessed: 0,
      sum: 0,
      epercentage: 0,
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [5, 10],
      // 默认每页显示的条数（可修改）
      PageSize: 5
    }
  },
  created () {
    if (this.$store.state.evaluation_now) {
      this.getlist()
    }
  },
  watch: {
    'assessed': {
      handler (newVal, oldVal) {
        // console.log('assessed', this.assessed)
        // console.log('sum', this.sum)
        this.epercentage = this.assessed / this.sum * 100
      }
    },
    '$store.state.evaluation_now': function () {
      if (this.$store.state.evaluation_now) {
        // console.log('getList')
        this.getlist()
      }
    }
  },
  methods: {
    // 添加表单表头的icon
    // render 事件
    renderHeader_cname (h, {column}) { // h即为cerateElement的简写，具体可看vue官方文档
      return h(
        'div', [
          h('i', {
            class: 'al-iconfont ali-iconnamecard'
            // style: 'color:#409eff;margin-left:5px;'
          }),
          h('span', ' ' + column.label)
        ]
        // class="al-iconfont">&#xe61e;
      )
    },
    renderHeader_evaluation (h, {column}) { // h即为cerateElement的简写，具体可看vue官方文档
      return h(
        'div', [
          h('i', {
            class: 'el-icon-s-check'
            // style: 'color:#409eff;margin-left:5px;'
          }),
          h('span', ' ' + column.label)
        ]
        // class="al-iconfont">&#xe61e;
      )
    },
    renderHeader_tname (h, {column}) { // h即为cerateElement的简写，具体可看vue官方文档
      return h(
        'div', [
          h('i', {
            class: 'el-icon-s-custom'
            // style: 'color:#409eff;margin-left:5px;'
          }),
          h('span', ' ' + column.label)
        ]
        // class="al-iconfont">&#xe61e;
      )
    },
    renderHeader_date (h, {column}) { // h即为cerateElement的简写，具体可看vue官方文档
      return h(
        'div', [
          h('i', {
            class: 'al-iconfont ali-iconriqi2'
            // style: 'color:#409eff;margin-left:5px;'
          }),
          h('span', ' ' + column.label)
        ]
        // class="al-iconfont">&#xe61e;
      )
    },
    // getHref (val) {
    //   // console.log('/EvaluationDetail?courseNo=' + val)
    //   return '/EvaluationDetail?tcId=' + val
    // },
    to (url) {
      this.$router.push('/EvaluationDetail?tcId=' + url)
    },
    // 表头样式设置
    headClass () {
      return 'text-align: center;background:#eef1f6;'
    },
    // 表格样式设置
    rowClass () {
      return 'text-align: center;'
    },
    format (percentage) {
      return percentage === 100 ? '已完成所有评教' : `${percentage}%`
    },
    getlist () {
      this.loading = true
      let _this = this
      _this.$http.post('/getCurrentTerm').then((res) => {
        // console.log(res.data.data)
        _this.termId = res.data.data.termId
        // console.log(_this.termId)
        _this.$http
          .post('/student/getTermCourses', {
            studentNo: _this.$cookies.get('account'),
            // 'termId': '2020-2021-1'
            termId: _this.termId
          })
          .then((res) => {
            // console.log(typeof _this.termId)
            // console.log(_this.termId)
            // console.log(res)
            this.totalCount = res.data.data.length
            for (var i = 0; i < res.data.data.length; i++) {
              // console.log(res.data.data[i])
              // console.log(res.data.data[i].courseNo)
              // console.log(res.data.data[i].courseName)
              // // console.log(res.data.data[i].termId)
              // // console.log(JSON.parse(JSON.stringify(_this.$store.state.termMap)))
              // let tmp = JSON.parse(JSON.stringify(_this.$store.state.termMap))
              // console.log(tmp[res.data.data[i].termId])
              // console.log('第' + res.data.data[i].beginWeek + '周到第' + res.data.data[i].endWeek + '周')
              // console.log(res.data.data[i].teacherName)
              // // console.log(_this.$store.state.termMap[res.data.data[i].termId])
              _this.tableData.push({
                id: res.data.data[i].tcId,
                date: '第' + res.data.data[i].beginWeek + '周到第' + res.data.data[i].endWeek + '周',
                cname: res.data.data[i].courseName,
                tname: res.data.data[i].teacherName,
                assessed: res.data.data[i].assessed
              })
              if (res.data.data[i].assessed) {
                _this.assessed = _this.assessed + 1
              }
              _this.sum = _this.sum + 1
              // console.log(res.data.data[i].assessed)
            }
            _this.loading = false
            // console.log('jessica')
          })
      })
    },
    // 每页显示的条数
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange (val) {
      // 改变默认的页数
      this.currentPage = val
    }
  }
}
</script>

<style scoped>
  a:link {
    text-decoration: none;
    color: black;
  }
  a:visited {
    text-decoration: none;
    color: black;
  }
  button {
    width: 98px;
  }
  .el-pagination {
    text-align: center;
  }
  progress{
    width: 50%;
    height: 10px;
    /*color:#f00;*/
    /*background:#EFEFF4;     !* 表示总长度背景色 *!*/
  }
</style>
