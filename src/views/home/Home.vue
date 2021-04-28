<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center><div>购物街</div></template>
    </nav-bar>
    <tab-control :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2" ></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
  </div>
</template>
<script>
  //本身子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodList from "components/content/goods/GoodList";
  import Scroll from "components/common/scroll/Scroll";
  //请求的数据
  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {itemListenerMixin,scrollTopMixin} from "common/mixin";

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll
    },
    mixins:[itemListenerMixin,scrollTopMixin],
    data(){
      return{
        // result:null
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list: []},
          'new':{page:0,list: []},
          'sell':{page:0,list: []}
        },
        currentIndex:'pop',
        tabOffsetTop:0,
        isFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentIndex].list
      }
    },
    created() {  //一般在create只写主要逻辑，处理方法放到methods,好处多多
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    /*created：在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
      mounted：在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
      */
   /* mounted() {
      //1.图片加载完成的事件监听
      const newRefresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh,200)
      this.itemImgListener = ()=>{
        newRefresh();
      }
      this.$bus.$on('itemImageLoad',this.itemImgListener)
    },*/
    destroyed() {
      // console.log('Home销毁')
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated() {
      // this.saveY = -1000  不能写死
      this.saveY = this.$refs.scroll.getScrollY()
      console.log(this.saveY)
      //离开的时候取消itemImgLoad的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      /*
      * 事件监听相关的方法
      * */
      tabClick(index){
        //console.log(index)
        switch (index) {
          case 0:
            this.currentIndex = 'pop';
            break;
          case 1:
            this.currentIndex = 'new';
            break;
          case 2:
            this.currentIndex = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
     /* backClick(){
        //1.通过refs属性拿到scroll组件,通过scroll属性调用scrolltop方法
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        //2.可以在scroll里面单独封装一个scrolltop方法，在scrolltop方法中调用Scroll组件的scrollTop方法
        this.$refs.scroll.scrollTo(0,0)

      },*/
      contentScroll(position){
        //1.判断backTop是否显示
        this.isShowBackTop = -position.y > 1000
        //2.决定tabControl是否吸顶(position:fixed)
        this.isFixed = -position.y >this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentIndex)
      },
      swiperImageLoad(){
        //2.获取tabControl的offsetTop
         this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /*
      *网络请求相关的放法
      * */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          //console.log(res);
          //data中的result并不会在函数调用完后被回收，那么此时result保存的是res内存地址，result和res都指向了请求的data数据，
          // 即使res被回收了，result仍旧能访问到data数据
          // this.result = res;  //箭头函数中的this，是箭头函数所在的上下文，所指的就是这个组件
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },

    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
/*  在使用浏览器原生滚动时，为了让导航不跟随一起滚动
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
 */
}
  .tab-control{
    position: relative;
    z-index: 9;
  }
/*  .tab-control{
    !*position: sticky;*!  吸顶效果不起作用了
    top: 44px;
    z-index: 9;
  }*/
/* 1.动态计算方法：计算.wrapper .content的页面高度
  .content{
    height:calc(100% - 93px);
    overflow: hidden;
    !*background-color: #ff8198;*!
    margin-top: 44px;
  }*/

  /*
    2.定位方法
  */
  .content{
    height:700px;
    overflow: hidden;
    /*overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;*/
  }
</style>
