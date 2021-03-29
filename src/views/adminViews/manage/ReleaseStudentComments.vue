<template>
  <el-col :xs="{ span:20, offset:2 }" :sm="{ span:18, offset:3 }" :md="{ span:16, offset:4 }" :lg="{ span:18, offset:3 }" :xl="{ span:22, offset:1 }">
    <el-alert
      title="关于权重计算：例如A评价的比例分为2，B评价的比例分为3，总比例分为2+3=5；则A的权重为2/5=0.4，B的权重为3/5=0.6"
      type="info"
      center
      show-icon>
    </el-alert>
  <div class="head">
    <p style="text-align: center">发 布 评 价</p>
  </div>
  <div>
    <el-table
      :data="evaluationLists"
      style="width: 980px; margin-top: 50px">
      <el-table-column label="序号" width="150" align="center">
        <template slot-scope="scope">
          <p size="medium">{{ scope.row.index }}</p>
        </template>
      </el-table-column>
      <el-table-column label="评价内容" width="400" align="center">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.targetContent }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="比例分" width="150" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.weight }}</p>
        </template>
      </el-table-column>
      <el-table-column label="权重" width="180" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.percentage }}</p>
        </template>
      </el-table-column>
      <el-table-column label="选择" align="center">
        <template slot-scope="scope">
          <el-checkbox
            size="medium"
            border
            type="warning"
            plain
            @change="handIn(scope.$index, scope.row)"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" icon="el-icon-edit" size="middle" style="margin-left: 250px; width: 150px; margin-top: 100px" @click="to">修改评价指标</el-button>
    <el-button type="primary" icon="el-icon-thumb" size="middle" style="margin-left: 250px; width: 100px; margin-top: 100px" @click="commit">确 定</el-button>
  </div>
  </el-col>
</template>

<script>
export default {
  name: 'ReleaseStudentComments',
  data () {
    return {
      evaluationLists: [{ targetId: '', weight: '', targetContent: '', index: '', percentage: '' }],
      value: '',
      targetList: [],
      sum: 0
    }
  },
  methods: {
    handIn (index, row) {
      var flag = true
      // 取出targetList里的每个item进行遍历
      this.targetList.forEach(item => {
        // targetList已有当前选项
        if (item.targetId === this.evaluationLists[index].targetId) {
          // 删除
          this.targetList.splice(item)
          // console.log('delete')
          // 标志位：当为false时跳出函数不再添加
          flag = false
          return false
        }
      })
      if (!flag) { return flag }
      // 标志位：当为true时targetList未添加评价选项，则添加
      this.targetList.push({ termId: '2020-2021-1', targetId: this.evaluationLists[index].targetId, weight: this.evaluationLists[index].weight, termTargetObject: this.evaluationLists[index].targetObject })
    },
    commit () {
      if (this.targetList.length === 0) {
        alert('请先选择一项评价进行发布！')
        return
      }
      this.$http.post('admin/publishTargets', {
        targetList: this.targetList
      }).then(res => {
        alert('发布成功！')
        // console.log(res.data.data)
      })
    },
    to () {
      this.$router.push('/modifyStudentEvaluationForm')
    }
  },
  created () {
    // 获取评价选项
    this.$http.post('admin/getTargets', {
      userType: 'student'
    }).then(res => {
      this.evaluationLists = res.data.data
      for (var i = 0; i < this.evaluationLists.length; i++) {
        this.sum += this.evaluationLists[i].weight
      }
      for (var i = 0; i < this.evaluationLists.length; i++) {
        this.evaluationLists[i].percentage = (this.evaluationLists[i].weight / this.sum).toFixed(2)
      }
    })
  }
}
</script>

<style scoped>
  .head {
    margin-top: 45px;
    height: 50px;
    background: #F3F3F3;
    border: 1px #D9D9D9 solid;
    font-weight: bold;
    color: #666666;
  }
</style>
