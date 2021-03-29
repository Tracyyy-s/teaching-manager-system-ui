<template>
  <div>
    <el-alert title="未查到该生此学期的课程信息" type="warning" v-if="!this.display" show-icon>
    </el-alert>
    <el-alert
      title="鼠标移动到相应课程名称上可查看对应课程的详情"
      type="info"
      show-icon
      v-loading="loading"
      v-if="this.display"
    >
    </el-alert>
    <el-table :data="tableData" border :row-style="{height: '80px'}" :cell-style="{padding: '0'}" style="width: 100% ;font-size: 18px "
      v-if="this.display">
      <el-table-column prop="clock" label="" align="center">
      </el-table-column>
      <el-table-column prop="Mon" label="星期一" height=100px align="center">
        <template slot-scope="scope" v-if="scope.row.Mon.cname!=''">
          <el-popover trigger="hover" placement="top">
            <p>课程名： {{ scope.row.Mon.cname }}</p>
            <p>教师姓名： {{ scope.row.Mon.tname }}</p>
            <p>上课时间： {{ scope.row.Mon.date }}</p>
            <p>上课地点： {{ scope.row.Mon.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.Mon.cname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="Tues" label="星期二" align="center">
        <template slot-scope="scope" v-if="scope.row.Tues.cname!=''">
          <el-popover trigger="hover" placement="top">
            <p>课程名： {{ scope.row.Tues.cname }}</p>
            <p>教师姓名： {{ scope.row.Tues.tname }}</p>
            <p>上课时间： {{ scope.row.Tues.date }}</p>
            <p>上课地点： {{ scope.row.Tues.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.Tues.cname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="Wed" label="星期三" align="center">
        <template slot-scope="scope" v-if="scope.row.Wed.cname!=''">
          <el-popover trigger="hover" placement="top">
            <p>课程名： {{ scope.row.Wed.cname }}</p>
            <p>教师姓名： {{ scope.row.Wed.tname }}</p>
            <p>上课时间： {{ scope.row.Wed.date }}</p>
            <p>上课地点： {{ scope.row.Wed.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.Wed.cname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="Thur" label="星期四" align="center">
        <template slot-scope="scope" v-if="scope.row.Thur.cname!=''">
          <el-popover trigger="hover" placement="top">
            <p>课程名： {{ scope.row.Thur.cname }}</p>
            <p>教师姓名： {{ scope.row.Thur.tname }}</p>
            <p>上课时间： {{ scope.row.Thur.date }}</p>
            <p>上课地点： {{ scope.row.Thur.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.Thur.cname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="Fri" label="星期五" align="center">
        <template slot-scope="scope" v-if="scope.row.Fri.cname!=''">
          <el-popover trigger="hover" placement="top">
            <p>课程名： {{ scope.row.Fri.cname }}</p>
            <p>教师姓名： {{ scope.row.Fri.tname }}</p>
            <p>上课时间： {{ scope.row.Fri.date }}</p>
            <p>上课地点： {{ scope.row.Fri.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.Fri.cname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="Sat" label="星期六" align="center">
        <template slot-scope="scope" v-if="scope.row.Sat.cname!=''">
          <el-popover trigger="hover" placement="top">
            <p>课程名： {{ scope.row.Sat.cname }}</p>
            <p>教师姓名： {{ scope.row.Sat.tname }}</p>
            <p>上课时间： {{ scope.row.Sat.date }}</p>
            <p>上课地点： {{ scope.row.Sat.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.Sat.cname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="Sun" label="星期日" align="center">
        <template slot-scope="scope" v-if="scope.row.Sun.cname!=''">
          <el-popover trigger="hover" placement="top">
            <p>课程名： {{ scope.row.Sun.cname }}</p>
            <p>教师姓名： {{ scope.row.Sun.tname }}</p>
            <p>上课时间： {{ scope.row.Sun.date }}</p>
            <p>上课地点： {{ scope.row.Sun.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.Sun.cname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  created () {
    this.loading = true
    var url = window.location.href
    // eslint-disable-next-line no-useless-escape
    var index = url.lastIndexOf('\/')
    var str = url.substring(index + 1, url.length)
    // console.log(str)
    let _this = this
    _this.$http.post('/student/getTermCourses', {
      'studentNo': this.$cookies.get('account'),
      'termId': str
      // 'termId': this.$store.state.termId
    }).then(res => {
      // console.log(res)
      if (res.data.resultCode === 1) {
        _this.display = true
        for (var i = 0; i < res.data.data.length; i++) {
          // console.log(res.data.data[i])
          var key = Object.keys(res.data.data[i].time)
          for (var j = 0; j < key.length; j++) {
            // console.log(res.data.data[i].time[key[j]].day)
            // console.log(res.data.data[i].time[key[j]].clock)
            var tmp = res.data.data[i].time[key[j]].day
            var index = 0
            if (res.data.data[i].time[key[j]].clock === '第1节-第2节') {
              index = 0
            } else if (res.data.data[i].time[key[j]].clock === '第3节-第4节') {
              index = 1
            } else if (res.data.data[i].time[key[j]].clock === '第6节-第7节') {
              index = 2
            } else if (res.data.data[i].time[key[j]].clock === '第8节-第9节') {
              index = 3
            } else {
              index = 4
            }
            // console.log(res.data.data[i].courseName)
            _this.tableData[index][tmp].cname = res.data.data[i].courseName
            _this.tableData[index][tmp].date = '第' + res.data.data[i].beginWeek + '周到第' + res.data.data[i].endWeek +
                '周'
            _this.tableData[index][tmp].tname = res.data.data[i].teacherName
            _this.tableData[index][tmp].address = res.data.data[i].address
          }
          // _this.courseList.push({
          //   id: res.data.data[i].courseNo,
          //   date: '第' + res.data.data[i].beginWeek + '周到第' + res.data.data[i].endWeek + '周',
          //   cname: res.data.data[i].courseName,
          //   tname: res.data.data[i].teacherName,
          //   address: res.data.data[i].address
          // })
        }
      } else {
        _this.display = false
      }
    })
    this.loading = false
  },
  watch: {
    // 查询参数改变，再次执行数据获取方法
    '$route' () {
      this.loading = true
      this.tableData = [{
        clock: '第一节(8:10-9:45)',
        Mon: {
          cname: ''
        },
        Tues: {
          cname: ''
        },
        Wed: {
          cname: ''
        },
        Thur: {
          cname: ''
        },
        Fri: {
          cname: ''
        },
        Sat: {
          cname: ''
        },
        Sun: {
          cname: ''
        }
      }, {
        clock: '第二节(10:10-11:45)',
        Mon: {
          cname: ''
        },
        Tues: {
          cname: ''
        },
        Wed: {
          cname: ''
        },
        Thur: {
          cname: ''
        },
        Fri: {
          cname: ''
        },
        Sat: {
          cname: ''
        },
        Sun: {
          cname: ''
        }
      }, {
        clock: '第三节(14:10-15:45)',
        Mon: {
          cname: ''
        },
        Tues: {
          cname: ''
        },
        Wed: {
          cname: ''
        },
        Thur: {
          cname: ''
        },
        Fri: {
          cname: ''
        },
        Sat: {
          cname: ''
        },
        Sun: {
          cname: ''
        }
      }, {
        clock: '第四节(16:10-17:45)',
        Mon: {
          cname: ''
        },
        Tues: {
          cname: ''
        },
        Wed: {
          cname: ''
        },
        Thur: {
          cname: ''
        },
        Fri: {
          cname: ''
        },
        Sat: {
          cname: ''
        },
        Sun: {
          cname: ''
        }
      }, {
        clock: '第五节(19:10-21:35)',
        Mon: {
          cname: ''
        },
        Tues: {
          cname: ''
        },
        Wed: {
          cname: ''
        },
        Thur: {
          cname: ''
        },
        Fri: {
          cname: ''
        },
        Sat: {
          cname: ''
        },
        Sun: {
          cname: ''
        }
      }]
      var url = window.location.href
      // eslint-disable-next-line no-useless-escape
      var index = url.lastIndexOf('\/')
      var str = url.substring(index + 1, url.length)
      console.log(str)
      let _this = this
      _this.$http.post('/student/getTermCourses', {
        'studentNo': this.$cookies.get('account'),
        'termId': str
        // 'termId': this.$store.state.termId
      }).then(res => {
        // console.log(res)
        if (res.data.resultCode === 1) {
          _this.display = true
          for (var i = 0; i < res.data.data.length; i++) {
            // console.log(res.data.data[i])
            var key = Object.keys(res.data.data[i].time)
            for (var j = 0; j < key.length; j++) {
              // console.log(res.data.data[i].time[key[j]].day)
              // console.log(res.data.data[i].time[key[j]].clock)
              var tmp = res.data.data[i].time[key[j]].day
              var index = 0
              if (res.data.data[i].time[key[j]].clock === '第1节-第2节') {
                index = 0
              } else if (res.data.data[i].time[key[j]].clock === '第3节-第4节') {
                index = 1
              } else if (res.data.data[i].time[key[j]].clock === '第6节-第7节') {
                index = 2
              } else if (res.data.data[i].time[key[j]].clock === '第8节-第9节') {
                index = 3
              } else {
                index = 4
              }
              _this.tableData[index][tmp].cname = res.data.data[i].courseName
              _this.tableData[index][tmp].date = '第' + res.data.data[i].beginWeek + '周到第' + res.data.data[i].endWeek +
                  '周'
              _this.tableData[index][tmp].tname = res.data.data[i].teacherName
              _this.tableData[index][tmp].address = res.data.data[i].address
            }
          }
        } else {
          _this.display = false
          console.log('error')
        }
      })
      this.loading = false
    }
  },
  data () {
    return {
      display: true,
      loading: true,
      // courseList: [],
      tableData: [{
        clock: '第一节(8:10-9:45)',
        Mon: {
          cname: ''
        },
        Tues: {
          cname: ''
        },
        Wed: {
          cname: ''
        },
        Thur: {
          cname: ''
        },
        Fri: {
          cname: ''
        },
        Sat: {
          cname: ''
        },
        Sun: {
          cname: ''
        }
      }, {
        clock: '第二节(10:10-11:45)',
        Mon: {
          cname: ''
        },
        Tues: {
          cname: ''
        },
        Wed: {
          cname: ''
        },
        Thur: {
          cname: ''
        },
        Fri: {
          cname: ''
        },
        Sat: {
          cname: ''
        },
        Sun: {
          cname: ''
        }
      }, {
        clock: '第三节(14:10-15:45)',
        Mon: {
          cname: ''
        },
        Tues: {
          cname: ''
        },
        Wed: {
          cname: ''
        },
        Thur: {
          cname: ''
        },
        Fri: {
          cname: ''
        },
        Sat: {
          cname: ''
        },
        Sun: {
          cname: ''
        }
      }, {
        clock: '第四节(16:10-17:45)',
        Mon: {
          cname: ''
        },
        Tues: {
          cname: ''
        },
        Wed: {
          cname: ''
        },
        Thur: {
          cname: ''
        },
        Fri: {
          cname: ''
        },
        Sat: {
          cname: ''
        },
        Sun: {
          cname: ''
        }
      }, {
        clock: '第五节(19:10-21:35)',
        Mon: {
          cname: ''
        },
        Tues: {
          cname: ''
        },
        Wed: {
          cname: ''
        },
        Thur: {
          cname: ''
        },
        Fri: {
          cname: ''
        },
        Sat: {
          cname: ''
        },
        Sun: {
          cname: ''
        }
      }]
    }
  }
}
</script>

<style scoped>
  .el-tag {
  /*  background-color: white;*/
  /*  color: #409EFF;*/
  /*  border-width: 0;*/
    font-size: 18px;
    width: 95%;
    /*word-wrap: break-word;*/
    /*word-break: break-all;*/
    left:50%;
    top:50%;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    /*transform: translate(-50%,-50%);*/
  }
</style>
