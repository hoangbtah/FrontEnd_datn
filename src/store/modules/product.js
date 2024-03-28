import axios from "axios";
const productModules={
    state:{
        products:[],
        product:{},
        // productguccis:[],
        // productvalentinos:[],
        // gucci:'5f5bcd29-e832-11ee-acd2-7f3381ec1cc9',
    },
    getters:{
        products:state=> state.products,
        product:state=> state.product,
       // product:state=> state.productguccis
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
        async getProductsByCatagoryId({commit},catagoryId){
           
            try {
                console.log(catagoryId);
                const respone=  await  axios.get(`https://localhost:7159/api/v1/Product/catagory/${catagoryId}/products`)
                commit('SET_PRODUCTSBYCATAGORYID',respone.data)
                console.log(respone.data);
                console.log(respone.data);
              } catch (error) {
                  console.log(error)
              }
        },
        async getProductsByManufactorerId({commit},manufactorerId){
           
            try {
               
                const respone=  await  axios.get(`https://localhost:7159/api/v1/Product/manufactorer/${manufactorerId}/products`)
                commit('SET_PRODUCTSBYMANUFACTORERID',respone.data)
                console.log(respone.data);
                console.log(respone.data);
              } catch (error) {
                  console.log(error)
              }
        },
        // async getProductGucci({commit}){
           
        //     try {
                
        //         const respone=  await  axios.get(`https://localhost:7159/api/v1/Product/manufactorer/5f5bcd29-e832-11ee-acd2-7f3381ec1cc9/products`)
        //         commit('SET_PRODUCTGUCCI',respone.data)
        //         console.log(respone.data);
        //       } catch (error) {
        //           console.log(error)
        //       }
        // },

    },
    mutations:{
        SET_PRODUCTS(state,products){
            state.products=products
        },
        SET_PRODUCT(state,product){
            state.product=product
        },
        SET_PRODUCTSBYMANUFACTORERID(state,products){
            state.products=products
        },
        SET_PRODUCTSBYCATAGORYID(state,products){
            state.products=products
        },
        // SET_PRODUCTGUCCI(state,productguccis){
        //     state.productguccis=productguccis
        // },
        
    }
}
export default productModules