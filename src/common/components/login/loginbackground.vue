<template>
  <div class="login_container">
    <div class="container">
        <img src="@/assets/loginLogo.png" class="loginLogo" />
        <div class="margin-big-title">
          教学质量评估管理系统
        </div>
        <div class="login">
          <div style=" text-align:center;" >
            <router-view></router-view>
          </div>
          <!-- <div class="choose">
            <el-tag class="tag-size">
              <router-link :to="{name:'login_non_administrator'}">师生登录</router-link>
            </el-tag>
            <el-divider class="myel-divider--vertical" direction="vertical"></el-divider>
            <el-tag class="tag-size">
              <router-link :to="{name:'login_administrator'}">管理员登录</router-link>
            </el-tag>
          </div> -->
        </div>
        <footer class="footer">
          <p>四川师范大学\2020-11</p>
        </footer>
    </div>
  </div>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'loginbackground'
    }
  }

}
</script>

<style lang='less'>
.login_container{
  width: 100%;
  height: 100%;
}
.margin-big-title{
  position: fixed;
  right: 270px;
  top: 150px;
  font-size: 35px;
}
.loginLogo{
  position: absolute;
  right: 1000px;
  top: 100px;
}
.container {
  height: 100%;
  width: 100%;
  // height: 800px;
  // width: 1280px;
  background-size: 100% 100% ;
  background-color: #EBF0DC;
  // background: url(@/assets/loginLogo.png);
  // background-color: black;
}
/* 登录窗口 */
.login{
  width: 320px;
  // height: 350px;
  padding: 20px 35px 0px 35px;
  border-style:solid;
  border-width: 1px;
  border-color:rgba(151, 151, 151, 0.3);
  box-shadow: 0px 2px 10px rgba(41, 12, 127, 0.2);
  background-color: white;
  position: fixed;
  right: 250px;
  top: 220px;
}

.footer {
  width: 70%;
  // display: flex;
  position: absolute;
  bottom: 0px;
  margin-left: 15px;
  margin-right: 100px;
  margin-bottom: 0px;
  transform: translate(-50 );
  font-family: "Courier New";
}
.choose{
  position: absolute;
  bottom:1px;
  right: 12px;

}
.tag-size{
  font-size: 2px;
  display:inline;
  padding: 0px;
}
.myel-divider--vertical{
  margin: 0px;
}
</style>
