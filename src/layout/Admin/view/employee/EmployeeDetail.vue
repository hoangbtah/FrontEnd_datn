<template>
       <!-- dialog thêm mới 1 nhân viên -->
       <div id="dialogadd" class="m-dialog">
                
                <div class="m-dialog-content">
                    <div class="m-dialog-header">
                        <div class="m-dialog-title">
                            Thông tin nhân viên
                        </div>
                        <div class="m-dialog-khachhang">
                            <input type="checkbox"/>
                            <label for="">Là khách hàng</label>
                        </div>
                        <div class="m-dialog-ncc">
                            <input type="checkbox"/>
                            <label for="">Là nhà cung cấp</label>
                        </div>
                        <button id="dialog-close" class="m-dialog-close m-icon-cancel">
                                
                        </button>
                    </div>
                    <div class="m-dialog-body">
                        <div class="m-row-1">
                           <div class="m-row-1-left">
                            <div class="m-dialog-employcode">
                                <div><label for="">Mã</label><i class="required">*</i></div>
                                <div><input class="m-input" id="txtEmployeeCode" type="input" required></div>
                            </div>
                            <div class="m-dialog-employee-name">
                                <div><label for="">Tên<i class="required">*</i></label></div>
                                <div><input id="txtEmployeeName" class="m-input loaddel"  type="input" required></div>
                            </div>
                           </div>
                           <div class="m-row-1-right">
                            <div class="m-dialog-employee-dob">
                                <div><label for="">Ngày sinh</label></div>
                                <div><input class="m-input"  type="date" id="txtDateOfBrith"></div>
                            </div>
                            <div class="m-dialog-employee-gender">
                                <div><label for="">Giới tính</label></div>
                                <div style="display: flex; height: 40px;justify-content: center;align-items: center;">
                                    <input class="gender" type="radio" value="1" id="txtMale" name="gender"><label for="">Nam</label> 
                                    <input class="gender" type="radio" value="0" id="txtFemale" name="gender"><label for="">Nữ</label>
                                    <input class="gender" type="radio" value="2" id="txtOther" name="gender"><label for="">Khác</label>
                                </div>
                            </div>
                           </div>
                        </div>
                        <div class="m-row-2">
                            <div class="m-dialog-donvi">
                                <div><label for="">Đơn vị <i class="required">*</i></label></div>
                                <div>
                                   
                                <select id="department" name="department"></select>
                            </div>
                            </div>
                            <div class="m-dialog-cmnd">
                                <div><label for="">Số CMND</label></div>
                                <div><input class="m-input loaddel"  type="text" id="txtIdentityCode"></div>
                            </div>
                            <div class="m-dialog-ngay-cap">
                                <div><label for="">Ngày cấp</label></div>
                                <div><input class="m-input loaddel"  type="date" name="" id="txtIdentityDate"></div>
                            </div>
                        </div>
                        <div class="m-row-3">
                            <div class="m-dialog-chuc-danh">
                                <div><label for="">Chức danh</label></div>
                                <div><input  class="m-input loaddel" type="text" id="txtPosition"></div>
                            </div>
                            <div class="m-dialog-noi-cap">
                                <div><label for="">Nơi cấp</label></div>
                                <div><input class="m-input loaddel"  type="text" id="txtIdentityPlace"></div>
                            </div>
                        </div>
                        <div class="m-row-4">
                            <div class="m-dialog-address">
                                <div><label for="">Địa chỉ</label></div>
                                <div><input class="m-input loaddel"  type="text" id="txtAddress"></div>
                            </div>
                        </div>
                        <div class="m-row-5">
                            <div class="m-dialog-phone-number">
                                <div><label for="">Điện thoại di đông</label></div>
                                <div><input class="m-input loaddel"  type="text" id="txtPhoneNumber"></div>
                            </div>
                            <div class="m-dialog-phone">
                                <div><label for="">Điện thoại cố định</label></div>
                                <div><input class="m-input loaddel"  type="text" id="txtPhone"></div>
                            </div>
                            <div class="m-dialog-email">
                                <div><label for="">Email</label></div>
                                <div><input class="m-input loaddel"  type="text" id="txtEmail"></div>
                            </div>
                        </div>
                        <div class="m-row-6">
                            <div class="m-dialog-phone-account-bank">
                                <div><label for="">Tài khoản ngân hàng</label></div>
                                <div><input class="m-input loaddel"  type="text" id="txtAccountBank"></div>
                            </div>
                            <div class="m-dialog-bank-name">
                                <div><label for="">Tên ngân hàng</label></div>
                                <div><input class="m-input loaddel"  type="text" id="txtBankName"></div>
                            </div>
                            <div class="m-dialog-chi-nhanh">
                                <div><label for="">Chi nhánh</label></div>
                                <div><input class="m-input loaddel"  type="text" id="txtBranch"></div>
                            </div>
                        </div>
                    </div>
                    <div class="m-dialog-footer">
                       <div class="m-dialog-footer-left"> <button id="m-btn-add-cancle" class="m-btn m-btn-nocolor ">Hủy</button></div>
                        <div class="m-dialog-footer-right">
                            <button id="btnSave" class="m-btn m-btn-nocolor m-btn-cat">Cất</button>
                            <button id="btnSaveAndAdd" class="m-btn">Cất và thêm</button>
                        </div>
                    </div>
                </div>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>