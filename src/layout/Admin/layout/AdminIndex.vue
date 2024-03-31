<template >
    <div>
       <TheNav/>
       <ThePagecontent/>
    </div>
</template>
<script>
import TheNav from './TheNav.vue'
import ThePagecontent from './ThePagecontent.vue';
export default {
    name:'AdminIndex',
    components:{TheNav,ThePagecontent}
}
</script>
<style scoped>
@import url('../../../assets/css/admincss/style/main.css');  
</style>