<template>

  <div>
    <div style="border-radius: 90px; width: 1100px; height: 50px; line-height: 50px; padding-left: 20px; font-size: 17px; font-weight: bold; background-color: #f3f3f3; color: #666666;">
      <p style="text-align: center">教 师 课 程</p>
    </div>
    <br>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="clock" label="">
      </el-table-column>
      <el-table-column prop="Mon" label="星期一" height=100px >
        <template slot-scope="scope" v-if="scope.row.Mon.cname!=null ">
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
      <el-table-column prop="Tues" label="星期二">
        <template slot-scope="scope" v-if="scope.row.Tues.cname!=null">
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
      <el-table-column prop="Wed" label="星期三">
        <template slot-scope="scope" v-if="scope.row.Wed.cname!=null">
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
      <el-table-column prop="Thur" label="星期四">
        <template slot-scope="scope" v-if="scope.row.Thur.cname!=null">
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
      <el-table-column prop="Fri" label="星期五">
        <template slot-scope="scope" v-if="scope.row.Fri.cname!=null">
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

      <el-table-column prop="Sat" label="星期六">
        <template slot-scope="scope" v-if="scope.row.Sat.cname!=null">
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

      <el-table-column prop="Sun" label="星期日">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Schedule',
    // mounted: function(){
    //   this.getE();//需要触发的函数
    // },
    // getE(){

    // },

    created() {
      // console.log("5165")
      this.$http.post('/teacher/getTermCourses', {
        "userId": this.$cookies.get("account")
      }).then((res) => {
        // console.log("begin:   ");
        // console.log(this.$cookies.get("account"));
        // console.log(res.data);

        if (res.data.resultCode === 1) {
          var len = res.data.data.length;
          for (var i = 0; i < len; i++) {
            this.showSchedule(res.data.data[i]);
          }

        } else {
          alert('未找到数据!');
        }
      })
    },
    methods: {
      showSchedule(schedule) {
        // 用于后端传输的数据生成课程表
        for (var key in schedule.time) {
          var arr = schedule.time[key]
          var index = -1
        }
      },

      showSchedule(schedule) {
        // 用于后端传输的数据生成课程表
        for (var key in schedule.time) {
          var arr = schedule.time[key];
          var index = -1;
          switch (arr.clock) {
            case '第1节-第2节':
              index = 0;
              break;
            case '第3节-第4节':
              index = 1;
              break;
            case '第5节':
              index = 2;
              break;
            case '第6节-第7节':
              index = 3;
              break;
            case '第8节-第9节':
              index = 4;
              break;
          }
          for (var key in schedule.time) {
            var tmp = schedule.time[key].day;
            this.tableData[index][tmp].cname = schedule.courseName;
            // this.tableData[index][tmp].cname = 'asdf';
            this.tableData[index][tmp].date = '第' + schedule.beginWeek + '周到第' + schedule.endWeek + '周';
            this.tableData[index][tmp].tname = schedule.teacherName;
            this.tableData[index][tmp].address = schedule.address;
            console.log(this.tableData[1][tmp]);
          }
        }
        for (var key in schedule.time) {
          var tmp = schedule.time[key].day
          this.tableData[index][tmp].cname = schedule.courseName
          this.tableData[index][tmp].date = '第' + schedule.beginWeek + '周到第' + schedule.endWeek + '周'
          this.tableData[index][tmp].tname = schedule.teacherName
          this.tableData[index][tmp].address = schedule.address
          console.log(this.tableData[1][tmp])
        }
      }

      // switch (arr.day) {
      //   case 'Mon':
      //     this.tableData[index].Mon = schedule.address;

      //     break;
      //   case 'Tues':
      //     this.tableData[index].Tues = schedule.address;

      //     break;
      //   case 'Wed':
      //     // this.tableData[index].Wed = schedule.address;
      //     // this.tableData[index].Wed += '\n课程名称:' + schedule.courseName;
      //     // this.tableData[index].Wed += '\n教师名称:' + schedule.teacherName;
      //     break;
      //   case 'Thur':
      //     this.tableData[index].Thur = schedule.address;
      //     break;
      //   case 'Fri':
      //     this.tableData[index].Fri = schedule.address;
      //     break;
    },
    data() {
      return {
        tableData: [{
          clock: '第一节(8:10-9:45)',
          Mon: {
            cname: null
          },
          Tues: {
            cname: null
          },
          Wed: {
            cname: null
          },
          Thur: {
            cname: null
          },
          Fri: {
            cname: null
          },
          Sat: {
            cname: null
          }
        }, {
          clock: '第二节(10:10-11:45)',
          Mon: {
            cname: null
          },
          Tues: {
            cname: null
          },
          Wed: {
            cname: null
          },
          Thur: {
            cname: null
          },
          Fri: {
            cname: null
          },
          Sat: {
            cname: null
          }
        }, {
          clock: '第三节(14:10-15:45)',
          Mon: {
            cname: null
          },
          Tues: {
            cname: null
          },
          Wed: {
            cname: null
          },
          Thur: {
            cname: null
          },
          Fri: {
            cname: null
          },
          Sat: {
            cname: null
          }
        }, {
          clock: '第四节(16:10-17:45)',
          Mon: {
            cname: null
          },
          Tues: {
            cname: null
          },
          Wed: {
            cname: null
          },
          Thur: {
            cname: null
          },
          Fri: {
            cname: null
          },
          Sat: {
            cname: null
          }
        }, {
          clock: '第五节(19:10-21:35)',
          Mon: {
            cname: null
          },
          Tues: {
            cname: null
          },
          Wed: {
            cname: null
          },
          Thur: {
            cname: null
          },
          Fri: {
            cname: null
          },
          Sat: {
            cname: null
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
    width: 150px;
    /*word-wrap: break-word;*/
    /*word-break: break-all;*/
    left: 50%;
    top: 50%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    /*transform: translate(-50%,-50%);*/
  }
</style>
