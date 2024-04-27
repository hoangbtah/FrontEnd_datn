import axios from "axios";
const productModules = {
    state: {
        products: [],
        product: {},
        isShow:false,
        pageproducts:[],
        selectedManufacturerId: null,
        selectedCatagoryId: null,

        //  productspa:[],
    },
    getters: {
        products: state => state.products,
        product: state => state.product,
        isShow:state=>state.isShow,
        pageproducts:state=>state.pageproducts,
        selectedManufacturerId:state=>state.selectedManufacturerId,
        selectedCatagoryId:state=>state.selectedCatagoryId,



    },
    actions: {

        async getProducts({ commit }) {
            try {

                const respone = await axios.get('https://localhost:7159/api/v1/Product/products')
                commit('SET_PRODUCTS', respone.data);
               // console.log("lấy danh sách  sản phẩm");
              //  console.log(respone.data)
               
            } catch (error) {
                console.log(error)
            }
        },
        async getProduct({ commit }, productId) {

            try {

                const respone = await axios.get(`https://localhost:7159/api/v1/Product/${productId}`)
             //   console.log("lấy sản phẩm thành công");
               // console.log(respone.data);
                 // Lưu sản phẩm vào Local Storage
                 localStorage.setItem('selectedProduct', JSON.stringify(respone.data));
                commit('SET_PRODUCT', respone.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getProductsByCatagoryId({ commit }, catagoryId) {

            try {
                // console.log(catagoryId);
                // const respone = await axios.get(`https://localhost:7159/api/v1/Product/catagory/${catagoryId}/products?pagenumber=1&pagesize=3`)
                 commit('SET_SELECTEDCATAGORYID', catagoryId)
                console.log("mã danh muc",catagoryId);

                // console.log(respone.data);
                // console.log(respone.data);
            } catch (error) {
                console.log(error)
            }
        },
        // lấy danh sách sản phẩm theo nhà sản xuất theo phân trang
        async getProductsByManufactorerId({ commit }, manufactorerId) {

            try {

               // const respone = await axios.get(`https://localhost:7159/api/v1/Product/manufactorer/${manufactorerId}/products?pagenumber=1&pagesize=3`)
               // commit('SET_PAGEPRODUCTS', respone.data)
                commit('SET_SELECTEDMANUFACTORERID', manufactorerId);


                console.log("mã nhà sản xuất",manufactorerId);
            //     console.log(respone.data);
                // console.log(respone.data);
            } catch (error) {
                console.log(error)
            }
        },
        resetGetProductsByManufactorerId({ commit }) {
            commit('RESET_SELECTEDMANUFACTORERID');
          },
          resetGetProductsByCatagoryId({ commit }) {
            commit('RESET_SELECTEDCATAGORYID');
          }
        



    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },
        SET_PRODUCT(state, product) {
            state.product = product
        },
        SET_PRODUCTSBYMANUFACTORERID(state, products) {
            state.products = products
        },
        SET_PRODUCTSBYCATAGORYID(state, products) {
            state.products = products
        },
        TOGGLE_ISSHOW(state){
            state.isShow=!state.isShow
        },
        SET_PAGEPRODUCTS(state, pageproducts) {
            state.pageproducts = pageproducts
        },
        SET_SELECTEDMANUFACTORERID(state,selectedManufacturerId){
            state.selectedManufacturerId=selectedManufacturerId
        },
        RESET_SELECTEDMANUFACTORERID(state){
            state.selectedManufacturerId=null
        },
        SET_SELECTEDCATAGORYID(state,selectedCatagoryId){
            state.selectedCatagoryId=selectedCatagoryId
        },
        RESET_SELECTEDCATAGORYID(state){
            state.selectedCatagoryId=null
        }


    }
}
export default productModules