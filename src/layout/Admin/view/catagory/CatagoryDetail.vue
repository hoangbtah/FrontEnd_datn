<template>
    <div class="m-dialog" v-if="isShowCatagory">              
               <div class="m-dialog-content">
                   <div class="m-dialog-header">
                       <div class="m-dialog-title">
                           Thông tin danh mục
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
                               <div><label for="">Tên danh mục</label></div>
                               <div> 
                                <input class="m-input loaddel"  type="text" v-model="catagory.catagoryName">
                      
                            </div>
                           </div>
                          
                       </div>
                       <div class="m-row-4">
                            
                          </div>
                     
                      
                      
                   </div>
                   <div class="m-dialog-footer">
                      <div class="m-dialog-footer-left"> <button id="m-btn-add-cancle" class="m-btn m-btn-nocolor" @click="btnClose">Hủy</button></div>
                       <div class="m-dialog-footer-right">
                           <button id="btnSave" class="m-btn " @click="btnSave(catagory)">Cất</button>
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
  name: "CatagoryDetail",
  components: {},
  created() {
    // this.getCatagorys();
  },
  computed: {
    ...mapGetters(["isShowCatagory","catagorys","catagory"]),
   
  },
  methods: {
    ...mapActions([ ]),
    btnClose() {
      this.$store.commit("TOGGLE_ISSHOWCATAGORY");
    },
        
    async btnSave(catagory) {
      const dataCatagory = {
        catagoryId:catagory.catagoryId,
        catagoryName:catagory.catagoryName
      };
      console.log("dữ liệu thêm hoặc sửa",dataCatagory);
      console.log("trang thái hiện tại",this.forCatagory);
     
    
      if (this.forCatagory == 1) {
        
          await axios.post(
          `https://localhost:7159/api/v1/Catagory`,
          dataCatagory
        );
        // Hiển thị thông báo thành công
        this.$toasted.show("Thêm thành công!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-center", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });

        // ẩn form đi
        this.$store.commit("TOGGLE_ISSHOWCATAGORY");
        //loading lại dữ liệu
        this.$store.commit("ADD_CATAGORY",dataCatagory);
       
      } 
      else {
        
          await axios.put(
          `https://localhost:7159/api/v1/Catagory/${dataCatagory.catagoryId}`,
          dataCatagory
        );
        // Hiển thị thông báo thành công
        this.$toasted.show("Sửa thành công!", {
          duration: 4000, // Thời gian hiển thị thông báo (ms)
          position: "top-right", // Vị trí hiển thị
          type: "success" // Kiểu thông báo (success, info, error)
        });

       
        // ẩn form đi
        this.$store.commit("TOGGLE_ISSHOWCATAGORY");
        //gán lại product để nhận biêt sự thay đôi trong watch và gọi lại 
         this.$store.commit("SET_CATAGORY",dataCatagory);
    
        }    
    }
  },
  props: ["forCatagory"],
  data() {
    return {
     
    };
  }
};
</script>
<style scoped>
@import url("../../../../assets_ad/css_ad/component/dialog.css");
</style>