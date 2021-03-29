<template>
  <div>
<!--    <el-col :xs="{ span:20, offset:2 }" :sm="{ span:18, offset:3 }" :md="{ span:16, offset:4 }" :lg="{ span:18, offset:3 }" :xl="{ span:22, offset:1 }">-->
    <el-carousel trigger="click" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <el-image
          :src="item.url"
          alt="图片"
          style="width: 100%; height: 300px; display: flex">
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <el-timeline>
      <el-timeline-item timestamp="2020/8/24" placement="top">
        <el-card>
          <h4>发布 2020-2021学年第一学期 开学时间</h4>
          <p>汪明义校长 提交于 2020/8/1 20:10</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2020/12/5" placement="top">
        <el-card>
          <h4>发布 评价学生 选项</h4>
          <p>汪明义 提交于 2020/12/5 20:00</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2021/1/18" placement="top">
        <el-card>
          <h4>发布 2020-2021学年第一学期 散学时间</h4>
          <p>汪明义校长 提交于 2020/12/15 20:20</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
<!--    </el-col>-->
  </div>
</template>

<script>
import covid from '@/assets/carousel/covid.jpg'
import school from '@/assets/carousel/school.jpg'
import fight from '@/assets/carousel/fight.jpg'
import carousel from '@/assets/carousel/carousel.jpg'

export default {
  name: 'Index',
  components: {
    covid,
    school,
    fight,
    carousel
  },
  data () {
    return {
      value: '',
      imgList: [
        {
          url: covid
        },
        {
          url: school
        },
        {
          url: carousel
        },
        {
          url: fight
        }
      ]
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
