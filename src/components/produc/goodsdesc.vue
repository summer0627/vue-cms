<template>
    <div class="infointro">
      <p class="titile">{{introduce.title}}</p>
      <hr>
      <div class="content" v-html="introduce.content">

      </div>
    </div>
</template>
<script>
export default {
    data:function(){
        return {
              introduce:{}
        }
    },
    created(){
         this.getintroinfo()// //获取图文介绍
    },
    methods:{
         getintroinfo (){
  //获取图文介绍
        this.axios.get('/api/goods/getdesc/'+this.$route.params.id).then( res =>{
            if(res.data.status===0){
                console.log(res.data.message)
                this.introduce=res.data.message[0]
            }
        })
    },
    }
}
</script>
<style lang="scss" >
  .infointro{
       padding: 5px;
      .titile{
        text-align: center;
        color:#26a2ff;
   
      
    }
    .content {
       
      img{
        width:100% ;
    }
   
    }
  }
</style>
