<template>
  <el-container>
    <el-header>
      <div style="border-radius: 30px; width: 1100px; height: 50px; line-height: 50px; padding-left: 20px; font-size: 17px; font-weight: bold; background-color: #f3f3f3; color: #666666;">
        <p style="text-align: center">资 料</p>
      </div>
    </el-header>

    <el-carousel :interval="3000" type="card" height="200px" style="margin-top: 20px;">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <el-image
          :src="item.url"
          alt="图片"
          style="width: 100%; height: 200px; display: flex">
        </el-image>
        <!-- <h3 class="medium">{{ item }}</h3> -->
      </el-carousel-item>
    </el-carousel>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span >资料卡片</span>

      </div>
      <div class="text item">
        <el-main>
          <br>
          <el-form ref="form" id="clearfix_item" :model="form" :rules="rules" label-width="100px" style="color: #666666; width: 550px; margin: 0 auto;">
            <el-form-item label="教师名称" style="width: 350px" prop="name">
              <el-input v-model="form.name" style="left: 50px"></el-input>
            </el-form-item>
            <el-form-item label="学历" prop="education">
              <el-select v-model="form.education" style="left: 50px">
                <el-option value="本科"></el-option>
                <el-option value="硕士"></el-option>
                <el-option value="博士"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职称" prop="title">
              <el-select v-model="form.title" style="left: 50px">
                <el-option value="讲师"></el-option>
                <el-option value="副教授"></el-option>
                <el-option value="教授"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面目" prop="politicalOutlook">
              <el-select v-model="form.politicalOutlook" style="left: 50px">
                <el-option value="群众"></el-option>
                <el-option value="团员"></el-option>
                <el-option value="党员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-col :span="11">
                <el-date-picker type="date" v-model="form.birth" style="width: 300px; left: 50px"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="入职时间" style="width: 350px">
              <el-date-picker type="date" v-model="form.date" style="width: 300px; left: 50px"></el-date-picker>
            </el-form-item>
            <br>
            <el-button type="primary" icon="el-icon-thumb" @click="onEdit" style="margin-left: 50px; width: 100px">提交</el-button>
            <el-button type="primary" style="margin-left: 100px; width: 150px" @click="to('/teacherCardModifyPWD')">
              <i class="al-iconfont">&#xe75e;</i>
              <span>修改用户密码</span>
            </el-button>
          </el-form>
        </el-main>
      </div>
    </el-card>

    <el-footer>
    </el-footer>
  </el-container>

</template>
<script>
import a from '@/assets/card/card1.jpg'
import b from '@/assets/card/card2.jpg'
import c from '@/assets/card/card3.jpg'
import d from '@/assets/card/card4.jpg'
// import covid from '@/assets/carousel/covid.jpg'
// import school from '@/assets/carousel/school.jpg'
// import fight from '@/assets/carousel/fight.jpg'
// import carousel from '@/assets/carousel/carousel.jpg'

export default {
  name: 'teacherCard',
  data () {
    return {
      msg: '欢迎',
      form: {
        name: '',
        education: '',
        title: '',
        politicalOutlook: '',
        birth: '',
        date: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入教师名称',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 10,
          message: '长度在 1 - 10 个字符',
          trigger: 'blur'
        }
        ],

        education: [{
          required: true,
          message: '请输入学历',
          trigger: 'change'
        }],

        title: [{
          required: true,
          message: '请输入职称',
          trigger: 'change'
        }],

        politicalOutlook: [{
          required: true,
          message: '请输入政治面目',
          trigger: 'change'
        }],

        birth: [{
          required: true,
          message: '请输入出生日期',
          trigger: 'change'
        }],

        time: [{
          required: true,
          message: '请输入入职时间',
          trigger: 'change'
        }]
      },
      tableData: [{
        name: '软件需求',
        begin: '2020',
        finish: '2021',
        status: '上课中'
      }, {
        name: '软件需求',
        begin: '2020',
        finish: '2021',
        status: '上课中'
      }, {
        name: '软件需求',
        begin: '2020',
        finish: '2021',
        status: '上课中'
      }],
      value: '',
      imgList: [
        {
          url: a
        },
        {
          url: b

        },
        {
          url: c

        },
        {
          url: d
        }
      ]
    }
  },
  components: {

  },
  created () {
    let _this = this
    _this.$http.post('/teacher/getUserInfo', {
      // 'studentNo': this.$store.state.studentNo
      'userId': this.$cookies.get('account')
    }).then(res => {
      // console.log(res.data.data);
      _this.form.name = res.data.data.username
      _this.form.deptId = res.data.data.deptId
      _this.form.education = res.data.data.degree
      _this.form.title = res.data.data.professional
      _this.form.politicalOutlook = res.data.data.political
      _this.form.birth = res.data.data.birth
      _this.form.date = res.data.data.professionalTime

      console.log(res.data.data)

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
    })
  },
  methods: {
    onEdit () {
      let _this = this
      console.log(_this.form)
      _this.$http.post('/teacher/updateUserInfo', {
        'username': _this.form.name,
        'degree': _this.form.education,
        'professional': _this.form.title,
        'political': _this.form.politicalOutlook,
        'birth': _this.form.birth,
        'professionalTime': _this.form.date
      }).then(res => {
        console.log(res)
        if (res.data.message === 'SUCCESS') {
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
        } else {
          if (res.data.message === 'ERROR') {
            this.$message({
              message: '提交失败',
              type: 'warning'
            })
          }
        }
      })

      // console.log('Edit()');
      // console.log(this.form);
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    to (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  /* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
 */

  /* 卡片 */
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 650px;
    margin: 20px auto;
  }
</style>
