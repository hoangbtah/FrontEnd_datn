<template >
     <div class="page-content">
            <div class="m-page-header">
                <div class="m-page-title">Sản phẩm</div>
                <div class="m-page-button">
                    <button id="btn-add" class="m-btn ">Thêm mới sản phẩm</button>
                </div>
            </div>
            <div class="m-page-toolbar">
                <div class="m-toolbar-left">
                    <input id="txtSearch" class="m-input m-btn-icon-right m-icon-search" placeholder="Tìm theo mã,tên" style="width: 200px;"/>
                </div>
                <div class="m-toolbar-right">
                    <button id="reload" class="m-icon-refresh"></button>
                </div>
            </div>
            <div class="m-page-grid">
                    <div class="m-grid">
                        <table id="tblEmployee" class="m-table">
                            <thead>
                             <tr>
                                <th><input type="checkbox" class="m-select-row"></th>
                                 <!-- <th class="m-employee-code"></th> -->
                                 <th class="m-employee-name">TÊN SẢN PHẨM</th>
                                 <th class="m-gender">GIÁ BÁN</th>
                                 <!-- <th class="m-dateOfbrith">MÔ TẢ</th> -->
                                 <th class="m-identityCode">SỐ LƯỢNG</th>
                                 <th class="m-position">LOẠI SẢN PHẨM</th>
                                 <th class="m-department-name">HÃNG SẢN XUẤT</th>
                                 <th class="m-account">HÌNH ẢNH</th>
                                 <th class="m-option">CHỨC NĂNG</th>
                             </tr>       
                            </thead>     
                            <tbody>
                                <tr v-for="productad in products" :key="productad.ProductId">
                                    <td><input type="checkbox" class="m-select-row"></td>
                                    <td>{{ productad.ProductName }}</td>
                                    <td>{{ productad.Price }}</td>
                                    <td>{{ productad.Quantity }}</td>
                                    <td>{{ productad.CatagoryName }}</td>
                                    <td>{{ productad.ManufactorerName }}</td>
                                    <td> <img class="" style="width:80px;height:80px" :src="productad.Image" alt=""></td>
                                    
                                    <!-- <td></td> -->
                                    <td>
                                       <div class="m-option">
                                        <button class="m-btn-option m-btn-de">Chi tiết</button>
                                        <button class="m-btn-option m-btn-ud">Sửa</button>
                                        <button class="m-btn-option m-btn-ud">Xóa</button>
                                       </div>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                   
                    <div class="m-page-paging">
                        <div class="m-page-left">
                            <label>Tổng số : {{ products.length }} sản phẩm</label>
                        </div>
                        <div class="m-page-right">
                            <div class="m-number-page">
                                <select name="" id="">
                                    <option>10 bản ghi trên 1 trang</option>
                                    <option>20 bản ghi trên 1 trang</option>
                                    <option>30 bản ghi trên 1 trang</option>
                                    <option>50 bản ghi trên 1 trang</option>
                                    <option>100 bản ghi trên 1 trang</option>
                                </select>
                            </div>
                            <div class="m-number">
                                <button >Trước</button>
                                <button class="m-page-selected">1</button>
                            <button >2</button>
                            <button >3</button>
                            <button >4</button>
                            <button >Sau</button>
                            </div>
                           
                        </div>
                    </div>   
            </div>
            </div>
</template>
<script>
import { mapActions ,mapGetters} from 'vuex';
export default {
    name:'EmployeeList',
    computed:{...mapGetters(['product','comments','products'])},
    created() {
        this.getProduct()    
    },
    methods:{
        ...mapActions(['getProduct','getProducts','getComments']),
    //     goToShoppingCart() {
    // console.log("get");
    //     // this.$router.push('/productdetail');
    //     // Cuộn đến đầu trang sau khi trang được tải hoàn toàn
    //     this.$nextTick(() => {
    //         window.scrollTo(0, 0);
    //     });
    // },
    // handleProductClick(productId) {
    //     this.getProduct(productId);
    //     this.getComments(productId);
    //     this.goToShoppingCart();
    // }
    },
}
</script>
<style>
@import url("../../../..//assets_ad/css_ad/layout/content.css");
@import url('../../../../assets_ad/css_ad/page/employ.css');
@import url('../../../../assets_ad/css_ad/component/page.css');    
</style>