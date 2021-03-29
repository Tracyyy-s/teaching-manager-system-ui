<template>
  <el-container>
    <el-col
      :xs="{ span: 16 }"
      :sm="{ span: 18 }"
      :md="{ span: 20 }"
      :lg="{ span: 24 }"
      :xl="{ span: 24 }">
      <el-main>
        <!-- 1.keyWords选择框 -->
        <div class="list_head">
          <p class="head_font">日志类别</p>
        </div>
        <!-- keyWords-select: -->
        <el-tooltip
          class="item"
          effect="light"
          content="请选择要查看的日志类别"
          placement="left-start">
          <div el-row>
            <div class="select-choose">
              <el-select v-model="value" placeholder="请选择类别">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <el-button class="logType" type="primary" plain @click="get()">查看筛选结果</el-button>
              <el-button
                class="logType"
                type="primary"
                plain
                @click="dialogVisible = true">
                <i class="el-icon-upload2"></i>
                <span>导出日志</span>
              </el-button>
              <span class="delete-Log">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  plain
                  round
                  @click="deleteLog()">
                  删除所选日志
                </el-button>
              </span>
            </div>
          </div>
        </el-tooltip>
        <!-- <el-button @click="dialogVisible2 = true">取 消</el-button> -->
        <!-- 选择导出的日志 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          v-loading="loading1"
          element-loading-text="日志数量有点大、正在拼命加载中">
          <div class="block">
            <el-date-picker
              v-model="startValue"
              type="datetime"
              placeholder="开始日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
            <el-date-picker
              v-model="endValue"
              type="datetime"
              placeholder="结束日期"
              :picker-options="pickerOptions1">
              <!-- format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"-->
            </el-date-picker>
            <!-- /导出范围 -->
            <el-tooltip
              class="item"
              effect="light"
              content="选择导出日志类别"
              placement="right">
              <div class="importRange">
                <el-select v-model="importValue" placeholder="请选择类别">
                  <el-option
                    v-for="item in importOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-tooltip>
          </div>
          <!-- 弹窗下标 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="impo()">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 二级弹窗 -->
        <el-dialog title="请确认" :visible.sync="dialogVisible2" width="30%">
          <span>确定下载{{ this.startValue }}至{{ this.endValue }}的日志</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <download-excel
              class="export-excel-wrapper"
              :data="json_data"
              :fields="json_fields"
              name="日志导出.xls">
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
              <el-button
                type="primary"
                icon="el-icon-download"
                @click="dialogVisible2 = false"
                >导出EXCEL</el-button>
            </download-excel>
          </span>
        </el-dialog>
        <!-- 关键字查询 -->
        <div class="search_func">
          <el-input
            class="search_input"
            v-model="inputKeyWords"
            style="width: 300px"
            placeholder="请输入关键字">
          </el-input>
          <el-button
            class="keysWordBtnType"
            @click="searchLogByKeysWords"
            type="primary"
            plain
            style="">
            <i class="el-icon-search"></i>
            <span>查询</span>
          </el-button>
        </div>

        <!-- 2.日志表格表头 -->
        <div class="list_head">
          <p class="head_font">日志记录</p>
        </div>
        <!-- 表格: -->
        <el-table
          class="table-position"
          :data="tableData"
          border
          :style="{ width: tr }"
          v-loading="loading"
          element-loading-text="正在拼命加载中"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column prop="userId" label="工号" :width="tr / n">
            <template slot-scope="scope">
              <div v-html="scope.row.userId"></div>
            </template>
          </el-table-column>

          <el-table-column prop="authorities" label="角色" :width="tr / n">
            <template slot-scope="scope">
              <div v-html="scope.row.authorities"></div>
            </template>
          </el-table-column>

          <el-table-column prop="locale" label="地域" :width="tr / n">
            <template slot-scope="scope">
              <div v-html="scope.row.locale"></div>
            </template>
          </el-table-column>
          <!-- <el-table-column v-html="requestUrl" prop="requestUrl" label="请求URL" width="300px">
          </el-table-column> -->

          <el-table-column prop="requestUrl" label="请求URL" width="300px">
            <template slot-scope="scope">
              <div v-html="scope.row.requestUrl"></div>
            </template>
          </el-table-column>

          <el-table-column prop="ip" label="客户端IP" :width="tr / n">
            <template slot-scope="scope">
              <div v-html="scope.row.ip"></div>
            </template>
          </el-table-column>

          <el-table-column prop="resultMessage" label="结果" :width="tr / n">
            <template slot-scope="scope">
              <div v-html="scope.row.resultMessage"></div>
            </template>
          </el-table-column>

          <el-table-column prop="typeExplain" label="日志类型" :width="tr / n">
            <template slot-scope="scope">
              <div v-html="scope.row.typeExplain"></div>
            </template>
          </el-table-column>

          <el-table-column prop="dataExplain" label="回执信息" :width="tr / n">
            <template slot-scope="scope">
              <div v-html="scope.row.dataExplain"></div>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" label="创建时间" :width="tr / n">
            <template slot-scope="scope">
              <div v-html="scope.row.createTime"></div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>

      <div class="deleteLog"></div>
      <!-- 页码 -->
      <el-footer>
        <div class="footblock">
          <el-pagination
            v-if="getLogByType"
            :page-sizes="[10, 50, 100, 200, 300, 400, 500, 1000, 2000, 5000, 10000]"
            :page-size="pagesize"
            :current-page="currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPageNum"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
          </el-pagination>
        </div>
      </el-footer>
    </el-col>
  </el-container>
</template>
<script>
export default {
  name: 'LogTable',
  data () {
    return {
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.endValue != '') {
            return (
              time.getTime() > Date.now() || time.getTime() > this.endValue
            )
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return (
            time.getTime() < this.startValue || time.getTime() > Date.now()
          )
        }
      },
      inputKeyWords: '',
      json_fields: {
        IP: 'ip', // 常规字段
        参数: 'params', // 支持嵌套属性
        结果: 'resultMessage',
        数据: 'dataExplain',
        类型: 'typeExplain',
        创建时间: 'createTime'
      },
      json_data: [
        {
          ip: 'ip', // 常规字段
          params: 'params', // 支持嵌套属性
          resultMessage: 'resultMessage',
          dataExplain: 'dataExplain',
          typeExplain: 'typeExplain',
          createTime: 'createTime'
        }
      ],

      json_meta: [
        [
          {
            ' key ': ' charset ',
            ' value ': ' utf- 8 '
          }
        ]
      ],
      loading1: null,
      loading: null,
      // 导出日志弹框
      dialogVisible: false,
      // 二级弹出框
      dialogVisible2: false,
      // 导出日志范围
      startValue: new Date(2020, 12, 1, 10, 10),
      endValue: new Date(),
      n: 10,
      tr: '1200px',
      tableData: [],
      // 共多少页
      totalPageNum: 500,
      // 当前在第几页
      currentPage: 1,
      // 当前页多少有多少条数据
      pagesize: 10,
      // 删除日志id数组
      deleteId: [],
      // 导出的日志请求数据
      importData: [],
      // 导出类别日志
      importOptions: [
        {
          value: 'LoginLog',
          label: '登录日志'
        },
        {
          value: 'OperationLog',
          label: '操作日志'
        },
        {
          value: 'SystemLog',
          label: '系统日志'
        },
        {
          value: 'All',
          label: '所有日志'
        }
      ],
      importValue: 'All',
      // 日志类别选择
      options: [
        {
          value: 'LoginLog',
          label: '登录日志'
        },
        {
          value: 'OperationLog',
          label: '操作日志'
        },
        {
          value: 'SystemLog',
          label: '系统日志'
        },
        {
          value: 'All',
          label: '所有日志'
        }
      ],
      value: 'LoginLog',
      getLogByType: true
    }
  },
  created () {
    this.get()
  },
  methods: {
    async searchLogByKeysWords () {
      this.loading = true
      this.tableData = []
      const res = await this.$http
        .post('/root/getLogByKeyword', {
          keyword: this.inputKeyWords,
          pageNum: this.currentPage,
          pageSize: this.pagesize
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.getLogByType = false
            this.totalPageNum = res.data.data.total
            for (let i = 0; i < res.data.data.list.length; i = i + 1) {
              this.tableData.push(res.data.data.list[i])
            }
          } else {
            console.log(res)
            this.$message({
              showClose: true,
              message:
                '根据关键字获取日志信息失败',

              type: 'warning'
            })
          }
        })
        .catch((res) => {
          alert('服务器出错了')
          this.loading = false
        })
      this.loading = false
    },
    // 导出日志 确定
    async impo () {
      this.startValue = this.moment(this.startValue).format(
        'yyyy-MM-DD HH:mm:ss'
      )
      this.endValue = this.moment(this.endValue).format('yyyy-MM-DD HH:mm:ss')
      var ju = 1
      this.loading1 = true
      const res = await this.$http
        .post('/root/exportLogs', {
          beginTime: this.startValue,
          endTime: this.endValue,
          type: this.importValue
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.json_data = []
            for (let i = 0; i < res.data.data.length; i = i + 1) {
              this.json_data.push(res.data.data[i])
            }
          } else {
            ju = 0
            this.$message({
              showClose: true,
              message: '抱歉，该时间段内没有日志',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          console.log(res)
          alert('服务器出错了')
          this.loading1 = false
        })
      this.loading1 = false
      if (ju == 1) {
        this.dialogVisible = false
        this.dialogVisible2 = true
      }
    },
    // 导出日志
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },

    // 删除日志
    async deleteLog () {
      if (this.deleteId.length === 0) {
        this.$message({
          showClose: true,
          message: '请先选择要删除的日志',
          type: 'warning'
        })
        return
      }
      const res = await this.$http
        .post('/root/deleteLogs', {
          deleteId: this.deleteId
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
          } else {
            console.log(res)
            this.$message({
              showClose: true,
              message: '删除失败，后台繁忙。' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          console.log(res)
          alert('服务器出错了')
        })
      this.get()
    },
    // 勾选后
    handleSelectionChange (val) {
      // this.multipleSelection = val; val是每一行数据
      this.deleteId = val.map((item) => item.id)
      // .join(); 函数会把数组中的每个元素返回拼接成一个字符串，以join("参数")的参数为分割界限
    },
    // 选择具体页码后
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      if (this.getLogByType) {
        this.get()
      } else {
        this.searchLogByKeysWords()
      }
    },
    // 最大页码变化后，更新pagesize，向后端请求的时候需要
    handleSizeChange (val) {
      this.currentPage = 1
      this.pagesize = val
      if (this.getLogByType) {
        this.get()
      } else {
        this.searchLogByKeysWords()
      }
    },
    // 获取日志记录
    async get () {
      this.tableData = []
      this.loading = true
      const res = await this.$http
        .post(
          '/root/getLogInfoByType',
          // 带给后端带入页码，我要第几页数据，第一次进去就是默认第一页的数据
          {
            type: this.value,
            pageNum: this.currentPage,
            pageSize: this.pagesize
          }
        )
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.getLogByType = true
            this.totalPageNum = res.data.data.total
            for (let i = 0; i < res.data.data.list.length; i = i + 1) {
              this.tableData.push(res.data.data.list[i])
              // 注释开始
              // 构造角色
              var Authorities = ''
              if (typeof this.tableData[i].authorities === 'undefined') {
                Authorities = '未登录后台,未记录'
              } else {
                var lenk = this.tableData[i].authorities.length
                var temp = this.tableData[i].authorities.substring(1, lenk - 1)
                var tempArr = temp.split(', ')
                for (var j = 0; j < tempArr.length; j++) {
                  if (tempArr[j] === 'ROLE_admin') {
                    Authorities += '管理员'
                  }
                  if (tempArr[j] === 'ROLE_leader') {
                    Authorities += '督导'
                  }
                  if (tempArr[j] === 'ROLE_teacher') {
                    Authorities += '教师'
                  }
                  if (tempArr[j] === 'ROLE_student') {
                    Authorities += '学生'
                  }

                  if (tempArr[j] === 'ROLE_root') {
                    Authorities += 'ROOT'
                  }
                  if (j != tempArr.length - 1) {
                    Authorities += '\n'
                  }
                }
              }

              this.tableData[i].authorities = Authorities
            }
          } else {
            this.$message({
              showClose: true,
              message: '获取日志信息失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          console.log(res)
          alert('服务器出错了')
          this.loading = false
        })
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.keysWordBtnType {
  font-weight: 900px;
  margin-left: 50px;
  width: 130px;
}
.search_func {
  margin-top: 0px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  height: 45px;
}
.search_input {
  display: inline-block;
  width: 50%;
}
.export-excel-wrapper {
  display: inline-block;
}
.tooltip {
  width: 1200px;
  margin: 20px auto;
}
.button-import-father {
  width: 2000px;
  margin: 20px auto;
}
.delete-Log {
  margin-left: 150px;
}
/deep/ .cell {
  text-align: center;
}
// .delete-Log {
//   margin-top: 20px;
//   margin-bottom: 20px;
//   margin: auto;
//   text-align: right;
//   width: 1200px;
// }
.importRange {
  width: 250px;
  margin-top: 30px;
}
.logType {
  font-weight: 900px;
  margin-left: 130px;
}
.select-choose {
  margin-top: 0px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  height: 45px;
}
.footblock {
  text-align: center;
}
.list_head {
  margin-top: 0px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  height: 45px;
  background: #f3f3f3;
  border: 1px #d9d9d9 solid;
  font-weight: bold;
  color: #666666;
}
.head_font {
  margin: 5px auto;
  width: 100px;
  font: 25px;
}
// /deep/.el-input__inner {
//   width: 500px;
// }
.table-position {
  margin: 5px auto;
  width: inherit;
  font: 25px;
}
</style>
