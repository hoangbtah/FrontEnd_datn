<template >
    <div>
    <!-- Cart Start -->
    <div class="container-fluid pt-5">
        <!-- <div class="row px-xl-5"> -->
            <!-- <div class="col-lg-8 table-responsive mb-5"> -->
                <table class="table table-bordered text-center mb-0">
                    <thead class="bg-secondary text-dark">
                        <tr>
                               <th>STT</th>
                                <!-- <th class="m-position">NGƯỜI ĐẶT HÀNG</th> -->
                                <th class="m-position">NGƯỜI NHẬN</th>
                                <th class="m-gender">NGÀY ĐẶT</th>
                                <th class="m-department-name">ĐỊA CHỈ</th>
                                <th class="m-account">SỐ ĐT</th>
                                <th class="m-position">TRẠNG THÁI TT</th>
                                <!-- <th class="m-position">HÌNH THỨC TT</th> -->
                                <!-- <th class="m-position">TÌNH TRẠNG</th> -->
                                <th class="m-position">TOTAL</th>
                                <th class="m-option">CHỨC NĂNG</th> 
                            </tr>       
                           </thead>     
                           <tbody>
                               <tr v-for="(order,index) in orderUser" :key="order.OrderProductId">
                                   <td>{{ index+1 }}</td>
                                   <!-- <td>{{ order.Name }}</td> -->
                                   <td>{{ order.Receiver }}</td>
                                   <td>{{ formatDate(order.OrderDate) }}</td>
                                   <td>{{ order.OrderAddress }}</td>
                                   <td>{{ order.Phone }}</td>
                                   <td v-if="order.StatusPayment===0">Chưa thanh toán</td>
                                   <td v-if="order.StatusPayment===1">Đã thanh toán</td>
                                   <!-- <td v-if="order.Payment===0">Offline</td>
                                   <td v-if="order.Payment===1">Online</td> -->
                                   <!-- <td v-if="order.Status===0">Chưa xử lý</td>
                                   <td v-if="order.Status===1">Đã xử lý</td> -->
                                   <td>{{ formatCurrency(order.OrderTotal) }}</td>
                                   <td>
                                      <div class="m-option">
                                       <button v-if="order.StatusPayment===0" class="m-btn-option m-btn-pay btn-info" @click="btnPay(order)">Thanh toán</button>
                                        <button v-if="order.Status!==2" class="m-btn-option m-btn-de btn-warning"  @click="btnCancelOrder(order)">Hủy</button>
                                      
                                      <button v-if="order.Status===2" class="m-btn-option m-btn-de btn-success"  >Đã hủy</button>
                                      </div>
                                   </td>
                               </tr>
                           </tbody>
                </table>
            <!-- </div> -->
        
        <!-- </div> -->
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
  name: "OrderUser",
  created() {
     this.getOrderByUserId(this.auth.user.userId);
  },
  computed: {
    ...mapGetters(["auth", "carts","voucherOfUser","underCount",'orderUser',"orderTotal"]),
    
  },
  methods: {
    ...mapActions(["getOrderByUserId",'getOrder']),
       // định dạng ngày date
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
    async btnPay(order){
        console.log(order.OrderProductId);
        console.log("số tiền ",order.OrderTotal);
      await this.$store.commit("SET_ORDERTOTAL",order.OrderTotal);
       await this.getOrder(order.OrderProductId);
       await this.$router.push('/payment');      
    },
    // hủy đơn hàng
    //1 cập nhật lại trạng thái đơn hàng
    async btnCancelOrder(order){
      const formData={
      orderProductId:order.OrderProductId,
      userId:order.UserId,
      orderDate:order.OrderDate,
      deliveryDate:order.OrderDate,
      status:2,
      receiver:order.Receiver,
      phone:order.Phone,
      orderAddress:order.OrderAddress,
      orderTotal:order.OrderTotal,
      statusPayment:order.StatusPayment,
      payment:order.Payment
    }
    try{
    await axios.put(`https://localhost:7159/api/Order/${order.OrderProductId}`,formData);
      console.log("đon hàng sửa",formData);
      this.$toasted.show('Hủy đơn hàng thành công !', {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'success' // Kiểu thông báo (success, info, error)

        });
        // gọi lại dữ liệu 
        this.getOrderByUserId(this.auth.user.userId);
    }
    catch(error){
          // Hiển thị thông báo thành công
          this.$toasted.show('Cập nhật thất bại !', {
        duration: 2000, // Thời gian hiển thị thông báo (ms)
        position: 'top-center', // Vị trí hiển thị
        type: 'error' // Kiểu thông báo (success, info, error)

        });
    }
    // 2lấy chi tiết của đơn hàng muốn hủy
    try{
     const orderDetails= await axios.get(`https://localhost:7159/api/OrderDetail/getorderDetail/${order.OrderProductId}`);
     // const orderDetails= respone.data;
      for( const orderDetail of  orderDetails.data){
         ///3 sau khi hủy đơn hàng thành công cập nhật lại số lượng trong database
          //lấy sản phẩm đó trong database;
          const respone = await axios.get(`https://localhost:7159/api/v1/Product/product/${orderDetail.ProductId}`)
          console.log(" sản phẩm cần cập nhật",respone.data);


           const updateProduct = {
            // orderId: orderProductId,
            productId: orderDetail.ProductId,
            productName:orderDetail.ProductName,
            quantity: respone.data.Quantity+ orderDetail.Quantity,
            price: respone.data.Price,
            image: orderDetail.Image,
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
              `https://localhost:7159/api/v1/Product/${updateProduct.productId}`,updateProduct);
            //   {
            //     headers: {
            //       Authorization: `Bearer ${token}` // Gửi token qua header Authorization
            //     }
            //   }
            // );
            console.log("cập nhật thành công:");
          } catch (error) {
            console.error("Lỗi khi cập nhật:",
              error.response ? error.response.data : error.message
            );
            // Xử lý lỗi tại đây nếu cần thiết

          
        }
      }

    }
    catch(error){
      console.log("Có lỗi xảy ra khi lấy chi tiết đơn hàng muốn hủy");
    }
      
    }
   
  },
 
  data() {
    return {
    };
  }
};
</script>
<style>
.m-btn-pay{
    width:100px;
}
</style>