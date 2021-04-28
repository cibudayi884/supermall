<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType: {
        type:Number,
        default:0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll:null,
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        observeDOM:true,
        click:true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',position=>{
         // console.log(position)  //position并不是要在这里打印，而是谁需要它，就传给谁
          this.$emit('scroll',position)
        })
      }
      //3.监听scroll滚动到底部
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          // console.log('上拉滚动到底部')
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      scrollTo(x,y,time=300){  //ES6语法，可以给个默认值
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.scrollY : 0
      }
    }
  }
</script>

<style scoped>

</style>