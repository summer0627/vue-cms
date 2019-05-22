<template>
  <div class="shopcarcon">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner" v-for="(item, i) in shopcarinfo" :key="item.id" >
          <!-- 开启付款组 -->
          <mt-switch 
          v-model="$store.getters.getistrue[item.id]"
           @change="getupdate(item.id,$store.getters.getistrue[item.id])"></mt-switch>
          <img :src="item.thumb_path" alt>
          <div class="right">
            <h1 class="title">{{item.title}}</h1>
            <p class="price">
              <span>￥{{item.sell_price}}</span>
              <!-- 数量 -->
              <numBox :goodsid="item.id" :countinit="$store.getters.getgoodscount[item.id]" ></numBox>
              <a href="#" @click.prevent='delshopcarlist(item.id,i)'>删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner pay">
          <div >
            <p>总计(不含运费)</p>
            <p>
               已勾选商品 <span>{{$store.getters.getgoodsacountandprice.count}}</span> 件
               总价<span>￥{{$store.getters.getgoodsacountandprice.amount}}</span> 
           </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numBox from "../components/comm/shopcar_num";
export default {
  data: function() {
    return {
      shopcarinfo: []
    };
  },
  created() {
    this.getshopcarinfo();
    this.delshopcarlist()
  },
  methods: {
    getshopcarinfo() {
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
        this.axios
          .get("api/goods/getshopcarlist/" + idArr.join(","))
          .then(res => {
            if (res.data.status === 0) {
              console.log(res.data.message);
              this.shopcarinfo = res.data.message;
            }
          });
      });
    },
    delshopcarlist(id,index){
        //删除数据的逻辑,不仅要删除页面上的数据,还要删除本地存储的数据
        this.shopcarinfo.splice(index,1)
        this.$store.commit('removeFormCar',id)
    },
    getupdate(id,val){
        //switch事件的changge事件,该事件触发的时候改变内存的状态
        this.$store.commit('updateshopcarselected',{
            id,
            selected:val
        })
    }
    
  },
  components: {
    numBox
  }
};
</script>
<style lang="scss" scoped>
.shopcarcon {
  overflow: hidden;
  background-color: #eee;
  .mui-card-content-inner {
    display: flex;

    align-items: center;
    img {
      width: 80px;
      height: 60px;
      padding: 4px;
    }
    h1 {
      font-size: 13px;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        margin: 0;
        padding: 0;
      }
      span {
        color: red;
      }
    }
  }
  .pay {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
          color:red;
      }
  }
}
</style>