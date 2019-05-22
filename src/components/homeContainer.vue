<template>
  <div class="home-container">
   
    <!-- <mt-swipe :auto="4000" >
      <mt-swipe-item v-for="item in lunbotulist" :key="item.img">
          <img :src="item.img" alt="">

      </mt-swipe-item>
      
    </mt-swipe> -->
    <swipe :swipelist="lunbotulist"  :isfull="true"></swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/productlist">
		                  <img src="../images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/imageslist">
		                    <img src="../images/menu2.png" alt="">
		                    <div class="mui-media-body">图爿分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/prolist">
		                    <img src="../images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                   <img src="../images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		           
		        </ul>
    
    <h1>home</h1>
  </div>
</template>
<script>
import swipe from '../components/comm/swiper'
export default {
  data: function() {
    return {
      lunbotulist: []
    }
  },
  created() {
    this.getlunboList();
  },
  methods: {
    getlunboList() {
      this.$http.get("api/getlunbo").then(res => {
        if (res.body.status == 0) {
            console.log(res.body.message)
          this.lunbotulist = res.body.message;
        } else {
          console.log("失败");
        }
      });
    }
  },
  components:{
    swipe
  }
};
</script>
<style lang="scss" scoped>

.mint-swipe {
  height: 200px;
  img{
     width:100%;
    height:100%;
  }
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  .mui-table-view-cell{
  border-right:none;
  border-bottom:none;
  font-size:12px;
    img {
       width:60px;
    height:60px;
    }
  }
}
</style>