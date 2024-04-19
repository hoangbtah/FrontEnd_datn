import axios from "axios";
const orderModules={
    state:{
        orders:[],
        orderDetails:[]
    },
    getters:{
        orders:state=> state.orders,
        orderDetails:state=> state.orderDetails,

      //  isShowOD:state=>state.isShowOD,
    },
    actions:{
        async getOrders({commit}){
            try {
              const respone=await  axios.get('https://localhost:7159/api/Order/orders')
                commit('SET_ORDERS',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        },
        async getOrderDetail({commit},orderId){
            try {
              const respone=await  axios.get(`https://localhost:7159/api/OrderDetail/getorderDetail/${orderId}`)
              console.log("lấy chi tiết đơn hàng thành công")
                commit('SET_ORDERDETAIL',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        },

    },
    mutations:{
        SET_ORDERS(state,orders){
            state.orders=orders
        },
        SET_ORDERDETAIL(state,orderDetails){
            state.orderDetails=orderDetails
        },
        // TOGGLE_ISSHOWOD(state){
        //    // state.isShowOD=!state.isShowOD
        //    console.log("gọi 1 lần")
        //    console.log(state.isShowOD);
        //    state.isShowOD=!state.isShowOD
        //    console.log(state.isShowOD);
        // },
    }
}
export default orderModules