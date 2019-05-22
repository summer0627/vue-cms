<template>
  <div class="goodlist">
    <div class="goodslistitem" v-for="item in productlist" :key="item.id" @click="getinfo(item.id)">
      <img :src="item.img_url" alt>
      <h3>{{item.title}}</h3>
      <div class="goosbody">
        <p class="price">
          <span>￥{{item.market_price}}</span>
          <span>￥{{item.sell_price}}</span>
        </p>
        <p class="num">
          <span>热卖中</span>
          <span>剩余: {{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getprlist" plain>加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data:function(){
    return {
      pageindex:1,
      id:this.$route.params.id,
      productlist:[]
    }
  },
  created(){
    this.getprlist()
  },
  methods:{
    getprlist (){
      this.$http.get('api/getgoods?pageindex='+this.pageindex).then( res => {
        if(res.body.status===0){
          console.log(res.body.message)
          this.productlist=this.productlist.concat(res.body.message)
        }
      })
    },
    getinfo(id){
      this.$router.push("goodsinfo/"+id)
    }
  
  }
};
</script>
<style lang="scss" scoped>
.goodlist {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goodslistitem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 0 7px #ccc;
    padding: 2px;
    width: 49%;
    img {
      width: 100%;
    }
    h3 {
      font-size: 14px;
    }
    .goosbody {
      background-color: #ccc;

      .price {
        padding: 5px;
        margin: 0;
      }
      .price :nth-child(1) {
        color: red;
      }
      .price :nth-child(2) {
        text-decoration: line-through;
        font-size: 12px;
      }
      .num {
        display: flex;
        justify-content: space-between;
        padding: 5px;
      }
    }
  }
}
</style>
