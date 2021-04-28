<template>
  <div class="check-button"  :class="{check:isActive}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
        isActive:{
          type:Boolean,
          default:true
        }
      }
  }
</script>

<style scoped>
  .check-button{
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #aaa;
  }
  .check-button img{
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;

  }
  .check{
    background-color: red;
    border: 1px solid red;
  }
</style>