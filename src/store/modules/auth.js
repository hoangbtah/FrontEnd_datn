import axios from "axios";
const state= {
    auth:{
        isAuthenticated:true,
        isEmployee:false,
        name:'',
        user:{},
    }
}
const getters={
    auth :state=> state.auth,
}
const actions={
    async getUser({commit},data){
           
        try {
             console.log("lây nguoif dùng");
            const respone=  await  axios.post(`https://localhost:7159/api/Auth/user`,data)
            console.log("lấy người dùng")
              console.log(respone.data);
                // Lưu sản phẩm vào Local Storage
                localStorage.setItem('selectedUser', JSON.stringify(respone.data));
            commit('SET_USER',respone.data)
          } catch (error) {
              console.log(error)
          }
    }
}
const mutations={
    TOGGLE_AUTH(state){
        state.auth.isAuthenticated=!state.auth.isAuthenticated
    },
    SET_USER(state,user){
        state.auth.user=user
    },
}
export default {
    state,getters,actions,mutations
}