import Schedule from '@/views/studentViews/schedule/Schedule.vue'
import Evaluation from '@/views/studentViews/evaluation/evaluation.vue'
import Info from '@/views/studentViews/info/info.vue'
import Pwd from '@/views/studentViews/pwd/pwd.vue'
import EvaluationDetail from '@/views/studentViews/evaluation/EvaluationDetail.vue'
// import roleForm from '@/components/rootComponents/permissions/roleForm'
// import permissionList from '@/components/rootComponents/permissions/permissionList'

let studentRouter = [
  {
    path: '/Evaluation',
    name: 'Evaluation',
    meta: { requiresAuth: true },
    component: Evaluation
  },
  {
    path: '/Schedule/:termId',
    name: 'Schedule',
    meta: { requiresAuth: true },
    component: Schedule
  },
  {
    path: '/studentInfo',
    name: 'studnetInfo',
    meta: { requiresAuth: true },
    component: Info
  },
  {
    path: '/Pwd',
    name: 'Pwd',
    meta: { requiresAuth: true },
    component: Pwd
  },
  {
    path: '/EvaluationDetail',
    name: 'EvaluationDetail',
    meta: { requiresAuth: true },
    component: EvaluationDetail
  }
]
export default studentRouter
