<template>
<div class="potolist">
    <h1>{{imginfo.title}}</h1>
    <p class="publisht">
        <span>发表时间:{{imginfo.add_time|matstr}}</span>
        <span>点击:{{imginfo.click}} 次</span>
    </p>
    <hr>
    <!-- 缩略图 -->
    <!-- <img class="preview-img" v-for="(item, index) in smallist" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src"> -->
     <!-- <vue-preview :slides="smallist.src"   @click='handleClose'></vue-preview> -->
     <vue-preview :slides="smallist" class="thumbs"></vue-preview>
    <div>
        <p v-html="imginfo.content"></p>
    </div>
    <comm :sonid="id"></comm>
</div>
</template>
<script>
import comm from '../comm/comment'
export default {
    data(){
        return {
             id: this.$route.params.id,
            imginfo:{},
            smallist:[
            ]
        }
        
    },
    created(){
this.getimginfo(),
this.getsmallist()
    },
    methods:{
        //获取图片详情
        getimginfo(){
            this.$http.get('api/getimageInfo/'+this.id).then( res => {
                if(res.body.status==0){
                    console.log(res.body.message)
                    this.imginfo=res.body.message[0]

                }
            })
        },
        //获取缩略图
        getsmallist(){
            this.$http.get('api/getthumimages/'+this.id).then( res =>{
                if(res.body.status===0){
                    console.log(res.body.message)
                    res.body.message.forEach(item => {
                        item.w=600;
                        item.h=400;
                         item.msrc=item.src
                    });
                    this.smallist=res.body.message
                   
                }
            })
        },
         handleClose() {
      console.log("close event");
    }
    },
    components:{
        comm
    }
}
</script>
<style lang="scss" >
    .potolist{
        padding: 8px;   
        h1 {
            color:#26a2ff;
            font-size:16px;
            text-align: center;
            padding: 5px;
             margin-bottom: 5px;
        }
        .publisht{
           
            display: flex;
            justify-content: space-between;
        }
      .thumbs{
         
          figure {
              
              margin: 0;
              padding: 0;
              display: inline-block;
              img {
                  width: 100%;
                  height: 100%;
              }
          }
      }
    }
</style>