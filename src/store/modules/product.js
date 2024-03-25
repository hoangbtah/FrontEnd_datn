import axios from "axios";
const productModules={
    state:{
        products:[]
    },
    getters:{
        products:state=> state.products
    },
    actions:{
        async getProducts({commit}){
            try {
              const respone=await  axios.get('https://localhost:7159/api/v1/Product?_limit=5')
                commit('SET_PRODUCTS',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        }
    },
    mutations:{
        SET_PRODUCTS(state,products){
            state.products=products
        }
    }
}
export default productModules