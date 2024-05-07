<template >   
    <!-- form xác nhận xóa -->
<div class="m-dialog" v-if="isShowDeleteManufactorer">
   <div class="m-dialog-confirm-del-content">
       <div class="m-dialog-confirm-del-header">
           <!-- <div class="m-icon-confirm-delete"></div> -->
           <div class="infor-warning"><label>Bạn có chắc muốn xóa thương hiệu này không ?</label></div>
       </div>
       <div class="m-dialog-confirm-del-btn">
           <div class="m-dialog-confirm-del-no">
               <button id="m-dialog-confirm-del-no" class="m-btn m-btn-nocolor" @click="hideIsShowDialog()">Không</button>
           </div>
           <div class="m-dialog-confirm-del-yes">
               <button id="m-dialog-confirm-del-yes" class="m-btn" @click="btnDelProductDiscount(manufactorer)">Có</button>
           </div>
       </div>
   </div>
</div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
// Import Vue và VueToasted
import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);
export default {
  name: "DialogDeleteManufactorer",
  created() {
  },
  computed: {
    ...mapGetters(["manufactorer", "isShowDeleteManufactorer"])
  },
  methods: {
    ...mapActions([]),
    // ẩn dialog xác nhận xóa
    hideIsShowDialog() {
      this.$store.commit("TOGGLE_ISSHOW_DELETE_MANUFACTORER");
    },
    async btnDelProductDiscount(manufactorer) {
      try {
        await axios.delete(
          `https://localhost:7159/api/v1/Manufactorer/${manufactorer.manufactorerId}`
        );
        // Hiển thị thông báo thành công
        this.$toasted.show("Xóa thành công!", {
          duration: 3000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });
        // ấn dialog đi
        this.$store.commit("TOGGLE_ISSHOW_DELETE_MANUFACTORER");
        this.$store.commit("DELETE_MANUFACTORER", manufactorer.manufactorerId);
      } catch (error) {
       
        // Hiển thị thông báo thành công
        this.$toasted.show(
          "Cảnh báo! Xóa thương này có thể ảnh hưởng đến những sản phẩm đang ở trong thương hiệu này, hãy chắc chăn rằng không có sản phẩm nào thuộc thương hiệu này",
          {
            duration: 5000, // Thời gian hiển thị thông báo (ms)
            position: "top-center", // Vị trí hiển thị
            type: "error" // Kiểu thông báo (success, info, error)
          }
        );
      }
    }
  }
};
</script>
<style>
@import url("../assets_ad/css_ad/component/dialog.css");
@import url("../assets_ad/css_ad/main.css");
</style>