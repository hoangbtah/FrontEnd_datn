<template>
  
  <div id="app">
    
    <!-- <TheNavbar></TheNavbar>
    <ToDos></ToDos>
    <StatusBar/>
  
    <ProcessBar/> -->
    <TheHeader/>
    <PageContent/>
    <!-- <ShopIndex/> -->
    <!-- <ShoppingCart/> -->
    <TheFooter/>
  </div>
</template>

<script>
// import ToDos from './components/ToDos.vue'
// import TheNavbar from  './components/TheNavbar.vue'
// import StatusBar from  './components/StatusBar.vue'
// import ProcessBar from  './components/ProcessBar.vue'
import TheHeader from './layout/TheHeader.vue'
import TheFooter from './layout/TheFooter.vue'
import PageContent from './layout/PageContent.vue';
//import ShopIndex from './components/ShopIndex.vue'
//import ShoppingCart from './components/ShoppingCart.vue'
export default {
  name: 'App',
  components: {
  //  ToDos,TheNavbar,StatusBar,ProcessBar
  TheHeader,TheFooter,PageContent
  }
}
</script>

<style>
#app {
  
  
}
@import url('./assets/css/style.css');
/* @import url('./assets/lib/owlcarousel/assets/owl.carousel.min.css'); */
</style>
