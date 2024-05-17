<!-- PaymentResult.vue -->
<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Kết quả thanh toán</h5>
      </div>
      <div class="card-body">
        <div>
          <p class="font-weight-bold">Trạng thái: {{ status }}</p>
          <p>Mã đơn hàng: {{ orderId }} </p>
          <p>Số tiền thanh toán: {{ formatCurrency(amount/100) }} đ</p>
          <p>Mã ngân hàng: {{ bankCode }}</p>
          <p></p> <!-- Thêm các thông tin khác mà bạn muốn hiển thị -->
          <router-link class="nav-item nav-link" to="/theshop"><div class="nav-text">Tiếp tục mua hàng</div></router-link>
        </div>
        <!-- <div v-else>
          <p class="font-weight-bold">Đang xử lý...</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      orderId: '',
      amount: '',
      bankCode: '',
      transactionStatus:'',
      status:''

    };
  },
  computed: {
    ...mapGetters(["totalPay","orderSelected"])
  },
 created() {
    // Lấy thông tin từ query string khi component được tạo
    console.log("LAY DON HANG CREATED",this.orderSelected);
   // console.log(orderSelected);
    this.orderId = this.$route.query.vnp_TxnRef;
    this.amount = this.$route.query.vnp_Amount;
    this.bankCode = this.$route.query.vnp_BankCode;
    this.transactionStatus = this.$route.query.vnp_TransactionStatus;
    if(this.transactionStatus==='00')
    {
      this.status="Giao dịch thành công";
      this.processOrder();
    }
    else{
      this.status="Giao dịch thất bại"
    }
    

    // Lấy các thông tin khác nếu cần
  },
  methods: {
    ...mapActions(["getOrder"]),
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
    async processOrder() {
    try {
      await this.getOrder(this.orderId); // Đợi cho đến khi getOrder hoàn thành
      this.updateOrder(this.orderSelected); // Sau đó gọi updateOrder
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng hoặc cập nhật đơn hàng:", error);
    }
  },
    async updateOrder(orderSelected){
      console.log("orderSelected trong update",orderSelected);
       //cập nhật trạng thái thanh toán cho đơn hàng khi trả về thanh toán thành công
    const formData = {
    orderProductId: orderSelected.orderProductId,
    userId: orderSelected.userId,
    orderDate: orderSelected.orderDate,
    deliveryDate: orderSelected.deliveryDate,
    status: orderSelected.status,
    receiver: orderSelected.receiver,
    phone: orderSelected.phone,
    orderAddress: orderSelected.orderAddress,
    payment: orderSelected.payment,
    statusPayment: 1,
    orderTotal: orderSelected.orderTotal
      };
      console.log("thông tin đơn hàng",formData)
      try{
        await axios.put(`https://localhost:7159/api/Order/${formData.orderProductId}`,formData);
      console.log("cập nhật đơn hàng thành công");

      }
      catch(error){
        console.log(error);
      }
    }
  },

};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
