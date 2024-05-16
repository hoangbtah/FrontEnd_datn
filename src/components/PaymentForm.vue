<template>
  <div class="container">
    <div class="clearfix" style="padding-bottom: 1rem;">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">VNPAY DEMO</a>
        <!-- <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Danh sách</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Tạo mới <span class="sr-only">(current)</span></a>
            </li>
          </ul>
        </div> -->
      </nav>
    </div>

    <h3>Tạo mới đơn hàng</h3>
    <div class="table-responsive">
      <form @submit.prevent="createPayment">
        <div class="form-group">
          <label for="ordertype">Loại hàng hóa</label>
          <select name="ordertype" id="ordertype" v-model="ordertype" class="form-control">
            <option value="topup">Nạp tiền điện thoại</option>
            <option value="billpayment">Thanh toán hóa đơn</option>
            <option value="fashion">Thời trang</option>
          </select>
        </div>
        <div class="form-group">
          <label for="amount">Số tiền</label>
          <input type="number" v-model="amount" class="form-control" id="amount" required />
        </div>
        <div class="form-group">
          <label for="orderInfo">Nội dung thanh toán</label>
          <textarea v-model="orderInfo" class="form-control" id="orderInfo" rows="2"></textarea>
        </div>
        <div class="form-group">
          <label for="bankCode">Ngân hàng</label>
          <select v-model="bankCode" id="bankCode" class="form-control">
            <option value="">Không chọn</option>
            <option value="QRONLY">Thanh toan QRONLY</option>
            <option value="MBAPP">Ung dung MobileBanking</option>
            <option value="VNPAYQR">VNPAYQR</option>
            <option value="VNBANK">LOCAL BANK</option>
            <option value="IB">INTERNET BANKING</option>
            <option value="ATM">ATM CARD</option>
            <option value="INTCARD">INTERNATIONAL CARD</option>
            <option value="VISA">VISA</option>
            <option value="MASTERCARD"> MASTERCARD</option>
            <option value="JCB">JCB</option>
            <option value="UPI">UPI</option>
            <option value="VIB">VIB</option>
            <option value="VIETCAPITALBANK">VIETCAPITALBANK</option>
            <option value="SCB">Ngan hang SCB</option>
            <option value="NCB">Ngan hang NCB</option>
            <option value="SACOMBANK">Ngan hang SacomBank</option>
            <option value="EXIMBANK">Ngan hang EximBank</option>
            <option value="MSBANK">Ngan hang MSBANK</option>
            <option value="NAMABANK">Ngan hang NamABank</option>
            <option value="VNMART"> Vi dien tu VnMart</option>
            <option value="VIETINBANK">Ngan hang Vietinbank</option>
            <option value="VIETCOMBANK">Ngan hang VCB</option>
            <option value="HDBANK">Ngan hang HDBank</option>
            <option value="DONGABANK">Ngan hang Dong A</option>
            <option value="TPBANK">Ngân hàng TPBank</option>
            <option value="OJB">Ngân hàng OceanBank</option>
            <option value="BIDV">Ngân hàng BIDV</option>
            <option value="TECHCOMBANK">Ngân hàng Techcombank</option>
            <option value="VPBANK">Ngan hang VPBank</option>
            <option value="AGRIBANK">Ngan hang Agribank</option>
            <option value="MBBANK">Ngan hang MBBank</option>
            <option value="ACB">Ngan hang ACB</option>
            <option value="OCB">Ngan hang OCB</option>
            <option value="IVB">Ngan hang IVB</option>
            <option value="SHB">Ngan hang SHB</option>
            <option value="APPLEPAY">Apple Pay</option>
            <option value="GOOGLEPAY">Google Pay</option>
          </select>
        </div>
        <div class="form-group">
          <label for="language">Ngôn ngữ</label>
          <select v-model="language" id="language" class="form-control">
            <option value="vn">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Thanh toán Redirect</button>
      </form>
    </div>
    <!-- <footer class="footer">
      <p>&copy; VNPAY 2024</p>
    </footer> -->
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
// // Import Vue và VueToasted
// import Vue from 'vue';
// import Toasted from 'vue-toasted';

// // Sử dụng VueToasted với Vue
// Vue.use(Toasted);
export default {
  data() {
    return {
      ordertype: 'billpayment',
      amount: '',
       orderInfo: 'Thanh toan don hang thoi gian: ' + new Date().toLocaleString(),
      // orderInfo:'',
      bankCode: '',
      language: 'vn',
    };
  },
  computed: {
    ...mapGetters(["totalPay","orderSelected"])
  },
  methods: {
    async createPayment() {
      const paymentRequest = {
        orderId: this.orderSelected.orderProductId, // Replace with actual order ID
        orderInfo: this.orderInfo,
        amount: this.amount,
        bankCode: this.bankCode,
        ipAddress: '127.0.0.1' // Hoặc có thể bỏ đi nếu không cần
      };
      // kiểm tra số tiền thanh toán có khác so với số tổng tiền không
      // if(this.amount!==this.formatCurrency(this.totalPay)){
      //      // Hiển thị thông báo thành công
      // this.$toasted.show('Vui lòng kiểm tra lại số tiền thanh toán với tổng tiền đơn hàng !', {
      //   duration: 3000, // Thời gian hiển thị thông báo (ms)
      //   position: 'top-center', // Vị trí hiển thị
      //   type: 'error' // Kiểu thông báo (success, info, error)
      // });
      // return ;
      //}
      console.log(paymentRequest);
      try {
        const response = await axios.post('https://localhost:7159/api/Payment/create_payment', paymentRequest);
        console.log(response);
       const paymentUrl = response.data.paymentUrl;
       window.location.href = paymentUrl; // Chuyển hướng đến trang thanh toán VNPay
      } catch (error) {
        console.error('Error creating payment:', error);
      }
    },
    
  },
};
</script>

<style scoped>
.footer {
  padding: 1rem 0;
  text-align: center;
  border-top: 1px solid #e5e5e5;
  margin-top: 2rem;
}
</style>
