import axios from "axios";
const voucherModules={
    state:{
        vouchers:[],
        isShowVoucher:false,
        voucher:{},
        isShowDeleteVoucher:false
    },
    getters:{
        vouchers:state=> state.vouchers,
        voucher:state=> state.voucher,
        isShowVoucher:state=> state.isShowVoucher,
        isShowDeleteVoucher:state=> state.isShowDeleteVoucher
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
    }
}
export default voucherModules