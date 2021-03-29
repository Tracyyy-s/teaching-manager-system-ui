<template>
  <div>
    <el-form :model="emailForm" status-icon :rules="rules2" ref="emailForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="email" label="邮箱">
        <el-input disabled v-model="emailForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="submitForm2('emailForm')" v-if="!emailForm.isDisabled">{{emailForm.content}}</el-button>
        <el-button type="primary" plain disabled v-if="emailForm.isDisabled">{{emailForm.content}}</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="ruleForm" :disabled="!use_submit" status-icon :rules="rules" ref="ruleForm" label-width="100px"
      class="demo-ruleForm">
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
        <el-button type="primary" @click="onSubmit('formAns')">提交</el-button>
        <el-button type="info" @click="reset('formAns')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MainPwd',
  created () {
    let _this = this
    _this.$http.post('/teacher/getUserInfo', {
      'userId': _this.$cookies.get('account')
    }).then(res => {
      // console.log('begin:   ')
      // console.log(res)
      // console.log(res.data.data.email)
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
      rules: {
        vrCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 6,
          message: '验证码长度错误',
          trigger: 'blur'
        }
        ],
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        },
        {
          min: 6,
          max: 15,
          message: '密码应该为6-15位',
          trigger: 'blur'
        }
        ],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      },
      rules2: {
        email: [{
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change']
        }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // 更改密码 button 提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          // console.log(this.ruleForm.pass)
          // console.log(this.ruleForm.vrCode)
          let _this = this
          _this.$http.post('/teacher/updatePassword', {
            'userId': _this.$cookies.get('account'),
            'password': _this.ruleForm.pass,
            'vrCode': _this.ruleForm.vrCode
          }).then(res => {
            // console.log(res.data.resultCode)
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    submitForm2 (formName) {
      // 获取验证码button 获取验证码
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this
          _this.$http.post('/teacher/sendCode', {
            userId: _this.$cookies.get('account')

          }).then(res => {
            console.log(res.data.resultCode)
          })
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
          // console.log('error submit!!')
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

</style>
