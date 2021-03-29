import error from '@/views/error.vue'
import LoginNonAdministrator from '@/common/components/login/login_non_administrator.vue'
import loginbackground from '@/common/components/login/loginbackground.vue'
import forgetPW from '@/common/components/login/forgetPW.vue'

let login = [
  {
    path: '/forgetPW',
    component: forgetPW
  },
  {
    path: '/',
    redirect: '/non_administrator'
  },
  {
    path: '/login',
    redirect: '/non_administrator'
  },
  {
    path: '/login',
    name: 'login',
    component: loginbackground,
    children: [
      {
        path: '/non_administrator',
        name: 'login_non_administrator',
        component: LoginNonAdministrator
      }
    ]
  },
  {
    path: '*',
    name: 'error',
    component: error
  }
]

export default login
