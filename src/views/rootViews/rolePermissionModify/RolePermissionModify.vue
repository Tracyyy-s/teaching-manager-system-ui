<template>
  <el-container>
      <div class="box-father-card">
        <el-card class="box-card">
          <div class="list_head">
            <p class="head_font">角色列表</p>
          </div>
          <div class="box-body">
            <el-table
              class="table-position"
              :data="tableData"
              border
              :style="{ width: tr }"
              v-loading="loading">
              <el-table-column prop="id" label="角色ID" :width="tr / n">
              </el-table-column>
              <el-table-column
                prop="roleId"
                v-if="false"
                label="角色Id"
                :width="tr / n">
              </el-table-column>

              <el-table-column prop="roleName" label="角色名称" :width="tr / n">
              </el-table-column>

              <!-- prop="op" -->
              <el-table-column label="角色管理" width="250px">
                <!-- 为了获取到该行的具体的值 -->
                <template slot-scope="scope">
                  <el-tooltip
                    content="更改角色权限"
                    placement="bottom"
                    effect="light">
                    <el-button
                      class="el-icon-lock"
                      @click="
                        role_permission_modify_view(
                          scope.row.roleName,
                          scope.row.roleId
                        )
                      "
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip
                    content="删除该角色"
                    placement="bottom"
                    effect="light">
                    <!--  @click="delete_role(scope.row.roleName, scope.row.roleId)" -->
                    <el-button
                      class="el-icon-delete"
                      @click="
                        deleteRoleBrfore(scope.row.roleName, scope.row.roleId)">
                    </el-button>
                  </el-tooltip>
                  <el-dialog
                    title="提示"
                    :visible.sync="dialogVisibleDeleteRole"
                    width="30%">
                    <span style="color: #ff0000"
                      >确认移除角色{{ deleteRoleName }} 吗？</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisibleDeleteRole = false">取 消</el-button>
                      <el-button type="primary" @click="delete_role()">确 定</el-button>
                    </span>
                  </el-dialog>
                  <!--  -->
                </template>
              </el-table-column>
            </el-table>
            <div class="create-NewRole">
              <el-button type="primary" @click="dialogVisibleChange()">创建新的角色</el-button>
            </div>
            <!-- title="填写角色信息" -->
            <el-dialog :visible.sync="dialogVisible" width="40%">
              <el-card>
                <div slot="header" class="clearfix">
                  <div class="el-icon-user-solid"></div>
                  填 写 角 色 信 息
                </div>
                <div>
                  <el-input
                    v-model="newRoleName"
                    placeholder="请 输 入 角 色 名 称 "
                  ></el-input>
                </div>
              </el-card>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消 新 增</el-button>
                <el-button type="primary" @click="createRole()">确 认 新 增</el-button>
              </span>
            </el-dialog>
          </div>
        </el-card>
      </div>
    <!-- </el-col> -->
  </el-container>
</template>

<script>
export default {
  name: 'RolePermissionModify',
  data () {
    return {
      loading: null,
      deleteRoleName: '',
      deleteRoleId: null,
      dialogVisibleDeleteRole: false,
      // 表格栏数目
      n: 5,
      tr: '1200px',
      tableData: [],
      // [
      //   {
      //     roleId:"123",
      //     roleName:"456"
      //   },
      // ]
      newRoleName: '',
      dialogVisible: false
    }
  },
  created () {
    this.get()
  },

  methods: {
    deleteRoleBrfore (roleName, roleId) {
      this.deleteRoleName = roleName
      this.deleteRoleId = roleId
      this.dialogVisibleDeleteRole = true
    },
    async delete_role () {
      await this.$http
        .post('/root/deleteRole', {
          roleId: this.deleteRoleId
        })

        .then((res) => {
          if (res.data.resultCode === 1) {
            this.$message({
              showClose: true,
              message: '删除角色成功',
              type: 'success'
            })
            this.dialogVisibleDeleteRole = false
            this.get()
          } else {
            this.$message({
              showClose: true,
              message: '删除角色失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          this.$message({
            showClose: true,
            message: '新增角色失败，服务器错误',
            type: 'error'
          })
        })
    },
    role_permission_modify_view (roleName, roleId) {
      this.$router.push({
        path: '/role_permission_modify_view',
        query: { roleName: roleName, roleId: roleId }
      })
    },
    async createRole () {
      await this.$http
        .post('/root/addRole', {
          roleName: this.newRoleName
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.dialogVisible = false
            this.$message({
              showClose: true,
              message: '新增角色成功',
              type: 'success'
            })

            this.get()
          } else {
            this.$message({
              showClose: true,
              message: '新增角色失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          this.$message({
            showClose: true,
            message: '新增角色失败，服务器错误',
            type: 'error'
          })
        })
      this.newRoleName = ''
    },
    dialogVisibleChange () {
      this.dialogVisible = true
    },
    // 获取角色列表
    async get () {
      this.tableData = []
      this.loading = true
      const res = await this.$http
        .post('/root/getAllRoles')
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.totalPageNum = res.data.totalPageNum
            for (let i = 0; i < res.data.data.length; i = i + 1) {
              this.tableData.push(res.data.data[i])
              this.tableData[i]['id'] = i + 1
            }
          } else {
            this.$message({
              showClose: true,
              message:
                '获取初始化信息失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          alert('服务器错误')
          this.loading = false
        })
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.create-NewRole {
  margin: 30px;
  display: flex;
  justify-content: flex-end;
}
.box-body {
  width: 1200px;
  // display: flex;
  // justify-content:center
}
/deep/.el-card__body {
  width: 1200px;
  margin: 20px auto;
}
.box-card {
  width: 1400px;
  margin: 30px auto;
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
.box-father-card{
  width: 1400px;
  margin: 20px auto;
}
</style>
