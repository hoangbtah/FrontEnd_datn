import axios from "axios";
const productModules = {
    state: {
        products: [],
        product: {},
        isShow:false,
        isShowDialog:false,
        isShowDialogDeleteDiscount:false,
        pageproducts:[],
        productsDiscount:[],
        selectedManufacturerId: null,
        selectedCatagoryId: null,
        selectedProductId:null,
        searchProduct:"",
        isShowDiscount:false,
    },
    getters: {
        products: state => state.products,
        productsDiscount: state => state.productsDiscount,
        product: state => state.product,
        selectedProductId: state => state.selectedProductId,
        isShow:state=>state.isShow,
        isShowDialogDeleteDiscount:state=>state.isShowDialogDeleteDiscount,
        isShowDialog:state=>state.isShowDialog,
        isShowDiscount:state=>state.isShowDiscount,
        pageproducts:state=>state.pageproducts,
       // pageProductsAdmin:state=>state.pageproducts,
        selectedManufacturerId:state=>state.selectedManufacturerId,
        selectedCatagoryId:state=>state.selectedCatagoryId,
        searchProduct:state=>state.searchProduct,
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

                const respone = await axios.get(`https://localhost:7159/api/v1/Product/product/${productId}`)
                console.log("lấy sản phẩm thành công 123");
                console.log(respone.data);
                 // Lưu sản phẩm vào Local Storage
                 localStorage.setItem('selectedProduct', JSON.stringify(respone.data));
                commit('SET_PRODUCT', respone.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getProductsByCatagoryId({ commit }, catagoryId) {

            try {
               
                 commit('SET_SELECTEDCATAGORYID', catagoryId)
                console.log("mã danh muc",catagoryId);

            } catch (error) {
                console.log(error)
            }
        },
        // lấy danh sách sản phẩm theo nhà sản xuất theo phân trang
        async getProductsByManufactorerId({ commit }, manufactorerId) {

            try {  
                commit('SET_SELECTEDMANUFACTORERID', manufactorerId);
            } catch (error) {
                console.log(error)
            }
        },
        resetGetProductsByManufactorerId({ commit }) {
            commit('RESET_SELECTEDMANUFACTORERID');
          },
          resetGetProductsByCatagoryId({ commit }) {
            commit('RESET_SELECTEDCATAGORYID');
          },
            // lấy từ khóa tìm kiếm
        async getProductSearch({ commit }, search_product) {

            try {  
                commit('SET_SEARCHPRODUCT', search_product);
                console.log("search product",search_product)
            } catch (error) {
                console.log(error)
            }
        },
        //lấy sản phẩm giảm giá
        async getProductsDiscount({ commit }) {

            try {
                const respone = await axios.get(`https://localhost:7159/api/v1/Product/products/discounted`)
               
                 commit('SET_PRODUCTSDISCOUNT', respone.data);   

            } catch (error) {
                console.log(error)
            }
        },
        



    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },
        SET_PRODUCTSDISCOUNT(state, productsDiscount) {
            state.productsDiscount = productsDiscount
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
        TOGGLE_ISSHOWDISCOUNT(state){
            state.isShowDiscount=!state.isShowDiscount
        },
        TOGGLE_ISSHOWDIALOGDELETEDISCOUNT(state){
            state.isShowDialogDeleteDiscount=!state.isShowDialogDeleteDiscount
        },
        TOGGLE_DIALOG(state){
            state.isShowDialog= !state.isShowDialog
        },
        SET_PAGEPRODUCTS(state, pageproducts) {
            state.pageproducts = pageproducts
        },
        SET_SELECTEDMANUFACTORERID(state,selectedManufacturerId){
            state.selectedManufacturerId=selectedManufacturerId
        },
        SET_SELECTEDPRODUCTID(state,selectedProductId){
            state.selectedProductId=selectedProductId
        },
        RESET_SELECTEDMANUFACTORERID(state){
            state.selectedManufacturerId=null
        },
        SET_SELECTEDCATAGORYID(state,selectedCatagoryId){
            state.selectedCatagoryId=selectedCatagoryId
        },
        RESET_SELECTEDCATAGORYID(state){
            state.selectedCatagoryId=null
        },
        SET_SEARCHPRODUCT(state, searchProduct) {
            state.searchProduct = searchProduct
        },
        ADD_PRODUCT(state,newProduct)
        {
            state.products.unshift(newProduct);
        },
        DELETE_PRODUCT(state, productId) {
            state.pageproducts = state.pageproducts.filter(product => product.ProductId !== productId)
        },
     


    }
}
export default productModules