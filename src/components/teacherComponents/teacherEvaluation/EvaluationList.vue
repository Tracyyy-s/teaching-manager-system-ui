<template>
  <div>
    <div style="
        border-radius: 90px;
        width: 1000px;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        font-size: 17px;
        font-weight: bold;
        background-color: #f3f3f3;
        color: #666666;
        text-align: center;

      ">
      评 价
    </div>

    <el-divider v-show="!loading" content-position="center">评教完成进度</el-divider>
    <div style="text-align: center;">
      <el-progress v-show="!loading" type="circle" :percentage="epercentage"></el-progress>
    </div>
    <el-divider v-show="!loading"></el-divider>

    <!-- -->
    <el-table :data="tableData" stripe class="mytable" style="width: 100%" :row-style="{ height: '80px' }">
      <!--      header-row-style="height:400px"-->
      <!--      row-style="height:400px"-->
      <!--      v-if="!(JSON.parse(JSON.stringify(this.$store.state.termMap)) === {})"-->
      <!--      >-->
      <!-- <el-table-column
        prop="id"
        label="教师编号"
      >
      </el-table-column> -->

      <el-table-column prop="class" label="教师编号" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.id }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="deptName" label="学院名称"> </el-table-column>
      <el-table-column prop="professionalTime" label="任教时间">
      </el-table-column>
      <el-table-column prop="sumHour" label="累计学时"> </el-table-column>
      <el-table-column prop="username" label="教师名称"> </el-table-column>
      <el-table-column>
        <!-- <template slot-scope="scope">
          <el-button type="info" plain>
            <a :href="getHref(scope.row.id)"> 进行评价 </a>
          </el-button>
        </template> -->

        <template slot-scope="scope">
          <el-button type="primary" plain v-if="!scope.row.assessed">
            <a :href="getHref(scope.row.id)" style="color: dodgerblue">
              进行评价
            </a>
          </el-button>

          <el-button type="info" plain disabled v-if="scope.row.assessed">
            <a> 已评价 </a>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <!-- 上方弹出查看历史评价 -->
    <el-badge :value="this.count" class="item" type="primary">
      <el-button @click="drawer = true" type="primary" style="margin-left: 500px" direction="ttb">
        历史评价
      </el-button>
    </el-badge>

    <el-drawer :visible.sync="drawer" :direction="direction" :size="number" :with-header="false" >
      <!-- <span>评价历史</span> -->
      <div style="
          border-radius: 90px;
          width: 1100px;
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          font-size: 17px;
          font-weight: bold;
          background-color: #f3f3f3;
          color: #666666;
          text-align: center;
        ">
        历史评价
      </div>
      <template>
        <el-table :data="tableData2" stripe style="width: 100%; height: 300px; overflow-y: scroll;">
          <!-- <el-table-column prop="assessedTeacherNo" label="评价编号" width="300">
          </el-table-column> -->
          <el-table-column prop="assessedTeacherNo" label="评价编号" width="150">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.assessedTeacherNo }}</el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="submitTime" label="时间" width="400">
          </el-table-column>

          <!-- <el-table-column prop="appraiseScore" label="得分" width="300">
          </el-table-column> -->
          <el-table-column prop="appraiseScore" label="得分" width="150">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.appraiseScore }}</el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="appraiseContent" label="内容" width="300">
          </el-table-column>
        </el-table>
      </template>
    </el-drawer>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="pageSizes" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount" />
  </div>
</template>

<script>
export default {
  name: 'EvaluationList',
  data () {
    return {
      tableData: [],
      tableData2: [],

      currentPage: 1,
      totalCount: 1,
      pageSizes: [5, 10, 20, 50, 100],
      PageSize: 5,

      drawer: false,
      direction: 'ttb',
      number: '60%',
      // 评价进度
      epercentage: 0,
      loading: true,
      assessed: 0,
      sum: 0,
      count: 0
    }
  },
  created () {
    this.getlist()
    this.gethistory()
  },
  watch: {
    'assessed': {
      handler (newVal, oldVal) {
        // console.log('count', this.count)
        // console.log('sum', this.sum)
        this.epercentage = (this.count / this.totalCount * 100).toFixed(2)
        this.epercentage = this.epercentage * 1.0
        // console.log(typeof(this.count));
      }
    },
    '$store.state.evaluation_now': function () {
      if (this.$store.state.evaluation_now) {
        console.log('getList')
        this.getlist()
      }
    }
  },
  methods: {
    getlist () {
      this.tableData = []
      let _this = this
      var dep_id
      _this.$http
        .post('/teacher/getUserInfo', {
          userId: this.$cookies.get('account')
        })
        .then((res) => {
          dep_id = res.data.data.deptId
          _this.$http
            .post('/leader/getTeachersInDept', {
              pageNum: this.currentPage,
              pageSize: this.PageSize,
              userId: this.$cookies.get('account'),

              deptId: dep_id
            })
            .then((res) => {
              console.log(res.data)
              this.totalCount = res.data.data.total
              for (var i = 0; i < res.data.data.list.length - 1; i++) {
                _this.tableData.push({
                  id: res.data.data.list[i].userId,
                  deptName: res.data.data.list[i].deptName,
                  professionalTime: res.data.data.list[i].professionalTime,
                  sumHour: res.data.data.list[i].sumHour,
                  username: res.data.data.list[i].username,
                  assessed: res.data.data.list[i].assessed
                })
                if (res.data.data.list[i].assessed) {
                  _this.assessed = _this.assessed + 1
                }
                _this.sum = _this.sum + 1
                // console.log(res.data.data[i].assessed)
              }

              // console.log('test  ');
              // console.log(res.data.data.list[res.data.data.list.length-1]);
              this.count = res.data.data.list[res.data.data.list.length - 1].count - 3
              console.log(this.count)
            })
        })

      _this.loading = false
    },

    // 评价历史
    gethistory () {
      console.log(this.$cookies.get('account'))
      let _this = this
      _this.$http
        .post('/leader/getHistoryAssesses', {
          userId: this.$cookies.get('account')
        })
        .then((res) => {
          // console.log(res.data);

          this.totalCount = res.data.data.length
          for (var i = 0; i < res.data.data.length; i++) {
            _this.tableData2.push({
              assessedTeacherNo: res.data.data[i].assessedTeacherNo,
              submitTime: res.data.data[i].submitTime,
              appraiseScore: res.data.data[i].appraiseScore,
              appraiseContent: res.data.data[i].appraiseContent
            })
          }
        })
    },

    getHref (val) {
      // console.log('/EvaluationDetail?courseNo=' + val)

      return '/teacherEvaluationSubmit?teacherNo=' + val
    },
    to (url) {
      this.$router.push('/EvaluationDetail?tcId=' + url)
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.getlist()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getlist()
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
</style>
