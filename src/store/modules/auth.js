const state= {
    auth:{
        isAuthenticated:true,
        isEmployee:false,
    }
}
const getters={
    auth :state=> state.auth,
}
const actions={

}
const mutations={
    TOGGLE_AUTH(state){
        state.auth.isAuthenticated=!state.auth.isAuthenticated
    }
}
export default {
    state,getters,actions,mutations
}