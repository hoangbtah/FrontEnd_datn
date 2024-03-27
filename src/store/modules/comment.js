import axios from "axios";
const commentModules={
    state:{
        comments:[],
       
    },
    getters:{
        comments:state=> state.comments,
        
    },
    actions:{
        async getComments({commit},productId){
            try {
                console.log("productId");
              const respone=await  axios.get(`https://localhost:7159/api/Comment/comment/${productId}`)
              console.log(respone.data);
                commit('SET_COMMENTS',respone.data)
            } catch (error) {
                console.log(error)
            }
        },
      
    },
    mutations:{
        SET_COMMENTS(state,comments){
            state.comments=comments
        },
      
        
    }
}
export default commentModules