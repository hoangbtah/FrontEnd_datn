<template>
    <div id="dialogadd" class="m-dialog" v-if="isShow">              
               <div class="m-dialog-content">
                   <div class="m-dialog-header">
                       <div class="m-dialog-title">
                           Thông tin sản phẩm
                       </div>
                       <button id="dialog-close" class="m-dialog-close m-icon-cancel">
                               
                       </button>
                   </div>
                   <div class="m-dialog-body">
                       <div class="m-row-1">
                          <div class="m-row-1-left">
                           <div class="m-dialog-employcode">
                               <div><label for="">Tên sản phẩm</label><i class="required">*</i></div>
                               <div><input class="m-input" id="txtEmployeeCode" type="input" required v-model="product.ProductName"></div>
                           </div>
                           <div class="m-dialog-employee-name">
                               <!-- <div><label for="">Tên<i class="required">*</i></label></div>
                               <div><input id="txtEmployeeName" class="m-input loaddel"  type="input" required v-model="employee.employeeName"></div> -->
                           </div>
                          </div>
                          <div class="m-row-1-right">
                           <div class="m-dialog-employee-dob">
                               <div><label for="">Số lượng</label></div>
                               <div><input class="m-input"  type="text"   v-model="product.Quantity"></div>
                           </div>
                           <div class="m-dialog-employee-dob">
                               <div><label for="">Đơn giá</label></div>
                               <div><input class="m-input"  type="text"   v-model="product.Price"></div>
                           </div>
                           <div class="m-dialog-employee-dob">
                               <div><label for="">Size</label></div>
                               <div><input class="m-input"  type="text" style="width:50px"  v-model="product.ProductSize"></div>
                           </div>
                          
                          </div>
                       </div>
                       <div class="m-row-2">
                           <div class="m-dialog-donvi">
                               <div><label for="">Danh mục <i class="required">*</i></label></div>
                               <div>
                                <select v-model="product.CatagoryId">
                                      <option value="" disabled selected>Select an option</option>
                                      <option v-for="catagory in catagorys" :key="catagory.catagoryId" :value="catagory.catagoryId"> 
                                        {{ catagory.catagoryName }}
                                      </option>
                                    </select>
                           </div>
                           </div>
                           <div class="m-dialog-donvi">
                               <div><label for="">Hãng sản xuất <i class="required">*</i></label></div>
                               <div>
                               <select v-model="product.ManufactorerId">
                                      <option value="" disabled selected>Select an option</option>
                                      <option v-for="manufactorer in manufactorers" :key="manufactorer.manufactorerId" :value="manufactorer.manufactorerId">
                                        {{ manufactorer.manufactorerName }}
                                      </option>
                                    </select>
                              </div>
                           </div>
                          
                       </div>
                       <div class="m-row-3">
                           <div class="m-dialog-chuc-danh">
                               <div><label for="">Mô tả</label></div>
                               <div> 
                                 <textarea id="comment" name="comment" style="width: 352px; height: 150px;"  v-model="product.Description">
                                 </textarea>
                       <!-- <img class="" style="width:80px;height:80px" :src="product.image" alt=""> -->
                       </div>
                           </div>
                           <div class="m-dialog-noi-cap">
                               <div><label for="">Hình ảnh</label></div>
                               <div><input class="m-input loaddel"  type="text" id="txtIdentityPlace" v-model="product.Image">
                                <img class="" style="width:100px;height:100px" :src="product.Image" alt="">
                          
                               </div>
                           </div>
                          
                       </div>
                       <!-- <textarea id="comment" name="comment" style="width: 300px; height: 100px;"  v-model="product.description"></textarea>
                       <img class="" style="width:80px;height:80px" :src="product.image" alt=""> -->
                      
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
  name: "ProductDetailAD",
  components: {},
  created() {
    this.getManufactorers();
    this.getCatagorys();
  },
  computed: {
    ...mapGetters([
      "product",
      "comments",
      "products",
      "isShow",
      "manufactorers",
      "catagorys"
    ])
  },
  methods: {
    ...mapActions(["getProduct", "getManufactorers", "getCatagorys","getProducts"]),
    btnClose() {
      this.$store.commit("TOGGLE_ISSHOW");
    },
    async btnSave(product) {
      // var me=this;
      const dataProduct = {
        productId: product.ProductId,
        productName: product.ProductName,
        quantity: product.Quantity,
        price: product.Price,
        image: product.Image,
        catagoryId: product.CatagoryId,
        manufactorerId: product.ManufactorerId,
        description: product.Description,
        productSize:product.ProductSize
      };
      console.log("dữ liệu thêm hoặc sửa ", dataProduct);
      //1.validate dữ liệu
      //2. build object thông tin nhân viên
      //3. gọi api thực hiện thêm mới
      //3.1 kiểm tra trạng thaasi thêm mới hay sửa
      if (this.forMode == 1) {
        await axios.post(
          `https://localhost:7159/api/v1/Product`,
          dataProduct
        );

        // Hiển thị thông báo thành công
        this.$toasted.show("Thêm thành công!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });

        // console.log(this.product);
        // ẩn form đi
        this.$store.commit("TOGGLE_ISSHOW");
        //loading lại dữ liệu
        this.$store.commit("ADD_PRODUCT",dataProduct);
      } else {
        await axios.put(
          `https://localhost:7159/api/v1/Product/${dataProduct.productId}`,
          dataProduct
        );

        // axios.post("https://localhost:7159/api/v1/Employees/",me.employee)
        // .then(function(){

        // Hiển thị thông báo thành công
        this.$toasted.show("Sửa thành công!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });

        // ẩn form đi
        this.$store.commit("TOGGLE_ISSHOW");
      this.$store.commit("SET_PRODUCT",dataProduct);
     

      }
      // nếu thêm mới thành công thì hiển thị toast thêm mới thành công
      // nếu có lỗi validate hoặc lỗi từ back-end thì hiển thị thông báo tương ứng
    }
  },
  props: ["forMode"],
  watch: {
    employeeSelected: function(value) {
      //this.employee=value;
      console.log(value);
    },
    employeeSelectedId: function(value) {
      // alert(value);
      console.log(value);
      var me = this;
      if (value) {
        //gọi api lấy dữ liệu
        // hiển thị loading dữ liệu
        axios
          .get(
            `https://localhost:7159/api/v1/Employees/${this.employeeSelectedId}`
          )
          .then(function(response) {
            switch (response.status) {
              case 200:
                me.employee = response.data;
                break;
              case 201:
                break;
              default:
            }
            console.log(response);
          })
          .catch(function(response) {
            switch (response.status) {
              case 400:
                break;
              case 404:
                break;
              default:
            }
            console.log(response);
            // ẩn loading dữ liệu
          });
      } else {
        //reset lại thông tin nhân viên
        me.employee = {};
        // focus vào ô nhập liệu đầu tiên
        //gọi api lấy mã nhân viên mới
        //axios.get("").then
      }
    }
  },
  data() {
    return {
      // isShow:false
      //không dùng data để hứng được mà phải dùng pros để hứng.
      employee: {},
    };
  }
};
</script>
<style scoped>
@import url("../../../../assets_ad/css_ad/component/dialog.css");
</style>