<template>
  <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}" :lg="{span:18,offset:3}" :xl="{span:22,offset:1}">
    <el-alert
      :title=this.msg
      type="info"
      show-icon>
    </el-alert>
    <el-form :item="formList" ref="formAns" :model="formAns" label-width="60%" label-position="left" :rules="myrules">
      <el-form-item v-for="(question,index) in formList"
                    :label="question.label"
                    :key="index"
                    :rules="{ required: true, message: '不能为空', trigger: 'blur' }"
                    :prop="'questions.'+index">
        <el-radio-group v-model="formAns.questions[index]" >
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item  prop="advice"
        :rules=" { min: 5, max: 100, message: '意见建议的长度应该为5到100个字', trigger: 'blur' }">
        <span slot="label">
          <span class="span-box">
            <i class="al-iconfont">&#xe61e;</i>
            <span>意见建议 (可选填)</span>
          </span>
        </span>
        <el-input type="textarea" style="width: 500px"  :rows="3" :cols="20" v-model="formAns.advice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formAns')">提交</el-button>
        <el-button type="info" @click="reset('formAns')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
export default {
  name: 'MainEvaluationDetail',
  data () {
    return {
      msg: 'A代表5分，B代表4分，C代表3分，D代表2分，分数越高代表该老师此项做的越好',
      formAns: {
        questions: [],
        advice: ''
      },
      myrules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      },
      formList: [],
      // formList: [{
      //   'label': '讲课思路和概念清楚，容易听懂'
      // }, {
      //   'label': '教师上课认真，课堂纪律好'
      // }],
      advice: ''
    }
  },
  created () {
    this.formList = []
    let _this = this
    _this.$http.post('/getCurrentTerm').then(res => {
      // console.log(res.data.data)
      let termId = res.data.data.termId
      _this.$http.post('/student/getTermTargets', {
        'termId': termId
      }).then(res => {
        // console.log(res)
        for (var i = 0; i < res.data.data.length; i++) {
          _this.formList.push({
            label: res.data.data[i].targetContent,
            weight: res.data.data[i].weight
          })
          // console.log(res.data.data[i].targetContent)
        }
        // console.log(_this.formList)
      })
    })
    for (var i = 0; i < _this.formList.length; i++) {
      _this.formAns.questions.push({
        value: '',
        key: Date.now()
      })
    }
    // console.log(_this.formAns.questions)
    // this.$notify({
    //   title: '提示',
    //   message: 'A代表5分，B代表4分，C代表3分，D代表2分，分数越高代表该老师此项做的越好',
    //   // A＝5  B＝4  C＝3 D＝2
    //   duration: 0,
    //   position: 'top-left',
    //   offset: 100,
    //   type: 'warning'
    // })
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          var sum = 0
          var totalweight = 0
          for (var i = 0; i < this.formAns.questions.length; i++) {
            var v = 0
            console.log(this.formList[i].weight)
            if (this.formAns.questions[i] === 'A') {
              v = 5
            } else if (this.formAns.questions[i] === 'B') {
              v = 4
            } else if (this.formAns.questions[i] === 'C') {
              v = 3
            } else {
              v = 2
            }
            totalweight = totalweight + this.formList[i].weight
            sum = sum + this.formList[i].weight * v
          }
          // console.log(sum)
          // console.log('success!')
          // console.log(this.formAns)
          let url = window.location.search
          var str = url.substr(1)
          var strs = str.split('&')
          var theRequest = {}
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
          }
          // console.log(theRequest['tcId'])
          let _this = this
          _this.$http.post('/student/postAssess', {
            'studentNo': _this.$cookies.get('account'),
            'tcId': theRequest['tcId'],
            'appraiseScore': sum / (totalweight), // 由前端计算得出
            'appraiseContent': this.formAns.advice
          }).then(res => {
            // console.log(res)
            if (res.data.resultCode === 1) {
              this.$message({
                message: '评教成功！',
                type: 'success'
              })
              this.$router.go(-1)
            } else {
              if (res.data.data === 'Already Assessed!') {
                this.$message({
                  message: '请勿重复提交',
                  type: 'warning'
                })
              } else {
                this.$message.error('服务器错误')
              }
            }
          })
        } else {
          // console.log('error submit!!')
          // console.log(this.formAns)
          return false
        }
      })
    },
    reset (forName) {
      // this.$refs[forName].resetFields()
      this.formAns.questions = {}
      this.formAns.advice = ''
    }
  }
}
</script>

<style scoped>
  el-form-item{
    align:"center"
  }
</style>
<style>
  .el-message-box {
    width: 150px;
  }
</style>
