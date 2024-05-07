import axios from "axios";
const manufactorerModules={
    state:{
        manufactorers:[],
        isShowManufactorer:false,
        manufactorer:{},
        isShowDeleteManufactorer:false
    },
    getters:{
        manufactorers:state=> state.manufactorers,
        manufactorer:state=> state.manufactorer,
        isShowManufactorer:state=> state.isShowManufactorer,
        isShowDeleteManufactorer:state=> state.isShowDeleteManufactorer
    },
    actions:{
        async getManufactorers({commit}){
            try {
              const respone=await  axios.get('https://localhost:7159/api/v1/Manufactorer')
                commit('SET_MANUFACTORERS',respone.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getManufactorer({commit},manufactorerId){
            try {
              const respone=await  axios.get(`https://localhost:7159/api/v1/Manufactorer/${manufactorerId}`)
                commit('SET_MANUFACTORER',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        }
    },
    mutations:{
        SET_MANUFACTORERS(state,manufactorers){
            state.manufactorers=manufactorers
        },
        SET_MANUFACTORER(state,manufactorer){
            state.manufactorer=manufactorer
        },
        TOGGLE_ISSHOWMANUFACTORER(state)
        {
            state.isShowManufactorer=!state.isShowManufactorer
        },
        TOGGLE_ISSHOW_DELETE_MANUFACTORER(state)
        {
            state.isShowDeleteManufactorer=!state.isShowDeleteManufactorer
        },
        DELETE_MANUFACTORER(state, manufactorerId) {
            state.manufactorers = state.manufactorers.filter(manufactorer => manufactorer.manufactorerId !== manufactorerId)
        },
    }
}
export default manufactorerModules