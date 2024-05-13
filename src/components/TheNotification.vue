<template >
    <div>
     <!-- Page Header Start -->
     <!-- <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Shopping Cart</h1>
            <div class="d-inline-flex">
                

            </div>
        </div>
    </div> -->
    <!-- Page Header End -->


    <!-- Cart Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <div class="col-lg-8 table-responsive mb-5">
                <table class="table table-bordered text-center mb-0">
                    <thead class="bg-secondary text-dark">
                        <tr>
                            <th>Thông báo</th>
                            <th>Mã giảm giá</th>
                            <!-- <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th> -->
                        </tr>
                    </thead>
                    <tbody class="align-middle">
                        <tr v-for="voucher in voucherOfUser" :key="voucher.UserVoucherId">
                            <td class="align-middle">Bạn nhận được Voucher giảm giá {{ voucher.PercentVoucher*100 }} % {{ voucher.DecriptionUse }} kể từ ngày {{ voucher.StartDateVouCher }} đến ngày {{ voucher.EndDateVoucher }} </td>
                            <td>{{ voucher.VoucherId }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
        </div>
    </div>
    <!-- Cart End -->
    </div>
</template>
<script>

import { mapActions, mapGetters } from "vuex";
// import axios from "axios";
// Import Vue và VueToasted
import Vue from 'vue';
import Toasted from 'vue-toasted';

// Sử dụng VueToasted với Vue
Vue.use(Toasted);
export default {
  name: "TheNotification",
  created() {
  },
  computed: {
    ...mapGetters(["auth", "carts","voucherOfUser"]),
    
  },
  methods: {
    ...mapActions(["getUser", "getCarts", "deleteCart", "updateCart"]),
   
  },
 
  data() {
    return {
    };
  }
};
</script>
<style lang="">
</style>