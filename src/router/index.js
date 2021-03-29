import Vue from 'vue'
import Router from 'vue-router'

import login from '@/common/config/routerConfig/loginRouter.js'
import homeRouter from '@/common/config/routerConfig/homeRouter.js'

Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'history',
  routes: login.concat(homeRouter)
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/forgetPW') {
    return next()
  }

  if (to.path === '/login' || to.path === '/' || to.path === '/non_administrator') {
    if (sessionStorage.getItem('token')) {
      return next('/index')
    } else {
      return next()
    }
  }

  if (sessionStorage.getItem('token')) {
    return next()
  }
  // if ($cookies.isKey('account')) {
  //   return next()
  // }
  // 不想去登录页，查看是否已经登录，是则直接放行
  // if ($cookies.isKey('token')) {
  // 已经登录   -->>  查看是否具有权限
  // let this_ = this
  // if(to.matched.some(res => res.meta.requiresAuth)){
  //   var menuList =  store.state.menuList// 接口返回可以访问的菜单，存储在vuex中
  //   console.log("在router里面"+menuList)
  //   console.log("打印完了，菜单长度"+  menuList.length )
  //   for(var i = 0 ; i < menuList.length ; i++){
  //     var key = Object.keys(menuList)
  //     if('/'+to.path === menuList[key[i]]){
  //       console.log("aaa"+'/'+to.path+"bbb"+menuList[key[i]])
  //       return next()
  //     }else{
  //       console.log("aaa"+'/'+to.path+"bbb"+menuList[key[i]])
  //       // alert('/'+to.path)
  //       // alert(menuList[key[i]])
  //       Message({
  //         message: '无权限访问',
  //         type: "warning"
  //         });
  //         next('/index');
  //     }
  //   }
  // }
  // }
  return next({path: '/login'})
})

export default router
