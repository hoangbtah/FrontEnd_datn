import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import todos from './modules/todos'
import catagorys from './modules/catagory'
import manufactorers from './modules/manufactorer'
import products from './modules/product'
import product from './modules/product'
import comments from './modules/comment'
import carts from './modules/cart'
import isShow from './modules/product'


Vue.use(Vuex)
const storeData= {
    modules:{
        auth,todos,catagorys,manufactorers,products,product,comments,carts,isShow
    }
  

    
}
const store= new Vuex.Store(storeData)
export default store