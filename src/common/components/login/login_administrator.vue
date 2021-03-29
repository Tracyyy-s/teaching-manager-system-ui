<!--<template>-->
<!--  <div v-loading="loading">-->
<!--    &lt;!&ndash; 标题 &ndash;&gt;-->
<!--    <div class="small-title">管理员登录页面</div>-->
<!--    <el-divider></el-divider>-->
<!--    &lt;!&ndash; 输入框外框 &ndash;&gt;-->
<!--    <div class="mylogin-form">-->
<!--      &lt;!&ndash; 表单内容 &ndash;&gt;-->
<!--      &lt;!&ndash; label-width="120px" &ndash;&gt;-->
<!--      &lt;!&ndash; 注意el-form里面的prop绑定的tqms_loginData数据集才能被下面的item-input拿到，不在tqms_loginData中的数据不能对item-input进行双向绑定 &ndash;&gt;-->
<!--      &lt;!&ndash;    &ndash;&gt;-->
<!--      <el-form-->
<!--        :model="tqms_loginData"-->
<!--        ref="tqms_loginRef"-->
<!--        status-icon-->
<!--        :rules="tqms_loginRules"-->
<!--        label-position="left"-->
<!--      >-->
<!--        &lt;!&ndash; 学工学号 &ndash;&gt;-->
<!--        &lt;!&ndash; Prop要和rules的字段对应，而非data里面的字段对应 &ndash;&gt;-->
<!--        <el-form-item label="账号:" prop="adminNo">-->
<!--          <el-input-->
<!--            clearable-->
<!--            prefix-icon="el-icon-user"-->
<!--            v-model="tqms_loginData.adminNo"-->
<!--            type="text"-->
<!--            name="adminNo"-->
<!--            placeholder="请输入您的账号"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码:" prop="password">-->
<!--          &lt;!&ndash; clearable,是否可以清除的按钮，在input之内 &ndash;&gt;-->
<!--          <el-input-->
<!--            prefix-icon="el-icon-lock"-->
<!--            v-model="tqms_loginData.password"-->
<!--            type="password"-->
<!--            name="password"-->
<!--            placeholder="请输入密码"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="验证码" prop="verification">-->
<!--          <el-input-->
<!--            class="checkcode"-->
<!--            prefix-icon="el-icon-key"-->
<!--            v-model="tqms_loginData.verification"-->
<!--            type="text"-->
<!--            name="verification"-->
<!--            placeholder="请输入验证码"-->
<!--          />-->
<!--          <span class="code" @click="refreshCode">-->
<!--            <SIdentify :identifyCode="identifyCode"></SIdentify>-->
<!--          </span>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <div class="myform-button">-->
<!--            &lt;!&ndash; @click= "submitLogin" &ndash;&gt;-->
<!--            <el-button type="primary" @click="login('tqms_loginRef')"-->
<!--              >登录</el-button-->
<!--            >-->
<!--            <el-button type="info" @click="forgetPassword()"-->
<!--              >忘记密码</el-button-->
<!--            >-->
<!--          </div>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import SIdentify from '@/common/components/login/identify.vue'-->
<!--export default {-->
<!--  name: 'login_non_administrator',-->
<!--  data () {-->
<!--    var validatePass = (rule, value, callback) => {-->
<!--      const patt = '^[0-9a-zA-Z_]{1,}$'-->
<!--      if (value === '') {-->
<!--        callback(new Error('请输入密码'))-->
<!--      }-->
<!--      // else if(patt.test(value)){-->
<!--      //     callback(new Error('密码只能由下划线数字字母组成'))-->
<!--      // }-->
<!--      else {-->
<!--        callback()-->
<!--      }-->
<!--    }-->
<!--    //-->
<!--    var validateCode = (rule, value, callback) => {-->
<!--      if (value !== this.identifyCode) {-->
<!--        // console.log("value:"+value)-->
<!--        // console.log("identifyCode::"+this.identifyCode)-->
<!--        callback(new Error('请输入正确的验证码'))-->
<!--      } else {-->
<!--        callback()-->
<!--      }-->
<!--    }-->
<!--    return {-->
<!--      loading: false,-->
<!--      identifyCodes: 'abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQ',-->
<!--      identifyCode: '',-->
<!--      tqms_loginData: {-->
<!--        adminNo: '10002',-->
<!--        password: '123456',-->
<!--        verification: ''-->
<!--      },-->
<!--      tqms_loginRules: {-->
<!--        adminNo: [-->
<!--          { required: true, message: '请输入您的管理员账号', trigger: 'blur' },-->
<!--          {-->
<!--            min: 4,-->
<!--            max: 13,-->
<!--            message: '输入有误，请检查账号和密码',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ],-->
<!--        password: [-->
<!--          {-->
<!--            min: 6,-->
<!--            max: 15,-->
<!--            message: '输入有误，请检查账号和密码是否正确',-->
<!--            trigger: 'blur'-->
<!--          },-->
<!--          { required: true, validator: validatePass, trigger: 'blur' }-->
<!--        ],-->
<!--        verification: [-->
<!--          // { required: true, message: '请输入验证码', trigger: 'blur' },-->
<!--          { required: true, validator: validateCode, trigger: 'blur' }-->
<!--        ]-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    this.identifyCode = ''-->
<!--    this.makeCode(this.identifyCodes, 4)-->
<!--  },-->
<!--  methods: {-->
<!--    // createCode(){-->
<!--    //     var str ='abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQ';-->
<!--    //     var arr = str.split('');-->
<!--    //     var code = '';-->
<!--    //     for(var i = 0 ; i < 4 ;i++){-->
<!--    //         var ranIdx =parseInt(Math.random()*arr.length);-->
<!--    //         code+=arr[ranIdx];-->
<!--    //     }-->
<!--    // }-->
<!--    randomNum (min, max) {-->
<!--      return Math.floor(Math.random() * (max - min) + min)-->
<!--    },-->
<!--    refreshCode () {-->
<!--      this.identifyCode = ''-->
<!--      this.makeCode(this.identifyCodes, 4)-->
<!--    },-->
<!--    makeCode (o, l) {-->
<!--      for (let i = 0; i < l; i++) {-->
<!--        this.identifyCode += this.identifyCodes[-->
<!--          this.randomNum(0, this.identifyCodes.length)-->
<!--        ].toLowerCase()-->
<!--      }-->
<!--      console.log(this.identifyCode)-->
<!--    },-->
<!--    login (tqms_loginRef) {-->
<!--      // 通过form的ref拿到el-from的引用，调用validate方法进行对各个输入字段的rules校验-->
<!--      // validate方法参数是一个回调函数，会在校验结束时调用，返回两个参数，第一个是否成功，第二个未通过的字段-->
<!--      this.$refs[tqms_loginRef].validate(async (value) => {-->
<!--        if (value) {-->
<!--          this.loading = true-->
<!--          const res = await this.$http.post('/admin/login', {-->
<!--            adminNo: this.tqms_loginData.adminNo,-->
<!--            password: this.tqms_loginData.password-->
<!--          })-->
<!--          // 待删除-->
<!--          console.log(res)-->
<!--          if (res.data.resultCode === 1) {-->
<!--            // 待修改 复制到管理员登陆页面后-->
<!--            this.$cookies.set('adminNo', this.tqms_loginData.adminNo)-->
<!--            // sessionStorage.token = this.tqms_loginData.adminNo-->
<!--            this.$message({-->
<!--              showClose: true,-->
<!--              message: '登录成功',-->
<!--              type: 'success'-->
<!--            })-->
<!--            // 跳转-->
<!--            if (res.data.data.role === 'root') {-->
<!--              this.$router.push('/rootIndex')-->
<!--            } else {-->
<!--              this.$router.push('/adminIndex')-->
<!--            }-->
<!--            this.loading = false-->
<!--          } else {-->
<!--            this.$message({-->
<!--              showClose: true,-->
<!--              message: '请检查输入信息',-->
<!--              type: 'error'-->
<!--            })-->

<!--            this.loading = false-->
<!--          }-->
<!--        } else {-->
<!--          this.$message({-->
<!--            showClose: true,-->
<!--            message: '请检查输入信息',-->
<!--            type: 'warning'-->
<!--          })-->
<!--          this.loading = false-->
<!--        }-->
<!--        this.loading = false-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  components: {-->
<!--    SIdentify-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style lang='less' scoped>-->
<!--/* scoped */-->
<!--/* 师生登录标题 */-->
<!--.small-title {-->
<!--  text-align: center;-->
<!--  border: 0px;-->
<!--  margin: 0px;-->
<!--  padding-bottom: 0px;-->
<!--  font-size: 25px;-->
<!--}-->

<!--/* 直接给el-input添加class，修改样式改不起效果 */-->
<!--/* 需要改动element自动生成的input标签，叫做el-input__inner，对其修改 */-->
<!--/* .myinput{-->
<!--    border: none;-->
<!--    outline: none;-->
<!--    border-bottom: solid 1px black;-->
<!--} */-->
<!--/* 标签大小 */-->
<!--/deep/ .el-form-item__label {-->
<!--  height: 1%;-->
<!--  width: 70%;-->
<!--  font-size: 18px;-->
<!--  margin: 0px 0px 0px 0px;-->
<!--  line-height: 20px;-->
<!--}-->
<!--/deep/ .el-button {-->
<!--  padding-top: 8px;-->
<!--  padding-bottom: 8px;-->
<!--}-->
<!--/deep/ .el-input__prefix {-->
<!--  height: 12px;-->
<!--}-->
<!--// input 框内容大小-->
<!--/deep/ .el-input__inner {-->
<!--  height: 20px;-->
<!--  border: none;-->
<!--  outline: none;-->
<!--  border-bottom: solid 1px black;-->
<!--  padding-left: 28px;-->
<!--  font-size: 2px;-->
<!--}-->
<!--// 密码和输入框整体的盒子-->
<!--/deep/ .el-form-item {-->
<!--  margin-top: 20px;-->
<!--  margin-bottom: 25px;-->
<!--}-->
<!--//密码和输入框的距离-->
<!--/deep/ .el-form-item__content {-->
<!--  line-height: 32px;-->
<!--}-->
<!--/deep/ .el-input__inner:hover {-->
<!--  font-size: 18px;-->
<!--}-->
<!--/deep/ .el-input__icon {-->
<!--  width: 17px;-->
<!--  font-size: 8px;-->
<!--}-->
<!--/deep/ .el-button&#45;&#45;primary {-->
<!--  width: 30%;-->
<!--  font-size: 15px;-->
<!--  text-align: center;-->
<!--}-->
<!--/deep/ .el-form-item__content {-->
<!--  text-align: left;-->
<!--}-->
<!--/deep/ .el-form-item__error {-->
<!--  font-size: 12px;-->
<!--}-->
<!--/deep/ .el-divider {-->
<!--  margin: 8px;-->
<!--}-->
<!--//验证码输入框框-->
<!--.checkcode {-->
<!--  width: 200px;-->
<!--}-->
<!--//为了能使各个表单居中-->
<!--.myform-button {-->
<!--  text-align: center;-->
<!--  // height: 50px;-->
<!--  margin-top: -5px;-->
<!--}-->

<!--.code {-->
<!--  position: absolute;-->
<!--  right: 30px;-->
<!--  bottom: 0px;-->
<!--  margin: 0px;-->
<!--  width: 80px;-->
<!--  height: 40px;-->
<!--}-->
<!--</style>-->
