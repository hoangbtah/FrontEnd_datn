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
                               <div><input class="m-input" id="txtEmployeeCode" type="input" required v-model="product.productName"></div>
                           </div>
                           <div class="m-dialog-employee-name">
                               <!-- <div><label for="">Tên<i class="required">*</i></label></div>
                               <div><input id="txtEmployeeName" class="m-input loaddel"  type="input" required v-model="employee.employeeName"></div> -->
                           </div>
                          </div>
                          <div class="m-row-1-right">
                           <div class="m-dialog-employee-dob">
                               <div><label for="">Số lượng</label></div>
                               <div><input class="m-input"  type="text" id="txtDateOfBrith"  v-model="product.quantity"></div>
                           </div>
                           <div class="m-dialog-employee-dob">
                               <div><label for="">Đơn giá</label></div>
                               <div><input class="m-input"  type="text" id="txtDateOfBrith"  v-model="product.price"></div>
                           </div>
                          
                          </div>
                       </div>
                       <div class="m-row-2">
                           <div class="m-dialog-donvi">
                               <div><label for="">Danh mục <i class="required">*</i></label></div>
                               <div>
                                <select v-model="product.catagoryId">
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
                               <select v-model="product.manufactorerId">
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
                                 <textarea id="comment" name="comment" style="width: 352px; height: 150px;"  v-model="product.description">
                                 </textarea>
                       <!-- <img class="" style="width:80px;height:80px" :src="product.image" alt=""> -->
                       </div>
                           </div>
                           <div class="m-dialog-noi-cap">
                               <div><label for="">Hình ảnh</label></div>
                               <div><input class="m-input loaddel"  type="text" id="txtIdentityPlace" v-model="product.image">
                                <img class="" style="width:100px;height:100px" :src="product.image" alt="">
                          
                               </div>
                           </div>
                          
                       </div>
                       <!-- <textarea id="comment" name="comment" style="width: 300px; height: 100px;"  v-model="product.description"></textarea>
                       <img class="" style="width:80px;height:80px" :src="product.image" alt=""> -->
                      
                   </div>
                   <div class="m-dialog-footer">
                      <div class="m-dialog-footer-left"> <button id="m-btn-add-cancle" class="m-btn m-btn-nocolor" @click="btnClose">Hủy</button></div>
                       <div class="m-dialog-footer-right">
                           <button id="btnSave" class="m-btn m-btn-nocolor m-btn-cat" @click="btnSave">Cất</button>
                           <button id="btnSaveAndAdd" class="m-btn">Cất và thêm</button>
                       </div>
                   </div>
               </div>
         
       </div>
</template>
<script>
import axios from "axios";
import { mapGetters,mapActions } from "vuex";
export default {
  name: "ProductDetailAD",
  components: {},
  computed: {
    ...mapGetters(["product", "comments", "products", "isShow","manufactorers","catagorys"])
  },
  methods: {
    ...mapActions(['getProduct','getManufactorers','getCatagorys']),
    btnClose() {
      this.$store.commit("TOGGLE_ISSHOW");
    },
    btnSave() {
      // var me=this;
      //1.validate dữ liệu
      //2. build object thông tin nhân viên
      //3. gọi api thực hiện thêm mới
      //3.1 kiểm tra trạng thaasi thêm mới hay sửa
      if (this.forMode == 1) {
        // axios.post("https://localhost:7159/api/v1/Employees/",me.employee)
        // .then(function(){
        alert("thêm thành công");
        console.log(this.product);
        // ẩn form đi
        //loading lại dữ liệu
        // })
        // .catch(function(){})
      } else {
        // axios.put(`https://localhost:7159/api/v1/Employees/${me.employeeSelectedId}`,me.employee)
        // .then(function(){
        alert("sửa thành công");
        console.log(this.product);
        // ẩn form đi
        //loading lại dữ liệu
        // })
        // .catch(function(){})
      }
      // nếu thêm mới thành công thì hiển thị toast thêm mới thành công
      // nếu có lỗi validate hoặc lỗi từ back-end thì hiển thị thông báo tương ứng
    }
  },
  props: ["isShow", "employeeSelected", "employeeSelectedId", "forMode"],
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
      employee: {}
    };
  }
};
</script>
<style scoped>
@import url("../../../../assets_ad/css_ad/component/dialog.css");
</style>