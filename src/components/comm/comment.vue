<template>
  <div class="commcontainer">
    <h1>发表评论</h1>
    <hr>
    <textarea placeholder="请输入要发表的内容(最多吐槽120个字)" v-model="msg"></textarea>
    <mt-button type="primary" size="large"  @click="publish">发表评论</mt-button>
    <div class="cmt"  v-for="(item,i) in comment"  :key="item.add_time">
      <div class="cmt-title">第{{i+1}}楼 &nbsp;&nbsp;用户:{{item.use_name}}&nbsp;&nbsp; 发表时间:{{item.add_time|matstr}}</div>
      <div class="cmt-content">{{item.content==="undefined"?"这家伙很懒":item.content}}</div>
     
    </div>
    <mt-button type="danger" size="large" plain @click='getmore'>加载更多</mt-button>
  </div>
</template>
<script>
import { Button, Toast } from "mint-ui";

export default {
  data: function() {
    return {
      pageindex: 1,
      comment: [],
      msg:""
    };
  },
  created(){
this.getcommet()
  },
  methods: {
      //获取评论列表
    getcommet() {
      this.$http
        .get("api/getcomments/" + this.sonid + "?pageindex=" + this.pageindex)
        .then(res => {
          if (res.body.status === 0) {
            console.log(res.body.message);
            this.comment=this.comment.concat(res.body.message)
          } else {
            Toast("获取失败");
          }
        });
    },
    //加载更多
    getmore(){
        this.pageindex++
        this.getcommet()
    },
    publish(){
        if(this.msg.trim().length===0){
           return Toast('数据不能为空')
        }
        this.$http.post('api/postcomment/'+this.$route.params.id,{ content:this.msg}).then( res =>{
            if(res.body.status===0){
                var cont={
                    add_time:new Date(),
                    content:this.msg,
                    user_name:'匿名用户'
                }
                 this.comment.unshift(cont)
                 this.msg=""
            }else {
                Toast('加载失败')

            }
        })

    }
  },
  props: ["sonid"]
};
</script>
<style lang="scss" scoped>
.commcontainer {
  h1 {
    font-size: 18px;
  }
  textarea {
    font-size: 12px;
    margin: 0;
  }
  .cmt {
    .cmt-title {
      margin-top: 5px;
      font-size: 12px;
      background-color: #ccc;
    }
    .cmt-content {
      font-size: 12px;
      margin-left: 15px;
      padding: 5px;
    }
  }
}
</style>