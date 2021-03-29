<template>
  <el-col :xs="{ span:20, offset:2 }" :sm="{ span:18, offset:3 }" :md="{ span:16, offset:4 }" :lg="{ span:18, offset:3 }" :xl="{ span:22, offset:1 }">
    <div class="head" style="margin-top: 50px;">
      <p style="text-align: center">设 置</p>
    </div>
    <br>
    <div>
      <el-row :gutter="10">
        <el-table
          :data="evaluationLists"
          style="width: 1200px; table-layout: fixed; word-wrap: break-all; word-break: normal; overflow: hidden;"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
          <el-table-column
            prop="index"
            label="序号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="targetContent"
            label="评价选项"
            width="400">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="比例分"
            width="120">
          </el-table-column>
          <el-table-column
            prop="percentage"
            label="权重"
            width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                plain
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="dialogFormVisible1 = true" style="margin-left: 250px; margin-top: 50px; width: 120px">添加评价</el-button>
        <el-button type="primary" icon="el-icon-refresh-left" plain @click="to" style="margin-left: 300px; margin-top: 50px; width: 120px">返回</el-button>
      </el-row>
    </div>

    <el-dialog :visible.sync="dialogFormVisible2" width="50%">
      <div slot="title">
        <i class="al-iconfont">&#xe8ad;</i>
        <span>编辑教师评价内容</span>
      </div>
      <el-form ref="form" :rules="rules" label-width="100px" style="color: #666666">
        <el-form-item label="评价内容">
          <el-input v-model="updateContent" style="width: 300px; left: 50px" placeholder="小于等于30字"></el-input>
        </el-form-item>
        <el-form-item label="比例分" style="width: 380px">
          <el-input v-model="updateWeight" style="width: 300px; left: 50px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-close" plain @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-thumb" size="small" @click="edit">确 定</el-button>
      </div>
    </el-dialog>

    <div>
      <br>
      <div class="head">
        <p style="text-align: center">表 单 预 览</p>
      </div>
      <br>
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="6">
          <div class="grid-content" v-for="evaluationList in evaluationLists">
            <i class="el-icon-caret-right">&nbsp&nbsp{{ evaluationList.targetContent }}</i>
          </div>
        </el-col>
        <el-col :xs="10" :sm="8" :md="8" :lg="10" :xl="6">
          <div v-for="(item, index) in evaluationLists" :key="index" class="grid-content">
            <p style="margin-left: 200px">
              <el-radio-group>
                <el-radio :label="1">A</el-radio>
                <el-radio :label="2">B</el-radio>
                <el-radio :label="3">C</el-radio>
                <el-radio :label="4">D</el-radio>
              </el-radio-group>
            </p>
          </div>
        </el-col>
      </el-row>

      <el-dialog :visible.sync="dialogFormVisible1" width="50%">
        <div slot="title">
          <i class="al-iconfont">&#xe664;</i>
          <span>添加教师评价内容</span>
        </div>
        <el-form ref="form" :rules="rules" label-width="100px" style="color: #666666">
          <el-form-item label="评价内容">
            <el-input v-model="addContent" style="width: 300px; left: 50px" placeholder="小于等于30字"></el-input>
          </el-form-item>
          <el-form-item label="比例分" style="width: 380px">
            <el-input v-model="addWeight" style="width: 300px; left: 50px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" icon="el-icon-close" plain @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" icon="el-icon-thumb" size="small" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="del" width="30%">
        <div slot="title">
          <i class="al-iconfont">&#xe665</i>
          <span>删除教师评价内容</span>
        </div>
        <span style="text-align: center">您确定删除教师评价内容？</span>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" icon="el-icon-close" plain @click="del = false">取 消</el-button>
          <el-button type="primary" icon="el-icon-thumb" size="small" @click="delEva">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'modifyTeacherEvaluationForm',
  components: {
  },
  data () {
    return {
      evaluationLists: [{ targetId: '', weight: '', targetContent: '', index: '', percentage: '' }],
      value: '',
      formLabelWidth: '120px',
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      del: false,
      addContent: '',
      addWeight: '',
      updateNum: '',
      updateContent: '',
      updateWeight: '',
      delNum: '',
      sum: 0,
      rules: {
        content: [
          {required: true, message: '请输入评价内容', trigger: 'blur'},
          {min: 5, max: 30, message: '长度在 5 - 30 个字符', trigger: 'blur'}
        ],
        weight: [
          {required: true, message: '请输入比例分', trigger: 'change'},
          {min: 1, max: 10, message: '长度在 1 - 10 个字符', trigger: 'blur'}
        ]
      }
    }
  },

  created () {
    // 获取评价选项
    this.$http.post('admin/getTargets', {
      'userType': 'teacher'
    }).then(res => {
      this.evaluationLists = res.data.data
      for (var i = 0; i < this.evaluationLists.length; i++) {
        this.sum += this.evaluationLists[i].weight
      }
      for (var i = 0; i < this.evaluationLists.length; i++) {
        this.evaluationLists[i].percentage = (this.evaluationLists[i].weight / this.sum).toFixed(2)
      }
    })
  },

  methods: {
    add () {
      if (this.addContent.length < 5) {
        alert('评价内容必须大于等于5个字')
        return
      }
      if (!Number.isInteger(parseFloat(this.addWeight))) {
        alert('评价比例分必须为整数！')
        return
      }
      //  发送axios请求
      this.$http.post('admin/addTarget', {
        'targetType': 0,
        'targetContent': this.addContent,
        'weight': this.addWeight
      }).then(res => {
        // console.log(res)
        alert('添加成功！')
        location.reload()
      })
    },
    // 确定修改教师评价选项
    edit () {
      if (this.updateContent.length < 5) {
        alert('评价内容必须大于等于5个字')
        return
      }
      if (!Number.isInteger(parseFloat(this.updateWeight))) {
        alert('评价比例分必须为整数！')
        return
      }
      this.$http.post('admin/updateTarget', {
        'targetId': this.evaluationLists[this.updateNum].targetId,
        'targetContent': this.updateContent,
        'targetObject': 0,
        'weight': this.updateWeight
      }).then(res => {
        // console.log(res)
        this.dialogFormVisible2 = false
        alert('提交成功！')
        location.reload()
      })
    },
    delEva () {
      // console.log(this.delNum)
      this.$http.post('admin/deleteTarget', {
        'targetId': this.evaluationLists[this.delNum].targetId
      }).then(res => {
        // console.log(res)
        alert('删除成功！')
        location.reload()
      })
    },
    // 点击编辑教师评价选项
    handleEdit (index, row) {
      this.dialogFormVisible2 = true
      this.updateNum = index
      this.updateContent = this.evaluationLists[index].targetContent
      this.updateWeight = this.evaluationLists[index].weight
    },
    // 点击删除教师评价选项
    handleDel (index, row) {
      this.del = true
      this.delNum = index
    },
    to () {
      this.$router.push('/releaseTeacherComments')
    }
  }
}
</script>

<style scoped>
.head {
  height: 45px;
  background: #F3F3F3;
  border: 1px #D9D9D9 solid;
  font-weight: bold;
  color: #666666;
}

.grid-content {
  margin-top: 20px;
  border-radius: 4px;
  min-height: 36px;
  color: #666666;
}
</style>
