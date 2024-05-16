import axios from "axios";
const orderModules={
    state:{
        orders:[],
        orderDetails:[],
        yearSelected:'',
        monthSelected:'',
        startDateSatis:'',
        endDateSatis:'',
        orderSelected:''
    },
    getters:{
        orders:state=> state.orders,
        orderDetails:state=> state.orderDetails,
        yearSelected:state=> state.yearSelected,
        monthSelected:state=> state.monthSelected,
        startDateSatis:state=>state.startDateSatis,
        endDateSatis:state=>state.endDateSatis,
        orderSelected:state=>state.orderSelected,


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
        async getOrderDetail({commit},orderIdSelected){
            try {
              const respone=await  axios.get(`https://localhost:7159/api/OrderDetail/getorderDetail/${orderIdSelected}`)
              console.log("lấy chi tiết đơn hàng thành công");
              console.log(respone.data);
                commit('SET_ORDERDETAIL',respone.data);
            } catch (error) {
                console.log(error);
            }
           
        },
        async getOrder({commit},orderId){
            try {
              const respone=await  axios.get(`https://localhost:7159/api/Order/${orderId}`)
              console.log("lấy  đơn hàng thành công");
              console.log(respone.data);
                commit('SET_ORDERSELECTED',respone.data);
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
        SET_STARTDATE(state,startDateSatis){
            state.startDateSatis=startDateSatis
        },
        SET_ENDATE(state,endDateSatis){
            state.endDateSatis=endDateSatis
        },  
        SET_ORDERSELECTED(state,orderSelected){
            state.orderSelected=orderSelected
        }
       
       
    }
}
export default orderModules