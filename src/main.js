import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import VueRouter from 'vue-router';
//import { Bar, Line } from 'vue-chartjs';
import ShopIndex from './components/ShopIndex.vue';
import ShoppingCart from './components/ShoppingCart.vue'
import TheShop from './components/TheShop.vue'
import ProductDetail from './components/ProductDetail.vue'
import TheCheckout from './components/TheCheckout.vue'
import TheContact from './components/TheContact.vue'
import AdminIndex from './layout/Admin/layout/AdminIndex.vue'
import UserIndex from './layout/UserIndex.vue'
import TheLogin from './components/TheLogin.vue'
import TheRegister from './components/TheRegister.vue'
import ProductList from './layout/Admin/view/product/ProductList'
import CatagoryList from './layout/Admin/view/catagory/CatagoryList.vue'
import EmployeeList from './layout/Admin/view/employee/EmployeeList.vue'
import OrderList from './layout/Admin/view/order/OrderList.vue'
import OrderDetail from './layout/Admin/view/order/OrderDetail.vue'
import TheStatistical from './layout/Admin/view/statistical/TheStatistical.vue'
import StatisticalDetail from './layout/Admin/view/statistical/StatisticalDetail.vue'
import StatisticalAll from './layout/Admin/view/statistical/StatisticalAll.vue'


import TheUser from './components/TheUser.vue'



Vue.config.productionTip = false
Vue.use(VueRouter)


/// Đăng ký component BarChart và LineChart
// Vue.component('bar-chart', {
//   extends: Bar,
//   props: ['chartData', 'options'],
//   mounted() {
//     this.renderChart(this.chartData, this.options);
//   }
// });

// Vue.component('line-chart', {
//   extends: Line,
//   props: ['chartData', 'options'],
//   mounted() {
//     this.renderChart(this.chartData, this.options);
//   }
// });

const routes = [
  /// điều hướng của phẩn user
  { path: '/', component: UserIndex,
    children: [
      { path: '/', component: ShopIndex },
  { path: '/shoppingcart', component: ShoppingCart },
  { path: '/theshop', component: TheShop },
  { path: '/productdetail', component: ProductDetail },
  { path: '/checkout', component: TheCheckout },
  { path: '/contact', component: TheContact },
  { path: '/user', component: TheUser },
 
    ]
  },
  /// điều hướng của admin
  { path: '/admin', component: AdminIndex,
  children: [
    { path: '', component: ProductList },
{ path: '/catagory', component: CatagoryList },
{ path: '/employee', component: EmployeeList },
{ path: '/order', component: OrderList },
{ path: '/orderdetail', component: OrderDetail },
{ path: '/statistical', component: TheStatistical },
{ path: '/statisticaldetail', component: StatisticalDetail },
{ path: '/statisticalall', component: StatisticalAll },

  ]
},

  { path: '/login', component: TheLogin },
  { path: '/register', component: TheRegister },
];





const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  store,router
  
}).$mount('#app')
