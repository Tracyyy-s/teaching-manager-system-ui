<template>
  <div>
    <el-menu
     :default-active="activeIndex"
     class="el-menu-demo"
     active-text-color="#ffd04b"
     mode="horizontal"
     @select="handleSelect"
     >
      <!-- 管理员 - 角色 的管理- -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          管理员角色
        </template>
        <el-menu-item index="1-1" @click="user_role_list">
          管理员列表
        </el-menu-item>
        <el-menu-item index="1-2" @click="user_add">
          添加管理员
          <!-- 新增管理员 -->
        </el-menu-item>
      </el-submenu>
      <!-- 角色与限权的管理 -->
      <el-submenu  index="2" >
        <template slot="title">
            <i class="el-icon-card"></i>
            设置
          </template>
        <el-menu-item index="2-1" @click="role_permission_modify" >
          修改密码
        </el-menu-item>
        <!-- <el-menu-item index="2-2" @click="teacherCard">
          资料卡片
        </el-menu-item>   -->
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    user_role_list () {
      this.$router.push('/user_role_list')
    },
    role_permission_modify () {
      this.$router.push('/role_permission_modify')
    },
    user_add () {
      this.$router.push('/user_add')
    }
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: bold;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
