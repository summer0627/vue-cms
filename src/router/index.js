import Vue from 'vue'
import Router from 'vue-router'
import homeContainer from '@/components/homeContainer'
import memberContainer from '@/components/memberContainer'
import shopcarContainer from '@/components/shopcarContainer'
import searchContainer from '@/components/searchContainer'
import productlist from '@/components/newslist/productlist'
import productinfo from '@/components/newslist/productinfo'
import imageslist from '@/components/imgescom/imageslist'
import photoinfo  from  '@/components/imgescom/photoinfo'
import prolist  from  '@/components/produc/prolist'
import goodsinfo  from  '@/components/produc/goodsinfo'
import goodsdesc  from  '@/components/produc/goodsdesc'
import goodscomment  from  '@/components/produc/goodscomment'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
   
      redirect: "/home"
    },
    {
      path: '/home',
   
      component:homeContainer
    },
    {
      path: '/member',
   
      component: memberContainer
    },
    {
      path: '/shopcar', 
      component: shopcarContainer
    },
    {
      path: '/search',
    
      component: searchContainer
    },
    {
      path: '/home/productlist',
    
      component: productlist
    },
    {
      path: '/home/productinfo/:id',
    
      component: productinfo
    },
    {
      path: '/home/imageslist',
    
      component: imageslist
    },
    {
      path: '/home/photoinfo/:id',
    
      component: photoinfo
    },
    {
      path: '/home/prolist',
    
      component: prolist
    },
    {
      path: '/home/goodsinfo/:id',
    
      component: goodsinfo,
     
    },
    {
      path: '/home/goodsdesc/:id',
    
      component: goodsdesc,
     
    },
    {
      path: '/home/goodscomment/:id',
    
      component: goodscomment,
     
    }



  ],
  linkActiveClass:'mui-active'
})
