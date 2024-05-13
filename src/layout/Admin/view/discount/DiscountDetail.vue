<template>
    <div id="dialogadd" class="m-dialog" v-if="isShowDiscount">              
               <div class="m-dialog-content">
                   <div class="m-dialog-header">
                       <div class="m-dialog-title">
                           Thông tin giảm giá
                       </div>
                       <button id="dialog-close" class="m-dialog-close m-icon-cancel">
                               
                       </button>
                   </div>
                   <div class="m-dialog-body">
                       <div class="m-row-1">
                          <div class="m-row-1-left">
                           <!-- <div class="m-dialog-employcode">
                               <div><label for="">Tên sản phẩm</label></div>
                               <div><label>{{ product.ProductName }} </label></div>
                           </div> -->
                           <div class="m-dialog-employee-name">
                               <!-- <div><label for="">Tên<i class="required">*</i></label></div>
                               <div><input id="txtEmployeeName" class="m-input loaddel"  type="input" required v-model="employee.employeeName"></div> -->
                           </div>
                          </div>
                          <div class="m-row-1-right">
                           <!-- <div class="m-dialog-employee-dob">
                               <div><label for="">Số lượng</label></div>
                               <div>{{ product.Quantity }}</div>
                           </div> -->
                           <!-- <div class="m-dialog-employee-dob">
                               <div><label for="">Đơn giá</label></div>
                               <div>{{ formatCurrency(product.Price) }}</div>
                           </div> -->
                          
                          </div>
                       </div>
                       <div class="m-row-3">
                           <div class="m-dialog-chuc-danh">
                               <div><label for="">Phần trăm giảm giá</label></div>
                               <div> 
                                <input class="m-input loaddel"  type="text"  v-model="product.DiscountPercent">
                      
                            </div>
                           </div>
                          
                       </div>
                     
                       <div class="m-row-2">
                           <div class="m-dialog-donvi">
                               <div><label for="">Ngày bắt đầu  <i class="required">*</i></label></div>
                               <div>
                                <input class="m-input loaddel"  type="date"  v-model="startDate">
                               
                            </div>
                           </div>
                           <div class="m-dialog-donvi">
                               <div><label for="">Ngày kết thúc <i class="required">*</i></label></div>
                               <div>
                             
                                <input class="m-input loaddel"  type="date"  v-model="endDate">

                              </div>
                           </div>
                          
                       </div>
                       <!-- <div class="m-row-3">
                           <div class="m-dialog-chuc-danh">
                               <div><label for="">Phần trăm giảm giá</label></div>
                               <div> 
                                <input class="m-input loaddel"  type="text"  v-model="product.DiscountPercent">
                      
                            </div>
                           </div>
                          
                       </div>
                      -->
                      
                   </div>
                   <div class="m-dialog-footer">
                      <div class="m-dialog-footer-left"> <button id="m-btn-add-cancle" class="m-btn m-btn-nocolor" @click="btnClose">Hủy</button></div>
                       <div class="m-dialog-footer-right">
                           <button id="btnSave" class="m-btn " @click="btnSave(product)">Cất</button>
                           <!-- <button id="btnSaveAndAdd" class="m-btn">Cất và thêm</button> -->
                       </div>
                   </div>
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
  name: "DiscountDetail",
  components: {},
 
  watch:{
    product(){
    this.formatDiscountDate();
      
    }
  },
  created() {
    this.getManufactorers();
    this.getCatagorys();
    this.formatDiscountDate();
  },
  computed: {
    ...mapGetters([
      "product",    
      "products",
      "isShowDiscount",
      "manufactorers",
      "catagorys",
      "selectedProductId"
    ]),
   
  },
  methods: {
    ...mapActions(["getProduct", "getManufactorers", "getCatagorys","getProducts"]),
    btnClose() {
      this.$store.commit("TOGGLE_ISSHOWDISCOUNT");
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
  }
},
    formatDiscountDate(){
      console.log("StartDate",this.product.StartDate);
      this.startDate=this.formatDate(this.product.StartDate);
      this.endDate=this.formatDate(this.product.EndDate);
      console.log('startDate:', this.startDate);
      console.log('endDate:', this.endDate);
    },
   
   
    async btnSave(product) {
      console.log("trạng thái là ",this.forModeDiscount)
      // var me=this;
      const dataProduct = {
        productId: product.ProductId,
        startDate:this.convertToDateTime(this.startDate),
        endDate:this.convertToDateTime(this.endDate),
        discountPercent:product.DiscountPercent,
        discountId:product.DiscountId,
      };
      // kiểm tra xem ngày bắt đầu có nhỏ hơn ngày kết thúc không
      // Kiểm tra nếu startDate hoặc endDate là rỗng
      if (!dataProduct.startDate || !dataProduct.endDate ||!dataProduct.discountPercent) {
           // Hiển thị thông báo thành công
        this.$toasted.show("Ngày bắt đầu , ngày kết thúc,phần trăm giảm giá không được để trống!", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        return ;
      }

      // Kiểm tra nếu startDate là ngày sau endDate
      if (dataProduct.startDate >= dataProduct.endDate) {
        this.$toasted.show("Ngày bắt đầu không được lớn hơn ngày kết thúc !", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        return ;
      }
      if(dataProduct.startDate)
      console.log("dữ liệu thêm hoặc sửa ", dataProduct);
      //1.validate dữ liệu
      //2. build object thông tin nhân viên
      //3. gọi api thực hiện thêm mới
      //3.1 kiểm tra trạng thaasi thêm mới hay sửa
      if (this.forModeDiscount == 1) {
        console.log("mã sản phẩm ",this.selectedProductId);
        dataProduct.productId=this.selectedProductId;
        try{
          await axios.post(
          `https://localhost:7159/api/Discount`,
          dataProduct
        );
        // Hiển thị thông báo thành công
        this.$toasted.show("Thêm thành công!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });

        // ẩn form đi
        this.$store.commit("TOGGLE_ISSHOWDISCOUNT");
        //loading lại dữ liệu
        }
        catch(error){
          console.log("lỗi khi thêm mới");
        }
      } 
      else {
        try{
          await axios.put(
          `https://localhost:7159/api/Discount/${dataProduct.discountId}`,
          dataProduct
        );

      

        // Hiển thị thông báo thành công
        this.$toasted.show("Sửa thành công!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });

        // console.log(this.product);
        // ẩn form đi
        this.$store.commit("TOGGLE_ISSHOWDISCOUNT");
        this.getProducts
        //gán lại product để nhận biêt sự thay đôi trong watch và gọi lại 
         this.$store.commit("SET_PRODUCT",dataProduct);
      }
      catch(error){
        console.log("lỗi khi sửa")
      }
        }    
    }
  },
  props: ["forModeDiscount"],
  data() {
    return {
      startDate:'',
      endDate:''
    };
  }
};
</script>
<style scoped>
@import url("../../../../assets_ad/css_ad/component/dialog.css");
</style>