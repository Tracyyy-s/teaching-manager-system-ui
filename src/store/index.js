import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    deptId: '110',
    tcId: '20211200111000211004',
    // termMap: {},
    termId: '2020-2021-1',
    evaluation_now: false,
    allMenuNameList: [

      { 'permission_name': '导入学生名单' },
      { 'permission_name': '导入课表' },
      { 'permission_name': '导入老师名单' },
      { 'permission_name': '管理教师档案' }, // 不可用
      { 'permission_name': '查看评价结果' },

      { 'permission_name': '发布学生评价指标' },
      { 'permission_name': '发布教师评价指标' },
      { 'permission_name': '查看教师课表' },
      { 'permission_name': '教师互评' },
      { 'permission_name': '学生信息' },

      { 'permission_name': '资料卡片' },
      { 'permission_name': '用户列表' },
      { 'permission_name': '角色权限管理' },
      { 'permission_name': '评价教师' },
      { 'permission_name': '查看学生课表' },

      { 'permission_name': '后台日志' },
      { 'permission_name': '发布评价' }// 不可用
    ],
    allMenuUrlList:
      [

        { 'permissionUrl': 'studentListImporting' },
        { 'permissionUrl': 'timetableImporting' },
        { 'permissionUrl': 'teacherListImporting' },
        { 'permissionUrl': 'teacherFileManagement' }, // 不可用
        { 'permissionUrl': 'viewAllEvaluationResults' },

        { 'permissionUrl': 'releaseStudentComments' },
        { 'permissionUrl': 'releaseTeacherComments' },
        { 'permissionUrl': 'teacherSchedule' },
        { 'permissionUrl': 'teacherEvaluation' },
        { 'permissionUrl': 'studentInfo' },

        { 'permissionUrl': 'teacherCard' },
        { 'permissionUrl': 'user_role_list' },
        { 'permissionUrl': 'role_permission_modify' },
        { 'permissionUrl': 'Evaluation' },
        { 'permissionUrl': 'studentSchedule' },

        { 'permissionUrl': 'Log' },
        { 'permissionUrl': 'releaseComments' }// 不可用
      ],
    menuList: [
      // {'评价教师':'Evaluation'}
    ]
  },
  mutations: {
    getMenuList (state, menuEl) {
      state.menuList.push(menuEl)
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
