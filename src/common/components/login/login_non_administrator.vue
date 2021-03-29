<template>
  <div v-loading="loading">
    <!-- 标题 -->
    <!-- <div class="small-title">师生登录</div> -->
    <!-- <el-divider></el-divider> -->
    <!-- 输入框外框 -->
    <div class="mylogin-form" @keyup.enter="login('tqms_loginRef')">
      <!-- 表单内容 -->
      <!-- label-width="120px" -->
      <!-- 注意el-form里面的prop绑定的tqms_loginData数据集才能被下面的item-input拿到，不在tqms_loginData中的数据不能对item-input进行双向绑定 -->
      <!--    -->

      <el-form
        :disabled="countlimitedflag"
        :model="tqms_loginData"
        ref="tqms_loginRef"
        status-icon
        :rules="tqms_loginRules"
        label-position="left"
      >
        <!-- 学工学号 -->
        <!-- Prop要和rules的字段对应，而非data里面的字段对应 -->
        <el-form-item label="学号 / 工号:" prop="account">
          <el-input
            clearable
            prefix-icon="el-icon-user"
            v-model="tqms_loginData.account"
            type="text"
            name="account"
            placeholder="请输入您的学号或工号"
          />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <!-- clearable,是否可以清除的按钮，在input之内 -->
          <el-input
            prefix-icon="el-icon-lock"
            v-model="tqms_loginData.password"
            type="password"
            name="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="verification">
          <el-input
            class="checkcode"
            prefix-icon="el-icon-key"
            v-model="tqms_loginData.verification"
            type="text"
            name="verification"
            placeholder="请输入验证码"
          />
          <span class="code" @click="refreshCode">
            <SIdentify :identifyCode="identifyCode"></SIdentify>
          </span>
        </el-form-item>
        <el-form-item>
          <div class="myform-button">
            <!-- @click= "submitLogin" -->
            <el-button type="primary" @click="login('tqms_loginRef')"
              >登 录</el-button
            >
            <el-button type="info" @click="forgetPassword()"
              >忘 记 密 码</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <el-progress
        :percentage="prog"
        v-if="progTF"
        status="warning"
      ></el-progress>
    </div>
  </div>
</template>
<script>
import SIdentify from '@/common/components/login/identify.vue'
import { encrypt, decrypt } from '@/apis/encryption'
export default {
  name: 'login_non_administrator',
  data () {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      }
      if (!this.xssTestPassed(value)) {
        callback(new Error('账号只能由下划线、数字、字母、$等组成'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      if (!this.xssTestPassed(value)) {
        callback(new Error('密码只能由下划线、数字、字母、$等组成'))
      }
      callback()
    }
    var validateCode = (rule, value, callback) => {
      if (value !== this.identifyCode) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      progTF: false,
      prog: null,
      content: '',
      count: '',
      timer: null,
      countlimitedflag: false,
      loading: false,
      identifyCodes: 'abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQ',
      identifyCode: '',
      tqms_loginData: {
        account: '10000',
        password: '123456',
        verification: ''
      },
      tqms_loginRules: {
        account: [
          {
            min: 3,
            max: 13,
            message: '输入有误，请检查账号和密码',
            trigger: 'blur'
          },
          { required: true, validator: validateAccount, trigger: 'blur' }
        ],
        password: [
          {
            min: 6,
            max: 15,
            message: '输入有误，请检查账号和密码是否正确',
            trigger: 'blur'
          },
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        verification: [
          { required: true, validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // this.$cookies.config(0)
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ].toLowerCase()
      }
      console.log(this.identifyCode)
    },
    forgetPassword () {
      this.$router.push('/forgetPW')
    },
    // 次数限制
    loginlimit () {
      var c
      if ($cookies.isKey('countLimited')) {
        c = $cookies.get('countLimited') - 0
        c = c + 1
        $cookies.set('countLimited', c)
      } else {
        c = 1
        $cookies.set('countLimited', c)
      }
      if (c % 3 === 0) {
        this.second(15)
      } else {
        // 每次提醒 这是第'+c+'次输入信息错误，
        this.$alert('连续错误将被限制登录', '请确认', {
          confirmButtonText: '确定'
        })
      }
    },
    second (t) {
      const TIME_COUNT = t
      this.count = TIME_COUNT
      this.timer = window.setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          // 倒计时时不可点击
          this.progTF = true
          this.countlimitedflag = true
          // 计时秒数
          this.count--
          // 更新按钮的文字内容
          this.content = this.count + 's后重新输入'
          // this.prog = this.count
          this.prog = Math.ceil((1 - this.count / t) * 100)
          // this.$notify({
          //   title: '提示',
          //   message: this.content,
          //   duration: 1000
          // });
        } else {
          // 倒计时完，可点击
          this.progTF = false
          this.countlimitedflag = false
          // 更新按钮文字内容
          this.content = ''
          // 清空定时器!!!
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    // xss检测
    xssTestPassed (s) {
      let regEn = /[`~!@#$%^&*()_+<>?:"{}.\/;'[\]]/
      let regCn = /[·！#￥（——）：；“”‘、|《。》？、【】[\]]/
      if (regEn.test(s) || regCn.test(s)) {
        return false
      } else {
        return true
      }
    },
    login (tqms_loginRef) {
      var flag = 0
      // 通过form的ref拿到el-from的引用，调用validate方法进行对各个输入字段的rules校验
      // validate方法参数是一个回调函数，会在校验结束时调用，返回两个参数，第一个是否成功，第二个未通过的字段
      this.$refs[tqms_loginRef].validate(async (value) => {
        this.loading = true
        if (value) {
          await this.$http
            .post('/login', {
              account: this.tqms_loginData.account,
              password: this.tqms_loginData.password
            })
            .then((res) => {
              if (res.data.resultCode === 1) {
                // 开发版本，cookies携带登录信息,暂时是account，后期改为加密token
                // this.$cookies.set("account", this.tqms_loginData.account);
                sessionStorage.setItem('token', res.headers.authorization)
                this.$cookies.remove('countLimited')
                // sessionStorage.getItem("token")
                // sessionStorage.removeItem("token")
                // sessionStorage.token = this.tqms_loginData.account
                // 存入vuex--留做学习参考
                // for(var i = 0 ; i < res.data.data.length ; i++){
                // store.commit("getMenuList",res.data.data[i])
                // console.log(res.data.data[i])
                // }
                // store.commit("getMenuList", res.data.data.menuList);
                this.$message({
                  showClose: true,
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push('/index')
                flag = 1
                this.loading = false
              } else {
                this.$message({
                  showClose: true,
                  message: '请检查输入信息' + '(' + res.data + ')',
                  type: 'error'
                })
                this.refreshCode()
                this.loading = false
              }
            })
            .catch((res) => {
              console.log(res)
              flag = 1
              this.$message({
                showClose: true,
                message: '登录失败，服务器错误。' + '(' + res.data + ')',
                type: 'error'
              })
              this.loading = false
            })
          // 验证都没通过
        } else {
          this.$message({
            showClose: true,
            message: '请检查输入信息，验证未通过',
            type: 'warning'
          })
          this.refreshCode()
          this.loading = false
        }
        if (flag !== 1) {
          this.loginlimit()
        }
        this.refreshCode()
        this.loading = false
      })
    }
  },
  components: {
    SIdentify
  }
}
</script>
<style lang='less' scoped>
/* scoped */
/* 师生登录标题 */
.small-title {
  text-align: center;
  border: 0px;
  margin: 0px;
  padding-bottom: 0px;
  font-size: 25px;
}

/* 标签大小 */
/deep/ .el-form-item__label {
  height: 1%;
  width: 70%;
  font-size: 18px;
  margin: 0 0 0 0;
  line-height: 20px;
}
/deep/ .el-button {
  padding-top: 8px;
  padding-bottom: 8px;
}
/deep/ .el-input__prefix {
  height: 12px;
}
// input 框内容大小
/deep/ .el-input__inner {
  height: 20px;
  border: none;
  outline: none;
  border-bottom: solid 1px black;
  padding-left: 28px;
  font-size: 2px;
}
// 密码和输入框整体的盒子
/deep/ .el-form-item {
  margin-top: 20px;
  margin-bottom: 25px;
}
//密码和输入框的距离
/deep/ .el-form-item__content {
  line-height: 32px;
}
/deep/ .el-input__inner:hover {
  font-size: 18px;
}
/deep/ .el-input__icon {
  width: 17px;
  font-size: 8px;
}
/deep/ .el-button--primary {
  width: 30%;
  // height: 20%;
  font-size: 15px;
  text-align: center;
}
/deep/ .el-form-item__content {
  text-align: left;
}
/deep/ .el-form-item__error {
  font-size: 12px;
}
/deep/ .el-divider {
  margin: 8px;
}
//验证码输入框框
.checkcode {
  width: 200px;
}
//为了能使各个表单居中
.myform-button {
  text-align: center;
  // height: 50px;
  margin-top: -5px;
}

.code {
  position: absolute;
  right: 30px;
  bottom: 0;
  margin: 0;
  width: 80px;
  height: 40px;
}
</style>
