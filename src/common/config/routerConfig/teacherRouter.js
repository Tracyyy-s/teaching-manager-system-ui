import teacherSchedule from '@/views/teacherViews/teacherSchedule/teacherSchedule.vue'
import teacherEvaluation from '@/views/teacherViews/teacherEvaluation/teacherEvaluation.vue'
import teacherInfo from '@/views/teacherViews/teacherInfo/teacherInfo.vue'
import teacherCard from '@/views/teacherViews/teacherCard/teacherCard.vue'
import toEcaluate from '@/components/teacherComponents/teacherEvaluation/toEvaluate.vue'

import teacherCardModifyPWD from '@/views/teacherViews/teacherInfo/teacherCardModifyPWD.vue'
import teacherEvaluationSubmit from '@/views/teacherViews/teacherEvaluation/teacherEvaluationSubmit.vue'

let teacherRoutes = [
  {
    path: '/teacherSchedule',
    name: 'teacherSchedule',
    component: teacherSchedule
  },
  // 教师端的互评
  {
    path: '/teacherEvaluation',
    name: 'teacherEvaluation',
    component: teacherEvaluation
  },
  // 评价页面
  {
    path: '/toEvaluate',
    name: 'toEvaluate',
    component: toEcaluate
  },
  // 教师的信息
  {
    path: '/teacherInfo',
    name: 'teacherInfo',
    component: teacherInfo
  },
  // 资料卡片
  {
    path: '/teacherCard',
    name: 'teacherCard',
    component: teacherCard
  },
  // 资料卡片子页面
  {
    path: '/teacherCardModifyPWD',
    name: 'teacherCardModifyPWD',
    component: teacherCardModifyPWD
  },
  // 评价菜单子页面
  {
    path: '/teacherEvaluationSubmit',
    name: 'teacherEvaluationSubmit',
    component: teacherEvaluationSubmit
  }

  // 督导评价

]
export default teacherRoutes
