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
 // mounted() {
    // Gửi yêu cầu GET đến API của bạn để nhận kết quả thanh toán
    // Thay đổi URL endpoint để phù hợp với API của bạn
    // axios.get('http://example.com/payment/result')
    //   .then(response => {
    //     this.paymentResult = response.data;
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
 // }
 created() {
    // Lấy thông tin từ query string khi component được tạo
    this.orderId = this.$route.query.vnp_TxnRef;
    this.amount = this.$route.query.vnp_Amount;
    this.bankCode = this.$route.query.vnp_BankCode;
    this.transactionStatus = this.$route.query.vnp_TransactionStatus;
    if(this.transactionStatus==='00')
    {
      this.status="Giao dịch thành công"
    }
    else{
      this.status="Giao dịch thất bại"
    }

    // Lấy các thông tin khác nếu cần
  },
  methods: {
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
  },

};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
