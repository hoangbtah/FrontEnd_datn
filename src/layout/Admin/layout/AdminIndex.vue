<template >
    <div>
        <TheHeader/>
        <div class="main">
        <TheNav/>
        <ThePagecontent/>
    </div>
    </div>
</template>
<script>
import TheNav from './TheNav.vue'
import ThePagecontent from './ThePagecontent.vue';
import TheHeader from './TheHeader.vue';
export default {
    name:'AdminIndex',
    components:{TheHeader,TheNav,ThePagecontent}
}
</script>
<style scoped="">
@import url('../../../assets_ad/css_ad/main.css');  
</style>