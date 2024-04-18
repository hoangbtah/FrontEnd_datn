import axios from "axios";
const orderModules={
    state:{
        orders:[],
        isShowOrderDetail:false
    },
    getters:{
        orders:state=> state.orders,
        isShowOrderDetail:state=>state.isShowOrderDetail
    },
    actions:{
        async getOrders({commit}){
            try {
              const respone=await  axios.get('https://localhost:7159/api/Order/orders')
                commit('SET_ORDERS',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        }
    },
    mutations:{
        SET_ORDERS(state,orders){
            state.orders=orders
        },
        TOGGLE_ISSHOWORDERDETAIL(state){
            state.isShowOrderDetail=!state.isShowOrderDetail
        },
    }
}
export default orderModules