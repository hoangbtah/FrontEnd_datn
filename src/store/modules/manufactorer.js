import axios from "axios";
const manufactorerModules={
    state:{
        manufactorers:[]
    },
    getters:{
        manufactorers:state=> state.manufactorers
    },
    actions:{
        async getManufactorers({commit}){
            try {
              const respone=await  axios.get('https://localhost:7159/api/v1/Manufactorer')
                commit('SET_MANUFACTORERS',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        }
    },
    mutations:{
        SET_MANUFACTORERS(state,manufactorers){
            state.manufactorers=manufactorers
        }
    }
}
export default manufactorerModules