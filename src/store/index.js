import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import todos from './modules/todos'
import catagorys from './modules/catagory'
import manufactorers from './modules/manufactorer'
import products from './modules/product'
import product from './modules/product'
import pageproducts from './modules/product'
import selectedManufacturerId from './modules/product'
import selectedCatagoryId from './modules/product'
import comments from './modules/comment'
import carts from './modules/cart'
import isShow from './modules/product'
import orders from './modules/order'
import orderDetails from './modules/order'

//import isShowOD from './modules/order'



Vue.use(Vuex)
const storeData= {
    modules:{
        auth,todos,catagorys,manufactorers,products,product,comments,carts,isShow,orders,orderDetails,pageproducts,selectedCatagoryId,selectedManufacturerId
    }
  

    
}
const store= new Vuex.Store(storeData)
export default store