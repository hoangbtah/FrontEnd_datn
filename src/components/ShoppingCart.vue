<template >
    <div>
     <!-- Page Header Start -->
     <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Shopping Cart</h1>
            <div class="d-inline-flex">
                <!-- <p class="m-0"><a href="">Home</a></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Shopping Cart</p>
                <p class="m-0">{{ items }}</p> -->
                <p v-if="carts.length === 0">Giỏ hàng của bạn chưa có sản phẩm nào !</p>

            </div>
        </div>
    </div>
    <!-- Page Header End -->


    <!-- Cart Start -->
    <div class="container-fluid pt-5" v-if="carts.length !== 0" >
        <div class="row px-xl-5">
            <div class="col-lg-8 table-responsive mb-5">
                <table class="table table-bordered text-center mb-0">
                    <thead class="bg-secondary text-dark">
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody class="align-middle">
                        <tr v-for="cart in carts" :key="cart.CartId">
                            <td class="align-middle"><img :src="cart.Image" alt="" style="width: 50px;"> {{ cart.ProductName }}</td>
                            <td class="align-middle">{{ formatCurrency(cart.Price) }} đ</td>
                            <td class="align-middle">
                                <div class="input-group quantity mx-auto" style="width: 100px;">
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-primary btn-minus" @click="UpdateQuantity(cart,-1)">
                                        <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control form-control-sm bg-secondary text-center" 
                                    v-model="cart.Quantity"
                                   @change="updateQuantityOnServer(cart)"
                                    >
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-primary btn-plus" @click="UpdateQuantity(cart,1)">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle">{{ formatCurrency(cart.Price*cart.Quantity) }} đ</td>
                            <td class="align-middle"><button class="btn btn-sm btn-primary" @click="deleteCart(cart.CartId)"><i class="fa fa-times"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4">
                <div class="mb-5" >
                    <div class="input-group">
                        <input type="text" class="form-control p-4" placeholder="Mã giảm giá" v-model="voucherCode">
                        <div class="input-group-append">
                            <button class="btn btn-primary" @click="btnClickUseVoucher(voucherCode)">Áp dụng</button>
                        </div>
                    </div>
                </div>
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Cart Summary</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-3 pt-1">
                            <h6 class="font-weight-medium">Tông tiền</h6>
                            <h6 class="font-weight-medium">{{ formatCurrency(totalAmount())}} đ</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Phí giao hàng</h6>
                            <h6 class="font-weight-medium">0 đ</h6>
                        </div>
                        <div class="d-flex justify-content-between" v-if="inforVoucherDiscountMoney>0">
                            <h6 class="font-weight-medium">Mã giảm giá</h6>
                            <h6 class="font-weight-medium">{{ formatCurrency(inforVoucherDiscountMoney) }} đ</h6>
                        </div>
                        <div class="d-flex justify-content-between" v-if="inforVoucherPercentVoucher>0">
                            <h6 class="font-weight-medium">Mã giảm giá</h6>
                            <h6 class="font-weight-medium">{{ inforVoucherPercentVoucher*100 }} %</h6>
                        </div>
                    </div>
                    <div class="card-footer border-secondary bg-transparent">
                        <div class="d-flex justify-content-between mt-2">
                            <h5 class="font-weight-bold">Tổng thanh toán</h5>
                            <h5 class="font-weight-bold">{{ formatCurrency(calculateFinalTotal())}} đ</h5>
                        </div>
                        <router-link to="/checkout" >
                         <button class="btn btn-block btn-primary my-3 py-3">Tiến hành kiểm tra</button></router-link>
                        <!-- <button class="btn btn-block btn-primary my-3 py-3" @click="placeOrder()">Đặt hàng</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Cart End -->
    </div>
</template>
<script>

import { mapActions, mapGetters } from "vuex";
import axios from "axios";
// Import Vue và VueToasted
import Vue from 'vue';
import Toasted from 'vue-toasted';

// Sử dụng VueToasted với Vue
Vue.use(Toasted);
export default {
  name: "ShoppingCart",
  created() {
    this.getCarts(this.auth.user.userId);
    this.$store.commit("SET_TOTALPAY",this.totalAmount());
    
  },
  computed: {
    ...mapGetters(["auth", "carts","totalPay"]),
    needLogin() {
      return this.$store.state.needLogin;
    }
  },
  methods: {
    ...mapActions(["getUser", "getCarts", "deleteCart", "updateCart"]),
    // cập nhật số lượng trong giỏ hàng
    async UpdateQuantity(cart, action) {
      // console.log("lấy 1 sản phẩm trong giỏ hàng");
      // console.log(cart);
      if (action === 1) {
        cart.Quantity++;
      } else if (action === -1) {
        // Thực hiện trừ số lượng (nếu số lượng > 0)
        if (cart.Quantity === 1) {
          // cart.Quantity--;
          this.deleteCart(cart.CartId);
        } else if (cart.Quantity > 1) {
          // nếu số lượng sản phẩm trong giỏ hàng mà bẳng 0 thì xóa giỏ hàng đó
          //   this.deleteCart(cart.CartId);
          cart.Quantity--;
        }
      }
      const formData = {
        cartId: cart.CartId,
        productId: cart.ProductId,
        userId: cart.UserId,
        productName: cart.ProductName,
        image: cart.Image,
        quantity: cart.Quantity,
        price: cart.Price
      };
      // console.log("cart tăng số lượng");
      // console.log(formData);
      // const userId = this.auth.user.userId;
      // console.log(userId);
      const token = localStorage.getItem("token");
      // console.log(token);
      if (!token) {
        // Nếu không có token, chuyển hướng đến trang đăng nhập
        this.$router.push("/login");
        //  commit('SET_NEED_LOGIN', true);
        return;
      }
      try {
        // await this.$store.dispatch("addProductToCart", { userId, product });
        await this.updateCart(formData);
        // console.log("Sản phẩm đã được thêm vào giỏ hàng!");
        // gọi lại api lấy giỏ hàng
        
      } catch (error) {
        cart.Quantity--;
        // console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        this.$toasted.show(error.response.data, {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'error' // Kiểu thông báo (success, info, error)
      });
        //this.getCarts(this.auth.user.userId); // Lấy lại danh sách giỏ hàng từ máy chủ
      }
    },
      // Cập nhật số lượng sản phẩm trên máy chủ
      async updateQuantityOnServer(cart) {
      try {
        /// tạo 1 bản sao của cart  khi thay đôi updateCart nó ko ảnh hưởng đến cart
        const updatedCart = { ...cart };
        // console.log("cart input")
        // console.log(updatedCart);
        await this.updateCart(updatedCart);
        // console.log("Đã cập nhật số lượng trên máy chủ!");
          // Hiển thị thông báo thành công
      this.$toasted.show('Cập nhật giỏ hàng thành công !', {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'success' // Kiểu thông báo (success, info, error)
      });
      } catch (error) {
          // Hiển thị thông báo lỗi
      this.$toasted.show(error.response.data, {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'error' // Kiểu thông báo (success, info, error)
      });
        // Xử lý lỗi khi cập nhật không thành công
        // console.error("Lỗi khi cập nhật số lượng trên máy chủ:", error);
        // Khôi phục lại số lượng ban đầu nếu cập nhật thất bại
        this.getCarts(this.auth.user.userId); // Lấy lại danh sách giỏ hàng từ máy chủ
      }
    },
  // format tiền
  formatCurrency(number) {
      // Chuyển số sang chuỗi và đảm bảo là kiểu number

      number = Number(number);
      // Kiểm tra nếu không phải là số hợp lệ
      if (isNaN(number)) {
        return "0";
      }
      // Làm tròn số tiền theo quy tắc gần nhất
      if (number < 1000) {
        number = Math.round(number / 100) * 100; // Làm tròn đến hàng trăm gần nhất
      } else {
        number = Math.round(number / 1000) * 1000; // Làm tròn đến hàng nghìn gần nhất
      }
      // Sử dụng hàm toLocaleString() để định dạng tiền tệ theo định dạng của Việt Nam
      // Ví dụ: 100000 sẽ thành "100.000"
      return number.toLocaleString("vi-VN");
    },
    //tính tổng tiền thanh toán trong giỏ hàng
    totalAmount() {
      // Sử dụng reduce để tính tổng cart.Price * cart.Quantity của tất cả các cart trong danh sách carts
      return this.carts.reduce((total, cart) => {
        return total + cart.Price * cart.Quantity;
      }, 0); // Giá trị khởi tạo total là 0
    },
    // Phương thức để gọi API POST để tạo đơn hàng và chi tiết đơn hàng
    async placeOrder() {
      const token = localStorage.getItem("token");
      if (!token) {
        // Nếu không có token, chuyển hướng đến trang đăng nhập
        this.$router.push("/login");
        return;
      }

      try {
        // Tạo đối tượng đơn hàng từ danh sách carts
        const orderData = {
          userId: this.auth.user.userId
          //  orderDate: new Date().toISOString()
          // Thay bằng tên khách hàng thực tế
          // Các trường khác của đơn hàng tùy theo yêu cầu của bạn
        };

        // Gọi API POST để tạo đơn hàng và nhận lại đối tượng đơn hàng đã được lưu vào CSDL
        const responseOrder = await axios.post(
          "https://localhost:7159/api/Order/createOrder",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}` // Gửi token qua header Authorization
            }
          }
        );

        // Lấy OrderId của đơn hàng đã tạo
        const orderProductId = responseOrder.data.orderProductId;
        console.log("ma don hang");
        console.log(orderProductId);

        // Gọi API POST để tạo từng chi tiết đơn hàng
        for (const cart of this.carts) {
          const orderDetail = {
            orderId: orderProductId,
            productId: cart.ProductId,
            quantity: cart.Quantity,
            price: cart.Price,
            image: cart.Image
            // Các trường khác của chi tiết đơn hàng tùy theo yêu cầu của bạn
          };

          console.log("Chi tiết đơn hàng:");
          console.log(orderDetail);

          // Gọi API POST để tạo chi tiết đơn hàng hiện tại
          try {
            const responseOrderDetail = await axios.post(
              "https://localhost:7159/api/OrderDetail",
              orderDetail,
              {
                headers: {
                  Authorization: `Bearer ${token}` // Gửi token qua header Authorization
                }
              }
            );
            console.log(
              "Đã tạo chi tiết đơn hàng thành công:",
              responseOrderDetail.data
            );
          } catch (error) {
            console.error(
              "Lỗi khi tạo chi tiết đơn hàng:",
              error.response ? error.response.data : error.message
            );
            // Xử lý lỗi tại đây nếu cần thiết
          }
        }

        // // Tạo danh sách chi tiết đơn hàng từ danh sách carts và orderId
        // const orderDetails = this.carts.map(cart => ({
        //   orderId: orderProductId,
        //   productId: cart.ProductId,
        //   quantity: cart.Quantity,
        //   price: cart.Price,
        //   image:cart.Image
        //   // Các trường khác của chi tiết đơn hàng tùy theo yêu cầu của bạn
        // }));
        // console.log("chi tiet don hang hang");
        // console.log(orderDetails);
        // // Gọi API POST để tạo các chi tiết đơn hàng
        // const responseOrderDetails = await axios.post("https://localhost:7159/api/OrderDetail", orderDetails, {
        //   headers: {
        //     Authorization: `Bearer ${token}` // Gửi token qua header Authorization
        //   }
        // });

        // // Xử lý kết quả trả về nếu cần thiết
        // console.log("Đơn hàng và chi tiết đơn hàng đã được tạo thành công:", responseOrder.data, responseOrderDetails.data);

        // Xóa giỏ hàng sau khi đã đặt hàng thành công
        await this.carts.forEach(cart => this.deleteCart(cart.CartId));

        // Chuyển hướng người dùng đến trang thành công hoặc thông báo thành công
        this.$router.push("/theshop");
      } catch (error) {
        console.error("Lỗi khi đặt hàng:", error);
        // Xử lý lỗi nếu cần thiết (hiển thị thông báo lỗi, log, ...)
      }
    },
    formatDate(dob)
    {
        if(dob)
        {
            dob= new Date(dob);
            let date= dob.getDate();
            date =date<10 ?  `0${date}`:date;
            // lấy ngày 
            let month= dob.getMonth()+1;
            // lấy tháng
            month= month <10 ? `0${month}`:month;
            let year = dob.getFullYear();
            //lấy giá trị là ngày tháng năm
            dob= `${date}-${month}-${year}`;
        }
        else{
            dob = "";
        }
        return dob;
    },
    /// khi người áp dụng mã giảm giá
   async btnClickUseVoucher(voucherCode){
    try{
      //1 lây thông tin của mã voucher nhập vào 
      // validate dữ liệu
      //nếu voucher có hiệu lực thì trừ tiền theo voucher 
      // nếu voucher không còn hiệu lực thì đưa ra thông báo
      const respone= await axios.get(`https://localhost:7159/api/Voucher/voucherbyVoucherCode/${voucherCode}`);
      console.log("thông tin voucher",respone.data);
      // this.inforVoucherDiscountMoney=respone.data.DiscountMoney;
      // this.inforVoucherPercentVoucher=respone.data.PercentVoucher;
      //validate ngày sử dụng của voucher 
      const currentDate= new Date();
      // console.log("tổng đơn hàng",this.totalAmount());
      // console.log(this.formatDate(currentDate));
    if(this.formatDate(currentDate)>this.formatDate(respone.data.EndDateVoucher) || this.formatDate(currentDate)<this.formatDate(respone.data.StartDateVoucher)){
          // Hiển thị thông báo lỗi
      this.$toasted.show("Voucher này không thể dùng được do không nằm trong thời gian áp dụng !", {
        duration: 4000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'error' // Kiểu thông báo (success, info, error)
      });
      return ;
      }
      /// validate điều kiện giá cuối của voucher 
      if(this.totalAmount() > respone.data.EndPrice && respone.data.EndPrice>0){
           // Hiển thị thông báo lỗi
      this.$toasted.show("Voucher này không thể dùng được do tổng tiền không nằm trong điều kiện của voucher !", {
        duration: 4000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'error' // Kiểu thông báo (success, info, error)
      });
      return ;
      }
       /// validate điều kiện giá đầu của voucher 
       if(this.totalAmount() < respone.data.StartPrice && respone.data.StartPrice>0){
           // Hiển thị thông báo lỗi
      this.$toasted.show("Voucher này không thể dùng được do tổng tiền không nằm trong điều kiện của voucher !", {
        duration: 4000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'error' // Kiểu thông báo (success, info, error)
      });
      return ;
      }
      this.inforVoucherDiscountMoney=respone.data.DiscountMoney;
     this.inforVoucherPercentVoucher=respone.data.PercentVoucher;
          // Hiển thị thông báo lỗi
          this.$toasted.show("Áp dụng voucher thành công !", {
        duration: 4000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'success' // Kiểu thông báo (success, info, error)
      });
    }
    catch (error) {
    this.$toasted.show("Có lỗi xảy ra khi áp dụng voucher!", {
      duration: 4000, // Thời gian hiển thị thông báo (ms)
      position: 'top-center', // Vị trí hiển thị
      type: 'error' // Kiểu thông báo (success, info, error)
    });
  }

    },
    calculateFinalTotal() {
    const total = this.totalAmount();
    const discountAmount = total * this.inforVoucherPercentVoucher + this.inforVoucherDiscountMoney;
    this.$store.commit("SET_TOTALPAY",total-discountAmount);
    return total - discountAmount;
  },
  },
  watch: {
    needLogin(value) {
      if (value) {
        this.$router.push("/login");
      }
    },
  },
  data() {
    return {
      items: "",
      isShow: false,
      thongbao: "",
      voucherCode:'',
      inforVoucherDiscountMoney:0,
      inforVoucherPercentVoucher:0
    };
  }
};
</script>
<style lang="">
</style>