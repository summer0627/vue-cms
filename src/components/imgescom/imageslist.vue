<template>
  <div class="imagelist">
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted  "
       
      
      >
        <div class="mui-scroll">
          <a
            v-for="item in catlist"
            :key="item.id"
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            @click="getimagelist(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    
    <ul>
      <router-link v-for="item in imlist" :key="item.id" tag="li" :to="'/home/photoinfo/'+item.id">
        <img v-lazy="item.img_url">
        <div class="imageinfo">
          <p class="title">{{item.title}}</p>
          <p v-html="item.zhaiyao"></p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "@/lib/mui-master/dist/js/mui.js";

export default {
  data() {
    return {
      catlist: [],
      imlist: [] // 所有分类的列表数组
    };
  },
  created() {
    this.gettitlelist();
    this.getimagelist(0);
  },
  mounted() {
    // 初始化滑动控件
   mui('.mui-scroll-wrapper').scroll({
deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
  },

  methods: {
    gettitlelist() {
      this.$http.get("api/getimgcategory").then(res => {
        if (res.body.status === 0) {
          console.log(res.body.message);
          var cmt = { title: "全部", id: 0 };
          res.body.message.unshift(cmt);
          this.catlist = res.body.message;
        }
      });
    },
    getimagelist(ctid) {
      this.$http.get("api/getimages/" + ctid).then(res => {
        console.log(res.body.message);
        if (res.body.status === 0) {
          this.imlist = res.body.message;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.imagelist {
  padding: 15px;
  ul {
    margin: 0;
    width: 100%;
    padding-left: 0;
    text-align: center;
    li {
      background: #ccc;
      position: relative;
      width: 100%;
      list-style: none;
      text-align: center;
      box-shadow: 0 0 8px 0;
      img {
        width: 100%;
        text-align: left;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }

      .imageinfo {
        max-height: 84px;
        position: absolute;
        bottom: 0;
        p {
          font-size: 12px;
          margin: 0;
          text-align: left;
          color: white;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
</style>