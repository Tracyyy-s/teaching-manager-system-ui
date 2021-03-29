<template>
  <el-container>
    <el-main>
      <!-- <el-col
        :xs="{ span: 20, offset: 2 }"
        :sm="{ span: 18, offset: 3 }"
        :md="{ span: 16, offset: 4 }"
        :lg="{ span: 18, offset: 3 }"
        :xl="{ span: 22, offset: 1 }"
      > -->
      <div class="head">
        <p>筛 选 查 询</p>
      </div>
      <el-form :inline="true" :model="form" class="fromer">
        <el-select v-model="form.deptId" placeholder="请选择系别">
          <el-option
            v-for="item in deptList"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId"
          >
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

        <el-button
          v-if="exportBtn"
          type="primary"
          class="search_bottoner"
          plain
          @click="exportExcelBefore()">导 出 数 据
        </el-button>
        <el-tag class="weight-st" type="success">评分比重(学生/教师)  :   {{ studentWeight }}/{{ teacherWeight }}</el-tag>
      </el-form>

      <div class="head">
        <p>评价统计列表</p>
      </div>

      <el-table
        v-loading="loading"
        :data="tableList"
        border
        :style="{ width: tr }">
        <el-table-column
          prop="teacherName"
          label="教师姓名"
          align="center"
          :width="tr / n">
        </el-table-column>
        <el-table-column
          prop="teacherNo"
          label="教师工号"
          align="center"
          :width="tr / n">
        </el-table-column>
        <el-table-column
          prop="teacherNum"
          label="该教师被督导评价次数"
          align="center"
          :width="tr / n">
        </el-table-column>
        <el-table-column
          align="center"
          prop="teacherAppraiseScore"
          label="督导评价分数"
          :width="tr / n">
        </el-table-column>

        <el-table-column
          align="center"
          prop="allScore"
          label="教学质量评价总分数"
          :width="tr / n">
        </el-table-column>

        <el-table-column
          label="查看学生评价详情"
          align="center"
          :width="tr / n">
          <template slot-scope="scope">
            <el-button
              :disabled="classIsNull(scope.row.classes.length)"
              class="el-icon-zoom-in"
              @click="more(scope.row.classes)">
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
        :page-size="pageSize"
        style="text-align: center"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
      <!-- </el-col> -->
    </el-main>
  </el-container>
</template>

<script>
import Blob from '@/excel/Blob.js'
import Export2Excel from '@/excel/Export2Excel.js'
export default {
  //  查看所有评价结果
  name: 'ViewAllEvaluationResults',
  components: {},
  data () {
    return {
      loading_ex: null,
      loading: null,
      tr: '1250px',
      n: 5,
      currentPage: 1,
      exportBtn: false,
      totalCount: 1,
      pageSizes: [10, 20, 50, 100, 200, 500, 1000],
      pageSize: 10,
      tableList: [],
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
      studentWeight: 0.5,
      teacherWeight: 0.5,
      currentTerm: '',
      form: {
        deptId: '',
        termId: ''
      }
    }
  },

  async created () {
    this.getExportIf()
    this.init()
  },

  methods: {
    async getExportIf () {
      await this.$http
        .post(
          '/getUserPermissions',
          {
            account: this.$cookies.get('account')
          }
          // 获取可以展示的菜单
        )
        .then((res) => {
          var flag = 0
          if (res.data.resultCode === 1) {
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].permissionUrl == 'exportEvaluationList') {
                flag = 1
                break
              }
            }
            if (flag === 0) {
              this.exportBtn = false
            } else {
              this.exportBtn = true
            }
          } else {
            this.$message({
              showClose: true,
              message:
                '获取功能权限失败，后台繁忙。' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          console.log(res.data)
          alert('服务器出错了')
        })
    },
    exportExcelBefore () {
      this.loading = true
      this.exportExcel()
      this.loading = false
    },
    // 导出的方法
    exportExcel () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/excel/Export2Excel.js')
        const tHeader = [
          '教师姓名',
          '教师工号',
          '该教师被督导评价次数',
          '督导评价分数',
          '教学质量评价总分数'
        ]
        const filterVal = [
          'teacherName',
          'teacherNo',
          'teacherNum',
          'teacherAppraiseScore',
          'allScore'
        ]
        const list = this.tableList
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(
          tHeader,
          data,
          '' + this.currentTerm + '学期的评价列表'
        )
      })
    },

    formatJson (filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    classIsNull (l) {
      if (l === 0) {
        return true
      } else {
        return false
      }
    },
    more (classes) {
      this.$router.push({ name: 'Classes', params: { classes: classes } })
    },
    async getCurrentTerm () {
      const res = await this.$http.post('/getCurrentTerm').then((res) => {
        if (res.data.resultCode === 1) {
          this.currentTerm = res.data.data.termId
          this.studentWeight = res.data.data.studentWeight
          this.teacherWeight = res.data.data.teacherWeight
        } else {
          this.$message({
            showClose: true,
            message:
              '获取当前学期列表失败，后台繁忙' + '(' + res.data.data + ')',
            type: 'warning'
          })
        }
      })
    },
    async getTerms () {
      this.loading = true
      this.termsList = []
      const res = await this.$http
        .post('/getTerms')
        .then((res) => {
          if (res.data.resultCode == 1) {
            this.termsList = res.data.data
          } else {
            this.$message({
              showClose: true,
              message:
                '获取可管理学期列表失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          alert('服务器错误')
        })
      this.loading = false
      this.form.termId = this.termsList[0].termId
    },
    async getDept () {
      this.loading = true
      this.deptList = []
      const res = await this.$http
        .post('admin/getDeptsOfUser', {})
        .then((res) => {
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
    async get () {
      this.tableList = []
      if (this.form.deptId === '' || this.form.termId === '') {
        this.$message({
          showClose: true,
          message: '未获取到查询参数（学期和学院）',
          type: 'warning'
        })
        return
      }
      this.loading = true
      const res = await this.$http
        .post('admin/getAssessResult', {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          deptId: this.form.deptId,
          termId: this.form.termId
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.tableList = res.data.data.list
            this.totalCount = res.data.data.total
            for (var i = 0; i < this.tableList.length; i++) {
              var flagS = false,
                flagT = false
              // 1. 计算老师
              var sumTeacher = 0
              if (this.tableList[i].teacherNum !== 0) {
                sumTeacher =
                  this.tableList[i].teacherAppraiseScore /
                  this.tableList[i].teacherNum
              } else {
                flagT = true
                this.tableList[i].teacherAppraiseScore = '无督导评价数据'
              }
              sumTeacher = sumTeacher * this.teacherWeight

              // 计算学生
              var sumStudnet = 0
              // 计算每人平均评价分数
              for (var j = 0; j < this.tableList[i].classes.length; j++) {
                if (this.tableList[i].classes[j].studentNum !== 0) {
                  sumStudnet =
                    sumStudnet +
                    this.tableList[i].classes[j].studentAppraiseScore /
                      this.tableList[i].classes[j].studentNum
                } else {
                  this.tableList[i].classes[j].studentAppraiseScore =
                    '无学生评价数据'
                }
              }
              // 计算每科平均评价分数
              if (this.tableList[i].classes.length != 0) {
                sumStudnet = sumStudnet / this.tableList[i].classes.length
              } else {
                flagS = true
              }
              sumStudnet = sumStudnet * this.studentWeight
              // 求和

              if (flagT && flagS) {
                this.tableList[i].allScore = '没有评价数据'
              } else {
                var mySum = sumStudnet + sumTeacher
                this.tableList[i].allScore = mySum.toFixed(2)
              }
              this.tableList = this.tableList
            }
          } else {
            this.$message({
              showClose: true,
              message:
                '获取所有评价结果失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
      this.loading = false

      // 计算总分
      // this.studentWeight = 0.5;
      // this.teacherWeight = 0.5;
    },
    async init () {
      await this.getDept()
      await this.getTerms()
      await this.getCurrentTerm()
      this.form.termId = this.currentTerm
      await this.get()
    },
    handleSizeChange (val) {
      this.pageSize = val
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
  margin-top: -20px;
  margin-bottom: 20px;
}
.input_searcher {
  width: 220px;
}
.search_bottoner {
  display: inline;
  width: 120px;
  margin-left: 40px;
}
.head {
  text-align: center;
  margin-bottom: 40px;
  height: 50px;
  background: #f3f3f3;
  border: 1px #d9d9d9 solid;
  font-weight: bold;
  color: #666666;
}

.weight-st{
 float:right;
 font-size: 18px;
}
</style>
