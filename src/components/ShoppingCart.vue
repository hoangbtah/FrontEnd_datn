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
                                    <input type="text" class="form-control form-control-sm bg-secondary text-center" :value="cart.Quantity">
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
                <form class="mb-5" action="">
                    <div class="input-group">
                        <input type="text" class="form-control p-4" placeholder="Coupon Code">
                        <div class="input-group-append">
                            <button class="btn btn-primary">Apply Coupon</button>
                        </div>
                    </div>
                </form>
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
                    </div>
                    <div class="card-footer border-secondary bg-transparent">
                        <div class="d-flex justify-content-between mt-2">
                            <h5 class="font-weight-bold">Tổng thanh toán</h5>
                            <h5 class="font-weight-bold">{{ formatCurrency(totalAmount())}} đ</h5>
                        </div>
                        <router-link to="/checkout" >
                         <button class="btn btn-block btn-primary my-3 py-3">Đặt hàng</button></router-link>
                        <!-- <button class="btn btn-block btn-primary my-3 py-3">Đặt hàng</button> -->
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
//import axios from "axios";
export default {
  name: "ShoppingCart",
  created() {
    this.getCarts(this.auth.user.userId);
  },
  computed: {
    ...mapGetters(["auth", "carts"]),
    needLogin() {
      return this.$store.state.needLogin;
    }
  },
  methods: {
    ...mapActions(["getUser", "getCarts", "deleteCart", "updateCart"]),
    // cập nhật số lượng trong giỏ hàng
    async UpdateQuantity(cart, action) {
      console.log("lấy 1 sản phẩm trong giỏ hàng");
      console.log(cart);
      if (action === 1) {
        cart.Quantity++;
      } else if (action === -1) {
        // Thực hiện trừ số lượng (nếu số lượng > 0)
        if (cart.Quantity === 1) {
         // cart.Quantity--;
          this.deleteCart(cart.CartId);
        } else if(cart.Quantity > 1)
         {
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
      console.log("cart");
      console.log(formData);
      // const userId = this.auth.user.userId;
      // console.log(userId);
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        // Nếu không có token, chuyển hướng đến trang đăng nhập
        this.$router.push("/login");
        //  commit('SET_NEED_LOGIN', true);
        return;
      }
      try {
        // await this.$store.dispatch("addProductToCart", { userId, product });
        await this.updateCart(formData);
        console.log("Sản phẩm đã được thêm vào giỏ hàng!");
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
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

      // Sử dụng hàm toLocaleString() để định dạng tiền tệ theo định dạng của Việt Nam
      // Ví dụ: 100000 sẽ thành "100.000"
      return number.toLocaleString("vi-VN");
    },
    //tính tổng tiền thanh toán trong giỏ hàng
    totalAmount() {
        // Sử dụng reduce để tính tổng cart.Price * cart.Quantity của tất cả các cart trong danh sách carts
        return this.carts.reduce((total, cart) => {
            return total + (cart.Price * cart.Quantity);
        }, 0); // Giá trị khởi tạo total là 0
    }
  },
  watch: {
    needLogin(value) {
      if (value) {
        this.$router.push("/login");
      }
    }
  },
  data() {
    return {
      items: "",
      isShow: false,
      thongbao: ""
    };
  }
};
</script>
<style lang="">
</style>