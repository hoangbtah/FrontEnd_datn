import axios from "axios";
const state= {
    auth:{
        isAuthenticated:true,
        isEmployee:false,
        name:'',
        user:{},
        isShowEmployeeDetail:false,
    },
    selectedUser:{},
    users:[]

}
const getters={
    auth :state=> state.auth,
    selectedUser :state=> state.selectedUser,
    users :state=> state.users,
}
const actions={
    // lấy dữ liệu người dùng đăng nhập
    async getUser({commit},data){
           
        try {
            // người dùng đăng nhập hệ thống
            const respone=  await  axios.post(`https://localhost:7159/api/Auth/user`,data)
                // Lưu sản phẩm vào Local Storage
                localStorage.setItem('selectedUser', JSON.stringify(respone.data));
            commit('SET_USER',respone.data)
          } catch (error) {
              console.log(error)
          }
    },
    // lấy người dùng cho việc thêm sửa xóa
    async getUserForAdmin({commit},data){
           
        try {
            // người dùng đăng nhập hệ thống
             console.log("lây nguoif dùng");
            const respone=  await  axios.post(`https://localhost:7159/api/Auth/user`,data)
            console.log("lấy người dùng thêm sửa xóa")
              console.log(respone.data);
            commit('SET_SELECTED_USER',respone.data)
          } catch (error) {
              console.log(error)
          }
    },
    //lấy danh sách người dùng
    async getUsers({commit}) {
      try {
        const respone = await axios.get("https://localhost:7159/api/v1/User");
        console.log("lấy người dùng thành công");
        commit('SET_USERS',respone.data)
      } catch (error) {
        console.log("lấy người dùng thất bại");
      }
    },
}
const mutations={
    TOGGLE_AUTH(state){
        state.auth.isAuthenticated=!state.auth.isAuthenticated
    },
    SET_USER(state,user){
        state.auth.user=user
    },
    SET_USERS(state,users){
        state.users=users
    },
    TOGGLE_ISSHOW_EMPLOYEE_DETAIL(state){
        state.auth.isShowEmployeeDetail=!state.auth.isShowEmployeeDetail
    },
    SET_SELECTED_USER(state,user){
        state.selectedUser=user
    }
}
export default {
    state,getters,actions,mutations
}