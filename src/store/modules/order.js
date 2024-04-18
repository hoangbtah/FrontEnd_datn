import axios from "axios";
const orderModules={
    state:{
        orders:[]
    },
    getters:{
        orders:state=> state.orders
    },
    actions:{
        async getOrders({commit}){
            try {
              const respone=await  axios.get('https://localhost:7159/api/Order')
                commit('SET_ORDERS',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        }
    },
    mutations:{
        SET_ORDERS(state,orders){
            state.orders=orders
        }
    }
}
export default orderModules