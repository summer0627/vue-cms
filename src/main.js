// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入vue-resource
import vueResource from 'vue-resource'
Vue.use(vueResource)
//引入mui样式
import  './lib/mui-master/dist/css/mui.min.css'
import 'mint-ui/lib/style.css'
//引入样式
import {Header,Swipe,SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
//引入购物车字体样式
import './lib/mui-master/examples/hello-mui/css/icons-extra.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
