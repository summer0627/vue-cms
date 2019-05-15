import Vue from 'vue'
import Router from 'vue-router'
import homeContainer from '@/components/homeContainer'
import memberContainer from '@/components/memberContainer'
import shopcarContainer from '@/components/shopcarContainer'
import searchContainer from '@/components/searchContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeContainer',
      component: homeContainer
    },
    {
      path: '/',
      name: 'memberContainer',
      component: memberContainer
    },
    {
      path: '/',
      name: 'shopcarContainer',
      component: shopcarContainer
    },
    {
      path: '/',
      name: 'searchContainer',
      component: searchContainer
    }
  ]
})
