<template >
    <div class="todo-list">
        <TodoForm/>
        <ul v-if="auth.isAuthenticated">
            <li v-for="todo in todos" 
            :key="todo.id" 
            :class="todo.completed ? 'completed':''">{{todo.title}}
            
            <input type="checkbox" :checked="todo.completed" 
            @change="markCompleted(todo.id)"/>

            <button @click="deleteTodo(todo.id)">Delete</button>
            </li>
           
        </ul>
        <p v-else style="text-align:center">Not authenticated</p>
    </div>
</template>

<script>
import { mapActions ,mapGetters} from 'vuex';
import TodoForm from './TodoForm.vue';
export default {
    name:"ToDos",
    components:{TodoForm},
    computed:{...mapGetters(['todos','auth'])},
    created() {
        this.getTodos()
    },
    methods:{
        markCompleted(todoID){
            this.$store.commit('MARK_COMPLETED',todoID)
        },
        ...mapActions(['deleteTodo','getTodos'])
    },
    
}
</script>
<style >
    .todo-list ul {
 padding: 0 10px 10px 10px;
 list-style-type: none;
}

.todo-list li {
 padding: 10px;
 cursor: pointer;
 margin: 10px 0;
 border-radius: 4px;
 background: rgb(240, 240, 240);
 color: black;
}
.todo-list li.completed {
 background: rgb(119, 218, 243);
}
.todo-list li input[type='checkbox'] {
 -ms-transform: scale(2); /* IE */
 -moz-transform: scale(2); /* FF */
 -webkit-transform: scale(2); /* Safari and Chrome */
 -o-transform: scale(2); /* Opera */
 transform: scale(2);
 padding: 10px;
 float: right;
}
.todo-list li button {
 float: right;
 margin-right: 20px;
}
</style>

