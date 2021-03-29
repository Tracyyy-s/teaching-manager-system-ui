<template>
  <div class="card-father">
    <el-card class="box-card">
      <div class="title">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>忘记密码</span>
        </div>
      </div>
      <div class="box-body">
        <el-form
          ref="forgetPWD"
          label-position="top"
          label-width="80px"
          :model="modifyDate"
          :rules="rules"
        >
          <!-- userId -->
          <el-tooltip
            content="第一步 首先输入账号，会查询您的邮箱 "
            :hide-after="12000"
            effect="light"
            placement="left"
          >
            <el-form-item label="账号" prop="userId">
              <el-input
                :disabled="userIdDisable"
                v-model="modifyDate.userId"
                autocomplete="off"
              ></el-input>

              <div class="get-Code">
                <el-button
                  type="primary"
                  plain
                  :disabled="isDisabled"
                  @click="getCode()"
                >
                  {{ content }}
                </el-button>
              </div>
            </el-form-item>
          </el-tooltip>
          <!-- email -->
          <el-tooltip
            content="第二步，一封验证码邮件已发送至您的默认默认邮箱"
            :hide-after="120000"
            effect="light"
            placement="left"
          >
            <el-form-item prop="email" label="邮箱">
              <el-input disabled v-model="email"></el-input>
            </el-form-item>
          </el-tooltip>
          <!-- code  -->
          <el-tooltip
            content="第三步 输入您获取的验证码"
            :hide-after="120000"
            effect="light"
            placement="left"
          >
            <el-form-item label="邮箱验证码" prop="code">
              <el-input v-model="modifyDate.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-tooltip>

          <!-- pass -->
          <el-form-item label="新密码" prop="pass">
            <el-input
              type="password"
              v-model="modifyDate.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input
              type="password"
              v-model="modifyDate.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item size="large" class="subtn">
            <el-button
              type="primary"
              style="width: 120px"
              @click="submitForm('forgetPWD')"
              >提 交</el-button
            >
            <el-button @click="go()">返 回 登 录</el-button>
            <!-- <el-button @click="resetForm('forgetPWD')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'forgetPW',
  methods: {
    go () {
      this.$router.push('/')
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 提交新密码和code
          await this.$http
            .post('/updatePassword', {
              userId: this.modifyDate.userId,
              code: this.modifyDate.code,
              password: this.modifyDate.pass
            })
            .then((res) => {
              if (res.data.resultCode === 1) {
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.$router.push('/')
              } else {
                this.$message({
                  showClose: true,
                  message: '修改失败，后台繁忙。' + '(' + res.data.data + ')',
                  type: 'error'
                })
                this.$router.push(0)
              }
            })
        } else {
          alert('输入信息有误，请检查输入信息')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 按钮读秒
    second () {
      const TIME_COUNT = 60
      this.count = TIME_COUNT
      this.timer = window.setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          // 倒计时时不可点击
          this.isDisabled = true
          // 计时秒数
          this.count--
          // 更新按钮的文字内容
          this.content = this.count + 's后重新获取'
        } else {
          // 倒计时完，可点击
          this.isDisabled = false
          // this.userIdDisable = false;
          // 更新按钮文字内容
          this.content = '获取邮箱验证码'
          // 清空定时器!!!
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    // 获取验证码
    async getCode () {
      // jsx
      // 控制倒计时及按钮是否可以点击
      if (this.modifyDate.userId === '') {
        alert('请先输入账号')
        return
      }
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      // 获取验证码，回显邮箱
      const res = await this.$http
        .post('/sendCode', {
          userId: this.modifyDate.userId
        })
        .then((res) => {
          if (res.data.resultCode === 1) {
            // 回显邮箱
            this.email = res.data.data
            this.userIdDisable = true
            this.second()
            this.$message({
              showClose: true,
              message: '验证码已经发送至邮箱，请查收',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '验证码发送失败，后台繁忙' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          console.log(res)
          alert('服务器出错了')
        })
    }
  },
  data () {
    var checkUserId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.modifyDate.checkPass !== '') {
          this.$refs.forgetPWD.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.modifyDate.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      content: '查询邮箱并获取验证码',
      email: '',
      userIdDisable: false,
      isDisabled: false,
      count: '',
      timer: null,
      modifyDate: {
        userId: '',
        code: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        code: [{ required: true, validator: validateCode, trigger: 'blur' }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        userId: [{ required: true, validator: checkUserId, trigger: 'blur' }]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.subtn {
  text-align: center;
}
.title {
  display: flex;
  justify-content: center;
  font-size: 25px;
}
/deep/.body {
  height: 40%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.box-body {
  width: 800px;
  // display: flex;
  // justify-content:center
}
// /deep/.el-card__body {
//   width: 900px;
//   margin: 250px auto;
// }
.box-card {
  width: 840px;
  margin: 2px auto;
  margin-top: 15px;
}
.get-Code {
  margin-top: 20px;
}
.sumbit {
  display: flex;
  justify-content: center;
}
</style>
