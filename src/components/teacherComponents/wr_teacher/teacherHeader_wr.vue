<template>
    <div>
        <!-- height: 500px; -->
        <el-container style=" border: 1px solid #eee">
             <el-header style="font-size: 12px">
                 <!-- <span style="background-color:#FF0000">SICNU教师教学质量管理</span> -->
                    <span style ="display: flex; justify-content: space-between">
                        <span >
                            <span style="font-family: Helvetica Neue" >
                                <router-link :to="{name:'teacherManager_teacherManagerIndex'}">教师管理</router-link>
                            </span>
                             ||
                            <span style="font-family: Helvetica Neue" >
                                <router-link :to="{name:'teacherSet_teacherSetIndex'}">设置</router-link>
                            </span>
                        </span >
                        <span >
                            <span>{{name}}</span>
                        </span>
                    </span>
            </el-header>

        </el-container>
    </div>
</template>

<script>
//   import Logo from "@/components/teacherComponents/Logo.vue"
export default {
  name: 'teacherHeader',
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      name: '王小虎',
      activeIndex2: '1',
      tableData: Array(20).fill(item)
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  components: {
    // Logo
  }
}
</script>

<style>
  .tu {
      width:10%; height:10%
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
