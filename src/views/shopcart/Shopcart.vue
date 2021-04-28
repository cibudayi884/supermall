<template>
  <div id="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{getCartLength}})</div>
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <!--商品列表展示-->
        <cart-list></cart-list>
    </scroll>
      <!--底部结算 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import Scroll from "components/common/scroll/Scroll";
  import CartBottomBar from "./childComps/CartBottomBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "Shopcart",
    components:{
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    computed:{
     ...mapGetters(['getCartLength'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  #cart{
    position: relative;
    height: 100vh;   /*100%的视口高度*/
  }
  .content{
    /*100%是相对于父元素，所以这这里要给父元素高度*/
    /*height: calc(100% - 44px - 49px);*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
  }
</style>
