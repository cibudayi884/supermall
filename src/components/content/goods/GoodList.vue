<template>
  <div class="goods">
    <!--<div v-for="item in goods">
      <img :src="item.show.img" alt="">
    </div>-->
    <good-list-item v-for="item in goods" :goodsItem="item"/>
  </div>
</template>

<script>
  import GoodListItem from "./GoodListItem";
  export default {
    name: "GoodList",
    components:{
      GoodListItem
    },
    props:{
      goods: {
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>