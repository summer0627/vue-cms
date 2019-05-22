<template>
<div class="info-container">
    <h3>{{productinfo.title}}</h3>
    <p>
        <span>发表时间:{{productinfo.add_time|matstr}}</span>
        <span>点击 {{productinfo.click}} 次</span>
    </p>
    <hr>
  
        <div v-html="productinfo.content"></div>
   <!-- 子组件,父组件向子组件传值,先在子组件上面绑定属性 -->
   <commentlist :sonid='id'></commentlist>
</div>
</template>
<script>
import { Toast } from 'mint-ui'
import commentlist from '@/components/comm/comment'
export default {
    data:function(){
        return {
            id:this.$route.params.id,
            productinfo:{}
        }
    },
    created(){
        this.getprolist()
    },
    methods:{
        getprolist(){
            this.$http.get('api/getnew/'+this.id).then(res =>{
                if(res.body.status==0){
                 
                    this.productinfo=res.body.message[0];
                   
                }else{
                    Toast('获取失败')
                }
            })
        }
    },
    components:{
    commentlist,
  }

    
}
</script>
<style lang="scss">
.info-container{
    padding:5px;
    h3 {
        text-align: center;
        font-size:14px;
        color:red;
    }
    p {
        display: flex;
          font-size:12px;
        justify-content: space-between;
    }
}
    
</style>