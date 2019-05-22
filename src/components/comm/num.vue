<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="numinfo" ref=nums>
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
    console.log(this.max);
  },
  data:function(){
    return {

    }
  },
   props: ["max"],
  methods:{
    numinfo(){
      this.$emit('getmount',parseInt(this.$refs.nums.value))
    }
  },
  watch:{
    max:function(newVal,oldVal){
         mui(".mui-numbox")
       .numbox()
        .setOption("max", newVal);
    }
    }
  
};
</script>

<style lang="scss" scoped>
.mui-numbox {
  
}
</style>
