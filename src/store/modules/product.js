import axios from "axios";
const productModules={
    state:{
        products:[],
        product:{},
      //  productspa:[],
    },
    getters:{
        products:state=> state.products,
        product:state=> state.product,
       // productspa:state=>state.productspa,
      
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
                // console.log(productId);
                const respone=  await  axios.get(`https://localhost:7159/api/v1/Product/${productId}`)
                commit('SET_PRODUCT',respone.data)
              } catch (error) {
                  console.log(error)
              }
        },
        async getProductsByCatagoryId({commit},catagoryId){
           
            try {
                // console.log(catagoryId);
                const respone=  await  axios.get(`https://localhost:7159/api/v1/Product/catagory/${catagoryId}/products?pagenumber=1&pagesize=9`)
                commit('SET_PRODUCTSBYCATAGORYID',respone.data)
                // console.log(respone.data);
                // console.log(respone.data);
              } catch (error) {
                  console.log(error)
              }
        },
        async getProductsByManufactorerId({commit},manufactorerId){
           
            try {
               
                const respone=  await  axios.get(`https://localhost:7159/api/v1/Product/manufactorer/${manufactorerId}/products?pagenumber=1&pagesize=9`)
                commit('SET_PRODUCTSBYMANUFACTORERID',respone.data)
                // console.log(respone.data);
                // console.log(respone.data);
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
        SET_PRODUCTSBYMANUFACTORERID(state,products){
            state.products=products
        },
        SET_PRODUCTSBYCATAGORYID(state,products){
            state.products=products
        },
        
    }
}
export default productModules