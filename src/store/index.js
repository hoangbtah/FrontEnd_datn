import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import todos from './modules/todos'
import catagorys from './modules/catagory'
import manufactorers from './modules/manufactorer'
import products from './modules/product'
import comments from './modules/comment'
import carts from './modules/cart'
import orders from './modules/order'
import voucher from './modules/voucher'




Vue.use(Vuex)
const storeData= {
    modules:{
        auth,todos,catagorys,manufactorers,products,comments,carts,orders,voucher
    }
  

    
}
const store= new Vuex.Store(storeData)
export default store