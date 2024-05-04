import axios from "axios";
const orderModules={
    state:{
        orders:[],
        orderDetails:[],
        yearSelected:'',
        monthSelected:''
    },
    getters:{
        orders:state=> state.orders,
        orderDetails:state=> state.orderDetails,
        yearSelected:state=> state.yearSelected,
        monthSelected:state=> state.monthSelected,

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
              console.log("lấy chi tiết đơn hàng thành công");
              console.log(respone.data);
                commit('SET_ORDERDETAIL',respone.data);
            } catch (error) {
                console.log(error);
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
        SET_YEARSELECTED(state,yearSelected){
            state.yearSelected=yearSelected
        },
        SET_MONTHSELECTED(state,monthSelected){
            state.monthSelected=monthSelected
        },
       
       
    }
}
export default orderModules