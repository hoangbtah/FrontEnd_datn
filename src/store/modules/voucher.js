import axios from "axios";
const voucherModules={
    state:{
        vouchers:[],
        isShowVoucher:false,
        voucher:{},
        isShowDeleteVoucher:false,
        voucherOfUser:[], //biến lưu voucher người dùng
        unreadCount: 0 // Số lượng thông báo chưa đọc
    },
    getters:{
        vouchers:state=> state.vouchers,
        voucher:state=> state.voucher,
        isShowVoucher:state=> state.isShowVoucher,
        isShowDeleteVoucher:state=> state.isShowDeleteVoucher,
        voucherOfUser:state=> state.voucherOfUser,
        unreadCount:state=> state.unreadCount,
    },
    actions:{
        async getVouchers({commit}){
            try {
              const respone=await  axios.get('https://localhost:7159/api/Voucher')
                commit('SET_VOUCHERS',respone.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getVoucher({commit},voucherId){
            try {
              const respone=await  axios.get(`https://localhost:7159/api/Voucher/${voucherId}`)
                commit('SET_VOUCHER',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        },
        ///lấy voucher của người dùng
        async getVoucherOfUser({commit},userId){
            try {
              const respone=await  axios.get(`https://localhost:7159/api/Voucher/voucher/${userId}`)
            //   console.log("lấy voucher của người dùng thành công")
            //   console.log(respone.data)
            //lưu voucher của người dùng vào localStorage
        //   localStorage.setItem('Uservoucher',  respone.data);

                commit('SET_VOUCHEROFUSER',respone.data)
            } catch (error) {
                console.log(error)
            }
           
        },
        ///Khi người dùng click vào biểu tượng thông báo, markAllAsRead được gọi để đánh dấu tất cả thông báo là đã đọc và cập nhật lại unreadCount
        markAllAsRead({ commit }) {
            commit('SET_ALLREAD');
          }
    },
    mutations:{
        SET_VOUCHERS(state,vouchers){
            state.vouchers=vouchers
        },
        SET_VOUCHER(state,voucher){
            state.voucher=voucher
        },
        TOGGLE_ISSHOWVOUCHER(state)
        {
            state.isShowVoucher=!state.isShowVoucher
        },
        TOGGLE_ISSHOW_DELETE_VOUCHER(state)
        {
            state.isShowDeleteVoucher=!state.isShowDeleteVoucher
        },
        DELETE_VOUCHER(state, voucherId) {
            state.vouchers = state.vouchers.filter(voucher => voucher.voucherId !== voucherId)
        },
        SET_VOUCHEROFUSER(state,voucherOfUser){
            state.voucherOfUser=voucherOfUser
          //  state.unreadCount = voucherOfUser.filter(n => !n.read).length;
        //  state.unreadCount = voucherOfUser.filter(n => !n.read).length;
        
        },
        SET_ALLREAD(state) {
        //    state.voucherOfUser.forEach(n => n.read = true);
        //state.voucherOfUser.forEach(n => Vue.set(n, 'read', true));
            state.unreadCount = 0;
            console.log(state.unreadCount);
          },
          ADD_VOUCHER(state) {
          //  state.voucherOfUser.push(voucher);
            state.unreadCount += 1; // Tăng số lượng thông báo chưa đọc
            console.log("số lượng thông báo",state.unreadCount);
          }
    }
}
export default voucherModules