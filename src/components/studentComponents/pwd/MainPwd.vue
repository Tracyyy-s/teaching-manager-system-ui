<template>
<!--  外层:xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}" :lg="{span:18,offset:3}" :xl="{span:22,offset:1}"-->
  <el-row>
    <el-col :xs="{span:20}" :sm="{span:18}" :md="{span:16}" :lg="{span:18}" :xl="{span:22}">
      <div class="grid-content bg-purple">
        <div>
          <el-form :model="emailForm" status-icon :rules="rules2" ref="emailForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
              prop="email"
              label="邮箱"
            >
              <el-input disabled v-model="emailForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="submitForm2('emailForm')" v-if="!emailForm.isDisabled">{{emailForm.content}}</el-button>
              <el-button type="primary" plain disabled v-if="emailForm.isDisabled">{{emailForm.content}}</el-button>
            </el-form-item>
          </el-form>
          <el-form :model="ruleForm" :disabled="!use_submit" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="验证码" prop="vrCode">
              <el-input v-model="ruleForm.vrCode"></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码" prop="pass">
              <el-input type="password" auto-complete="new-password" v-model="ruleForm.pass"></el-input>
            </el-form-item>
            <el-form-item label="重新输入密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>
<!--    <el-col :span="4">-->
<!--      <div class="grid-content bg-purple-light">-->
<!--      </div>-->
<!--    </el-col>-->
    <el-col :xs="{span:4}" :sm="{span:5}" :md="{span:5}" :lg="{span:5}" :xl="{span:2}">
      <div class="grid-content bg-purple-light">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'MainPwd',
  created () {
    let _this = this
    _this.$http.post('/student/getStudentInfo', {
      'studentNo': _this.$cookies.get('account')
    }).then(res => {
      console.log(res.data.data.email)
      _this.emailForm.email = res.data.data.email
    })
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      use_submit: false,
      emailForm: {
        email: '',
        isDisabled: false, // 控制按钮是否可以点击（false:可以点击，true:不可点击）
        content: '获取验证码', // 发送验证码按钮的初始显示文字
        timer: null,
        count: ''
      },
      ruleForm: {
        pass: '',
        vrCode: '',
        checkPass: ''
      },
      // 时间线
      reverse: false,
      activities: [{
        content: '点击发送验证码按钮'
        // timestamp: '2018-04-15'
      }, {
        content: '服务器发送验证码到用户邮箱'
        // timestamp: '2018-04-13'
      }, {
        content: '用户前往邮箱查看验证码'
        // timestamp: '2018-04-11'
      }, {
        content: '将邮箱收到的验证码填入'
      }, {
        content: '输入新的密码'
      }, {
        content: '再次输入新密码'
      }, {
        content: '点击提交后可进行密码修改'
      }],
      // 时间线end
      rules: {
        vrCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码长度错误', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 15, message: '密码应该为6-15位', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      rules2: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          console.log(this.ruleForm.pass)
          console.log(this.ruleForm.vrCode)
          let _this = this
          _this.$http.post('/student/updatePassword', {
            'studentNo': _this.$cookies.get('account'),
            'password': _this.ruleForm.pass,
            'vrCode': _this.ruleForm.vrCode
          }).then(res => {
            console.log(res.data.resultCode)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this
          _this.$http.post('/student/sendCode', {
            'studentNo': _this.$cookies.get('account')
            // 'studentNo':" 2018110145"
          }).then(res => {
            if (res.data.resultCode === 1) {
              // 回显邮箱
              _this.use_submit = true
              alert('已成功发送验证码，请前往邮箱查看')
              console.log(this.emailForm.email)
              // 控制倒计时及按钮是否可以点击
              const TIME_COUNT = 60
              this.emailForm.count = TIME_COUNT
              this.emailForm.timer = window.setInterval(() => {
                if (this.emailForm.count > 0 && this.emailForm.count <= TIME_COUNT) {
                  // 倒计时时不可点击
                  this.emailForm.isDisabled = true
                  // 计时秒数
                  this.emailForm.count--
                  // 更新按钮的文字内容
                  this.emailForm.content = this.emailForm.count + 's后重新获取'
                } else {
                  // 倒计时完，可点击
                  this.emailForm.isDisabled = false
                  // 更新按钮文字内容
                  this.emailForm.content = '获取短信验证码'
                  // 清空定时器!!!
                  clearInterval(this.timer)
                  this.emailForm.timer = null
                }
              }, 1000)
            } else {
              this.$message({
                showClose: true,
                message: '验证码发送失败，后台繁忙' + '(' + res.data.data + ')',
                type: 'warning'
              })
            }
            // console.log(res.data.resultCode)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  /*.el-row {*/
  /*  margin-bottom: 20px;*/
  /*  &:last-child {*/
  /*   margin-bottom: 0;*/
  /*  }*/
  /*}*/
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: white;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: white;
  }
  /*.grid-content {*/
  /*  !*border-radius: 4px;*!*/
  /*  min-height: 36px;*/
  /*}*/
  .row-bg {
    padding: 10px 0;
    /*background-color: #f9fafc;*/
  }
</style>
