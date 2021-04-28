<template>
  <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="data">{{/*commentInfo.created | */showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-img">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'
  export default {
    name: "DetailCommentInfo",
    props:{
      commentInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    }
    ,
    computed:{
      showDate(){
        //1.先将时间戳转成Date对象
        const date = new Date(this.commentInfo.created * 1000)
        //2.将date进行格式化
        return formatDate(date,'yyyy-MM-dd hh:mm:ss')
      }
    }/*,
    filters:{
      showDate(value){
        //1.先将时间戳转成Date对象
        const date = new Date(value * 1000)
        //2.将date进行格式化
        return formatDate(date,'yyyy-MM-dd hh:mm:ss')
      }
    }*/
  }
</script>

<style scoped>
  .comment-info{
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-header{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .header-title{
    float: left;
    font-size: 15px;
  }
  .header-more{
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
  .info-user{
    padding: 10px 0;
  }
  .info-user img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    vertical-align: middle;
  }
  .info-user span{
    font-size: 14px;
  }
  .info-detail p{
    line-height: 20px;
    font-size: 14px;
  }
  .info-other {
    color: #999;
    margin: 6px 0;
    font-size: 12px;
  }
  .info-other .data{
    margin-right: 10px;
  }
  .info-img img{
    width: 60px;
    height: 60px;
    margin-right: 6px;
  }
</style>