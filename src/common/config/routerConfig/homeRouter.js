
import index from '@/common/components/index.vue'
import home from '@/common/components/home.vue'

import teacherRoutes from '@/common/config/routerConfig/teacherRouter.js'
import studentRoutes from '@/common/config/routerConfig/studentRouter.js'
import adminRoutes from '@/common/config/routerConfig/adminRouter.js'
import rootRouter from '@/common/config/routerConfig/rootRouter'

let indexRouter = [
  {
    // 导航栏
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: '/index',
        name: 'index',
        component: index
      }
    ].concat(teacherRoutes).concat(studentRoutes).concat(adminRoutes).concat(rootRouter)
  }
]
export default indexRouter
