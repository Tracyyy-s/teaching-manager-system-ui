<template>
  <el-container>
      <div class="search_head">
        <p class="head_font">筛选查询</p>
      </div>

      <div class="search_func">
        <el-input
          class="search_input"
          v-model="inputSearchadminNo"
          placeholder="请输入待查询的工号">
        </el-input>
        <el-button
          @click="searchAdminByadminNo"
          type="primary"
          style="width: 150px"
          plain
          >查询</el-button
        >
      </div>
      <el-main>
        <div class="list_head">
          <p class="head_font">用户列表</p>
        </div>
        <el-table
          class="table-position"
          v-loading="loading"
          :data="tableData"
          border
          :style="{ width: tr }"
        >
          <el-table-column prop="userId" label="工号" :width="tr / n">
          </el-table-column>
          <el-table-column prop="username" label="姓名" :width="tr / n">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" :width="tr / n">
          </el-table-column>

          <el-table-column prop="political" label="政治面貌" :width="tr / n">
          </el-table-column>

          <el-table-column prop="entryYear" label="入职年份" :width="tr / n">
          </el-table-column>

          <el-table-column prop="degree" label="学历" :width="tr / n">
          </el-table-column>

          <!-- prop="op" -->
          <el-table-column label="角色管理" width="200px">
            <!-- 为了获取到该行的具体的值 -->
            <template slot-scope="scope">
              <el-tooltip
                content="更改用户角色"
                placement="bottom"
                effect="light"
              >
                <el-button
                  class="el-icon-lock"
                  @click="
                    user_role_modify(scope.row.userId, scope.row.username)
                  "
                ></el-button>
              </el-tooltip>

              <!-- <el-tooltip content="移除该管理员" placement="bottom" effect="light">
                <el-button class="el-icon-delete" @click="dialogVisibleChange(scope.row.user_id,scope.row.username)" ></el-button>
              </el-tooltip> -->

              <!--
              <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <span>确认移除姓名为 {{deleteAdminName}} ,管理员Id为 {{deleteAdminId}} 的管理员吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="user_role_delete()">确 定</el-button>
                </span>
              </el-dialog>
              -->
              <!-- @click="user_role_delete(scope.row.adminNo) -->
              <!-- <el-button type="danger" size="min"  plain @click="del(scope.row.musicId)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </el-main>

      <el-footer>
        <div class="footblock">
          <el-pagination
            :page-sizes="[10, 50, 100, 200, 300, 400, 500, 1000]"
            :page-size="pagesize"
            :current-page="currentPage"
            :total="totalPageNum"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </div>
      </el-footer>
    <!-- </el-col> -->
  </el-container>
</template>

<script>
export default {
  //  查看所有评价结果
  name: 'UserRoleList',

  data () {
    return {
      loading: null,
      // 表格栏数目
      n: 5,
      tr: '1200px',
      // 共多少页
      totalPageNum: 500,
      // 当前在第几页
      currentPage: 1,
      // 当前页多少有多少条数据
      pagesize: 10,
      // 管理员编号查找 即input
      inputSearchadminNo: '',
      // 搜索选择的系结果
      dept: '',
      // 搜索选择的系列表
      options1: [
        {
          label: '没用',
          value: '显示的值'
        }
      ],
      tableData: [],
      // {
      //    "No": "张娜罗敏潘军黄洋乔丽沈磊卢芳戴磊萧刚卢超",
      //     "Name": "乔平孙艳",
      //     "email": "魏丽姜敏",
      //     "political": "贾丽石娜",
      //     "role": "贾丽石娜"
      // }
      // 删除管理员确定框
      dialogVisible: false,
      deleteAdminId: '',
      deleteAdminName: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    async searchAdminByadminNo () {
      this.tableData = []
      this.loading = true
      const res = await this.$http
        .post('/root/getUserById', {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          userId: this.inputSearchadminNo
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.totalPageNum = 1
            this.tableData.push(res.data.data)
          } else {
            console.log(res)
            if (res.data.data === 'Not Found') {
              this.$message({
                showClose: true,
                message:
                  '未查询到该用户的信息',
                type: 'warning'
              })
            } else {
              this.$message({
                showClose: true,
                message:
                  '获取用户信息失败，后台繁忙' + '(' + res.data.data + ')',
                type: 'warning'
              })
            }
          }
        })
        .catch((res) => {
          this.loading = false
          console.log(res)
          alert('服务器出错了,未查询到数据，请联系后台管理员')
        })
      this.loading = false
    },
    // 获取所有的用户
    async get () {
      this.loading = true
      this.tableData = []
      const res = await this.$http
        .post(
          '/root/getAllUsers',
          // 带给后端带入页码，我要第几页数据，第一次进去就是默认第一页的数据
          {
            pageNum: this.currentPage,
            pageSize: this.pagesize,
            userId: '200411010'
          }
        )
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.totalPageNum = res.data.data.total
            for (let i = 0; i < res.data.data.list.length; i = i + 1) {
              this.tableData.push(res.data.data.list[i])
            }
          } else {
            this.$message({
              showClose: true,
              message: '获取用户信息失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          this.loading = false
          console.log(res)
          alert('服务器出错了')
        })
      this.loading = false
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.get()
    },
    // 最大页码变化后，更新pagesize，向后端请求的时候需要
    handleSizeChange (val) {
      this.pagesize = val
      this.get()
    },

    // 修改权限
    user_role_modify (userId, userName) {
      this.$router.push({
        path: '/user_role_modify',
        query: { userId: userId, userName: userName }
      })
      // this.$router.push('/user_role_modify')
    },

    // 移除管理员
    dialogVisibleChange (adminName, adminNo) {
      (this.deleteAdminId = adminNo),
      (this.deleteAdminName = adminName),
      (this.dialogVisible = true)
    },
    async user_role_delete () {
      console.log(this.deleteAdminId)
      const res = await this.$http
        .post('/root/deleteAdmin', {
          adminNo: this.deleteAdminId
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.$message.success('成功')
            this.$router.go(0)
          } else {
            this.$message.error(
              '删除失败，后台出问题了' + '(' + res.data.data + ')'
            )
          }
        })
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>

.search_head {
  margin-top: 50px;
  margin-bottom: 13px;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  height: 45px;
  background: #f3f3f3;
  border: 1px #d9d9d9 solid;
  font-weight: bold;
  color: #666666;
}
.list_head {
  margin-top: 20px;
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
.search_func {
  // width: 1200px;
  margin: 30px auto;
  // text-align: center;
  height: 45px;
}
.search_input {
  display: inline-block;
  margin-left: 150px;
  width: 200px;
}
.head_font {
  margin: 5px auto;
  width: 100px;
  font: 25px;
}
.table-position {
  margin: 5px auto;
  width: inherit;
  font: 25px;
}
.footblock {
  text-align: center;
}
/deep/ .cell {
  text-align: center;
}
</style>
