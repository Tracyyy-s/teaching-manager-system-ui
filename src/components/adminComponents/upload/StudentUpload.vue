<template>
  <div>
    <el-upload
        class="upload-demo"
        action="admin/importStudents"
        :http-request="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :before-upload="beforeAvatarUpload"
        :on-exceed="handleExceed"
        multiple
        :limit="1"
        content="multipart/form-data"
        :on-success="onSuccess"
        :on-error="onError"
        :file-list="fileList">
      <el-button icon="el-icon-folder-opened" size="middle" type="primary" plain>点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过10MB</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'StudentUpload',
  data () {
    return {
      fileList: [],
      value: ''
    }
  },
  methods: {
    upload (f) {
      let formData = new FormData()
      // 在回调函数里得到文件信息的参数，f.file是文件编码后的本体，将本体和deptId一起传入封装的请求里
      formData.append('file', f.file)
      formData.append('deptId', this.$store.state.deptId);
      this.$http.request({
        url: 'admin/importStudents',
        method: 'POST',
        data: formData,
        // 修改表头
        headers: { 'content-type': 'multipart/form-data' }
      }).then(res => {
          var msg = ''
          if (res.data.data === 'Exception in Executing') {
            msg = '添加时有错误（例如：主码重复）'
          } else if (res.data.data === 'Incorrect Email') {
            msg = 'email填写格式错误'
          } else if (res.data.data === 'Incorrect Gender') {
            msg = '性别栏填写错误，可填字符串仅可为“男”或“女”'
          } else if (res.data.data === 'Data ParseException') {
            msg = 'Excel文件中数据类型不正确'
          }
          this.$message({
            showClose: true,
            message: 'ERROR: '
              +
              "(" +
              msg +
              ")",
            type: 'warning'
          })
      })
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split(".")[1] === "xls"
      const extension2 = file.name.split(".")[1] === "xlsx"
      const size = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        alert("上传文件只能是 xls、xlsx 格式!")
      }
      if (!size) {
        alert("上传文件大小不能超过 10MB!")
      }
      return extension || extension2  && size
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview (file) {
      // console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onSuccess (res) {
      this.$alert('上传成功', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          console.log('上传成功')
        }
      })
    },
    onError () {
      this.$alert('创建失败', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          console.log('上传失败')
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-upload__tip {
    color: red;
    font-size: 15px;
  }
</style>
