<template>
  <div>
<!--    目前未在评价时间段内-->
    <el-alert v-if="!isShow"
              type="error"
              show-icon>
    <span slot="title">
      <span>当前学期为:{{this.termName}},</span>
      <span>目前未在评价时间段内（尚未发布评教任务）</span>
    </span>
    </el-alert>
<!--    在评价时间段内-->
    <!--      <el-alert v-if="!isShow"-->
    <!--        title=""-->
    <!--        "-->
    <!--        show-icon>-->
    <!--      </el-alert>-->
    <MainEvaluation v-if="isShow"></MainEvaluation>
  </div>
</template>

<script>
import MyHeader from '@/components/studentComponents/header/Header.vue'
import MainEvaluation from '@/components/studentComponents/evaluation/MainEvaluationList.vue'
export default {
  name: 'Evaluation.vue',
  data () {
    return {
      courseList: [],
      isShow: true,
      termId: '',
      termName: ''
    }
  },
  created () {
    this.getIsShow()
    this.openVn()
  },
  methods: {
    getIsShow () {
      let _this = this
      _this.$http.post('/getCurrentTerm').then(res => {
        // console.log(res.data.data)
        _this.termId = res.data.data.termId
        _this.termName = res.data.data.termName
        _this.$http.post('/student/getTermTargets', {
          // 'studentNo': this.$cookies.get('account'),
          'termId': _this.termId
        }).then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.data.resultCode === 1) {
            _this.isShow = true
            _this.$store.state.evaluation_now = true
          } else {
            _this.isShow = false
            _this.$store.state.evaluation_now = false
          }
        })
      })
      // this.isShow = true
    },
    openVn () {
      // const h = this.$createElement
      // this.$message({
      //   message: h('p', null, [
      //     h('span', null, '你好，'),
      //     // h('i', { style: 'color: teal' }, this.$store.state.username)
      //     h('i', { style: 'color: teal' }, this.$store.state.username)
      //   ]),
      //   showClose: true
      // })
    }
  },
  components: {
    MainEvaluation, MyHeader
  }
}
</script>

<style scoped>

</style>
