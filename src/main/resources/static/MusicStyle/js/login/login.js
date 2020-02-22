/* 封装登陆方法，用户登陆页面*/
/* set localStorage*/
function set(key,value){
    var curTime = new Date().getTime();
    localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}
function get(key,exp){
    var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);
    if(dataObj!=null){
        if (new Date().getTime() - dataObj.time>exp) {
            console.log('信息已过期');
            localStorage.removeItem(key);
        }else{
            //console.log("data="+dataObj.data);
            //console.log(JSON.parse(dataObj.data));
            var dataObjDatatoJson = dataObj.data;
            return dataObjDatatoJson;
        }
    }
}
/* 用户登陆方法  可自定义返回状态*/
function user_login(name,password) {
    $(".Error_Prompt").html("")
    /* 保存Cookie*/
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        /* 用户点击了 Remember me*/
        if($(".remember-me-checkbox").is(':checked')){
            SetCookie("name",name);
            SetCookie("password",password);
        }
    });
    /* 查询是否存在未过期的本地数据*/
    var User_Name = get("User_Name",2000*60*60);
    var User_ID = get("User_ID",2000*60*60);
    var User_Image = get("User_Image",2000*60*60);
    var Token = get("Token",2000*60*60);
    if((User_ID == null || User_Name == null || User_Image == null || Token == null) && (name!=null&&password!=null)){
        if(name.length>0&&password.length>0){
            //判断用户名是否存在
            $.ajax({
                data : {
                    "UserName" : name
                },
                type : "POST",
                contentType : "application/x-www-form-urlencoded;charset=utf-8",
                scriptCharset : 'utf-8',
                url : "/UserInfo/UserName_IsEmpty",//  请更换验证 UserName 的URL
                success : function(JSONdata) {
                    //解析JSON数据
                    $.each(JSON.parse(JSONdata), function (i, Info) {
                        /* 请返回IsEmpty,State*/
                        if(Info.IsEmpty=="true"){
                            /* 验证密码的长度*/
                            if(password.length<9){
                                /* 密码必须至少包含9个字符*/
                                $(".Error_Prompt").html("Your password must contain at least 9 characters");
                            }else{
                                // 打开loading
                                $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
                                $.ajax({
                                    data : {
                                        "UserName" : name,//传入页面数据
                                        "Password" : password
                                    },
                                    type : "POST",
                                    contentType : "application/x-www-form-urlencoded;charset=utf-8",
                                    scriptCharset : 'utf-8',
                                    url : "/UserInfo/Userlogin",  //  请更换验证 Userlogin 的URL
                                    success : function(logindata) {
                                        //解析JSON数据
                                        $.each(JSON.parse(logindata), function (i, Infodata) {
                                            /* 返回 Error 错误信息*/
                                            if(Infodata.Error==null){
                                                /* 用户 登陆成功 进入*/
                                                /* 存储用户信息*/
                                                set('User_Name',Infodata.User_Info[i].user_Name);
                                                set('User_ID',Infodata.User_Info[i].user_ID);


                                                var img = Infodata.User_Info[i].user_Image;

                                                if(img.split("/")[4]==null){
                                                    set('User_Image',img);
                                                }else{
                                                    set('User_Image',img.split("/")[0]+"/"+img.split("/")[1]+"/"+img.split("/")[2]+"/"+img.split("/")[3]+"/thumbnail/"+img.split("/")[4]);
                                                }
                                                set('Token',Infodata.Token[i].Token);

                                                //返回首页
                                                // 删除model
                                                $(".modal").remove();
                                                // 修改用户头部
                                                $(".head-parent").attr("class", "head-parent head-account-parent");
                                                $(".head-parent").html('<span class="head-account-link">' +
                                                    '<span class="head-account-user-image" style="display: none;"></span>' +
                                                    '<span class="head-account-default-image" style="display: inline-block;background: none;"><img src="'+img.split("/")[0]+"/"+img.split("/")[1]+"/"+img.split("/")[2]+"/"+img.split("/")[3]+"/thumbnail/"+img.split("/")[4]+'" alt=""></span>' +
                                                    '<span class="head-account-content" style="display: block;">'+Infodata.User_Info[i].user_Name+'</span></span>' +
                                                    '<div class="head-drop account-drop header-tooltip-menu">' +
                                                    '<div class="account-drop-logged-in" style="display: block;">' +
                                                    '<a href="javascript:void(0)" onclick="Load_AccountSettings()" style="">Account Settings</a>' +
                                                    '<a href="javascript:void(0)" onclick="Historical_Download()" style="">My Downloads</a>' +
                                                    '<a href="javascript:void(0)" onclick="MyCharts()" style="">My Charts</a>' +
                                                    '<a href="javascript:void(0)" onclick="Membership()" style="">Membership</a>'+
                                                    '<a class="log-out" href="#" style="" onclick="logout()">Log Out</a>' +
                                                    '</div></div></div>');
                                                // 打开播放 面板
                                                $("#pjax-inner-wrapper").show();
                                                // 打开分类
                                                $(".Classification").show();
                                                // 隐藏登陆面板
                                                $(".page-content-container").hide();

                                                $.getScript("/MusicStyle/js/HomePageJS/HomePageJS.js");

                                            }else{
                                                // 关闭loading
                                                $(".load").css("display","none");
                                                /* 返回定义的登陆错误状态*/
                                                $(".Error_Prompt").html(Infodata.Error);
                                            }
                                        });
                                    }
                                });
                            }
                        }else{
                            /* 用户名不存在*/
                            $(".Error_Prompt").html(Info.State);
                        }
                    });
                }
            });
        } else {
            /* 用户名或密码不能为空*/
            $(".Error_Prompt").html("The username or password can not be empty");
        }
    }
}
