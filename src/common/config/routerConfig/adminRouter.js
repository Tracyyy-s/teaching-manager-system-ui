import StudentListImporting from '@/views/adminViews/import/StudentListImporting.vue'
import TimetableImporting from '@/views/adminViews/import/TimetableImporting.vue'
import TeacherListImporting from '@/views/adminViews/import/TeacherListImporting.vue'

import ViewEvaluationBG from '@/views/adminViews/view/ViewEvaluationBG.vue'
import ViewStudentEvaluationResults from '@/views/adminViews/view/ViewStudentEvaluationResults.vue'
import ViewAllEvaluationResults from '@/views/adminViews/view/ViewAllEvaluationResults.vue'
import Classes from '@/views/adminViews/view/Classes.vue'
import ViewStudentEvaluationResultsDetails from '@/views/adminViews/view/ViewStudentEvaluationResultsDetails.vue'

import modifyTeacherEvaluationForm from '@/views/adminViews/manage/ModifyTeacherEvaluationForm.vue'
import modifyStudentEvaluationForm from '@/views/adminViews/manage/ModifyStudentEvaluationForm'
import releaseStudentComments from '@/views/adminViews/manage/ReleaseStudentComments'
import releaseTeacherComments from '@/views/adminViews/manage/ReleaseTeacherComments'
let adminRouter = [
  {
    path: '/studentListImporting',
    component: StudentListImporting
  },
  {
    path: '/timetableImporting',
    component: TimetableImporting
  },
  {
    path: '/teacherListImporting',
    component: TeacherListImporting
  },
  // 二级
  {
    path: '/viewEvaluation',
    redirect: '/viewStudentEvaluationResults'
  },
  {
    path: '/viewEvaluation',
    component: ViewEvaluationBG,
    children: [
      // 查看学生
      {
        path: '/viewStudentEvaluationResults',
        name: 'ViewStudentEvaluationResults',
        component: ViewStudentEvaluationResults
      },
      {
        path: '/viewStudentEvaluationResultsDetails/:tcId:courseName:teacherName',
        name: 'ViewStudentEvaluationResultsDetails',
        component: ViewStudentEvaluationResultsDetails
      },
      // 查看所有
      {
        path: '/viewAllEvaluationResults',
        name: 'ViewAllEvaluationResults',
        component: ViewAllEvaluationResults
      },
      {
        path: '/Classes',
        name: 'Classes',
        component: Classes
      }
    ]
  },
  // 结束
  {
    path: '/modifyTeacherEvaluationForm',
    component: modifyTeacherEvaluationForm
  },
  {
    path: '/modifyStudentEvaluationForm',
    component: modifyStudentEvaluationForm
  },
  {
    path: '/releaseStudentComments',
    component: releaseStudentComments
  },
  {
    path: '/releaseTeacherComments',
    component: releaseTeacherComments
  }]

export default adminRouter
