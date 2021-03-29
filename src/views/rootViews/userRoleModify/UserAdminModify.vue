<template>
  <div>
    <div>
      <div class="head" >
        <div class="head_font">
          -{{adminName}}-所管理的学院
        </div>
      </div>
    <div class="body">
      <div class="choose">
        <template>
        <el-transfer
        v-cloak
        v-model="value"
        :data="data"
        :titles="['未管理的学院', '管理的学院']"
        ></el-transfer>
      </template>
      </div>
      <el-button class="subBt" @click="subBt" type="primary">保存</el-button>
    </div>

    </div>
  </div>
</template>

<script>
export default {
  //
  name: 'UserAdminModify',
  //
  data () {
    return {
      adminNo: this.$route.query.adminNo,
      adminName: this.$route.query.adminName,
      // key是实际编号
      // 展示的是label
      data: [
        // {
        //   key:"a",
        //   label:'1'
        // }
      ],
      // 放入key  已经拥有的
      value: []
    }
  },
  created () {
    this.getinit()
  },
  methods: {
    // 1subBt 提交修改并
    async subBt () {
      const res1 = await this.$http.post('/root/updateAdminDeptIds',
        {
          'adminNo': this.adminNo,
          'deptIdList': this.value
        }
      ).then(res1 => {
        if (res1.data.resultCode === 1) {
          this.$router.push('/user_role_list')
        } else {
          this.$message.error('修改失败，后台出问题了')
        }
      })
    },
    // 2页面初始化加载权限   //渲染左边的
    async getinit () {
      const res2 = await this.$http.post('/root/getAllDepts').then(res2 => {
        for (let i = 0; i < res2.data.data.length; i = i + 1) {
          this.data.push({
            key: res2.data.data[i].deptId,
            label: res2.data.data[i].deptName
          })
        }
      })
      // 3页面初始化加载权限   //渲染右边的
      const res3 = await this.$http.post('/root/getAdminDepts',
        {
          'adminNo': this.adminNo
        }
      ).then(res3 => {
        console.log('keys')
        for (let i = 0; i < res3.data.data.deptIdList.length; i = i + 1) {
          this.value.push(res3.data.data.deptIdList[i])
          console.log(res3.data.data.deptIdList[i])
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .head {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 50px auto;
    width: 1200px;
    height: 45px;
    background: #F3F3F3;
    border: 1px #D9D9D9 solid;
    font-weight: bold;
    color: #666666;
  }
  //名称大字
  .head_font {
    font-size:25px;
  }
  .head_font2 {
    margin-bottom: 5px;
    margin-top: 5px;
    margin-left:auto;
    margin-right: auto;
    width: 500px;
    // height: 20px;
    font-size:25px;
  }
  .body{
    margin: 10px auto;
    width: 1200px;
    // border-style: solid;
    border-width: 1px;
    // text-align: center;
    // margin-right: 0px;
  }
  .choose{
    margin: 40px auto;
    // width: 1200px;
    width: 100%;
    // widows: 1000px;;
    // text-align: center;
  }
  .subBt{
    width: 10%;
    position: absolute;
    right: 200px;
    font-size: 15px ;

  }
  /deep/ .el-transfer-panel{
    height: 100%;
    width:42%;
    font-size: 17px;
  }
  // //标题字体
  // /deep/.el-checkbox__label{
  //   margin: 10px;
  //   font-size: 20px;
  // }
  // /deep/.el-transfer-panel__header{
  //   height: 80px;
  //   font-size: 42px;
  //   // text-align: center;
  //   // font-size: 20px;
  // }
  // /deep/.el-checkbox{
  //   font-size: 43px;
  // }
  // /deep/.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label{
  //   // font-size: 45px;
  //   color:#303133;
  //   font-weight:1px;
  // }
</style>
