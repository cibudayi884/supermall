<template>
  <div id="detail">
    <detail-nav-bar class="detail-control" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll  class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" ref="goods"></detail-goods-info>
      <detail-param-info :param-info="goodsParams" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods="recommends" ref="recommends"></good-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
<!--    <toast></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodList from "components/content/goods/GoodList";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  // import Toast from "components/common/toast/Toast";

  import { getDetail , Goods , Shop ,  GoodsParams ,getRecommend } from "network/detail";
  import {itemListenerMixin,scrollTopMixin} from "common/mixin";
  import {mapActions} from 'vuex'
  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList,
      DetailBottomBar
      // Toast
    },
    mixins:[itemListenerMixin,scrollTopMixin],
    data(){
      return {
        iid:null,
        goods: {},
        shop:{},
        topImage:[],
        detailInfo:{},
        goodsParams:{},
        commentInfo:{},
        recommends:[],
        themeOffsetTop:[],
        getOffsetTop:null,
        currentIndex:0
      /*  message:'',
        isShow:false*/
      }
    },
    created() {
      //1.保存传入的id
      this.iid = this.$route.params.id
      //2.根据id请求详情数据
      getDetail(this.iid).then(res=>{
        //1.获取顶部的图片轮播数据
        const data = res.result
        this.topImage = data.itemInfo.topImages
        console.log(data)
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //4.保存商品详细数据
        this.detailInfo = data.detailInfo;
        //5.商品参数信息
        this.goodsParams = new GoodsParams(data.itemParams.info,data.itemParams.rule);
        //6.获取评论信息
        if (data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

  /*      this.$nextTick(()=>{
          /!*
          * 根据最新的数据，对应的DOM是已经被渲染出来
          * 但是图片依旧是没有加载完(目前获取到offsetTop不包含其中的图片)
          * offsetTop值不对的时候，都是图片的问题
          * *!/
          this.themeOffsetTop = [];
          this.themeOffsetTop.push(this.$refs.goods.$el.offsetTop)
          this.themeOffsetTop.push(this.$refs.param.$el.offsetTop)
          this.themeOffsetTop.push(this.$refs.comment.$el.offsetTop)
          this.themeOffsetTop.push(this.$refs.recommends.$el.offsetTop)
          console.log(this.themeOffsetTop)
        })*/
      })
      //3.请求推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list;
        console.log(this.recommends)
      })
      //4.给getOffsetTop赋值
      /*this.getOffsetTop = debounce(()=>{
        this.themeOffsetTop = [];
        this.themeOffsetTop.push(0)
        this.themeOffsetTop.push(this.$refs.param.$el.offsetTop)
        this.themeOffsetTop.push(this.$refs.comment.$el.offsetTop)
        this.themeOffsetTop.push(this.$refs.recommends.$el.offsetTop)
        console.log(this.themeOffsetTop)
        console.log('----')
      })*/
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh()
        this.themeOffsetTop = [];
        this.themeOffsetTop.push(0)
        this.themeOffsetTop.push(this.$refs.param.$el.offsetTop)
        this.themeOffsetTop.push(this.$refs.comment.$el.offsetTop)
        this.themeOffsetTop.push(this.$refs.recommends.$el.offsetTop)
        this.themeOffsetTop.push(Number.MAX_VALUE)
        console.log(this.themeOffsetTop)
      },
      titleClick(index){
        // console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeOffsetTop[index]+44,200)
      },
      contentScroll(position){

        //1.获取y值
        const positionY = -position.y

        //2.positionY和themeOffsetTop中的值对比
        /*
        * [0, 24695, 25456, 25646]
        * positionY 在0和24695之间，index=0
        * positionY 在246950和25456之间，index=1
        * positionY 在254560和25646之间，index=2
        * positionY 在大于25456，index=3
        * */
        //因为for...in是遍历对象的方法，会将这个i看作属性名，转化为字符串类型
        let length = this.themeOffsetTop.length
        for (let i =0;i<length-1;i++){
     /*     //前面再加一个判断，防止重复打印
          if (this.currentIndex !== i &&((i<length-1 && positionY > this.themeOffsetTop[i] && positionY < this.themeOffsetTop[i+1])||
            (i === length-1  && positionY > this.themeOffsetTop[i]  ))){
            this.currentIndex = i
            console.log(this.currentIndex)
            // 把currentIndex赋给DetailNavBar中的currentIndex
            this.$refs.nav.currentIndex = this.currentIndex

          }*/
        //  hack做法
          if (this.currentIndex !== i && (positionY>this.themeOffsetTop[i] && positionY < this.themeOffsetTop[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }

        }

        //3.是否显示回到顶部
        this.isShowBackTop = -position.y > 1000
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImage[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid =  this.iid;
        // console.log(product)
        //2.将商品添加到购物车
        // this.$store.commit('addCart',product)
     /*   this.$store.dispatch('addCart',product).then(res=>{
          console.log(res)
        })*/
        this.addCart(product).then(res=>{
          /*this.isShow = true;
            this.message = res;

          setTimeout(()=>{
            this.isShow = false;
            this.message = '';
          },1500)*/
          this.$toast.show(res)
          // console.log(this.$toast)
        })

      }
    },
    mounted() {
    },
    /*updated() {
      //  offsetTop不能写死
      //  在mounted数据不一定能拿到
      //updated可能会更新多次，会多次push值，所以在更新前需要对这个数组赋空
      this.themeOffsetTop = [];
      this.themeOffsetTop.push(0)
      this.themeOffsetTop.push(this.$refs.param.$el.offsetTop)
      this.themeOffsetTop.push(this.$refs.comment.$el.offsetTop)
      this.themeOffsetTop.push(this.$refs.recommends.$el.offsetTop)
      // console.log(this.themeOffsetTop)

    },*/
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener())
    }
  }
</script>

<style scoped>
  .detail-control{
    position: relative;
    /*position定位如果有重叠的时候，z-index愈大，就显示在最上面
    如果两个元素是父节点和子节点的关系，那么子节点显示在父节点的上面，与z-index无关*/
    z-index: 9;
    background-color: #fff;
  }
  #detail{
    /*定位为relative的元素脱离正常的文本流中，但其在文本流中的位置依然存在，*/
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;   /*100%的视口高度*/
  }
  .content{
    /*100%是相对于父元素，所以这这里要给父元素高度*/
    /*height: calc(100% - 44px - 49px);*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>