import axios from "axios";
const catagoryModules={
    state:{
        catagorys:[]
    },
    getters:{
        catagorys:state=> state.catagorys
    },
    actions:{
        async getCatagorys({commit}){
            try {
              const respone=await  axios.get('https://localhost:7159/api/v1/Catagory')
                commit('SET_CATAGORYS',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        }
    },
    mutations:{
        SET_CATAGORYS(state,catagorys){
            state.catagorys=catagorys
        }
    }
}
export default catagoryModules