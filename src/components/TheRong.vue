<template>
    <div>
      <!-- Your existing template code -->
  
      <div class="container-fluid pt-5" v-if="carts.length !== 0">
        <div class="row px-xl-5">
          <div class="col-lg-8 table-responsive mb-5">
            <table class="table table-bordered text-center mb-0">
              <thead class="bg-secondary text-dark">
                <!-- Table header -->
              </thead>
              <tbody class="align-middle">
                <tr v-for="cart in carts" :key="cart.CartId">
                  <!-- Table row for each cart item -->
                  <td class="align-middle">{{ cart.ProductName }}</td>
                  <td class="align-middle">{{ formatCurrency(cart.Price) }} đ</td>
                  <td class="align-middle">
                    <div class="input-group quantity mx-auto" style="width: 100px;">
                      <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-minus" @click="decreaseQuantity(cart)">
                          <i class="fa fa-minus"></i>
                        </button>
                      </div>
                      <input
                        type="number"
                        class="form-control form-control-sm bg-secondary text-center"
                        v-model="tempQuantities[cart.CartId]"
                        @change="updateQuantityOnServer(cart)"
                      />
                      <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-plus" @click="increaseQuantity(cart)">
                          <i class="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <!-- Display total amount -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Your remaining template code -->
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    name: "ShoppingCart",
    created() {
      this.getCarts(this.auth.user.userId);
    },
    computed: {
      ...mapGetters(["auth", "carts"]),
      // Other computed properties
    },
    data() {
      return {
        tempQuantities: {}, // Biến tạm để lưu trữ số lượng mới của từng sản phẩm trong giỏ hàng
      };
    },
    methods: {
      ...mapActions(["getCarts", "updateCart"]),
      formatCurrency(number) {
        // Chuyển số sang chuỗi và đảm bảo là kiểu number
        number = Number(number);
  
        // Kiểm tra nếu không phải là số hợp lệ
        if (isNaN(number)) {
          return "0";
        }
  
        // Sử dụng hàm toLocaleString() để định dạng tiền tệ theo định dạng của Việt Nam
        return number.toLocaleString("vi-VN");
      },
      // Giảm số lượng sản phẩm
      decreaseQuantity(cart) {
        const currentQuantity = this.tempQuantities[cart.CartId] || cart.Quantity;
        this.tempQuantities[cart.CartId] = Math.max(0, currentQuantity - 1);
      },
      // Tăng số lượng sản phẩm
      increaseQuantity(cart) {
        const currentQuantity = this.tempQuantities[cart.CartId] || cart.Quantity;
        this.tempQuantities[cart.CartId] = currentQuantity + 1;
      },
      // Cập nhật số lượng sản phẩm trên máy chủ
      async updateQuantityOnServer(cart) {
        const newQuantity = this.tempQuantities[cart.CartId];
        if (newQuantity !== undefined && newQuantity !== cart.Quantity) {
          // Kiểm tra số lượng mới có hợp lệ không
          if (newQuantity > 0 && newQuantity <= cart.StockQuantity) {
            // Gửi yêu cầu cập nhật số lượng lên server
            const updatedCart = { ...cart, Quantity: newQuantity };
            await this.updateCart(updatedCart);
          } else {
            // Hiển thị thông báo lỗi và khôi phục lại số lượng cũ trên giao diện
            alert("Số lượng không hợp lệ!");
            this.tempQuantities[cart.CartId] = cart.Quantity;
          }
        }
      },
      // Other methods
    },
  };
  </script>
  
  <style lang="">
  /* Your custom styles */
  </style>
  
  <template>
  <div>
    <!-- Your existing template code -->

    <div class="container-fluid pt-5" v-if="carts.length !== 0">
      <div class="row px-xl-5">
        <div class="col-lg-8 table-responsive mb-5">
          <table class="table table-bordered text-center mb-0">
            <thead class="bg-secondary text-dark">
              <!-- Table header -->
            </thead>
            <tbody class="align-middle">
              <tr v-for="cart in carts" :key="cart.CartId">
                <!-- Table row for each cart item -->
                <td class="align-middle">{{ cart.ProductName }}</td>
                <td class="align-middle">{{ formatCurrency(cart.Price) }} đ</td>
                <td class="align-middle">
                  <div class="input-group quantity mx-auto" style="width: 100px;">
                    <div class="input-group-btn">
                      <button class="btn btn-sm btn-primary btn-minus" @click="decreaseQuantity(cart)">
                        <i class="fa fa-minus"></i>
                      </button>
                    </div>
                    <input
                      type="number"
                      class="form-control form-control-sm bg-secondary text-center"
                      v-model="cart.Quantity"
                      @change="updateQuantityOnServer(cart)"
                    />
                    <div class="input-group-btn">
                      <button class="btn btn-sm btn-primary btn-plus" @click="increaseQuantity(cart)">
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <!-- Display total amount -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Your remaining template code -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ShoppingCart",
  created() {
    this.getCarts(this.auth.user.userId);
  },
  computed: {
    ...mapGetters(["auth", "carts"]),
    // Other computed properties
  },
  methods: {
    ...mapActions(["getCarts", "updateCart"]),
    formatCurrency(number) {
      // Chuyển số sang chuỗi và đảm bảo là kiểu number
      number = Number(number);

      // Kiểm tra nếu không phải là số hợp lệ
      if (isNaN(number)) {
        return "0";
      }

      // Sử dụng hàm toLocaleString() để định dạng tiền tệ theo định dạng của Việt Nam
      return number.toLocaleString("vi-VN");
    },
    // Giảm số lượng sản phẩm
    decreaseQuantity(cart) {
      if (cart.Quantity > 1) {
        cart.Quantity--;
        this.updateQuantityOnServer(cart);
      }
    },
    // Tăng số lượng sản phẩm
    increaseQuantity(cart) {
      if (cart.Quantity < cart.StockQuantity) {
        cart.Quantity++;
        this.updateQuantityOnServer(cart);
      }
    },
    // Cập nhật số lượng sản phẩm trên máy chủ
    async updateQuantityOnServer(cart) {
      try {
        const updatedCart = { ...cart };
        await this.updateCart(updatedCart);
        console.log("Đã cập nhật số lượng trên máy chủ!");
      } catch (error) {
        // Xử lý lỗi khi cập nhật không thành công
        console.error("Lỗi khi cập nhật số lượng trên máy chủ:", error);
        // Khôi phục lại số lượng ban đầu nếu cập nhật thất bại
        this.getCarts(this.auth.user.userId); // Lấy lại danh sách giỏ hàng từ máy chủ
      }
    },
    // Other methods
  },
};
</script>

<style lang="">
/* Your custom styles */
</style>
