<template>
  <div>
    {{msg}}
    <div>
      <router-view /> 
    </div>
    
  </div>
  
</template>

<script>
export default {
  name: 'teacherCourse',
  data () {
    return {
      msg: '教师课程页面'
    }
  }
}
</script>


<style >

</style>
