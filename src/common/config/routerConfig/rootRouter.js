import rootIndex from '@/views/rootViews/rootIndex.vue'
import UserRoleList from '@/views/rootViews/userRoleModify/UserRoleList.vue'
import UserAdminModify from '@/views/rootViews/userRoleModify/UserAdminModify.vue'
import UserAdd from '@/views/rootViews/userRoleModify/UserAdd.vue'
import UserRoleModify from '@/views/rootViews/userRoleModify/UserRoleModify.vue'
import Log from '@/views/rootViews/userRoleModify/Log.vue'
import LogTable from '@/views/rootViews/userRoleModify/LogTable.vue'
import RolePermissionModifyView from '@/views/rootViews/rolePermissionModify/RolePermissionModifyView.vue'
import RolePermissionModify from '@/views/rootViews/rolePermissionModify/RolePermissionModify.vue'

let rootRouter = [
  {
    path: '/LogTable',
    name: 'LogTable',
    component: LogTable
  },
  // 页面一 userRoleModify
  {
    // admin 清单
    path: '/user_role_list',
    name: 'UserRoleList',
    meta: { requiresAuth: true },
    component: UserRoleList
  },
  // 页面1.1 admin与角色页面配对页面
  {
    path: '/user_admin_modify',
    name: 'UserAdminModify',
    meta: { requiresAuth: true },
    component: UserAdminModify
  },
  {
    path: '/Log',
    name: 'Log',
    component: Log
  },
  // 页面1.2 增加用户页面
  {
    path: '/user_add',
    name: 'UserAdd',
    meta: { requiresAuth: true },
    component: UserAdd
  },
  // 页面1.2 增加用户页面
  {
    path: '/user_role_modify',
    name: 'UserRoleModify',
    meta: { requiresAuth: true },
    component: UserRoleModify
  },
  {
    path: '/role_permission_modify_view',
    name: 'RolePermissionModifyView',
    component: RolePermissionModifyView
  },

  // 页面二 role_permission_modify
  {
    path: '/role_permission_modify',
    name: 'RolePermissionModify',
    meta: { requiresAuth: true },
    component: RolePermissionModify
  }
]
export default rootRouter
