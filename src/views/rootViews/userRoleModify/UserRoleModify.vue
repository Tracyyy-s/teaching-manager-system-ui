<template>
  <el-container>
    <el-col
      :xs="{ span: 16 }"
      :sm="{ span: 18 }"
      :md="{ span: 20 }"
      :lg="{ span: 24 }"
      :xl="{ span: 24 }"
    >
      <div class="box-father-card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="demo-type">
              <span>
                <el-avatar
                  class="el-avatar"
                  icon="el-icon-user-solid"
                ></el-avatar>
              </span>
              <span class="name-title">
                {{ userName }}
              </span>
            </div>
          </div>
          <div class="box-body">
            <el-checkbox-group
              v-loading="loading"
              class="checkbox-group"
              v-model="checkList"
            >
              <!-- label为value -->
              <el-checkbox
                v-for="item in allCheckList"
                :label="item.roleId"
                :key="item.roleId"
                >{{ item.roleName }}
                
                </el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="bt">
            <el-button type="primary" class="bt2" @click="submit"
              >提 交 角 色 更 改</el-button
            >
          </div>
        </el-card>
      </div>
    </el-col>
  </el-container>
</template>

<script>
export default {
  name: 'UserRoleModify',
  data () {
    return {
      loading: null,
      userId: this.$route.query.userId,
      userName: this.$route.query.userName,

      // 被选的值，只是roleId
      checkList: [],
      // 所有可选的值，是对象，每个对象包含roleID和roleName
      allCheckList: [
       
      ]
      
    }
  },
  async created () {
    await this.getAllCheckList()
    await this.getList()
  },
  methods: {
    async getAllCheckList () {
      this.loading = true
      const res = await this.$http
        .post('/root/getAllRoles')
        .then((res) => {
          if (res.data.resultCode === 1) {
            for (let i = 0; i < res.data.data.length; i = i + 1) {
              this.allCheckList.push(res.data.data[i])
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
          this.loading = false
          alert('服务器错误')
        })
      this.loading = false
    },
    async getList () {
      this.loading = true
      await this.$http
        .post('/root/getUserRoles', {
          userId: this.userId
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            for (var i = 0; i < res.data.data.length; i++) {
              this.checkList.push(res.data.data[i].roleId)
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
          this.loading = false
          alert('服务器错误')
        })
      this.loading = false
    },
    async submit () {
      // var data = []
      // for (var i = 0; i < this.checkList; i++) {
      //  data.push(
      //    this.checkList[i].roleId
      //  )
      // }
      // 判断选择是否合法
      if (this.checkList.length === 0) {
        this.$message({
          showClose: true,
          message: '至少需要选择一个角色',
          type: 'warning'
        })
        return
      }
      // 提交
      await this.$http
        .post('/root/updateUserRole', {
          userId: this.userId,
          data: this.checkList
          //   "data":["2","3","4",]
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.$router.push('/user_role_list')
          } else {
            this.$message({
              showClose: true,
              message: '修改失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          alert('服务器错误')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.kuangkuang {
  width: 30px;
  height: 30px;
}
.wenzi {
  font-size: 40px;
}
.bt2 {
  font-size: 22px;
}
/deep/.checkbox-group {
  display: flex;
  justify-content: space-around;
}
//标题
.el-avatar {
  margin-right: 30px;
}
/deep/ .name-title {
  font-size: 30px;
}
/deep/.clearfix {
  text-align: center;
}
.box-father-card {
  width: 1300px;
  margin: 20px auto;
}
.bt {
  margin: 50px;
  text-align: center;
}
.box-body {
  text-align: center;
}
.box-body {
  font-size: 50px;
  margin: 50px;
}
/deep/ .el-checkbox__label {
  font-size: 26px;
}
/deep/.el-checkbox__inner {
  width: 30px;
  height: 30px;
  white-space:normal;
  word-wrap: break-all;
}
/deep/.el-checkbox__inner::after {
  height: 19px;
  left: 12px;
}
/deep/.demo-type {
  display: flex;
  justify-content: center;
}
/deep/.el-checkbox{
  white-space:normal;
  word-wrap: break-all;
}
</style>
