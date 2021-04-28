import {ADD_COUNTER ,ADD_PUSH} from './mutaton-types'
export default {
  addCart(context,payload){
   return new Promise((resolve,reject)=>{
     let oldProduct = null;
     oldProduct = context.state.cartList.find(item=>item.iid === payload.iid)
     if (oldProduct){
       // oldProduct.count +=1
       context.commit(ADD_COUNTER,oldProduct)
       resolve('当前的商品数量+1')
     }else {
       payload.count = 1;
       // context.state.cartList.push(payload);
       context.commit(ADD_PUSH,payload)
       resolve('添加了新的商品')
     }
   })
  }
}