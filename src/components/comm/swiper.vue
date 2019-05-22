<template>
  <div>
    <h1>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in swipelist" :key="item.img"  :swipelist="swipelist" >
          <img :src="item.img" alt :class='{"full":isfull}'>
        </mt-swipe-item>
      </mt-swipe>
    </h1>
  </div>
</template>
<script>
export default {
    props:['swipelist','isfull'],
    data:function(){
        return {

        }
    }
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  img {
   
    height: 100%;
  }
}
.full {
 width: 100%;
}
.mint-swipe-item {
  text-align: center;
}
</style>
