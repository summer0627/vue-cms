<template>
    <div>
       <li class="mui-table-view-cell mui-media" v-for="item in prolist" :key="item.id">
					<router-link :to="'/home/productinfo/'+item.id" class="" >
                   
						<img class="mui-media-object mui-pull-left" :src="item.img_url" >
                     
						<div class="mui-media-body">
							
                         <h1>{{item.title}}</h1>
							<p class="mui-ellipsis">
                                <span>发表时间:{{item.add_time|matstr}}</span>
                                <span>点击:{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data:function(){
        return {
         
            prolist:[]
        }
    },
    created(){
      this.getlist()  
    },
    methods:{
        getlist(){
            this.$http.get('api/getnewslist/').then(res =>{
              
                if(res.body.status==0){
                      console.log(res.body.message)
                    this.prolist=res.body.message
                }else{
                    Toast('获取失败')
                }

            })
        }
    }
}
</script>
<style lang="scss">
.mui-table-view-cell{
    list-style: none;
img{
    width: 42px;
    height: 42px;
}
.mui-media-body{
    h1 {
         font-size:14px;
    }
    .mui-ellipsis{
        display:flex;
      justify-content: space-between;
        font-size:12px;
        color:#226aff;;
        span {
  
        }
    }
    }
    }
</style>
