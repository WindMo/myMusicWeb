/* 用户账号设置*/
function Load_AccountSettings(obj) {
    if($(obj).attr("class")!="account-nav-link account-nav-djprofile-link current"){
        /* 加载 loading*/
        $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
        $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
            var User_Name = get("User_Name", 2000 * 60 * 60);
            var User_ID = get("User_ID", 2000 * 60 * 60);
            var User_Image = get("User_Image", 2000 * 60 * 60);
            var Token = get("Token", 2000 * 60 * 60);
            if(User_ID != null && User_Name != null && User_Image != null && Token != null){
                /* 获取用户信息*/
                $.post("/UserInfo/UserInfo_Inquire", {
                    User_ID: get("User_ID", 2000 * 60 * 60),
                    Token: get("Token", 2000 * 60 * 60)
                }, function (Result) {
                    $.each(JSON.parse(Result), function (i, UserInfo) {
                        if(UserInfo.Error==null){
                            // 关闭 播放面板
                            $("#pjax-inner-wrapper").hide();
                            // 关闭 分类  选项
                            $(".Classification").hide();
                            // 写入 账号设置页面
                            if(UserInfo.user_Sex=="男"){
                                $(".page-content-container").html('<main class="interior account account-email">' +
                                    '<h1>账号设置</h1>' +
                                    '<div class="account-nav-col">' +
                                    '<ul class="account-nav">' +
                                    '<li class="account-nav-item">' +
                                    '<a href="javascript:void(0)" class="account-nav-link account-nav-djprofile-link current" onclick="Load_AccountSettings(this)">档案</a>' +
                                    '</li>' +
                                    '<li class="account-nav-item">' +
                                    '<a href="javascript:void(0)" class="account-nav-link account-nav-identity-link" onclick="Modify_Password(this)">修改密码</a></li>' +
                                    '<li class="account-nav-item">' +
                                    '<a href="javascript:void(0)" class="account-nav-link account-nav-billing-link" onclick="Donwload_Info(this)" >下载信息</a>' +
                                    '</li></ul>' +
                                    '</div>' +
                                    '<div class="account-content-col dj-profile-settings">' +
                                    '<div class="account-content account-djprofile-content">' +
                                    '<ul class="account-form-items account-djprofile-form">' +
                                    '<li class="account-form-item account-form-item-text-box">' +
                                    '<label class="account-form-label account-form-label-select" for="dj_image">头像</label>' +
                                    '<div id="image-url" class="hide"></div>' +
                                    '<div id="image-uploader-container" class="account-form-value account-form-value-text-box dj-image">' +
                                    '<div class="image-uploader">' +
                                    '<div class="image-uploader__aspect-wrapper" style="padding-bottom: 100%;">' +
                                    '<input type="file" class="image-uploader__file-input" ' +
                                    'id="image-uploader__file-input_onicw5uos">' +
                                    '<input type="hidden" id="dj_image" name="dj_image" value="">' +
                                    '<input type="hidden" id="dj_image_change" name="dj_image_change" value="0">' +
                                    '<div class="image-uploader__wrapper">' +
                                    '<canvas class="image-uploader__canvas"></canvas>' +
                                    '<div class="image-uploader__content">' +
                                    '<img src="'+UserInfo.user_Image+'" class="image-uploader__image">' +
                                    '<div class="image-uploader__upload-overlay">' +
                                    '<span class="image-uploader__dnd">拖拽 &amp; 粘贴 头像</span>' +
                                    '<span class="image-uploader__or">或</span>' +
                                    '<label for="image-uploader__file-input_onicw5uos">' +
                                    '<span class="button button--option" id="image_uploader_browse_button">浏览</span></label></div>' +
                                    '</div></div></div></div></div></li>' +
                                    '<li class="account-form-item account-form-item-text-box">' +
                                    '<label class="account-form-label account-form-label-select" >工作</label>' +
                                    '<input class="account-form-value account-form-value-text-box" id="Job" name="Job" type="text" value="'+UserInfo.user_Job+'">' +
                                    '</li>' +
                                    '<li class="account-form-item account-form-item-text-box" style="text-align: center;">' +
                                    '<label class="" style="color: #8c8c8c;margin-right: 4px;">男</label>' +
                                    '<input type="radio" name="radio" value="男" checked="checked" id="nan" ' +
                                    'style="position: relative;top:4px;width: 18px;height: 18px;">' +
                                    '<label class="" style="margin-left: 23%;color: #8c8c8c;margin-right: 4px;">女</label>' +
                                    '<input type="radio" name="radio" value="女" id="nv" style="position: relative;top:4px;width: 18px;height: 18px;"></li>' +
                                    '<li class="account-form-item account-form-item-button-parent">' +
                                    '<button type="button" value="Save" id="PictureUploading" name="save" class="blue-button account-save-changes-button">保存更改</button>' +
                                    '</li></ul></div></div></main>');
                            }else{
                                $(".page-content-container").html('<main class="interior account account-email">' +
                                    '<h1>账号设置</h1>' +
                                    '<div class="account-nav-col">' +
                                    '<ul class="account-nav">' +
                                    '<li class="account-nav-item">' +
                                    '<a href="javascript:void(0)" class="account-nav-link account-nav-djprofile-link current" onclick="Load_AccountSettings(this)" >档案</a>' +
                                    '</li>' +
                                    '<li class="account-nav-item">' +
                                    '<a href="javascript:void(0)" class="account-nav-link account-nav-identity-link" onclick="Modify_Password(this)">修改密码</a></li>' +
                                    '<li class="account-nav-item">' +
                                    '<a href="javascript:void(0)" class="account-nav-link account-nav-billing-link"onclick="Donwload_Info(this)" >下载信息</a>' +
                                    '</li></ul>' +
                                    '</div>' +
                                    '<div class="account-content-col dj-profile-settings">' +
                                    '<div class="account-content account-djprofile-content">' +
                                    '<ul class="account-form-items account-djprofile-form">' +
                                    '<li class="account-form-item account-form-item-text-box">' +
                                    '<label class="account-form-label account-form-label-select" for="dj_image">头像</label>' +
                                    '<div id="image-url" class="hide"></div>' +
                                    '<div id="image-uploader-container" class="account-form-value account-form-value-text-box dj-image">' +
                                    '<div class="image-uploader">' +
                                    '<div class="image-uploader__aspect-wrapper" style="padding-bottom: 100%;">' +
                                    '<input type="file" class="image-uploader__file-input" ' +
                                    'id="image-uploader__file-input_onicw5uos">' +
                                    '<input type="hidden" id="dj_image" name="dj_image" value="">' +
                                    '<input type="hidden" id="dj_image_change" name="dj_image_change" value="0">' +
                                    '<div class="image-uploader__wrapper">' +
                                    '<canvas class="image-uploader__canvas"></canvas>' +
                                    '<div class="image-uploader__content">' +
                                    '<img src="'+UserInfo.user_Image+'" class="image-uploader__image">' +
                                    '<div class="image-uploader__upload-overlay">' +
                                    '<span class="image-uploader__dnd">拖拽 &amp; 粘贴 头像</span>' +
                                    '<span class="image-uploader__or">或</span>' +
                                    '<label for="image-uploader__file-input_onicw5uos">' +
                                    '<span class="button button--option" id="image_uploader_browse_button">浏览</span></label></div>' +
                                    '</div></div></div></div></div></li>' +
                                    '<li class="account-form-item account-form-item-text-box">' +
                                    '<label class="account-form-label account-form-label-select" >工作</label>' +
                                    '<input class="account-form-value account-form-value-text-box" id="Job" name="Job" type="text" value="'+UserInfo.user_Job+'">' +
                                    '</li>' +
                                    '<li class="account-form-item account-form-item-text-box" style="text-align: center;">' +
                                    '<label class="" style="color: #8c8c8c;margin-right: 4px;">男</label>' +
                                    '<input type="radio" name="radio" value="男"  id="nan" ' +
                                    'style="position: relative;top:4px;width: 18px;height: 18px;">' +
                                    '<label class="" style="margin-left: 23%;color: #8c8c8c;margin-right: 4px;">女</label>' +
                                    '<input type="radio" name="radio" value="女" checked="checked" id="nv" style="position: relative;top:4px;width: 18px;height: 18px;"></li>' +
                                    '<li class="account-form-item account-form-item-button-parent">' +
                                    '<button type="button" value="Save" id="PictureUploading" name="save" class="blue-button account-save-changes-button">保存更改</button>' +
                                    '</li></ul></div></div></main>');
                            }

                            $(".page-content-container").show();
                            // 加载图片上传 js
                            $.getScript("/MusicStyle/js/upload/UploadImg.js");
                            // 关闭loading
                            $(".load").css("display", "none");
                        }else{
                            if(UserInfo.Error=="Current Token illegality"){
                                $.getScript("/MusicStyle/js/HomePageJS/HomePageJS.js", function () {
                                    logout();
                                });
                            }
                            // 显示 error 信息
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                UserInfo.Error+'</div></div>';
                            document.body.appendChild(oDiv);
                            // 关闭loading
                            $(".load").css("display", "none");
                        }
                    });
                });
            }else{
                var oDiv = document.createElement('div');
                oDiv.className = "modal";
                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                    'Wrong open page</div></div>';
                document.body.appendChild(oDiv);
            }
        });
    }
}
/* 修改密码页面*/
function Modify_Password(obj) {
    if($(obj).attr("class")!="account-nav-link account-nav-djprofile-link current"){
        /* 加载 loading*/
        $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
        $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
            var User_Name = get("User_Name", 2000 * 60 * 60);
            var User_ID = get("User_ID", 2000 * 60 * 60);
            var User_Image = get("User_Image", 2000 * 60 * 60);
            var Token = get("Token", 2000 * 60 * 60);
            if(User_ID != null && User_Name != null && User_Image != null && Token != null){
                // 关闭 播放面板
                $("#pjax-inner-wrapper").hide();
                // 关闭 分类  选项
                $(".Classification").hide();
                // 写入 修改密码页面
                $(".account-content-col").attr("class","account-content-col");

                $(obj).attr("class","account-nav-link account-nav-djprofile-link current");
                $(".account-nav-item:nth-of-type(1) .account-nav-link.account-nav-djprofile-link.current").removeClass("current");
                $(".account-nav-item:nth-of-type(2) .account-nav-link.account-nav-djprofile-link.current").addClass("current");
                $(".account-nav-item:nth-of-type(3) .account-nav-link.account-nav-djprofile-link.current").removeClass("current");
                $(".account-content-col").after('<div class="account-explanation-col"><p class="account-explanation">' +
                    '<trans>您的密码必须至少有8个字符长，不包含空格。记住，您的密码是区分大小写的。</trans></div>');
                $(".account-content-col").html('<div class="account-content account-identity-password-content">' +
                    '<ul class="account-form account-identity-password-form">' +
                    '<li class="account-form-item account-form-item-text">' +
                    '<label class="account-form-label account-form-label-text">' +
                    '<trans>用户名</trans></label><p class="account-form-value account-form-value-text">' +
                    '<trans>'+User_Name+'</trans></p></li>' +
                    '<li class="account-form-item account-form-item-text-box">' +
                    '<label class="account-form-label account-form-label-text-box" for="old_password">' +
                    '<trans>旧 密码</trans>' +
                    '</label>' +
                    '<input autocomplete="off" class="account-form-value account-form-value-text-box" id="old_password" ' +
                    ' name="old_password" type="password" value=""  Onblur="Authentication_old_password_format()" onkeyup="this.value=this.value.replace(/[^\\w]/g,\'\');"></li>' +
                    '<li class="account-form-item account-form-item-text-box">' +
                    '<label class="account-form-label account-form-label-text-box" for="new_password">' +
                    '<trans>新 密码</trans></label>' +
                    '<input autocomplete="off" class="account-form-value account-form-value-text-box" id="new_password" name="new_password" ' +
                    ' type="password" value=""  Onblur="Authentication_New_password_format()" onkeyup="this.value=this.value.replace(/[^\\w]/g,\'\');"></li>' +
                    '<li class="account-form-item account-form-item-text-box">' +
                    '<label class="account-form-label account-form-label-text-box" for="confirm_password">' +
                    '<trans>重新输入新密码</trans></label>' +
                    '<input autocomplete="off" class="account-form-value account-form-value-text-box" id="confirm_password" ' +
                    ' name="confirm_password" type="password" value="" Onblur="Authentication_confirm_password_format()" onkeyup="this.value=this.value.replace(/[^\\w]/g,\'\');">' +
                    '</li><li class="account-form-item account-form-item-button-parent">' +
                    '<button type="submit" value="Save" class="blue-button account-save-changes-button">' +
                    '<trans>Save Changes</trans></button>' +
                    '</li></ul></div>');

                // 点击提交修改
                $(".blue-button.account-save-changes-button").click(function () {
                    // 验证 密码格式
                    if(Authentication_old_password_format()){
                        if(Authentication_New_password_format()){
                            if(Authentication_confirm_password_format()){
                                // 验证  两次输入的密码是否相同
                                if($("#new_password").val()==$("#confirm_password").val()){
                                    // 提交请求
                                    $.post("/UserInfo/User_PasswordModify", {
                                        OldPassword: $("#old_password").val(),
                                        NewPassword: $("#new_password").val(),
                                        User_ID: get("User_ID", 2000 * 60 * 60),
                                        Token : get("Token", 2000 * 60 * 60)
                                    }, function (result) {
                                        $.each(JSON.parse(result), function (i, Result) {
                                            if(Result.Error==null){
                                                if(Result.State=="true"){
                                                    $(".CollectionResult").html('Password modification success')
                                                }else{
                                                    $(".CollectionResult").html('Error in password modification')
                                                }
                                                $(".CollectionResult").css("height","30px");
                                                setTimeout(function () {
                                                    $(".CollectionResult").css("height","0px");
                                                },3000)
                                                // 关闭loading
                                                $(".load").css("display", "none");
                                            }else{
                                                if(Result.Error=="Current Token illegality"){
                                                    $.getScript("/MusicStyle/js/HomePageJS/HomePageJS.js", function () {
                                                        logout();
                                                    })
                                                }
                                                // 关闭loading
                                                $(".load").css("display", "none");
                                                var oDiv = document.createElement('div');
                                                oDiv.className = "modal";
                                                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                                    Result.Error+'</div></div>';
                                                document.body.appendChild(oDiv);
                                            }
                                        });
                                    });

                                }else{
                                    Add_ErrorMessage($("#confirm_password").parent(),"Two inputted password inconsistencies")
                                }
                            }
                        }
                    }
                })
                // 关闭loading
                $(".load").css("display", "none");
            }else{
                // 关闭loading
                $(".load").css("display", "none");
                var oDiv = document.createElement('div');
                oDiv.className = "modal";
                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                    'Wrong open page</div></div>';
                document.body.appendChild(oDiv);
            }
        });
    }
}
/* 验证 旧的密码 格式*/
function Authentication_old_password_format() {

    var password = $("#old_password").val();

    if (password.match(/^\s+$/) || password.match(/^[ ]+$/)
        || password.match(/^[ ]/)
        || password.match(/^[ ]*$/)
        || password.match(/^\s*$/)
        || password.length<8) {
        Add_ErrorMessage($("#old_password").parent(),"Your password doesn't meet the criteria")
        return false;
    }else{
        $(".form-error-message").remove()
        return true;
    }
}
/* 验证新的密码格式*/
function Authentication_New_password_format() {
    // 获取  新的密码
    var password = $("#new_password").val();
    if (password.match(/^\s+$/) || password.match(/^[ ]+$/)
        || password.match(/^[ ]/)
        || password.match(/^[ ]*$/)
        || password.match(/^\s*$/)
        || password.length<8) {
        Add_ErrorMessage($("#new_password").parent(),"Your password doesn't meet the criteria");
        return false;
    }else{
        $(".form-error-message").remove()
        return true;
    }
}
/* 验证 再次输入的密码*/
function Authentication_confirm_password_format() {
    var password = $("#confirm_password").val();
    if (password.match(/^\s+$/) || password.match(/^[ ]+$/)
        || password.match(/^[ ]/)
        || password.match(/^[ ]*$/)
        || password.match(/^\s*$/)
        || password.length<8) {
        Add_ErrorMessage($("#confirm_password").parent(),"Your password doesn't meet the criteria");
        return false;
    }else{
        $(".form-error-message").remove()
        return true;
    }
}
function Add_ErrorMessage(id,Message) {
    // 清空 错误信息
    $(".form-error-message").remove()
    $(id).append('<p class="form-error-message"><small class="form-error-message">' +
        '<span class = "icon icon-dead-robot-head"></span>' +
        '<span class="form-error-message-text">'+Message+'</span ></small></p>')
}
/* 下载信息页面*/
function Donwload_Info(obj) {

    if($(obj).attr("class")!="account-nav-link account-nav-djprofile-link current"){
        /* 加载 loading*/
        $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
        $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
            if (get("User_ID", 2000 * 60 * 60) != null && get("User_Name", 2000 * 60 * 60) != null && get("User_Image", 2000 * 60 * 60) != null && get("Token", 2000 * 60 * 60) != null) {
                // 关闭 播放面板
                $("#pjax-inner-wrapper").hide();
                // 关闭 分类  选项
                $(".Classification").hide();
                // 写入 修改密码页面
                $(".account-content-col").attr("class","account-content-col");
                $(obj).attr("class","account-nav-link account-nav-djprofile-link current");
                $(".account-nav-item:nth-of-type(1) .account-nav-link.account-nav-djprofile-link.current").removeClass("current");
                $(".account-nav-item:nth-of-type(2) .account-nav-link.account-nav-djprofile-link.current").removeClass("current");
                $(".account-nav-item:nth-of-type(3) .account-nav-link.account-nav-djprofile-link.current").addClass("current");

                $(".account-explanation-col").remove();

                // 查看用户 会员信息
                $.post("/OpenMember/membership_information_query", {
                    User_ID: get("User_ID", 2000 * 60 * 60),
                    Token : get("Token", 2000 * 60 * 60)
                }, function (result) {
                    $.each(JSON.parse(result), function (i, Result) {
                        if(Result.Error==null){
                            if(Result.State=="The user is not a member"){
                                // 写入 账号信息
                                $(".account-content-col").html('<ul class="account-form-items account-list-of-carts">' +
                                    '<h2 style="font-size: 24px">' +
                                    '<trans oldtip="My Carts">You are not a member</trans>' +
                                    '</h2>' +
                                    '</ul>');
                            }else{
                                var html = '';
                                $.each(Result.DownloadsInfo, function (j, DownloadsInfo) {

                                    html = html + '<p style="line-height: 32px;padding-left: 2em;">'+DownloadsInfo.genre_Name +'类资源' + DownloadsInfo.surplus_Number + '首&nbsp;&nbsp;&nbsp;';
                                });
                                var memberType = Result.member_Infos[i].member_Type;
                                if(Result.All_DownloadNum=="999999999999999"||Result.All_DownloadNum==999999999999999){
                                    // 写入 账号信息
                                    $(".account-content-col").html('<ul class="account-form-items account-list-of-carts" style="margin-top: -25px;">' +
                                        '<h2 style="font-size: 24px">' +
                                        '<trans oldtip="My Carts">资源下载权限</trans>' +
                                        '</h2><li style="float: right;font-size: 20px;">' +
                                        '<h3>会员开通时间: <span>'+Result.member_Infos[i].opening_Time+'</span></h3>' +
                                        '<h3>会员结束时间: <span>'+Result.member_Infos[i].expiry_Time+'</span></h3>' +
                                        '</li>' +
                                        '<li style="font-size: 16px;margin-top: 80px;">' +
                                        '<h3 style="font-size: 18px;">你是<span style="color: #94d500;margin-left: 6px;">'+memberType.split("生效中")+'</span></h3>' +
                                        '<p style="line-height: 32px;color: #999;margin-top: 20px;">你这个月已经下载了</p>' +html
                                        +'</li>' +
                                        '</ul>');
                                }else{
                                    // 写入 账号信息
                                    $(".account-content-col").html('<ul class="account-form-items account-list-of-carts" style="margin-top: -25px;">' +
                                        '<h2 style="font-size: 24px">' +
                                        '<trans oldtip="My Carts">资源下载权限</trans>' +
                                        '</h2><li style="float: right;font-size: 20px;">' +
                                        '<h3>会员开通时间: <span>'+Result.member_Infos[i].opening_Time+'</span></h3>' +
                                        '<h3>会员结束时间: <span>'+Result.member_Infos[i].expiry_Time+'</span></h3>' +
                                        '</li>' +
                                        '<li style="font-size: 16px;margin-top: 80px;">' +
                                        '<h3 style="font-size: 18px;">你是<span style="color: #94d500;margin-left: 6px;">'+memberType.split("生效中")+'你一共有'+Result.All_DownloadNum+'首下载权限</p></span></h3>' +
                                        '<p style="line-height: 32px;color: #999;margin-top: 20px;">你这个月已经下载了</p>' +html
                                        +'</li>' +
                                        '</ul>');
                                }
                            }
                            // 关闭loading
                            $(".load").css("display", "none");
                        }else{
                            if(Result.Error=="Current Token illegality"){
                                $.getScript("/MusicStyle/js/HomePageJS/HomePageJS.js", function () {
                                    logout();
                                })
                            }
                            // 关闭loading
                            $(".load").css("display", "none");
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                'Wrong open page</div></div>';
                            document.body.appendChild(oDiv);
                        }
                    });
                });
            }else{
                // 关闭loading
                $(".load").css("display", "none");
                var oDiv = document.createElement('div');
                oDiv.className = "modal";
                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                    'Wrong open page</div></div>';
                document.body.appendChild(oDiv);
            }
        });
    }
}
/* 历史下载页面*/
function Historical_Download() {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        var User_Name = get("User_Name", 2000 * 60 * 60);
        var User_ID = get("User_ID", 2000 * 60 * 60);
        var User_Image = get("User_Image", 2000 * 60 * 60);
        var Token = get("Token", 2000 * 60 * 60);
        if (User_ID != null && User_Name != null && User_Image != null && Token != null) {

            $.post("/Historical_Download/My_DownloadCount", {
                User_ID: get("User_ID", 2000 * 60 * 60)
            }, function (result) {
                $.each(JSON.parse(result), function (i, Result) {
                    if(Result.number=="0"){
                        var oDiv = document.createElement('div');
                        oDiv.className = "modal";
                        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                            'You haven\'t downloaded anything yet</div></div>';
                        document.body.appendChild(oDiv);
                        // 关闭loading
                        $(".load").css("display", "none");
                    }else{
                        layui.use(['laypage', 'layer'], function () {
                            var laypage = layui.laypage
                                , layer = layui.layer;
                            laypage.render({
                                elem: 'PageCodeTail'
                                , count: Result.number//数据总数
                                , groups: 4 // 连续显示分页数
                                , curr: 1 // 设置当前页
                                , limit : 30
                                //,skin: 'pag-number'   //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                                , prev: '<P class="icon icon-scroll-left"></P>' //若不显示，设置false即可
                                , next: '<P class="icon icon-scroll-right"></P>'//若不显示，设置false即可
                                , jump: function (obj) {
                                    // 获取用户历史下载信息
                                    $.post("/Historical_Download/My_Download", {
                                        User_ID: get("User_ID", 2000 * 60 * 60),
                                        Token : get("Token", 2000 * 60 * 60),
                                        Page : obj.curr
                                    }, function (result) {
                                        $("#ReleasesAll").html("");
                                        $.each(JSON.parse(result), function (i, Song_Info) {
                                            if(Song_Info.Error==null){
                                                $("#ReleasesAll").append("<li class=\"bucket-item ec-item horz-release\" data-song-id='" + Song_Info.song_ID + "' data-song-name='" + Song_Info.song_Name + "' data-song-artists='" + Song_Info.song_Artists + "'" +
                                                    " data-song-label='" + Song_Info.song_Label + "' data-song-genre='" + Song_Info.song_Genre + "' data-song-releasedtime='" + Song_Info.song_ReleasedTime + "'" +
                                                    " data-song-type='" + Song_Info.song_Type + "' data-song-img='" + Song_Info.song_Imge + "' ><div class=\"horz-release-artwork-parent\"><a href=\"#\"><img class=\"horz-release-artwork\" src=\"" + Song_Info.song_Imge + "\"></a></div><div class=\"horz-release-meta-parent\"><div class=\"horz-release-meta\"><p class=\"buk-horz-release-title\"><a href=\"#\"><trans>" + Song_Info.song_Name + "</trans></a></p><p class=\"buk-horz-release-artists\"><a href=\"#\"><trans>" + Song_Info.song_Artists + "</trans></a></p><p class=\"buk-horz-release-labels\"><a href=\"#\"><trans>" + Song_Info.song_Label + "</trans></a></p><p class=\"buk-horz-release-released\">" + Song_Info.song_ReleasedTime + "</p></div><div class=\"horz-release-actions-parent\"><div class=\"horz-release-actions\"><div class=\"horz-release-play-queue\"><button class=\"playable-play\" onclick=\"Auditions(" + Song_Info.song_ID + ")\" data-release=\"2284991\" data-track=\"10563140\"><i class='fa fa-caret-right'></i></button><button class=\"playable-queue\" data-release=\"2284991\" data-track=\"10563140\" onclick='Collection(this)'><i class='fa fa-server cunAn'></i></button></div><div class=\"buy-button horz-release-buy-button\" onclick=\"PlayPanelDownload(this)\"><button class=\"add-to-default\">Mp3</button><button class=\"launch-menu\"><i class='fa fa-cloud-download xia'></i></div></div><a href=\"#\" class=\"icon icon-ellipsis horz-release-ellipsis mobile-action\"></a></div></div></li>");
                                                // 关闭loading
                                                $(".load").css("display", "none");
                                            }else{
                                                if(Song_Info.Error=="Current Token illegality"){
                                                    $.getScript("/MusicStyle/js/HomePageJS/HomePageJS.js", function () {
                                                        logout();
                                                    })
                                                }
                                                var oDiv = document.createElement('div');
                                                oDiv.className = "modal";
                                                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                                    Song_Info.Error+'</div></div>';
                                                document.body.appendChild(oDiv);
                                                // 关闭loading
                                                $(".load").css("display", "none");
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    }
                })
            });
        }else{
            $.getScript("/MusicStyle/js/HomePageJS/HomePageJS.js", function () {
                logout();
            })
            // 关闭loading
            $(".load").css("display", "none");
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'Current Token illegality</div></div>';
            document.body.appendChild(oDiv);
        }
    });
}

/* 我的收藏*/
function MyCharts() {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        var User_Name = get("User_Name", 2000 * 60 * 60);
        var User_ID = get("User_ID", 2000 * 60 * 60);
        var User_Image = get("User_Image", 2000 * 60 * 60);
        var Token = get("Token", 2000 * 60 * 60);
        if (User_ID != null && User_Name != null && User_Image != null && Token != null) {

            $.post("/Historical_Download/My_ChartsCount", {
                User_ID: get("User_ID", 2000 * 60 * 60)
            }, function (result) {
                $.each(JSON.parse(result), function (i, Result) {
                    if(Result.number=="0"){
                        var oDiv = document.createElement('div');
                        oDiv.className = "modal";
                        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                            'You haven\'t collection anything yet</div></div>';
                        document.body.appendChild(oDiv);
                        // 关闭loading
                        $(".load").css("display", "none");
                    }else{
                        layui.use(['laypage', 'layer'], function () {
                            var laypage = layui.laypage
                                , layer = layui.layer;
                            laypage.render({
                                elem: 'PageCodeTail'
                                , count: Result.number//数据总数
                                , groups: 4 // 连续显示分页数
                                , curr: 1 // 设置当前页
                                , limit : 30
                                //,skin: 'pag-number'   //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                                , prev: '<P class="icon icon-scroll-left"></P>' //若不显示，设置false即可
                                , next: '<P class="icon icon-scroll-right"></P>'//若不显示，设置false即可
                                , jump: function (obj) {
                                    $.post("/Historical_Download/My_Charts", {
                                        User_ID: get("User_ID", 2000 * 60 * 60),
                                        Token : get("Token", 2000 * 60 * 60),
                                        Page : obj.curr
                                    }, function (result) {
                                        $("#ReleasesAll").html("");
                                        $(".bucket-horz-release-header").append("<div onclick='packDownloadCollection()' style='position: absolute;right: 110px;top: -30px;font-size: 16px;cursor: pointer;color: deeppink'>打包下载</div>")
                                        $(".bucket-horz-release-header").append("<div onclick='OnekeyDeleteCollection()' style='position: absolute;right: 20px;top: -30px;font-size: 16px;cursor: pointer;color: deeppink'>一键删除</div>");
                                        $.each(JSON.parse(result), function (i, Song_Info) {
                                            if(Song_Info.Error==null){

                                                $("#ReleasesAll").append('<li class="bucket-item ec-item horz-release" ' +
                                                    'data-song-id="' + Song_Info.song_ID + '" ' +
                                                    'data-song-name="' + Song_Info.song_Name + '"' +
                                                    'data-song-artists="' + Song_Info.song_Artists + '"' +
                                                    'data-song-label="' + Song_Info.song_Label + '"' +
                                                    'data-song-genre="' + Song_Info.song_Genre + '"' +
                                                    'data-song-releasedtime="' + Song_Info.song_ReleasedTime + '"' +
                                                    'data-song-type="' + Song_Info.song_Type + '"' +
                                                    'data-song-img="' + Song_Info.song_Imge + '">' +
                                                    '<div class="horz-release-artwork-parent"><a href="#">' +
                                                    '<img class="horz-release-artwork" src="' + Song_Info.song_Imge + '"></a>' +
                                                    '</div><div class="horz-release-meta-parent"><div class="horz-release-meta">' +
                                                    '<p class="buk-horz-release-title"><a href="#"><trans>"' + Song_Info.song_Name + '"</trans></a>' +
                                                    '</p><p class="buk-horz-release-artists"><a href="#"><trans>"' + Song_Info.song_Artists + '"</trans>' +
                                                    '</a></p><p class="buk-horz-release-labels"><a href="#"><trans>"' + Song_Info.song_Label + '"</trans>' +
                                                    '</a></p><p class="buk-horz-release-released">"' + Song_Info.song_ReleasedTime + '"</p></div>' +
                                                    '<div class="horz-release-actions-parent"><div class="horz-release-actions">' +
                                                    '<div class="horz-release-play-queue">' +
                                                    '<button class="playable-play" ' +
                                                    'onclick="Auditions("' + Song_Info.song_ID + '")" data-release="2284991" data-track="10563140">' +
                                                    '<i class="fa fa-caret-right"></i></button>' +
                                                    '<button class="playable-queue" data-release="2284991" data-track="10563140" ' +
                                                    'onclick="Collection(this)"><i class="fa fa-server cunAn"></i></button></div>' +
                                                    '<div class="buy-button horz-release-buy-button" onclick="PlayPanelDownload(this)">' +
                                                    '<button class="add-to-default">Mp3</button><button class="launch-menu">' +
                                                    '<i class="fa fa-cloud-download xia"></i></div>' +
                                                    '<p onclick="Delete_UserCollection(this)" data-song-id="' + Song_Info.song_ID + '" id="remove"' +
                                                    'style="position: relative;left: 40px;cursor: pointer;font-size: 24px;color: #999;">' +
                                                    '<i class="fa fa-times"></i></p></div><a href="#" ' +
                                                    'class="icon icon-ellipsis horz-release-ellipsis mobile-action"></a>' +
                                                    '<input type="checkbox" name="downloads" title="打包" lay-skin="primary"' +
                                                    'style="position: relative;left: 106%;top: -11px;"' +
                                                    'data-song-id="' + Song_Info.song_ID + '" ' +
                                                    '>' +
                                                    '</div></div></li>');

                                                // 关闭loading
                                                $(".load").css("display", "none");
                                            }else{
                                                if(Song_Info.Error=="Current Token illegality"){
                                                    $.getScript("/MusicStyle/js/HomePageJS/HomePageJS.js", function () {
                                                        logout();
                                                    })
                                                }
                                                var oDiv = document.createElement('div');
                                                oDiv.className = "modal";
                                                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                                    Song_Info.Error+'</div></div>';
                                                document.body.appendChild(oDiv);
                                                // 关闭loading
                                                $(".load").css("display", "none");
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    }
                })
            });
        }else{
            $.getScript("/MusicStyle/js/HomePageJS/HomePageJS.js", function () {
                logout();
            })
            // 关闭loading
            $(".load").css("display", "none");
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'Current Token illegality</div></div>';
            document.body.appendChild(oDiv);
        }
    });
}

function downloadFile(url) {
    try{
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
    }catch(e){
        console.error(e)
    }
}

/**
 * 收藏打包下载
 */
function packDownloadCollection() {

    let songId = [];

    $("input:checkbox[name='downloads']:checked").each(function(i) {
        songId.push($(this).data("song-id"));
    });

    if (songId.length <= 0) {

        var oDiv = document.createElement('div');
        oDiv.className = "modal";
        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div>' +
            '<div class="modal-main-content modal-login-signup-main-content">' +
            '请选择歌曲</div></div>';
        document.body.appendChild(oDiv);

        return;
    }

    if (songId.length > 10) {

        var oDiv = document.createElement('div');
        oDiv.className = "modal";
        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div>' +
            '<div class="modal-main-content modal-login-signup-main-content">' +
            '最多选10首</div></div>';
        document.body.appendChild(oDiv);

        return;

    }

    // 加载 loading
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");

    // 获取用户信息
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        var User_Name = get("User_Name", 2000 * 60 * 60);
        var User_ID = get("User_ID", 2000 * 60 * 60);
        var User_Image = get("User_Image", 2000 * 60 * 60);
        var Token = get("Token", 2000 * 60 * 60);
        if (User_Name != null && User_ID != null && Token != null) {
            $.post('/SongInfo/collectionDownload', {
                "User_ID": get("User_ID", 2000 * 60 * 60),
                "Song_ID": JSON.stringify(songId)
            }, function (Result) {
                // 关闭loading
                $(".load").css("display", "none");
                let res = JSON.parse(Result);
                console.info(res);
                if (res.code == "0") {
                    downloadFile(res.data);
                    $("input:checkbox[name='downloads']:checked").parent().parent().parent().remove();

                } else {
                    // 打印错误信息
                    var oDiv = document.createElement('div');
                    oDiv.className = "modal";
                    oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                        '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                        res.message + '</div></div>';
                    document.body.appendChild(oDiv);
                }
            })
        }
    });



}
