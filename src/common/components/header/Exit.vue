<template>
    <div>
      <el-button round @click="quit">
        <i class="al-iconfont">&#xe66b;</i>
        退出登录
      </el-button>
    </div>
</template>

<script>
import {LogOut} from '@/apis/apiTrees.js'
export default {

  name: 'Exit',
  methods: {
    async quit () {
      // let RealLogOut = LogOut
      // RealLogOut.then
      const res = await LogOut().then((res) => {
        if (res.data.resultCode === 1) {
          console.log(res)
          // 清除cookies
          // this.$cookies.remove("account")
          // 清除token
          sessionStorage.removeItem('token')
          this.$message({
            showClose: true,
            message: '退出成功',
            type: 'success'
          })
          this.$router.push('/')
        } else {
          this.$message({
            showClose: true,
            message: '退出失败，系统开小差了',
            type: 'error'
          })
        }
      }).catch((res) => {
        alert('服务器错误')
      })
      // const res = await this.$http
      //   .post(
      //     '/logout'
      //   )
      //   .then((res) => {
      //     if (res.data.resultCode === 1) {
      //       // 清除cookies
      //       // this.$cookies.remove("account")
      //       // 清除token
      //       sessionStorage.removeItem('token')
      //       this.$message({
      //         showClose: true,
      //         message: '退出成功',
      //         type: 'success'
      //       })
      //       this.$router.push('/')
      //     } else {
      //       this.$message({
      //         showClose: true,
      //         message: '退出失败，系统开小差了',
      //         type: 'error'
      //       })
      //     }
      //   }).catch((res) => {
      //     alert('服务器错误')
      //   })
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
