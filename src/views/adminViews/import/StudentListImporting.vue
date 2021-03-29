<template>
  <el-container>
    <el-col :xs="{ span:20, offset:2 }" :sm="{ span:18, offset:3 }" :md="{ span:16, offset:4 }" :lg="{ span:18, offset:3 }" :xl="{ span:22, offset:1 }">
    <el-main>
      <br/>
      <MyUpload></MyUpload>
      <div class="head" style="margin-top: 50px">
        <p style="text-align: center">筛 选 查 询</p>
      </div>
      <div class="head2">
        <el-form :inline="true">
          <el-select v-model="college" @change="getRole($event)" clearable placeholder="学院" style="top: 15px">
            <el-option
              v-for="item in savedList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
<!--          <el-select v-model="major" @change="getList($event)" filterable placeholder="专业" style="top: 15px">-->
<!--            <el-option-->
<!--              v-for="item in select2"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
          <el-input v-model="input" size="small" placeholder="输入学号进行查询" style="width: 220px; top: 15px"></el-input>
        </el-form>
        <el-alert
          title="查询结果实时显示"
          type="info"
          center
          style="margin-top: 40px"
          show-icon>
        </el-alert>
      </div>
      <div class="head3">
        <p style="text-align: center">学 生 列 表</p>
      </div>
      <br>
      <!-- .slice((currentPage - 1) * PageSize, currentPage * PageSize) -->
      <el-table
        :data="filterStudents"
        style="width: 100%">
        <el-table-column label="学号" width="200" align="center">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.studentNo }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="200" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.studentName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="学院" width="200" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.stuCollege }}</p>
          </template>
        </el-table-column>
        <el-table-column label="班级" width="200" align="center">
          <template slot-scope="scope">
            <p size="medium">{{ scope.row.classId }}</p>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              plain
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogFormVisible">
        <div slot="title">
          <i class="al-iconfont">&#xe8ad;</i>
          <span>编辑学生信息</span>
        </div>
        <el-form
          ref="form"
          :rules="rules"
          label-width="100px"
          style="color: #666666">
          <el-form-item label="学生名称" style="width: 350px" prop="name">
            <el-input v-model="stuName" style="left: 50px"></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="college">
            <el-select v-model="stuCollege" style="left: 50px; width: 250px">
              <el-option
                v-for="item in savedList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input
              v-model="stuClass"
              style="left: 50px; width: 250px">
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input
              v-model="stuMail"
              style="left: 50px; width: 250px">
            </el-input>
          </el-form-item>
          <el-form-item label="政治面目" prop="political">
            <el-select v-model="stuPolitical" style="left: 50px; width: 250px">
              <el-option value="群众"></el-option>
              <el-option value="团员"></el-option>
              <el-option value="党员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="stuBirth"
                style="width: 250px; left: 50px">
              </el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            size="small"
            plain
            icon="el-icon-close"
            @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" icon="el-icon-thumb" size="small" @click="edit">确 定</el-button>
        </div>
      </el-dialog>
      <br>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        style="text-align: center"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"/>
    </el-main>
    </el-col>
  </el-container>
</template>

<script>
import MyUpload from '@/components/adminComponents/upload/StudentUpload.vue'

let select1 = [
  { value: '110', label: '计算机科学学院' },
  { value: '111', label: '经济与管理学院' },
  { value: '112', label: '地理与资源学院' },
  { value: '113', label: '文学院' },
  { value: '114', label: '商学院' }
]

let allrole = [
  { value: '11001', pro: '110', label: '计算机科学与技术' }, { value: '11002', pro: '110', label: '网络工程'}, { value: '11003', pro: '110', label: '软件工程'}, { value: '11004', pro: '110', label: '电子商务' }, { value: '11005', pro: '110', label: '教育技术' },
  { value: '11101', pro: '111', label: '经济学' }, { value: '11102', pro: '111', label: '工商管理' }, { value: '11103', pro: '111', label: '国际经济与贸易专业' },
  { value: '11201', pro: '112', label: '地理科学' }, { value: '11202', pro: '112', label: '自然地理与资源环境' }, { value: '11203', pro: '112', label: '人文地理与城乡规划' },
  { value: '11301', pro: '113', label: '汉语言文学' },
  { value: '11401', pro: '114', label: '审计学'}, { pro: '114', label: '财务管理' }
]

export default {
  name: 'StudentListImporting',
  components: {
    MyUpload
  },
  data () {
    return {
      manageList: [],
      input: '',
      select1: select1,
      college: this.$store.state.deptId,
      major: '',
      select2: [],
      roles: [],
      savedList: [],
      searchData: [],
      currentPage: 1,
      totalCount: 1,
      pageSizes: [5, 10, 20, 50, 100],
      PageSize: 5,
      students: [
        {
          studentNo: '',
          studentName: '',
          deptId: '',
          classId: '',
          birth: '',
          email: '',
          political: ''
        }
      ],
      value: '',
      stuName: '',
      stuClass: '',
      stuMail: '',
      stuPolitical: '',
      stuBirth: '',
      stuCollege: '',
      dialogFormVisible: false,
      updateNum: '',
      rules: {
        name: [
          {required: true, message: '请输入学生姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 - 10 个字符', trigger: 'blur'}
        ],

        college: [{required: true, message: '请输入学院', trigger: 'blur'}],

        class: [{required: true, message: '请输入班级', trigger: 'blur'}],

        political: [
          {required: true, message: '请输入政治面目', trigger: 'blur'}
        ],

        birth: [{required: true, message: '请输入出生日期', trigger: 'blur'}],

        mail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 6, max: 30, message: '请输入正确格式的邮箱', trigger: 'blur'}
        ]
      }
    }
  },

  created () {
    this.$notify({
      title: '提示',
      type: 'warning',
      message: '上传成功后请刷新',
      offset: 100
    })
    // 获取当前用户管理学院
    this.$http.post('admin/getDeptsOfUser', {
      userId: this.$cookies.get('account')
    }).then(res => {
      this.manageList = res.data.data
      for (var i = 0; i < this.select1.length; i++) {
        for (var j = 0; j < this.manageList.length; j++) {
          if (this.select1[i].value === this.manageList[j].deptId) {
            this.savedList.push({'value': this.select1[i].value, 'label': this.select1[i].label})
          }
        }
      }
    })
    this.get()
  },

  methods: {
    getRole (prov) {
      if (this.select2.length === 0) {
        for (var val of allrole) {
          if (prov === val.pro) {
            this.roles.push({ label: val.label, value: val.label })
          }
        }
        this.select2 = this.roles
      } else {
        this.select2.length = 0
        for (var val of allrole) {
          if (prov === val.pro) {
            this.roles.push({ label: val.label, value: val.label })
          }
        }
        this.select2 = this.roles
      }
    },
    getList (opt) {
      // console.log(opt)
    },
    handleSizeChange (val) {
      this.PageSize = val
      this.get()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.get()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.stuName = this.students[index].studentName
      this.stuBirth = this.students[index].birth
      this.stuMail = this.students[index].email
      this.stuPolitical = this.students[index].political
      this.stuClass = this.students[index].classId
      this.updateNum = index
      this.stuCollege = this.students[index].stuCollege
    },
    edit () {
      this.dialogFormVisible = false
      this.$http.post('admin/updateStudentInfo', {
        studentNo: this.students[this.updateNum].studentNo,
        deptId: this.stuCollege,
        studentName: this.stuName,
        classId: this.stuClass,
        email: this.stuMail,
        political: this.stuPolitical,
        birth: this.stuBirth
      }).then(res => {
        console.log(res)
        alert('修改信息成功！')
        location.reload()
      })
    },
    get () {
      this.$http.post('admin/getStudentsByDept', {
        pageNum: this.currentPage,
        pageSize: this.PageSize,
        deptId: this.college
      }).then(res => {
        this.students = res.data.data.list
        this.totalCount = res.data.data.total
        for (var i = 0; i < this.students.length; i++) {
          for (var j = 0; j < this.savedList.length; j++) {
            if (this.students[i].deptId === this.savedList[j].value) {
              this.students[i].stuCollege = this.savedList[j].label
            }
          }
        }
      })
    }
  },
  watch: {
    // 通过学院筛选学生
    college: function () {
      this.$http.post('admin/getStudentsByDept', {
        deptId: this.college
      }).then(res => {
        this.students = res.data.data.list
        this.totalCount = res.data.data.list.length
        for (var i = 0; i < this.students.length; i++) {
          for (var j = 0; j < this.savedList.length; j++) {
            if (this.students[i].deptId === this.savedList[j].value) {
              this.students[i].stuCollege = this.savedList[j].label
            }
          }
        }
      })
    }
  },
  computed: {
    filterStudents () {
      // 取出相关数据
      const { input, students } = this
      // 最终需要显示的数组
      let student
      // 对students进行过滤
      student = students.filter(p => p.studentNo.indexOf(this.input) >= 0)
      return student
    }
  }
}
</script>

<style scoped>
  .head {
    margin-top: 30px;
    height: 50px;
    background: #f3f3f3;
    border: 1px #d9d9d9 solid;
    font-weight: bold;
    color: #666666;
  }

  .head2 {
    height: 72px;
  }

  .head3 {
    margin-top: 100px;
    height: 50px;
    background: #f3f3f3;
    border: 1px #d9d9d9 solid;
    font-weight: bold;
    color: #666666;
  }
</style>
