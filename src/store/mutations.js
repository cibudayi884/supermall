import {ADD_COUNTER ,ADD_PUSH} from './mutaton-types'
export default {
  /*addCart(state,payload){
    // state.cartList.push(payload)
    //payload是新添加的商品
    let oldProduct = null;
    //1.1 for循环判断cartList中是否存在payload商品
     /!*
    for (let item of state.cartList){
      if (item.iid === payload.iid){
        oldProduct = item;
      }
    }*!/
    //2.1 find环判断cartList中是否存在payload商品
    oldProduct = state.cartList.find(item=>item.iid === payload.iid)
    //2.判断oldProduct是否有值
    /!*
    * count是新创建的属性，如果对象中没有这个对象就会新创建一个叫count的属性
    * *!/
    if (oldProduct){
      oldProduct.count +=1
    }else {
      payload.count = 1;
      state.cartList.push(payload);
    }
  }*/
  [ADD_COUNTER](state,payload){
    payload.count +=1
  },
  [ADD_PUSH](state,payload){
    payload.checked  = true
    state.cartList.push(payload)
  }
}