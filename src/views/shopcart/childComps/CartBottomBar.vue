<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-active=isSelectAll() @click.native="checkClick"></check-button>
      <div>全选</div>
    </div>
    <div class="totalPrice">合计：{{totalPrice}}</div>
    <div class="checkLength" @click="calClick">去结算:({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    data(){
      return{
      }
    },
    methods:{
      isSelectAll(){
        if (this.$store.state.cartList.length ===  0) return false
        //1.使用filter
        //return !(this.$store.state.cartList.filter(item=>!item.checked).length)

        //2.使用find
        // return !this.$store.state.cartList.find(item=> !item.checked)

        //3.遍历方法
        for (let item of this.$store.state.cartList){
          if (!item.checked){
            return false;  //可以不使用break终止循环， return false也可以终止循环
          }
        }
        return true;
      },
      checkClick(){
        //也 可以用forEach，比较简便
        if (this.isSelectAll()){  //全部选中
          for (let item of this.$store.state.cartList){
            item.checked = false
          }
        }else {   //部分或全部不选中
          for (let item of this.$store.state.cartList){
            item.checked = true
          }
        }
      },
      calClick(){
        if (!this.checkLength){
          this.$toast.show('请选择需要购买的商品')
        }
      }
    },
    computed:{
      totalPrice(){
        return this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue, item) =>{
            return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item=>item.checked).reduce((preValue,item)=>{
          return preValue  + item.count
        },0)
        // return this.$store.state.cartList.filter(item=>item.checked.length)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    width: 100%;
    height: 40px;
    /*background-color: red;*/
    position: fixed;
    bottom: 49px;
    border-top: 1px solid #eee;
    display: flex;
    line-height: 40px;
    /*justify-content: space-between;*/
    /*padding: 0  0  0 20px;*/
  }
  .bottom-bar>div{
    width: 33%;
  }
  .check-content{
    display: flex;
    align-items: center;
    justify-content: center;
    /*text-align: left;*/
  }
  .check-button{
    margin-right: 5px;
  }
  .checkLength{
    background-color: rgba(255, 0, 0, 0.83);
    color: #fff;
    text-align: center;
  }
</style>