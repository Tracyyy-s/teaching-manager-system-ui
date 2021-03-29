<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="{span:20,offset:2}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}" :lg="{span:18,offset:3}" :xl="{span:22,offset:1}">
        <el-form v-loading="loading" ref="form" :model="form" disabled :label-position="labelPosition" >
          <el-form-item label="学生名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年级">
            <el-input v-model="form.grade"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="form.institute"></el-input>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-input v-model="form.politicalStatus"></el-input>
          </el-form-item>
<!--          <el-form-item label="专业">-->
<!--            <el-input v-model="form.major"></el-input>-->
<!--          </el-form-item>-->
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="17">
        <el-button round @click="to('/Pwd')">
          <i class="el-icon-edit"></i>
          修改用户密码
        </el-button>
<!--        <el-button round><a href="/Pwd"> 修改用户密码 </a></el-button>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {
      loading: true,
      labelPosition: 'left',
      form: {
        name: '',
        grade: '',
        id: '',
        deptId: '',
        institute: '',
        // major: '软件工程',
        politicalStatus: ''
      },
      deptMap: {}
    }
  },
  created () {
    this.loading = true
    let _this = this
    _this.$http.post('/student/getStudentInfo', {
      // 'studentNo': this.$store.state.studentNo
      'studentNo': _this.$cookies.get('account')
    }).then(res => {
      console.log(res.data.data)
      _this.form.name = res.data.data.studentName
      _this.form.grade = res.data.data.entryYear
      _this.form.id = res.data.data.studentNo
      // _this.form.deptId = res.data.data.deptId
      _this.form.politicalStatus = res.data.data.political
      _this.$http.post('/getDeptById', {
        'deptId': res.data.data.deptId
      }).then(res => {
        console.log(res.data.data.deptName)
        // for (var i = 0; i < res.data.data.length; i++) {
        //   _this.$set(_this.deptMap, res.data.data[i].deptId, res.data.data[i].deptName)
        // }
        // console.log(JSON.parse(JSON.stringify(_this.deptMap))[_this.form.deptId])
        _this.form.institute = res.data.data.deptName
      })
      _this.loading = false
    })
  },
  methods: {
    to (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
</style>
