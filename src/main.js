import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import VueRouter from 'vue-router'
import ShopIndex from './components/ShopIndex.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import TheShop from './components/TheShop.vue'
import ProductDetail from './components/ProductDetail.vue'
import TheCheckout from './components/TheCheckout.vue'
import TheContact from './components/TheContact.vue'
import AdminIndex from './layout/Admin/AdminIndex.vue'
import UserIndex from './layout/UserIndex.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)
const routes = [
  { path: '/', component: UserIndex,
    children: [
      { path: '/index', component: ShopIndex },
  { path: '/shoppingcart', component: ShoppingCart },
  { path: '/theshop', component: TheShop },
  { path: '/productdetail', component: ProductDetail },
  { path: '/checkout', component: TheCheckout },
  { path: '/contact', component: TheContact }
    ]
  },

  {path:'/admin',component:AdminIndex}
];

const router = new VueRouter({
  routes
});


new Vue({
  render: h => h(App),
  store,router
  
}).$mount('#app')
