import axios from "axios";
const cartModules = {
  state: {
    carts: [],
    needLogin: false,
    totalPay:''

  },
  getters: {
    carts: state => state.carts,
    totalPay: state => state.totalPay,
  },
  actions: {
    /// lấy sản phẩm trong giỏ hàng của người dùng 
    async getCarts({ commit }, userId) {
      // console.log("mã người dùng truyền vào khi lấy giỏ hàng", userId);
      //  var me= this;
      // kiểm tra xem đã đăng nhập chưa
      // if(!userId){
      //   this.$router.push("/login");
      //   return;
      // }
      // Kiểm tra xem token có tồn tại không
      const token = localStorage.getItem("token");
    //  console.log(token);
      // if (!token) {

      //   // Nếu không có token, chuyển hướng đến trang đăng nhập
      //    this.$router.push("/login");
      // //  commit('SET_NEED_LOGIN', true);
      //   return;
      // }
      try {

        const respone = await axios.get(`https://localhost:7159/api/ShoppingCart/carts/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        )
        // console.log("lấy giỏ hàng thành công");
        // console.log(respone.data);
        
        commit('SET_CARTS', respone.data);
      } catch (error) {
        console.log(error);

        // Ví dụ: xử lý lỗi 401 (Unauthorized) - token hết hạn hoặc không hợp lệ
        if (error.response.status === 403) {
          // Xử lý khi token hết hạn hoặc không hợp lệ
          // Chuyển hướng đến trang đăng nhập
          //   this.$router.push('/login');
          //  this.items="tài khoản không được cấp quyền để thực hiện chức năng này ";
          // console.error("tài khoản không được cấp quyền");
        }
        // console.error("Lỗi khi gửi yêu cầu đến API:");
        if (error.response) {
          // Lỗi từ phản hồi của server (không phải lỗi mạng)
          console.error("Lỗi từ phản hồi của server:", error.response.data);
        } else if (error.request) {
          // Lỗi trong quá trình gửi yêu cầu mạng
          console.error("Lỗi khi gửi yêu cầu mạng:", error.request);
        } else {
          // Lỗi không xác định
          console.error("Lỗi không xác định:", error.message);
        }
      }
    },

    // Thêm sản phẩm vào giỏ hàng của người dùng
    async addProductToCart({ commit }, data) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.$router.push("/login");
        }

        // Gọi API để thêm sản phẩm vào giỏ hàng
        const respone = await axios.post(
          "https://localhost:7159/api/ShoppingCart/addshoppingcart", data,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        commit('ADD_CART',data);
        console.log(respone.data);
        console.log("Thêm sản phẩm vào giỏ hàng thành công");
      } catch (error) {
       // alert(error.response.data);
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        throw error;
      }
    },
    resetCarts({ commit }) {
      commit('SET_CARTS', []); // Gọi mutation SET_CARTS với mảng rỗng
    },
    // xóa sản phẩm khỏi giỏ hàng 
    async deleteCart({ commit }, cartId) {

      try {
        console.log(cartId);
        const respone = await axios.delete(`https://localhost:7159/api/ShoppingCart/${cartId}`)
        commit('DELETE_CART', cartId)
        // console.log(respone.data);
        console.log("xóa thành công");
        console.log(respone.data);
      } catch (error) {
        console.log(error)
      }
    },

     // Chỉnh sửa sản phẩm giỏ hàng của người dùng
     async updateCart({ commit },data) {
      // console.log("dữ liệu truyền cho api");
      // console.log(data.cartId);
      // console.log(data);
      // lấy sản phẩm được update


      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.$router.push("/login");
        }

        // Gọi API để thêm sản phẩm vào giỏ hàng
        const respone = await axios.put(
          `https://localhost:7159/api/ShoppingCart/updateShoppingCart`, data,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        commit('UPDATE_CART',data);
        console.log(respone.data);
        console.log("Sửa sản phẩm trong giỏ hàng thành công");
        
      } catch (error) {
       // alert(error.response.data);
        console.error("Lỗi khi sửa sản phẩm trong giỏ hàng:", error);
        throw error;
      }
    },


  },
  mutations: {
    SET_CARTS(state, carts) {
      state.carts = carts
    },
    SET_TOTALPAY(state, totalPay) {
      console.log("tông tiền",totalPay)
      state.totalPay = totalPay
    },
    SET_NEED_LOGIN(state, value) {
      state.needLogin = value; // Cập nhật trạng thái needLogin với giá trị mới
    },
    DELETE_CART(state, cartId) {
      state.carts = state.carts.filter(cart => cart.CartId !== cartId)
    },
    ADD_CART(state,newCart) {
     state.carts.unshift(newCart)
    },
    UPDATE_CART(state,newCart) {
    //  state.carts.unshift(newCart)
    var data={
      CartId:newCart.cartId,
      ProductId:newCart.productId,
      UserId : newCart.userId,
      ProductName:newCart.productName,
      Image:newCart.image,
      Quantity:newCart.quantity,
      Price:newCart.price,
    }
     // Tìm và cập nhật sản phẩm trong state.carts với dữ liệu mới từ updatedCart
     const index = state.carts.findIndex(cart => cart.CartId === newCart.cartId);
     console.log("chỉ số",index);
     console.log("sản phẩm sửa trong cart",newCart);
      if (index !== -1) {
       // Nếu tìm thấy sản phẩm trong giỏ hàng, thay thế nó bằng updatedCart
       console.log("lỗi xảy ra ")
      // state.carts =
        state.carts.splice(index, 1,data);
     } else {
       // Trường hợp không tìm thấy sản phẩm, có thể xử lý theo ý của bạn (ví dụ: báo lỗi)
       console.error(`Không tìm thấy sản phẩm có cartId: ${newCart.cartId}`);
     }
    },
  }
}
export default cartModules