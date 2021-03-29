<template>
  <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}" :lg="{span:18,offset:3}" :xl="{span:22,offset:1}">
    <el-alert title="A代表5分，B代表4分，C代表3分，D代表2分，分数越高代表该老师此项做的越好" type="info">
    </el-alert>

    <el-form :item="formList" ref="formAns" :model="formAns" label-width="400px" label-position="left">

      <el-form-item v-for="(question,index) in formList" :label="question.label" :key="index" :rules="{
                      required: true, message: '不能为空', trigger: 'blur'
                    }"
        :prop="'questions.'+index">
        <el-radio-group v-model="formAns.questions[index]">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item label="督导意见建议" prop="advice"
        :rules=" { min: 5, max: 100, message: '意见建议的长度应该为5到100个字', trigger: 'blur' }">
        <el-input type="textarea" style="width: 500px" :rows="3" :cols="20" v-model="formAns.advice"></el-input>
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
    data() {
      return {
        formAns: {
          questions: [],
          advice: ''
        },
        formList: [],
        termId: null,

        advice: ''
      }
    },
    created() {
      this.formList = []
      let _this = this
      _this.$http.post('/getCurrentTerm').then(res => {
        let termId = res.data.data.termId
        this.termId = termId
        _this.$http.post('/leader/getTermTargets', {
          'termId': termId
        }).then(res => {
          // console.log('---------------------------')
          // console.log(res.data.resultCode)

          if (res.data.resultCode == 1) {
            //获取评价指标成功
            for (var i = 0; i < res.data.data.length; i++) {
              _this.formList.push({
                label: res.data.data[i].targetContent,
                weight: res.data.data[i].weight,
              })
              // console.log(res.data.data[i].targetContent)
            }
          } else {
            if (res.data.data == 'Not Publish Yet') {
              this.$message({
                message: '尚未发布',
                type: 'warning'
              })
            } else if (res.data.data == 'Too Late') {
              this.$message({
                message: '已开始',
                type: 'warning'
              })
            } else if (res.data.data == 'Too Early') {
              this.$message({
                message: '已结束',
                type: 'warning'
              })
            }

          }
          //获取评价指标有问题

          // console.log(_this.formList)
        })
      })
      for (var i = 0; i < _this.formList.length; i++) {
        _this.formAns.questions.push({
          value: '',
          key: Date.now()
        })
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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

            let url = window.location.search
            var str = url.substr(1)
            var strs = str.split('&')
            var theRequest = {}
            for (var i = 0; i < strs.length; i++) {
              theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
            }

            let _this = this
            _this.$http.post('/leader/postAssess', {


              'teacherNo': _this.$cookies.get('account'),
              'assessedTeacherNo': theRequest['teacherNo'],
              'termId': this.termId,
              'appraiseScore': sum * 1.0 / (totalweight * 1.0), // 由前端计算得出
              'appraiseContent': this.formAns.advice
            }).then(res => {
              // console.log(res)
              if (res.data.resultCode === 1) {
                this.$message({
                  message: '评教成功！',
                  type: 'success'
                })
              } else {
                if (res.data.data === 'Already Exist') {
                  this.$message({
                    message: '请勿重复提交',
                    type: 'warning'
                  })
                } else {
                  this.$message.error('繁忙')
                }
              }
            })
          } else {
            console.log('error submit!!')
            console.log(this.formAns)
            return false
          }
        })
      },
      reset(forName) {
        this.formAns.questions = {}
        this.formAns.advice = ''
      }
    }
  }
</script>

<style scoped>
  el-form-item {
    align: "center"
  }
</style>
<style>
  .el-message-box {
    width: 150px;
  }
</style>
