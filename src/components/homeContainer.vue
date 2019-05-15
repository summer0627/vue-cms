<template>
  <div class="home-container">
    <mt-header fixed title="黑马程序员 vue项目"></mt-header>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000" >
      <mt-swipe-item v-for="item in lunbotulist" :key="item.img">
          <img :src="item.img" alt="">

      </mt-swipe-item>
      
    </mt-swipe>
    <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item mui-active" href="#tabbar">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-chat">
        <span class="mui-icon mui-icon-contact">
         
        </span>
        <span class="mui-tab-label">会员</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-contact">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
        <span class="mui-tab-label">购物车</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-map">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </a>
    </nav>
    <h1>home</h1>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      lunbotulist: []
    };
  },
  created() {
    this.getlunboList();
  },
  methods: {
    getlunboList() {
      this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then(res => {
        if (res.body.status == 0) {
            console.log(res.body.message)
          this.lunbotulist = res.body.message;
        } else {
          console.log("失败");
        }
      });
    }
  }
};
</script>
<style lang="">
.home-container {
  padding-top: 40px;
}
.mint-swipe {
  height: 200px;
}
.mint-swipe img{
    width:100%;
    height:100%;
}
</style>