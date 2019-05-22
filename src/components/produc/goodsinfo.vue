<template>
  <div class="goodsinfo">
   <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 轮播图 -->
          <swipe :swipelist="pronfolunbo"></swipe>
        </div>
      </div>
    </div>

    <!-- 商品中间价格部分 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsone.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            <span>
              市场价:
              <del>￥{{goodsone.market_price}}</del>
            </span>
            <span class="sell">
              销售价:
              ￥{{goodsone.sell_price}}
            </span>

            <p class="numgoods">
              购买数量:
              <num  :getmount='getinfoamount' :max="goodsone.stock_quantity"></num>
            </p>

            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addtoshopcar" >加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品其他信息 -->

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsone.goods_no}}</p>
          <p>库存情况:{{goodsone.stock_quantity}}</p>
          <p>上架时间:{{goodsone.add_time|matstr}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="getintroduce">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="getcomment">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
    


<script>
import swipe from "../comm/swiper";
import num from "../comm/num";
export default {
  data: function() {
    return {
      id: this.$route.params.id,
      pronfolunbo: [],
      goodsone: {},
      ballFlag: false,
      infocount:1
      //默认数量
    };
  },
  created() {
    this.getlunbo();
    this.getgoosinfo();
  },
  methods: {
    getlunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          console.log(res.body.message);
          res.body.message.forEach(item => {
            item.img = item.src;
          });
          this.pronfolunbo = res.body.message;
        }
      });
    },
    getgoosinfo () {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          console.log(res.body.message);
          this.goodsone = res.body.message[0];
        }
      });
    },
    getintroduce() {
      //进入图文详情
      this.$router.push("/home/goodsdesc/" + this.id);
    },

    getcomment () {
      // 进入评论页面
      this.$router.push("/home/goodscomment/" + this.id);
    },
    //钩子函数
     beforeEnter (el)  {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      // console.log(ballPosition);

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      // el.style.transform ="translate(123px,416px)"
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 1s cubic-bezier(.67,-0.55,.14,1.37)";
      done();
    },
  
       afterEnter(el) {
      this.ballFlag = !this.ballFlag;
 
      // this.ballFlag = !this.ballFlag;
    },
    getinfoamount(data){
      this.infocount=data
      
    },
    addtoshopcar(){
      //加入购物车
      this.ballFlag=!this.ballFlag
      var goodsinfoma={
        id:this.id,
        price:this.goodsone.sell_price,
        count:this.infocount,
        selected:true
      }
      this.$store.commit('addtocar',goodsinfoma)
    }
  },
  components: {
    swipe,
    num
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo {
  background: #eee;
  overflow: hidden;
}
.mui-card-footer {
  display: block;
  .mint-button {
    margin-bottom: 20px;
  }
  // padding-top:10px;
}
.ball {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
 position: absolute;
  top:412px;
  left:80px;
  z-index: 99;
  
}
</style>
