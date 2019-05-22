<template>
    <div>
      <goodscomment :sonid="this.$route.params.id"></goodscomment>
    </div>
</template>
<script>
import goodscomment from '../comm/comment'
export default {
    data:function(){
        return {}
    },
    components:{
      goodscomment
    }
}
</script>
<style lang="">
    
</style>
