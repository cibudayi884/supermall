<template>
  <div class="cart-item">
    <div class="item-selector">
      <check-button :is-active="product.checked" @click.native="ItemClick"></check-button>
    </div>
    <div  class="item-img">
      <img :src="product.image" alt="">
    </div>
    <div class="item-info">
      <div class="info-title">{{product.title}}</div>
      <div class="info-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div  class="info-price">¥{{product.price}}</div>
        <div class="info-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartListItem",
    components:{
      CheckButton
    },
    props:{
      product:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      ItemClick(){
        this.product.checked =  !this.product.checked
      }
    }
  }
</script>

<style scoped>
   .cart-item{
     width: 100%;
     display: flex;
     padding: 10px   6px;
     border-bottom: 1px solid #ccc;
   }
   .item-selector{
     width: 20px;
     padding: 5px 0;
     display: flex;
     justify-content: center;
     align-items: center;
   }
  .item-img img{
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 80px;
    height: 100px;
    border-radius: 6px;
  }
   .info-desc,.info-title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-info{
    color: #333;
    padding: 5px  10px;
    overflow: hidden;
  }
  .item-info .info-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom{
    position: relative;
    bottom: -20px;
  }
   .info-bottom .info-price{
     float: left;
     color: orangered;
   }
  .info-bottom .info-count{
    float: right;
  }
</style>