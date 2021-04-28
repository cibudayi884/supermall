<template>
  <div class="bottom-bar">
    <div class="bottom-bar-item">
      <p><i class="iconfont iconkefu"></i></p>
      <p>客服</p>
    </div>
    <div class="bottom-bar-item">
      <p><i class="iconfont icondianpu"></i></p>
      <p>店铺</p>
    </div>
    <div class="bottom-bar-item">
      <p><i class="iconfont iconshoucang"></i></p>
      <p>收藏</p>
    </div>
    <div class="btn buy-btn">购买</div>
    <div class="btn cart-btn" @click="addCart">加入购物车</div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods:{
      addCart(){
        this.$emit('addToCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 49px;
    background-color: #fff;
  /*  position: relative;
    bottom: 49px;*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .bottom-bar-item{
    display: inline-block;
    width: 16%;
    font-size: 11px;
    color: #333;
    text-align: center;
  }
  .bottom-bar-item p{
    margin-top: 2px;
  }
  .iconkefu, .iconshoucang {
    font-size: 22px;

  }
  .icondianpu{
    font-size: 26px;
  }
  .btn{
    float: right;
    width: 26%;
    font-size: 15px;
    text-align: center;
    line-height: 49px;
    /*text-align: center;*/
  }
  .cart-btn{
    background-color: rgba(255, 255, 0, 0.97);
  }
  .buy-btn{
    background-color: var(--color-tint);
  }
</style>