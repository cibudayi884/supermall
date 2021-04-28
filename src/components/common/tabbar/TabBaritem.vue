<template>
<div class="tab-bar-item" @click="itemClick">
  <div v-if="!isActive"><slot name="item-icon"></slot></div>
  <div v-else><slot name="item-icon-active"></slot></div>
  <div :style="activeStyle"><slot name="itme-text"></slot></div>
</div>
</template>
<script>
  export default {
    name: "TabBaritem",
    data(){
      return{
        // isActive:true
      }
    },
    computed:{
      isActive(){
        //当前活跃的路径.indexOf(用props传过来的路径)
        return this.$route.path.indexOf(this.link) !==-1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    props:{
      link:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    methods:{
      itemClick(){
        this.$router.push(this.link).catch(err => err)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;    /*图片下面会空3px*/
    margin-bottom: 2px;

  }

 /* .active{
    color: red;
  }*/

</style>
