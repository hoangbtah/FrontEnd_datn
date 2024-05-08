<template>
       <!-- dialog thêm mới 1 nhân viên -->
       <div id="" class="m-dialog" v-if="auth.isShowEmployeeDetail">
                
                <div class="m-dialog-content">
                    <div class="m-dialog-header">
                        <div class="m-dialog-title">
                            Thông tin người dùng
                        </div>
                    </div>
                    <div class="m-dialog-body">
                        <div class="m-row-1">
                           <div class="m-row-1-left">
                            <div class="m-dialog-employname">
                                <div><label for="">Họ và tên</label><i class="required">*</i></div>
                                <div><input class="m-input" type="input" required v-model="name"></div>
                            </div>
                           
                           </div>
                           <div class="m-row-1-right">
                            <div class="m-dialog-employee-password">
                                <div><label for="">Mật khẩu</label><i class="required">*</i></div>
                                <div><input class="m-input"  type="input" v-model="password"></div>
                            </div>
                           
                           </div>
                        </div>
                        <div class="m-row-2">
                            <div class="m-row-1-left">
                            <div class="m-dialog-employee-email">
                                <div><label for="">Email</label><i class="required">*</i></div>
                                <div><input class="m-input" type="input" required v-model="email"></div>
                            </div>
                           
                           </div>
                           <div class="m-row-1-right">
                            <div class="m-dialog-employee-phonenumber">
                                <div><label for="">Số điện thoại</label><i class="required">*</i></div>
                                <div><input class="m-input"  type="input" v-model="phoneNumber"></div>
                            </div>
                           
                           </div>
                           
                        </div>
                        <div class="m-row-2">
                            <div class="m-row-1-left">
                            <div class="m-dialog-employee-address" >
                                <div><label for="">Địa chỉ</label></div>
                                <div style="padding-top:8px"><input class="m-input" type="input" v-model="address"></div>
                            </div>
                           
                           </div>
                           <div class="m-row-1-right">
                            <div class="m-dialog-role" >
                                <div><label for=""><label for="role">Vai trò:</label></label></div>
                                <div class="m-row">
                                    <select v-model="role" class="m-role">
                                    <option value="Admin">Quản trị viên</option>
                                    <option value="Sales">Nhân viên bán hàng</option>
                                    </select>
                                </div>
                            </div>
                           </div>
                        </div>
                        <div class="m-row-4">
                            
                        </div>
                       
                    </div>
                    <div class="m-dialog-footer">
                       <div class="m-dialog-footer-left"> <button id="m-btn-add-cancle" class="m-btn m-btn-nocolor" @click="btnClose()">Hủy</button></div>
                        <div class="m-dialog-footer-right">
                            <button id="btnSave" class="m-btn m-btn-nocolor m-btn-cat" @click="btnSave()">Cất</button>
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
  name: "EmployeeDetail",
  components: {},
  created() {
    // this.getCatagorys();
  },
  computed: {
    ...mapGetters(["auth"])
  },
  methods: {
    ...mapActions(["getUsers"]),
    btnClose() {
      this.$store.commit("TOGGLE_ISSHOW_EMPLOYEE_DETAIL");
    },
    async btnSave() {
      const formData = {
        name: this.name,
        password: this.password,
        email: this.email,
        role: this.role,
        phoneNumber: this.phoneNumber,
        address: this.address
      };
      console.log("thêm mới user", formData);
      //validate dữ liệu thêm mới
      if (!formData.name || !formData.password || !formData.email || !formData.phoneNumber) {
           // Hiển thị thông báo thành công
        this.$toasted.show("Thông tin tên đăng nhập, mật khẩu, số điện thoại và email không được để trống!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "error" // Kiểu thông báo (success, info, error)
        });
        return ;
      }

      try {
        // Gọi API đăng ký bằng Axios
        const respone = await axios.post(
          "https://localhost:7159/api/Auth/register",
          formData
        );
        // .then(response => {
        console.log("Đăng ký thành công!");
        // Xử lý phản hồi từ server nếu cần
        // this.registrationSuccess=true;
        console.log(respone.data);
        // Hiển thị thông báo thành công
        this.$toasted.show("Thêm mới tài khoản thành công!", {
          duration: 2000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });
        // ần form đi
      this.$store.commit("TOGGLE_ISSHOW_EMPLOYEE_DETAIL");
      // cập nhập lại danh sách
      // this.$store.commit("SET_USERS",formData);
      this.getUsers();
      } catch (error) {
        console.error(error);
        console.error("Đăng ký thất bại:", error.response.data);
        this.registrationError = "Tên đăng nhập hoặc mật khẩu không hợp lệ.";
      }
    }
  },
  props: ["forMode"],
  data() {
    return {
      name: "",
      password: "",
      role: "",
      email: "",
      address: "",
      phoneNumber: ""
      // registrationSuccess: false,
      // registrationError: '',
      // isEmployee: false,
    };
  }
};
</script>
<style>
.m-dialog-body .m-row-1-left .m-input {
  width: 352px;
}
.m-dialog-body .m-row-1-right .m-input {
  width: 250px;
}
.m-role {
  width: 250px;
  margin-bottom: 16px;
}
@import url("../../../../assets_ad/css_ad/component/dialog.css");
</style>