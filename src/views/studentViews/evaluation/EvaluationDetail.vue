<template>
  <el-container>
<!--    <el-header>-->
<!--      &lt;!&ndash; <MyHeader></MyHeader> &ndash;&gt;-->
<!--    </el-header>-->
    <el-main>
        <MainEvaluationDetail></MainEvaluationDetail>
    </el-main>
  </el-container>
</template>

<script>
import MyHeader from '@/components/studentComponents/header/Header.vue'
import MainEvaluationDetail from '@/components/studentComponents/evaluation/MainEvaluationDetail'
export default {
  name: 'EvaluationDetail',
  components: {MyHeader, MainEvaluationDetail},
  created () {
    // 测试是否能够拿到url最后的tcid
    var url = location.search
    // 获取url中"?"符后的字串
    if (url.indexOf('?') !== -1) { // 判断是否有参数
      var str = url.substr(1) // 从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
      str = str.split('=') // 用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
      console.log(str[1]) // 直接弹出第一个参数 （如果有多个参数 还要进行循环的）
    }
  }
}
</script>

<style scoped>

</style>
