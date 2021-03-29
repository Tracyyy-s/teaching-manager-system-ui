<template>
  <div>
    <el-upload
      class="upload-demo"
      action="admin/importTimetables"
      :http-request="upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      multiple
      :limit="1"
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
  name: 'TeacherUpload',
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    upload (f) {
      let formData = new FormData()
      formData.append('file', f.file)
      formData.append('deptId', this.$store.state.deptId)
      this.$http.request({
        url: 'admin/importTimetables',
        method: 'POST',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
      }).then(res => {
        console.log(res)
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
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
