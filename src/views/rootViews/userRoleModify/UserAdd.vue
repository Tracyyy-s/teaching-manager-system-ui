<template>
<div class="addUser-body">
    <el-card class="box-card">
    <el-form ref="addUserForm" :model="addUserForm" :rules="rules" label-width="150px" label-position='left' >
      <el-form-item label="管理员姓名" prop="adminName">
        <el-input v-model="addUserForm.adminName"></el-input>
      </el-form-item>

      <el-form-item label="默认管理的学院" prop="deptId">
        <!-- 这里是动态获得，而非写死，v-model为最终选择结果 -->
        <!-- v-for="item in addUserForm.deptOptions" -->
        <el-select v-model="addUserForm.deptId" placeholder="请选择学院">
          <el-option
            v-for="item in deptOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
      </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="addUserForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="addUserForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="submitForm('addUserForm')">提交</el-button>
        <el-button @click="resetForm('addUserForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>

</template>
<script>
export default {
  name: 'UserAdd',
  data () {
    var checkAdminDeptId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择默认学院'))
      } else {
        callback()
      }
    }
    var checkAdminName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('管理员姓名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addUserForm.checkPass !== '') {
          this.$refs.addUserForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addUserForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      deptOptions: [],
      addUserForm: {
        // deptOptions:[{value: '110',label: '计科'}, {value: '120',label: '数院'}],
        adminName: '李懂秦',
        pass: '123456',
        checkPass: '123456',
        deptId: ''
      },
      rules: {
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        adminName: [
          { required: true, validator: checkAdminName, trigger: 'blur' }
        ],
        deptId: [
          { required: true, validator: checkAdminDeptId, trigger: 'blur'}
        ]

      }
    }
  },
  created () {
    this.getInitDept()
  },
  methods: {
    async getInitDept () {
      const res = await this.$http.post('/root/getAllDepts').then(res => {
        for (let i = 0; i < res.data.data.length; i = i + 1) {
          // deptOptions:[{value: '110',label: '计科'}, {value: '120',label: '数院'}],
          this.deptOptions.push({
            value: res.data.data[i].deptId,
            label: res.data.data[i].deptName
          })
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // console.log( this.addUserForm)
          // console.log(this.addUserForm.adminName+this.addUserForm.pass+this.addUserForm.deptId)
          const res1 = await this.$http.post('/root/addAdmin', {
            'adminName': this.addUserForm.adminName,
            'password': this.addUserForm.pass,
            'deptId': this.addUserForm.deptId
          }).then(res1 => {
            if (res1.data.resultCode === 1) {
              this.$router.push('/user_role_list')
            } else {
              this.$message.error('添加失败，程序开小差了')
            }
          })
        } else {
          this.$message.error('添加失败，程序开小差了')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
  .box-card {
    width: 600px;
    margin: 10px auto;
  }
</style>
