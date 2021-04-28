<template>
    <swiper>
      <swiper-item  v-for="(item,index) in topImages" :key="index" class="detail-swiper">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>
<!--⚠️加上class后出错   -->
<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>