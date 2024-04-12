import axios from "axios";
const cartModules={
    state:{
        carts:[],
       // product:{},
      //  productspa:[],
    },
    getters:{
        carts:state=> state.carts,
      //  product:state=> state.product,
       // productspa:state=>state.productspa,
      
    },
    actions:{

        async getCarts({commit},userId){
             // Kiểm tra xem token có tồn tại không
             const token = localStorage.getItem("token");
             console.log(token);
             if (!token) {
               // Nếu không có token, chuyển hướng đến trang đăng nhập
               this.$router.push("/login");
               return;
             }
            try {

              const respone=await  axios.get(`https://localhost:7159/api/ShoppingCart/carts/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
             
            )
                console.log("lấy giỏ hàng thành công");
                console.log(respone.data);
                commit('SET_CARTS',respone.data);
            } catch (error) {
                console.log(error);
               
                    // Ví dụ: xử lý lỗi 401 (Unauthorized) - token hết hạn hoặc không hợp lệ
               if ( error.response.status === 403) {
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
        async GetData() {
            // Kiểm tra xem token có tồn tại không
            const token = localStorage.getItem("token");
            if (!token) {
              // Nếu không có token, chuyển hướng đến trang đăng nhập
              this.$router.push("/login");
              return;
            }
            try {
              // Gọi API đăng ký bằng Axios
              const respone = await axios.get(
                "https://localhost:7159/api/Auth/getname",
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );
      
             // const statusCode = respone.status;
      
              // Kiểm tra mã trạng thái để thực hiện xử lý phù hợp
              // if (statusCode === 200) {
              //   // Xử lý khi API trả về mã 200 (OK)
              //   console.log("tài khoản không được cấp quyền");
              // }
              //
              this.items = respone.data;
           
            } catch (error) {
               // Ví dụ: xử lý lỗi 401 (Unauthorized) - token hết hạn hoặc không hợp lệ
          if ( error.response.status === 403) {
            // Xử lý khi token hết hạn hoặc không hợp lệ
            // Chuyển hướng đến trang đăng nhập
          //   this.$router.push('/login');
          this.items="tài khoản không được cấp quyền để thực hiện chức năng này ";
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
        // async getProduct({commit},productId){
           
        //     try {
        //         // console.log(productId);
        //         const respone=  await  axios.get(`https://localhost:7159/api/v1/Product/${productId}`)
        //         commit('SET_PRODUCT',respone.data)
        //       } catch (error) {
        //           console.log(error)
        //       }
        // },
        // async getProductsByCatagoryId({commit},catagoryId){
           
        //     try {
        //         // console.log(catagoryId);
        //         const respone=  await  axios.get(`https://localhost:7159/api/v1/Product/catagory/${catagoryId}/products?pagenumber=1&pagesize=9`)
        //         commit('SET_PRODUCTSBYCATAGORYID',respone.data)
        //         // console.log(respone.data);
        //         // console.log(respone.data);
        //       } catch (error) {
        //           console.log(error)
        //       }
        // },
        // async getProductsByManufactorerId({commit},manufactorerId){
           
        //     try {
               
        //         const respone=  await  axios.get(`https://localhost:7159/api/v1/Product/manufactorer/${manufactorerId}/products?pagenumber=1&pagesize=9`)
        //         commit('SET_PRODUCTSBYMANUFACTORERID',respone.data)
        //         // console.log(respone.data);
        //         // console.log(respone.data);
        //       } catch (error) {
        //           console.log(error)
        //       }
        // },
        
     

    },
    mutations:{
        SET_CARTS(state,carts){
            state.carts=carts
        }
        // SET_PRODUCT(state,product){
        //     state.product=product
        // },
        // SET_PRODUCTSBYMANUFACTORERID(state,products){
        //     state.products=products
        // },
        // SET_PRODUCTSBYCATAGORYID(state,products){
        //     state.products=products
        // },
        
    }
}
export default cartModules