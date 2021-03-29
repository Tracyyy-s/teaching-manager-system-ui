/**
 *  teacher路由规则:
 *  以index结尾的，path和name默认去除index
 *  默认生成name为shop_list（如果结尾为index，如shop/index则name为shop）
 *
 * component的值就是路径/teacherManger/teacher
 * 也是component的本身路径的一部分
 * 也是name的一部分manger_teaher
 */

let routesIndex_wr = [
  {
    component: 'teacherIndex/index_wr',
    children: [
      {
        component: 'teacherManager/teacherManagerIndex_wr',
        children: [
          {
            component: 'teacherManager/getViews_wr'
          },
          {
            component: 'teacherManager/teacherCourse_wr'
          }
        ]
      },
      {
        component: 'teacherSet/teacherSetIndex_wr',
        children: [
          {
            component: 'teacherSet/dataCard_wr'
          },
          {
            component: 'teacherSet/modifyData_wr'
          }
        ]
      }
    ]
  }
]

let getRouter = function () {
  // createRoute(routesManger)
  // createRoute(routesSet)
  createRoute(routesIndex_wr)
  return routesIndex_wr
}
function createRoute (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return
    let val = getValue(arr[i].component)
    // 生成name
    arr[i].name = arr[i].name || val.replace(/\//g, '_')
    // 生成path
    arr[i].path = `/${val}`
    let componentFun = import(`@/views/teacherViews/${arr[i].component}.vue`)
    // 引入组件
    arr[i].component = () => componentFun
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children)
    }
  }
}
function getValue (str) {
  let index = str.lastIndexOf('/')
  let val = str.substring(index + 1, str.length)
  if (val === 'index') {
    return str.substring(index, -1)
  }
  return str
}
export default getRouter()
