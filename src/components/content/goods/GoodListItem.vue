<template>
  <div class="good-item">
    <img v-lazy="showImage" alt="" @load="imgLoad" @click="itemClick">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      imgLoad(){
        this.$bus.$emit('itemImageLoad')
       /* if(this.$route.path.indexOf('/home') !== -1){
          this.$bus.$emit('homeItemImagLoad')
        }else if(this.$route.path.indexOf('/detail') !== -1){
          this.$bus.$emit('detailItemImagLoad')
        }*/
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img //条件互换就会报错
      }
    }
  }
</script>

<style scoped>
  .good-item{
    padding-bottom: 20px;
    width: 48%;
    /*margin-right: 5px;*/
  }
  .good-item img{
    width: 100%;
    border-radius: 5px;
    text-align: center;
  }
  .goods-info{
    font-size: 12px;
    text-align: center;
  }
  .goods-info p{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin:0 20px 0 15px
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
    position: absolute;
    left: -15px;
    top: 1px;

  }
</style>