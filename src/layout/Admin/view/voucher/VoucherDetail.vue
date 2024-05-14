<template>
    <div id="dialogadd" class="m-dialog" v-if="isShowVoucher">              
               <div class="m-dialog-content">
                   <div class="m-dialog-header">
                       <div class="m-dialog-title">
                           Thông tin Voucher<h6>(nếu Voucher áp dụng cho tất cả đơn hàng thì không cần nhập khoảng giá)</h6>
                       </div>
                       <button id="dialog-close" class="m-dialog-close m-icon-cancel">
                               
                       </button>
                   </div>
                   <div class="m-dialog-body">
                       <div class="m-row-1">
                          <div class="m-row-1-left">
                           <div class="m-dialog-employcode">
                               <div><label for="">Mã Voucher</label></div>
                               <div style="width:332px"><label>{{ voucher.voucherCode }}</label></div>
                           </div>
                           <div class="m-dialog-employee-name">
                           </div>
                          </div>
                          <div class="m-row-1-right">
                           
                           <div class="m-dialog-employee-dob">
                               <div><label for="">Khoảng đầu giá</label></div>
                               <div>
                                <input class="m-input"  type="text" v-model="voucher.startPrice">
                                </div>
                           </div>
                           <div class="m-dialog-employee-dob">
                               <div><label for="">Khoảng cuối giá</label></div>
                               <div>
                                <input class="m-input"  type="text" v-model="voucher.endPrice">
                              </div>
                           </div>
                          </div>
                       </div>
                       <div class="m-row-1">
                        <div class="m-row-1-left">
                        <div class="m-dialog-donvi">
                               <div><label for="">Ngày bắt đầu <i class="required">*</i></label></div>
                               <div><input class="m-input"  type="date"  v-model ="startDate"></div>
                           </div>
                        </div>
                        <div class="m-row-1-right">
                           <div class="m-dialog-donvi">
                               <div><label for="">Ngày kết thúc <i class="required">*</i></label></div>
                               <div><input class="m-input"  type="date" v-model="endDate" ></div>
                           </div>
                         </div> 
                       </div>
                       <div class="m-row-3">
                           <div class="m-dialog-chuc-danh">
                               <div><label for="">Mô tả Voucher <i class="required">*</i></label></div>
                               <div> 
                                 <textarea  name="comment" style="width: 352px; height: 150px;" v-model="voucher.decriptionUse">
                                 </textarea>
                       </div>
                           </div>
                           <div class="m-voucher">
                               <div><label for="">Phần trăm khuyến mãi </label></div>
                               <div><input class="m-input"  type="text" style="width:200px" v-model="voucher.percentVoucher">
                               </div>
                               <div><label for="">Số tiền giảm </label></div>
                               <div><input class="m-input"  type="text" style="width:200px" v-model="voucher.discountMoney">
                               </div>
                           </div>
                          
                       </div>
                    
                   </div>
                   <div class="m-dialog-footer">
                      <div class="m-dialog-footer-left"> <button id="m-btn-add-cancle" class="m-btn m-btn-nocolor" @click="btnClose">Hủy</button></div>
                       <div class="m-dialog-footer-right">
                           <button id="btnSave" class="m-btn " @click="btnSave(voucher)">Cất</button>
                           <!-- <button id="btnSaveAndAdd" class="m-btn">Cất và thêm</button> -->
                       </div>
                   </div>
               </div>
               <div class="custom-loading" v-if="isLoading">
  <div class="spinner"></div>
  </div>
       </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
// Import Vue và VueToasted
import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);

export default {
  name: "ProductDetailAD",
  components: {},
  created() {
    // cẩn thận khi loading lại
    this.formatDiscountDate();
  },
  computed: {
    ...mapGetters([
      "isShowVoucher","voucher"
    ])
  },
  methods: {
    ...mapActions(["getVoucher"]),
    btnClose() {
        // hide form 
      this.$store.commit("TOGGLE_ISSHOWVOUCHER");
    },
    async btnSave(voucher) {
      this.isLoading=true;
      // var me=this;
      const dataVoucher = {
        voucherId:voucher.voucherId,
        voucherCode:voucher.voucherCode,
        startDateVoucher:this.convertToDateTime(this.startDate),
        endDateVoucher:this.convertToDateTime(this.endDate),
        decriptionUse:voucher.decriptionUse,
        maxximumUse:voucher.maxximumUse,
        startPrice:voucher.startPrice,
        endPrice:voucher.endPrice,
        percentVoucher:voucher.percentVoucher,
        discountMoney:voucher.discountMoney
      };
      console.log("dữ liệu thêm hoặc sửa ", dataVoucher);
      //1.validate dữ liệu
         // Kiểm tra nếu startDate là ngày sau endDate
         if (dataVoucher.startDateVoucher > dataVoucher.endDateVoucher) {
        this.$toasted.show("Ngày bắt đầu không được lớn hơn ngày kết thúc !", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        return ;
      }
      // //kiểm tra khoảng giá 
      // if (dataVoucher.startPrice > dataVoucher.endPrice) {
      //   this.$toasted.show("Khoảng giá đầu không thể lớn hơn khoảng giá sau !", {
      //     duration: 2000, // Thời gian hiển thị thông báo (ms)
      //     position: "top-right", // Vị trí hiển thị
      //     type: "error" // Kiểu thông báo (success, info, error)
      //   });
      //   return ;
      // }
        // Kiểm tra nếu startDate là ngày sau endDate
        if (!dataVoucher.startDateVoucher || !dataVoucher.endDateVoucher) {
        this.$toasted.show("Ngày bắt đầu và ngày kết thúc không được để trống !", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        return ;
      }
      if (!dataVoucher.decriptionUse) {
           // Hiển thị thông báo thành công
        this.$toasted.show("Mô tả voucher không được để trống!", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        return ;
      }
      //2. build object thông tin nhân viên
      //3. gọi api thực hiện thêm mới
      //3.1 kiểm tra trạng thaasi thêm mới hay sửa
      if (this.forMode == 1) {
      await axios.post(
          `https://localhost:7159/api/Voucher/createVoucher`,
          dataVoucher
        );
        // Hiển thị thông báo thành công
        this.$toasted.show("Thêm thành công!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });
        //gửi thông báo khi thêm voucher
        this.$store.commit("ADD_VOUCHER");
        // ẩn form đi
        this.$store.commit("TOGGLE_ISSHOWVOUCHER");
        //loading lại dữ liệu
      this.$store.commit("SET_VOUCHER",dataVoucher);
      } else {
        await axios.put(
          `https://localhost:7159/api/Voucher/${dataVoucher.voucherId}`,
          dataVoucher
        );
        // Hiển thị thông báo thành công
        this.$toasted.show("Sửa thành công!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });

        // ẩn form đi
        this.$store.commit("TOGGLE_ISSHOWVOUCHER");
      this.$store.commit("SET_VOUCHER",dataVoucher);

      }
      this.isLoading=false;

      // nếu thêm mới thành công thì hiển thị toast thêm mới thành công
      // nếu có lỗi validate hoặc lỗi từ back-end thì hiển thị thông báo tương ứng
    },
     // định dạng lại kiểu ngày tháng
     formatDiscountDate(){
      this.startDate=this.formatDate(this.voucher.startDateVoucher);
      this.endDate=this.formatDate(this.voucher.endDateVoucher);
    },
     // định dạng ngày datetime
     convertToDateTime(date) {
  // Kiểm tra xem date có tồn tại không
  if (date) {
    // Tạo một đối tượng Date từ chuỗi ngày
    const dateTime = new Date(date);
    // Chuyển đổi thành ngày giờ và trả về
    return dateTime.toISOString();
  } else {
    return null;
  }},
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
            dob= `${year}-${month}-${date}`;
        }
        else{
            dob = "";
        }
        return dob;
    },
  },
  props: ["forMode"],
  data() {
    return {
        startDate:'',
        endDate:'',
        isLoading:false
    };
  }
};
</script>
<style scoped>
.custom-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-left-color: #d55e5e;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}
@import url("../../../../assets_ad/css_ad/component/dialog.css");
</style>