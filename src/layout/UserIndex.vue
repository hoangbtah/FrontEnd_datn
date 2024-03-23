<template>
    <div>
         <!-- <TheNavbar></TheNavbar>
    <ToDos></ToDos>
    <StatusBar/>
  <p</p>
    <ProcessBar/> -->
    
    <TheHeader/>
    <PageContent/>
    <!-- <ShopIndex/> -->
    <!-- <ShoppingCart/> -->
    <TheFooter/>
    </div>
</template>
<script>
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
import PageContent from './PageContent.vue'
export default {
    name:'UserIndex',
    components:{TheHeader,PageContent,TheFooter}

}
</script>
<style lang="">
/* @import url('./assets/css/style.css'); */
</style>