<template>
  <div>
    <div class="demo-image">
      <router-link :to="{ path: '/index' }">
        <div  class="block" v-for="fit in fits" :key="fit">
          <el-image style="width: 100%; height: 100%" :src="url" :fit="fit">
            <div  slot="error" class="image-slot" >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
export default {
  name: 'Logo',
  data () {
    return {
      // fits: ['fill'],
      fits: ['contain'],
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: logo
    }
  },
  methods: {
    // to_index(){
    //   this.$router.push('/index')
    // }
  },
}
</script>

<style scoped>

</style>
