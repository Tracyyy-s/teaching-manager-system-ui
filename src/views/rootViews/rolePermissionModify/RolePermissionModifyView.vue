
<template>
  <el-container>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-user-solid"></i>
            <span class="roleName-css"> {{ roleName }} </span>
          </div>
          <div class="box-body">
            <el-form
              ref="form"
              :model="form"
              v-loading="loading"
              label-width="150px">
              <el-form-item>
                <el-tag type="success">导入信息类菜单</el-tag>

                <el-checkbox-group v-model="form.data">
                  <el-checkbox
                    v-for="item in menuIf.importMenuList"
                    :key="item.permissionId"
                    :label="item.permissionId">
                    {{ item.permissionName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item>
                <el-tag type="success">管理信息类菜单</el-tag>
                <el-checkbox-group v-model="form.data">
                  <el-checkbox
                    v-for="item in menuIf.managerMenuList"
                    :key="item.permissionId"
                    :label="item.permissionId">
                    {{ item.permissionName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item>
                <el-tag type="success">评价类菜单</el-tag>
                <el-checkbox-group v-model="form.data">
                  <el-checkbox
                    v-for="item in menuIf.evaluationMenuList"
                    :key="item.permissionId"
                    :label="item.permissionId">
                    {{ item.permissionName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item>
                <el-tag type="success">督导类菜单</el-tag>
                <el-checkbox-group v-model="form.data">
                  <el-checkbox
                    v-for="item in menuIf.leaderMenuList"
                    :key="item.permissionId"
                    :label="item.permissionId">
                    {{ item.permissionName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item>
                <el-tag type="success">教师功能类菜单</el-tag>
                <el-checkbox-group v-model="form.data">
                  <el-checkbox
                    v-for="item in menuIf.teacherMenuList"
                    :key="item.permissionId"
                    :label="item.permissionId">
                    {{ item.permissionName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div class="bt">
              <el-button type="primary" style="width: 150px" @click="submit()">
                <i class="el-icon-thumb"></i>
                <span>提交</span>
              </el-button>
            </div>
          </div>
        </el-card>
      <!-- </div> -->
    <!-- </el-col> -->
  </el-container>
</template>

<script>
export default {
  name: 'RolePermissionModifyView',
  data () {
    return {
      loading: null,
      roleName: this.$route.query.roleName,
      roleId: this.$route.query.roleId,
      // 展示权限
      menuIf: {
        // 导入类
        importMenuList: [],
        // 管理信息类
        managerMenuList: [],
        // 评价类
        evaluationMenuList: [],
        // 督导类
        leaderMenuList: [],
        // 教师功能类
        teacherMenuList: []
      },
      // 所有的权限
      allMenuList: [],
      test: [],
      // 已经拥有的权限
      form: {
        data: []
      }
    }
  },
  async created () {
    await this.getAllPermissions()
    await this.get()
  },
  methods: {
    async submit () {
      await this.$http
        .post('/root/updateRolePermission', {
          roleId: this.roleId,
          data: this.form.data
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.$router.push('/role_permission_modify')
          } else {
            this.$message({
              showClose: true,
              message: '修改失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          alert('提交失败，服务器错误')
        })
    },
    // 获取所有权限
    async getAllPermissions () {
      this.loading = true
      const res = await this.$http
        .post('/root/getAllPermissions')
        .then((res) => {
          if (res.data.resultCode === 1) {
            for (let i = 0; i < res.data.data.length; i = i + 1) {
              this.allMenuList.push(res.data.data[i])
            }
            // 分别放入
            for (var i = 0; i < this.allMenuList.length; i++) {
              var menu = '' + this.allMenuList[i].permissionRange + 'MenuList'
              if (typeof (this.menuIf[menu]) !== 'undefined') {
                this.menuIf[menu].push(this.allMenuList[i])
              }
            }
          } else {
            this.$message({
              showClose: true,
              message: '获取权限信息失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          alert('服务器错误')
          console.log(res)
          this.loading = false
        })
      this.loading = false
      console.log(this.menuIf)
    },
    // 获取角色已有的限权
    async get () {
      this.loading = true
      const res = await this.$http
        .post('/root/getPermissionsByRoleId', {
          roleId: this.$route.query.roleId
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            for (let i = 0; i < res.data.data.length; i = i + 1) {
              this.form.data.push(res.data.data[i].permissionId)
            }
          } else {
            console.log(res.data)
            this.$message({
              showClose: true,
              message:
                '获取该角色权限信息失败，后台繁忙' + '(' + res.data.data + ')',
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

// 判断
// if (this.form.data.length === 0) {
//   this.$message({
//     showClose: true,
//     message: "至少需要选择一种权限",
//     type: "warning",
//   });
//   return;
// }
</script>

<style lang="less" scoped>
/deep/ .el-icon-user-solid {
  font-size: 30px;
}
/deep/.clearfix {
  text-align: center;
}
/deep/ .el-card__header{
  width: 1200px;
}
/deep/.el-form-item__label {
  text-align: left;
  margin-left: 150px;
  margin-right: 150px;
}
/deep/.el-form-item__content {
  display: flex;
}
/deep/.el-tag {
  text-align: center;
  width: 200px;
  margin-right: 100px;
  height: 50%;
  line-height: 40px;
  font-size: 15px;
}
/deep/.el-radio-button__inner,
.el-radio-group {
  line-height: none;
}
.bt {
  text-align: center;
}
/deep/.el-form-item {
  font-size: 15px;
}
.roleName-css {
  font-weight: 800;
  font-size: 20px;
}
.box-card{
  width: 1200px;
  margin: 30px auto;
}
</style>
