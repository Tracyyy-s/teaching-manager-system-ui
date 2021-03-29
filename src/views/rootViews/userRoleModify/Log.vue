<template>
  <el-container>
    <el-main>
      <!-- 1.图表记录表头 -->
      <div class="list_head">
        <p class="head_font">&nbsp;图 &nbsp;&nbsp;&nbsp; 表</p>
      </div>
      <!-- 2.选择按钮 -->
      <div class="change">
        <el-button-group>
          <el-button
            type="primary"
            icon="el-icon-s-data"
            @click="z"
          ></el-button>
          <el-button type="primary" icon="el-icon-help" @click="y"></el-button>
          <el-button
            type="primary"
            icon="el-icon-picture-outline-round"
            @click="category_func"
          ></el-button>
        </el-button-group>
      </div>
      <!-- 2.图表: -->

      <div class="panel-pie" v-loading="loading">
        <div
          id="pie"
          :style="{ width: '1200px', height: '550px' }"
          v-if="EchartsType === 'pie'"
        ></div>
        <div
          id="zhu"
          :style="{ width: '1200px', height: '550px' }"
          v-if="EchartsType === 'zhu'"
        ></div>
        <div
          id="CATEGORY"
          :style="{ width: '1200px', height: '550px' }"
          v-if="EchartsType === 'category'"
        ></div>
      </div>
      <div class="to-LogTable">
        <el-button type="primary" @click="toLogTable"> 查看详细数据 </el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'Log',
  data () {
    return {
      // category
      categoryData: [],
      loading: null,
      // 时间
      type: '',
      currentTime: '',
      // 图表 选择
      EchartsType: 'pie',
      // pie: true,
      // zhu: false,
      // category:false,
      // 饼图 数据
      pieData: []
    }
  },
  created () {},
  watch: {
    EchartsType: function () {
      this.$nextTick(function () {
        if (this.EchartsType === 'pie') {
          var myChart1 = this.$echarts.init(document.getElementById('pie'))
          myChart1.clear()
          var option1 = {
            title: {
              text: 'TQMS系统日志图表',
              subtext: '截至日期:' + this.currentTime,
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
              // a 是series的name
              // b 是series的data的name
              // c 是series的data的value
            },
            legend: {
              orient: 'vertical',
              left: 'left'
              // bottom:"1%",
            },
            series: [
              {
                name: '日志类别',
                type: 'pie',
                radius: '70%',
                data: [],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
          for (var i = 0; i < this.pieData.length; i++) {
            option1.series[0].data.push({
              value: this.pieData[i].count,
              name: this.pieData[i].type
            })
          }
          myChart1.setOption(option1)
        } else if (this.EchartsType === 'zhu') {
          let myChart2 = this.$echarts.init(document.getElementById('zhu'))
          myChart2.clear()
          var option2 = {
            title: {
              text: 'TQMS系统日志图表',
              subtext: '截至日期:' + this.currentTime,
              left: 'center'
            },
            xAxis: {
              type: 'category',
              data: []
              // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '数量',
                data: [],
                // [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(220, 220, 220, 0.8)'
                }
              }
            ]
          }
          for (var i = 0; i < this.pieData.length; i++) {
            option2.xAxis.data.push(this.pieData[i].type)
            option2.series[0].data.push(this.pieData[i].count)
          }
          myChart2.setOption(option2)
        } else if (this.EchartsType === 'category') {
          let myChart3 = this.$echarts.init(
            document.getElementById('CATEGORY')
          )
          myChart3.clear()
          var option = {
            xAxis: {
              type: 'category',
              boundaryGap: false
            },
            yAxis: {
              type: 'value',
              boundaryGap: [0, '30%']
            },
            visualMap: {
              type: 'piecewise',
              show: false,
              dimension: 0,
              seriesIndex: 0,
              pieces: [
              ]
            },
            series: [
              {
                type: 'line',
                smooth: 0.8,
                symbol: 'none',
                lineStyle: {
                  color: 'green',
                  width: 5
                },
                markLine: {
                  symbol: ['none', 'none'],
                  label: { show: false },
                  data: [
                  ]
                },
                areaStyle: {},
                data: [
                ]
              }
            ]
          }

          for (var i = 0; i < this.categoryData.length; i++) {
            // 这是一个数组 放数组 ["2019-10-10", 200],
            option.series[0].data.push(
              [
                this.categoryData[i].create_time,
                this.categoryData[i].total
              ]
            )
            // 这是一个数组 放对象 { xAxis: 1 },
            option.series[0].markLine.data.push({
              xAxis: i
            })
          }
          myChart3.setOption(option)
        }
      })
    }
  },
  mounted () {
    this.drawChart()
    this.getcategoryData()
  },
  methods: {
    async getcategoryData () {
      const res = await this.$http
        .post('/root/getLogInfo')
        .then((res) => {
          if (res.data.resultCode === 1) {
            this.categoryData = res.data.data
          } else {
            this.$message({
              showClose: true,
              message: '获取日志失败。' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          console.log(res)
          alert('服务器出错了')
        })
      // 构造图表
      //
    },

    y () {
      this.EchartsType = 'pie'
    },
    z () {
      this.EchartsType = 'zhu'
    },
    category_func () {
      this.EchartsType = 'category'
    },
    toLogTable () {
      this.$router.push('/LogTable')
    },
    // 获取日志记录数目和类别
    async drawChart () {
      this.loading = true
      await this.$http
        .post('/root/getLogTypeAndCount')
        .then((res) => {
          if (res.data.resultCode === 1) {
            for (let i = 0; i < res.data.data.length; i = i + 1) {
              this.pieData.push(res.data.data[i])
            }
          } else {
            this.$message({
              showClose: true,
              message:
                '获取初始化信息失败，后台繁忙。' + '(' + res.data.data + ')',
              type: 'warning'
            })
          }
        })
        .catch((res) => {
          this.loading = false
          alert('服务器出错了')
        })
      this.loading = false
      // 时间
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      this.currentTime = year + '_' + month + '_' + strDate
      var myChart = this.$echarts.init(document.getElementById('pie'))
      var option = {
        title: {
          text: 'TQMS系统日志图表',
          subtext: '截至日期:' + this.currentTime,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
          // a 是series的name
          // b 是series的data的name
          // c 是series的data的value
        },
        legend: {
          orient: 'vertical',
          left: 'left'
          // bottom:"1%",
        },
        series: [
          {
            name: '日志类别',
            type: 'pie',
            radius: '70%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      for (var i = 0; i < this.pieData.length; i++) {
        option.series[0].data.push({
          value: this.pieData[i].count,
          name: this.pieData[i].type
        })
      }
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
.change {
  width: 1200px;
  text-align: right;
  margin: 20px auto;
}
.to-LogTable {
  margin-top: 20px;
  margin-bottom: 0px;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;

  display: flex;
  justify-content: flex-end;
}
.panel-pie {
  margin-top: 20px;
  margin-bottom: 0px;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  height: 550px;
  display: flex;
  justify-content: center;
}
.logType {
  font-weight: 900px;
  margin-left: 50px;
}

.list_head {
  margin-top: 0px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  height: 45px;
  background: #f3f3f3;
  border: 1px #d9d9d9 solid;
  font-weight: bold;
  color: #666666;
}
.head_font {
  margin: 5px auto;
  width: 100px;
  font: 25px;
}
</style>
