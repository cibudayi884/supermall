import {debounce} from "common/utils";
import BackTop from "components/content/bactop/BackTop";
//图片列表刷新
export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted() {
    const newRefresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh,200)
    this.itemImgListener = ()=>{
      newRefresh();
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener);
  }
}

//返回顶部
export const scrollTopMixin = {
  data() {
    return {
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}