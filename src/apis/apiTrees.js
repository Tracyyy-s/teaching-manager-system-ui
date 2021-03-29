
import req from './http.js'   //引入封装好的axios

export const LogOut =params=>req('post','/logout',params)
export const Login =params=>req('post','/login',params)
export const GetMenuList =params=>req('post','/getUserPermissions',params)
export const UpdatePassword =params=>req('post','/updatePassword',params)
export const rootgetAllAdmins =params=>req('post','/root/getAllAdmins',params)
export const rootupdateUserRole =params=>req('post','/root/updateUserRole',params)
export const rootupdateAvailableDeptIds =params=>req('post','/root/updateAvailableDeptIds',params)
export const rootgetLogTypes =params=>req('post','/root/getLogTypes',params)
export const rootgetLogTypeAndCount =params=>req('post','/root/getLogTypeAndCount',params)
export const rootgetLogInfoByType =params=>req('post','/root/getLogInfoByType',params)
export const rootdeleteLogs =params=>req('post','/root/deleteLogs',params)
export const adminUgetTargets =params=>req('post','/admin/getTargets',params)
export const adminaddTarget =params=>req('post','/admin/addTarget',params)
export const adminupdateTarget =params=>req('post','/admin/updateTarget',params)
export const admindeleteTarget =params=>req('post','/admin/deleteTarget',params)
export const admingetTeachersByDept =params=>req('post','/admin/getTeachersByDept',params)


// 定义了一个登陆的接口，把登陆的接口暴露出去给组件使用
//这里使用了箭头函数，转换一下写法：
//export const LogOut=function(req){
//    return req('post','/GetTreeListForSoilByRegion',params)
//}