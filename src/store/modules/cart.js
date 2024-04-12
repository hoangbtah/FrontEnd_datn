import axios from "axios";
const cartModules = {
  state: {
    carts: [],

  },
  getters: {
    carts: state => state.carts,
  },
  actions: {
    /// lấy sản phẩm trong giỏ hàng của người dùng 
    async getCarts({ commit }, userId) {
      console.log("mã người dùng truyền vào khi lấy giỏ hàng", userId);
      // Kiểm tra xem token có tồn tại không
      const token = localStorage.getItem("token");
          console.log(token);
      if (!token) {
        // Nếu không có token, chuyển hướng đến trang đăng nhập
        this.$router.push("/login");
        return;
      }
      try {

        const respone = await axios.get(`https://localhost:7159/api/ShoppingCart/carts/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        )
        console.log("lấy giỏ hàng thành công");
        console.log(respone.data);
        commit('SET_CARTS', respone.data);
      } catch (error) {
        console.log(error);

        // Ví dụ: xử lý lỗi 401 (Unauthorized) - token hết hạn hoặc không hợp lệ
        if (error.response.status === 403) {
          // Xử lý khi token hết hạn hoặc không hợp lệ
          // Chuyển hướng đến trang đăng nhập
          //   this.$router.push('/login');
          //  this.items="tài khoản không được cấp quyền để thực hiện chức năng này ";
          console.error("tài khoản không được cấp quyền");
        }
        console.error("Lỗi khi gửi yêu cầu đến API:");
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
    async addProductToCart({ dispatch },  userId, product ) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Không có token xác thực");
        }

        // Gọi API để thêm sản phẩm vào giỏ hàng
        await axios.post(
          `https://localhost:7159/api/ShoppingCart/addshoppingcart/${userId}`,
          { product },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // Sau khi thêm thành công, gọi lại API để lấy giỏ hàng mới
        await dispatch("getCarts", userId);

        console.log("Thêm sản phẩm vào giỏ hàng thành công");
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        throw error;
      }
    },


  },
  mutations: {
    SET_CARTS(state, carts) {
      state.carts = carts
    }
  }
}
export default cartModules