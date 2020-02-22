/* 用于获取音乐播放链接js*/
$.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
    /* 获取音乐试听地址*/
    function Auditions_LinkAddress(songid) {
        /* 获取最新UserInfo*/
        var User_Name = get("User_Name",2000*60*60);
        var User_ID = get("User_ID",2000*60*60);
        var User_Image = get("User_Image",2000*60*60);
        var Token = get("Token",2000*60*60);
        if(User_Name==null&&User_ID==null&&User_Image==null&&Token==null){
            User_Name = "";
            User_ID = "";
            User_Image = "";
            Token = "";
        }
        /* 获取试听地址*/
        $.post("/SongInfo/Get_Linkaddress", {
            User_ID: User_ID,
            Token: Token,
            Song_ID: songid
        }, function (result) {
            $.each(JSON.parse(result), function (i, AddressInfo) {
                if(AddressInfo.State=="true"){
                    // 成功获取试听地址
                    // 赋值

                }else{
                    alert(AddressInfo.State);
                }
            });
        });
    }

    /* 获取下载地址*/
    function Download_LinkAddress() {
        /* 获取最新UserInfo*/
        var User_Name = get("User_Name",2000*60*60);
        var User_ID = get("User_ID",2000*60*60);
        var User_Image = get("User_Image",2000*60*60);
        var Token = get("Token",2000*60*60);

        if(User_Name==null&&User_ID==null&&User_Image==null&&Token==null){
            alert("The current user has not landed");
        }else{
            /* 获取下载地址*/
            $.post("/SongInfo/Get_Downloadaddress", {
                User_ID: User_ID,
                Token: Token,
                Song_ID: songid
            }, function (result) {
                $.each(JSON.parse(result), function (i, AddressInfo) {
                    if(AddressInfo.State=="true"){
                        // 赋值

                    }else{
                        alert(AddressInfo.State);
                    }
                });
            });
        }

    }
})