// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入vue-resource
import vueResource from 'vue-resource'
Vue.use(vueResource)
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var car=JSON.parse(localStorage.getItem(('car') || '[]'))
var store = new Vuex.Store({
  state:{
    car:car
  },
  mutations:{
    addtocar(state,goodsinfoma){
      //添加购物车,将购物车的数据渲染到本地存储中
      var flag=state.car.some( item =>{
        if(item.id===goodsinfoma.id){
          item.count+=parseInt(goodsinfoma.count)
          return true
        }
      })
      if(!flag){
        state.car.push(goodsinfoma)
        localStorage.setItem('car',JSON.stringify(state.car))
      }
    },
     //初始化数量得值
     getcount(state,shopcarinfo){
     //将数量的值同步到本地存储中
      state.car.some( item =>{
        if(item.id==shopcarinfo.id){
          item.count=parseInt(shopcarinfo.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      // 根据Id，从本地存储store中 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateshopcarselected(state,info){
      //因为mt-switch 有个change事件,该事件出发的时候,将状态渲染到本地存储中
      state.car.forEach( item=>{
          if(item.id==info.id){
            item.selected=info.selected
          }
      })
    }
  
  },
  getters:{
    getallcount(state){
      //获取累积的数量,将其渲染到购物车的徽章上
      var c=0;
      state.car.forEach( item =>{
        c+=item.count
      })
      return c
    },
    getgoodscount(state){
      //获取数量和id对应的对象,例如{id:1,count:55},
      //方便于后边的去数量,因为在数量组件中渲染的时候渲染的就是要用到数量
      var o={}
      state.car.forEach( item =>{
        o[item.id]=item.count
      })
      return o
    },
    getistrue(state){
      //返回一个为{id:1,selected:true}的对象
      //只有通过该方法才能的出当前数据的id,
      //该方法方便我们之后取id
      var o={}
      state.car.forEach( item =>{
       o[item.id]=item.selected
      })
      return o
    },
    getgoodsacountandprice(state){
      //定义数量和总价的函数,并且让switch变化的时候同步到页面
      //所以将该值直接传给shop car页面中
      var o={
        count:0,
        amount:0
      }
      state.car.forEach( item =>{
       if(  item.selected){
        o.count+=item.count,
        o.amount+=item.price*item.count
       }
      })
      return o
    }
  }
})
//配置全局的跟路径
Vue.http.options.root='http://www.liulongbin.top:3005'
//配置全局的post请求的第二个参数
Vue.http.options.emulateJSON=true
//引入mui样式
import  './lib/mui-master/dist/css/mui.min.css'
import 'mint-ui/lib/style.css'
//引入axious
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.axios=axios
axios.defaults.baseURL='http://www.liulongbin.top:3005'
Vue.use(axios,VueAxios)
//引入样式
// import {Header,Swipe,SwipeItem,Button} from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//引入购物车字体样式
import './lib/mui-master/examples/hello-mui/css/icons-extra.css'
//定义全局的过滤器
import moment from 'moment'
Vue.filter('matstr',function(datastr,pattern="YYYY-MM-DD HH:mm:ss"){
      return moment(datastr).format(pattern)
  })
Vue.config.productionTip = false
//引入公共组件
//引入缩略图
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
  
})
