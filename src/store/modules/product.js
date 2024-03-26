import axios from "axios";
const productModules={
    state:{
        products:[],
        product:{}
    },
    getters:{
        products:state=> state.products,
        product:state=> state.product
    },
    actions:{
        async getProducts({commit}){
            try {
              const respone=await  axios.get('https://localhost:7159/api/v1/Product/products')
                commit('SET_PRODUCTS',respone.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getProduct({commit},productId){
           
            try {
                console.log(productId);
                const respone=  await  axios.get(`https://localhost:7159/api/v1/Product/${productId}`)
                commit('SET_PRODUCT',respone.data)
                console.log(respone.data);
              } catch (error) {
                  console.log(error)
              }
        },
    },
    mutations:{
        SET_PRODUCTS(state,products){
            state.products=products
        },
        SET_PRODUCT(state,product){
            state.product=product
        },
        
    }
}
export default productModules