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


Vue.config.productionTip = false
Vue.use(VueRouter)
const routes = [
  { path: '/', component: ShopIndex },
  { path: '/shoppingcart', component: ShoppingCart },
  { path: '/theshop', component: TheShop },
  { path: '/productdetail', component: ProductDetail },
  { path: '/checkout', component: TheCheckout },
  { path: '/contact', component: TheContact }
];

const router = new VueRouter({
  routes
});


new Vue({
  render: h => h(App),
  store,router
  
}).$mount('#app')
