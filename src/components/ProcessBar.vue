<template >
    <div class="process_bar" v-if="auth.isAuthenticated">
        <p>Process :{{progessBar}} %</p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name:'ProcessBar',
    computed:{...mapGetters(['progessBar','auth'])}
    
}
</script>
<style >
.process_bar{
    background-color: aqua;

}
.process_bar p{
    text-align: center;
}
</style>