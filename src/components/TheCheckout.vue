<template lang="">
    <div>
        <!-- Page Header Start -->
    <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Checkout</h1>
            <div class="d-inline-flex">
                <p class="m-0"><a href="">Home</a></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Checkout</p>
            </div>
        </div>
    </div>
    <!-- Page Header End -->


    <!-- Checkout Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <div class="col-lg-8">
                <div class="mb-4">
                    <h4 class="font-weight-semi-bold mb-4">Địa chỉ thanh toán</h4>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Họ và tên người nhận <i class="required">*</i></label>
                            <input class="form-control" type="text" placeholder="Họ và tên" v-model='receiver' >
                        </div>
                     
                        <div class="col-md-6 form-group">
                            <!-- <label>E-mail</label>
                            <input class="form-control" type="text" placeholder="example@email.com"> -->
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Số điện thoại <i class="required">*</i></label>
                            <input class="form-control" type="text" placeholder="Số điện thoại" v-model='phoneNumber' >
                        </div>
                          <div class="col-md-6 form-group">
                            <!-- <label>Address Line 2</label>
                            <input class="form-control" type="text" placeholder="123 Street"> -->
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Địa chỉ giao hàng <i class="required">*</i></label>
                            <input class="form-control" type="text" placeholder="123 Street" v-model='orderAddress' >
                        </div>
                      
                    </div>
                </div>
              
            </div>
            <div class="col-lg-4">
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Đơn Hàng</h4>
                    </div>
                    <div class="card-body">
                        <h5 class="font-weight-medium mb-3">Danh sách sản phẩm</h5>
                        <div class="d-flex justify-content-between" v-for="cart in carts" :key="cart.CartId">
                            <p>{{cart.ProductName}}</p>
                        </div>
                        <hr class="mt-0">
                        <!-- <div class="d-flex justify-content-between mb-3 pt-1">
                            <h6 class="font-weight-medium">Tổng phụ</h6>
                            <h6 class="font-weight-medium">{{ formatCurrency(totalAmount())}} đ</h6>
                        </div> -->
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Phí giao hàng</h6>
                            <h6 class="font-weight-medium"> 0 đ</h6>
                        </div>
                    </div>
                    <div class="card-footer border-secondary bg-transparent">
                        <div class="d-flex justify-content-between mt-2">
                            <h5 class="font-weight-bold">Tổng tiền</h5>
                            <h5 class="font-weight-bold">{{ formatCurrency(totalPay)}} đ</h5>
                        </div>
                    </div>
                </div>
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Hình thức thanh toán</h4>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                           
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" name="payment" id="directcheck" @click=clickPay()>
                                <label class="custom-control-label" for="directcheck">Thanh toán trực tiếp</label>
                            </div>
                        </div>
                        <div class="">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" name="payment" id="banktransfer" @click=clickPayOnline()>
                                <label class="custom-control-label" for="banktransfer">Thanh toán online</label>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer border-secondary bg-transparent">
                        <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3"  @click="placeOrder()">Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Checkout End -->

    </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
// Import Vue và VueToasted
import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);

export default {
    name:'TheCheckout',
    computed: {
    ...mapGetters(["auth", "carts","totalPay","orderSelected"]),
  
  },
  methods: {
    ...mapActions(["getUser", "getCarts", "deleteCart", "updateCart"]),
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
    async placeOrder() {
         // Kiểm tra xem các ô input có được điền đầy đủ thông tin hay không
    if (!this.receiver ) {
        // Hiển thị thông báo lỗi nếu có bất kỳ ô input nào để trống
        this.$toasted.show("Thông tin người nhận hàng không được để trống !", {
            duration: 2000,
            position: "top-center",
            type: "error"
        });
        return; // Dừng phương thức nếu có ô input để trống
    }
    else if (!this.phoneNumber ) {
        // Hiển thị thông báo lỗi nếu có bất kỳ ô input nào để trống
        this.$toasted.show("Thông tin số điện thoại không được !", {
            duration: 2000,
            position: "top-center",
            type: "error"
        });
        return; // Dừng phương thức nếu có ô input để trống
    }
    else if (!this.orderAddress ) {
        // Hiển thị thông báo lỗi nếu có bất kỳ ô input nào để trống
        this.$toasted.show("Thông tin địa chỉ không được để trống !", {
            duration: 2000,
            position: "top-center",
            type: "error"
        });
        return; // Dừng phương thức nếu có ô input để trống
    }

      const token = localStorage.getItem("token");
      if (!token) {
        // Nếu không có token, chuyển hướng đến trang đăng nhập
        this.$router.push("/login");
        return;
      }

      try {
        // Tạo đối tượng đơn hàng từ danh sách carts
        const orderData = {
          userId: this.auth.user.userId,
          receiver:this.receiver ,
          phone:this.phoneNumber,
          orderAddress:this.orderAddress,
          orderTotal:this.totalPay,
          payment:this.forPay
          //  orderDate: new Date().toISOString()
          // Thay bằng tên khách hàng thực tế
          // Các trường khác của đơn hàng tùy theo yêu cầu của bạn
        };
        console.log("tạo đơn hàng",orderData);

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
          // lấy orderId được tạo nếu thanh toán online 
          this.$store.commit("SET_ORDERSELECTED",responseOrder.data);
          console.log("đơn hàng lấy được",this.orderSelected);
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
          /// sau khi tạo chi tiết đơn hàng thành công cập nhật lại số lượng trong database
          //lấy sản phẩm đó trong database;
          const respone = await axios.get(`https://localhost:7159/api/v1/Product/product/${orderDetail.productId}`)
          console.log(" sản phẩm cần cập nhật",respone.data);


           const updateProduct = {
            // orderId: orderProductId,
            productId: orderDetail.productId,
            productName:cart.ProductName,
            quantity: respone.data.Quantity- cart.Quantity,
            price: respone.data.Price,
            image: cart.Image,
            catagoryId:respone.data.CatagoryId,
            manufactorerId:respone.data.ManufactorerId,
            description:respone.data.Description,
            productSize:respone.data.ProductSize
            // Các trường khác của chi tiết đơn hàng tùy theo yêu cầu của bạn
          };
           // Gọi API POST để cập nhật lại số lượng trong database
         //   console.log("cập nhật lại sản phẩm",updateProduct);
           try {
             await axios.put(
              `https://localhost:7159/api/v1/Product/${updateProduct.productId}`,updateProduct,
              {
                headers: {
                  Authorization: `Bearer ${token}` // Gửi token qua header Authorization
                }
              }
            );
            console.log("cập nhật thành công:");
          } catch (error) {
            console.error("Lỗi khi cập nhật:",
              error.response ? error.response.data : error.message
            );
            // Xử lý lỗi tại đây nếu cần thiết

          }
        }
       
        // Xóa giỏ hàng sau khi đã đặt hàng thành công
        await this.carts.forEach(cart => this.deleteCart(cart.CartId));
        if(this.forPay==0){
           // Hiển thị thông báo thành công
           this.$toasted.show("Đặt hàng thành công!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });
         // Chuyển hướng người dùng đến trang thành công hoặc thông báo thành công
      await  this.$router.push("/theshop");
        }

         
        //nếu người dùng chọn thanh toán khi nhận hàng thì đưa ra thông báo thành công và điều hướng người dùng đến trang tiếp tục mua hàng
        // nếu người dùng chọn thanh toán online thì điều hướng người dùng đến trang thanh toán
        if(this.forPay==1)
        {
            await  this.$router.push("/payment");
        }
       
      } catch (error) {
        console.error("Lỗi khi đặt hàng:", error);
          // Hiển thị thông báo thành công
          this.$toasted.show("Có lỗi trong quá trình đặt hàng", {
          duration: 3000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        // Xử lý lỗi nếu cần thiết (hiển thị thông báo lỗi, log, ...)
      }
    },
    clickPay(){
      this.forPay=0;
    },
    clickPayOnline(){
      this.forPay=1;
      console.log(this.forPay);
    }
  },
  data() {
    return {
     phoneNumber:'',
     orderAddress:'',
     receiver:'',
     forPay:0
    };
  }
}
</script>
<style scoped>
.required{
color: red
}    
</style>