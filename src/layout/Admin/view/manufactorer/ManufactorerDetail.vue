<template>
  <div class="m-dialog" v-if="isShowManufactorer">              
             <div class="m-dialog-content">
                 <div class="m-dialog-header">
                     <div class="m-dialog-title">
                         Thông tin thương hiệu
                     </div>
                     <button id="dialog-close" class="m-dialog-close m-icon-cancel">
                             
                     </button>
                 </div>
                 <div class="m-dialog-body">
                     <div class="m-row-1">
                        <div class="m-row-1-left">
                       
                         <div class="m-dialog-employee-name">
                            
                         </div>
                        </div>
                        <div class="m-row-1-right">
                        
                        
                        </div>
                     </div>
                     <div class="m-row-3">
                         <div class="m-dialog-chuc-danh">
                             <div><label for="">Tên thương hiệu</label></div>
                             <div> 
                              <input class="m-input loaddel"  type="text" v-model="manufactorer.manufactorerName">
                    
                          </div>
                         </div>
                        
                     </div>
                     <div></div>
                   
                    
                    
                 </div>
                 <div class="m-dialog-footer">
                    <div class="m-dialog-footer-left"> <button id="m-btn-add-cancle" class="m-btn m-btn-nocolor" @click="btnClose">Hủy</button></div>
                     <div class="m-dialog-footer-right">
                         <button id="btnSave" class="m-btn " @click="btnSave(manufactorer)">Cất</button>
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
name: "ManufactorerDetail",
components: {},
created() {
  // this.getCatagorys();
},
computed: {
  ...mapGetters(["isShowManufactorer","manufactorer"]),
 
},
methods: {
  ...mapActions([ ]),
  btnClose() {
    this.$store.commit("TOGGLE_ISSHOWMANUFACTORER");
  },
      
  async btnSave(manufactorer) {
    const dataManufactorer = {
      manufactorerId:manufactorer.manufactorerId,
      manufactorerName:manufactorer.manufactorerName
    };
    console.log("dữ liệu thêm hoặc sửa",dataManufactorer);
    console.log("trang thái hiện tại",this.forCatagory);
   
  
    if (this.forMode == 1) {
      
        await axios.post(
        `https://localhost:7159/api/v1/Manufactorer`,
        dataManufactorer
      );
      // Hiển thị thông báo thành công
      this.$toasted.show("Thêm thành công!", {
        duration: 4000, // Thời gian hiển thị thông báo (ms)
        position: "top-center", // Vị trí hiển thị
        type: "success" // Kiểu thông báo (success, info, error)
      });

      // ẩn form đi
      this.$store.commit("TOGGLE_ISSHOWMANUFACTORER");
      //loading lại dữ liệu
      this.$store.commit("SET_MANUFACTORER",dataManufactorer);
     
    } 
    else {
      
        await axios.put(
        `https://localhost:7159/api/v1/Manufactorer/${dataManufactorer.manufactorerId}`,
        dataManufactorer
      );
      // Hiển thị thông báo thành công
      this.$toasted.show("Sửa thành công!", {
        duration: 4000, // Thời gian hiển thị thông báo (ms)
        position: "top-right", // Vị trí hiển thị
        type: "success" // Kiểu thông báo (success, info, error)
      });

     
      // ẩn form đi
      this.$store.commit("TOGGLE_ISSHOWMANUFACTORER");
      //gán lại product để nhận biêt sự thay đôi trong watch và gọi lại 
       this.$store.commit("SET_MANUFACTORER",dataManufactorer);
  
      }    
  }
},
props: ["forMode"],
data() {
  return {
   
  };
}
};
</script>
<style scoped>
@import url("../../../../assets_ad/css_ad/component/dialog.css");
</style>