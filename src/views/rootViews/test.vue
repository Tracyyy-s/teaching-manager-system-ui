<!--<template>-->
<!--<div>-->
<!--  &lt;!&ndash; <div id="myChart" :style="{ width: '300px', height: '300px' }">-->

<!--  </div> &ndash;&gt;-->
<!--  啊啊啊啊-->
<!--       <el-pagination-->
<!--          :page-sizes="[100, 200, 300, 400]"-->
<!--          :page-size="pagesize"-->
<!--          layout="sizes,prev, pager, next"-->
<!--          :total="totalPageNum"-->
<!--          @current-change="handleCurrentChange"-->
<!--          @size-change="handleSizeChange"-->
<!--        >-->
<!--        </el-pagination>-->
<!--</div>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'test',-->
<!--  data () {-->
<!--    return {-->
<!--      totalPageNum: 1000,-->
<!--      currentPage1: 5,-->
<!--      msg: 'Welcome to Your Vue.js App'-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    this.drawLine()-->
<!--  },-->
<!--  methods: {-->
<!--    handleSizeChange (val) {-->
<!--      console.log(`每页 ${val} 条`)-->
<!--    },-->
<!--    handleCurrentChange (val) {-->
<!--      console.log(`当前页: ${val}`)-->
<!--    },-->
<!--    drawLine () {-->
<!--      // 基于准备好的dom，初始化echarts实例-->
<!--      var myChart = this.$echarts.init(document.getElementById('myChart'))-->
<!--      var option = {-->
<!--        title: {-->
<!--          text: '某站点用户访问来源',-->
<!--          subtext: '纯属虚构',-->
<!--          left: 'center'-->
<!--        },-->
<!--        tooltip: {-->
<!--          trigger: 'item',-->
<!--          formatter: '{a} <br/>{b} : {c} ({d}%)'-->
<!--        },-->
<!--        legend: {-->
<!--          orient: 'vertical',-->
<!--          left: 'left',-->
<!--          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']-->
<!--        },-->
<!--        series: [-->
<!--          {-->
<!--            name: '访问来源',-->
<!--            type: 'pie',-->
<!--            radius: '55%',-->
<!--            center: ['50%', '60%'],-->
<!--            data: [-->
<!--              { value: 335, name: '直接访问' },-->
<!--              { value: 310, name: '邮件营销' },-->
<!--              { value: 234, name: '联盟广告' },-->
<!--              { value: 135, name: '视频广告' },-->
<!--              { value: 1548, name: '搜索引擎' }-->
<!--            ],-->
<!--            emphasis: {-->
<!--              itemStyle: {-->
<!--                shadowBlur: 10,-->
<!--                shadowOffsetX: 0,-->
<!--                shadowColor: 'rgba(0, 0, 0, 0.5)'-->
<!--              }-->
<!--            }-->
<!--          }-->
<!--        ]-->
<!--      }-->
<!--      // 绘制图表-->
<!--      myChart.setOption(option)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
