<template >
    <div class="status-bar" v-if="auth.isAuthenticated">
        <p>Done</p>
    
        <ul>
            <li v-for="todo in doneTodos"
                 :key="todo.id">
                {{todo.title}}
            </li>
           
        </ul>
    </div>
</template>
<script>
//import {mapState} from 'vuex'
//import ProcessBar from  './ProcessBar.vue'
import { mapGetters } from 'vuex';
export default {
    name:'StatusBar',
   // components:{ProcessBar},
    // computed:{
    //     todosDone(){
    //         return this.$store.getters.doneTodos
    //     }
    // }
    computed:{...mapGetters(['doneTodos','auth'])}
    

}
</script>
<style >
    
</style>