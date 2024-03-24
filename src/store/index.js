import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import todos from './modules/todos'
import catagorys from './modules/catagory'
import manufactorers from './modules/manufactorer'


Vue.use(Vuex)
const storeData= {
    modules:{
        auth,todos,catagorys,manufactorers
    }
  

    
}
const store= new Vuex.Store(storeData)
export default store