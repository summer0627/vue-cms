<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" >
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="countinit" @change="numinfo" ref=nums  >
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from'../../lib/mui-master/dist/js/mui.js'
export default {
   mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();

  },
  data:function(){
    return {

    }
  },
  
  methods:{
    numinfo(){
      this.$store.commit('getcount',{
          count:this.$refs.nums.value,
          id:this.goodsid
      })
    },
   
  },
  props:['goodsid','countinit']
 
};
</script>

<style lang="scss" scoped>
.mui-numbox {
  height: 20px;
}
</style>
