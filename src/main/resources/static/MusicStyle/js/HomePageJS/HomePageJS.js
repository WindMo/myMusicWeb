/* 封装 首页 JS*/
/* 加载 loading*/
$("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
/* 调用 login.js*/
$.getScript("/MusicStyle/js/login/login.js", function () {
    var Name = get("User_Name", 2000 * 60 * 60);
    var ID = get("User_ID", 2000 * 60 * 60);
    var Image = get("User_Image", 2000 * 60 * 60);
    var Tokens = get("Token", 2000 * 60 * 60);
    /* 加载分类*/
    $.post("/HomePage/Index_Action", {
        User_ID: get("User_ID", 2000 * 60 * 60),
        Token: Tokens
    }, function (Result) {
        if (Result == '[{"Error":"Current Token illegality"}]') {
            logout();
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'Current Token illegality</div></div>';
            document.body.appendChild(oDiv);
        } else if (Result == '[{"Error":"Current connection is unlawful"}]') {
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'Current connection is unlawful</div></div>';
            document.body.appendChild(oDiv);
        } else {
            $(".Classification").html(Result);
        }
        var start = true;
        var end = true;
        // 日期插件开始
        $("#P856329471").click(function () {
            if (start) {
                end = true;
                start = false;
                $("#START").html("");
                $("#START").show();
                $("#END").hide();
                LoadDateControl($(this), '#START');
            }
        })
        // 结束
        $("#P102947222").click(function () {
            if (end) {
                start = true;
                end = false;
                $("#END").html("");
                $("#END").show();
                $("#START").hide();
                LoadDateControl($(this), '#END');
            }
        })
    }, 'JSON');
    menu();
    /* 判断用户登陆 取出本地数据*/
    if (ID != null || Name != null || Image != null || Tokens != null) {
        // 存在本地数据
        // 修改用户头部
        User_head(Name, Image, ID, Tokens);
    }
})
/* 获取首页第一页*/
$.ajax({
    type: "POST",
    contentType: "application/x-www-form-urlencoded;charset=utf-8",
    scriptCharset: 'utf-8',
    url: "/Paging_Action/Songs_TotalNumber",
    success: function (Pagedata) {
        $.each(JSON.parse(Pagedata), function (i, PageInfo) {
            if (PageInfo.State == "Current connection is unlawful") {
                // 链接非法
                var oDiv = document.createElement('div');
                oDiv.className = "modal";
                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                    '<a href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                    'Current connection is unlawful</div></div>';
                document.body.appendChild(oDiv);
            } else if (PageInfo.State == "The token has failed") {
                // Token 已失效
                var oDiv = document.createElement('div');
                oDiv.className = "modal";
                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                    '<a href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                    PageInfo.State + '</div></div>';
                document.body.appendChild(oDiv);
                // 删除 localStorage
                $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
                    remove();
                    var oDiv = document.createElement('div');
                    oDiv.className = "modal";
                    oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                        '<a onclick="Close()" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                        'Current Token illegality</div></div>';
                    document.body.appendChild(oDiv);
                    $(".head-parent").attr("class", "head-parent head-mybeatport-parent");
                    $(".head-parent").html('<span data-href="/my-beatport" class="head-mybeatport-link">' +
                        '<svg viewBox="0 0 200 200" class="head-mybeatport-icon">' +
                        '<embed src="/MusicStyle/images/login.png" style="height: 28px;width: 28px"/>' +
                        '</svg><span class="head-mybeatport-content">My Edmland</span></span>' +
                        '<div class="head-drop mybeatport-drop header-tooltip-menu">' +
                        '<div class="mybeatport-logged-out-zero"><h2>Log in to start using My Edmland!</h2>' +
                        '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                        'and labels so you can find out when they release new tracks. Log in or create an' +
                        'account today so you never miss a new release.</p>' +
                        '<a href="javascript:void(0)" onclick="LoadRegistrationPage()" class="button button--large" style="">Create an Account</a>' +
                        '<p class="login-link-parent">Already have an account? <a href="javascript:void(0);" onclick="loginPage();" ' +
                        'class="blue-button head-mybeatport-zero-button" onclick="loginPage();" style="">Log In</a></p>' +
                        '</div><div class="mybeatport-logged-in-zero"><h6>You\'re not following anyone yet!</h6>' +
                        '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                        'and labels so you can find out when they release new tracks. So go follow' +
                        'someone!</p>' +
                        '</div><div class="mybeatport-logged-in-data"><a href="/my-beatport" class="mobile-mybeatport-drop-link" style="">View My Edmland</a>' +
                        '<div class="head-mybeatport-filter-parent"><input type="text" class="head-mybeatport-filter" placeholder="FILTER">' +
                        '</div><div class="head-mybeatport-artists-parent"><h3>My Artists' +
                        '<a href="/my-beatport/artists" class="view-more-link" style="">View All</a>' +
                        '</h3><hr><ul class="head-mybeatport-artists">' +
                        '</ul></div><div class="head-mybeatport-labels-parent"><h3>' +
                        'My Labels<a href="/my-beatport/labels" class="view-more-link" style="">View All</a></h3>' +
                        '<hr><ul class="head-mybeatport-labels"></ul></div></div></div></div>');
                })
            } else {
                PagingModule(PageInfo.Songs_TotalNumber, 1)
            }

        });
    },
    error: function (jqXHR, textStatus, errorThrown) {
        /*弹出jqXHR对象的信息*/
        console.log(jqXHR.responseText)
        console.log(jqXHR.status)
        console.log(jqXHR.readyState)
        console.log(jqXHR.statusText)
        /*弹出其他两个参数的信息*/
        console.log(textStatus)
        console.log(errorThrown)
    }
});

/* 分页模块*/
function PagingModule(Songs_TotalNumber, PageNum) {
    layui.use(['laypage', 'layer'], function () {
        var laypage = layui.laypage
            , layer = layui.layer;
        //调用尾部分页
        laypage.render({
            elem: 'PageCodeTail'
            , count: Songs_TotalNumber//数据总数
            , groups: 4 // 连续显示分页数
            , curr: PageNum // 设置当前页
            , limit : 30
            //,skin: 'pag-number'   //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
            , prev: '<P class="icon icon-scroll-left"></P>' //若不显示，设置false即可
            , next: '<P class="icon icon-scroll-right"></P>'//若不显示，设置false即可
            , jump: function (obj) {
                $.getScript("/MusicStyle/js/login/login.js", function () {
                    var Name = get("User_Name", 2000 * 60 * 60);
                    var Image = get("User_Image", 2000 * 60 * 60);
                    $("#ReleasesAll").html("");
                    Page(obj.curr, get("User_ID", 2000 * 60 * 60), get("Token", 2000 * 60 * 60));
                })
            }
        });
    });

}

// 访问分页数据
function Page(PageNum, ID, Tokens) {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    $.ajax({
        data: {
            "Page": PageNum,//传入页面数据
            "User_ID": ID,
            "Token": Tokens
        },
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        scriptCharset: 'utf-8',
        url: "/Paging_Action/Paging",
        success: function (JSONdata) {
            $("#ReleasesAll").html("");
            //解析JSON数据
            $.each(JSON.parse(JSONdata), function (i, Song_Info) {
                if (Song_Info.Error == "" || Song_Info.Error == null) {
                    Song_list(Song_Info);
                } else {
                    if (Song_Info.Error == "Current Token illegality") {
                        logout();
                    }
                    // 出现错误  显示错误model
                    var oDiv = document.createElement('div');
                    oDiv.className = "modal";
                    oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                        '<a href="" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                        Song_Info.Error + '</div></div>';
                    document.body.appendChild(oDiv);
                }
            });
            // 关闭loading
            $(".load").css("display", "none");
        }
    });
}

// 创建 wavesurfer 实例
var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#8D8D8D',
    progressColor: '#7ED035',
    height: 65,
    barWidth: 1
});
var playPause = document.querySelector('#playPause');
playPause.addEventListener('click', function () {
    wavesurfer.playPause();
});

// 切换播放/暂停文本
wavesurfer.on('play', function () {
    document.querySelector('#play').style.display = 'none';
    document.querySelector('#pause').style.display = '';
});
wavesurfer.on('pause', function () {
    document.querySelector('#play').style.display = '';
    document.querySelector('#pause').style.display = 'none';
});

// 播放列表链接
var links = document.querySelectorAll('#playlist a');
var currentTrack = 0;

// 按索引加载轨道并播放相应的链接
var setCurrentSong = function (index) {
    links[currentTrack].classList.remove('active');
    currentTrack = index;
    links[currentTrack].classList.add('active');
    wavesurfer.load(links[currentTrack].href);
};

// 点击加载轨道
Array.prototype.forEach.call(links, function (link, index) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        setCurrentSong(index);
    });
});

// 完成下一个轨道
wavesurfer.on('finish', function () {
    setCurrentSong((currentTrack + 1) % links.length);

    // 查询是否存在下一首歌曲
    // 拿到当前播放ID  与  播放列表匹配
    $.each($(".mobile-queue li").siblings(), function (i, node) {
        if ($(node).data("song-id") == $("#player-current-track-container").data("song-id")) {
            // 匹配成功  获取  下一首歌信息
            if ($(node).next().length > 0) {
                PlayListClick($(node).next().data("song-id"), this);
            } else {
                // 当前不存在下一首歌曲的信息 自动跳  第一首 歌曲信息
                PlayListClick($(".mobile-queue").find("li:first-child").data("song-id"), this);
            }
        }
    });
});
// 载入第一轨道
setCurrentSong(currentTrack);


// 音量调整
function changeVolume(percent) {
    wavesurfer.backend.setVolume($(".volume-drop-range").val() / 100);
}

$(".volume-drop-range")[0].oninput = function () {
    changeVolume(this.value / this.max);
}
$(".volume-drop-range")[0].oninput()

/* 获取试听链接*/
function Auditions(Song_ID) {
    var IsExistence = false;
    // 获取用户Info
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        var User_Name = get("User_Name", 2000 * 60 * 60);
        var User_ID = get("User_ID", 2000 * 60 * 60);
        var User_Image = get("User_Image", 2000 * 60 * 60);
        var Token = get("Token", 2000 * 60 * 60);
        $.post("/SongInfo/Get_Linkaddress", {
            User_ID: get("User_ID", 2000 * 60 * 60),
            Token: get("Token", 2000 * 60 * 60),
            Song_ID: Song_ID
        }, function (AuditionsResult) {
            $.each(JSON.parse(AuditionsResult), function (i, result) {
                if (result.State[i].State == "true") {
                    // 不能点击正在播放的歌曲
                    if ($("#player-current-track-container").data("song-id") != Song_ID) {
                        $("#player-current-track-container").data("song-id", Song_ID);

                        // 判断播放列表是否存在 需要播放的信息
                        $.each($(".mobile-queue li").siblings(), function (i, PlayListInfo) {
                            // 取出播放列表的信息 与  传来的信息判断
                            if ($(PlayListInfo).data("song-id") == Song_ID) {
                                // 存在
                                IsExistence = true;
                            }
                        });
                        // 套曲过大,不显示波形
                        console.log(result.File_Address[i].song_Type);
                        if(result.File_Address[i].song_Type!="套曲"){
                            $("#Suites").hide();
                            $("#music").remove();
                            $(".progress").remove();
                            if (IsExistence) {
                                PlayListClick(Song_ID, this);
                            } else {
                                // 获取成功 添加li信息
                                Play_list(Song_ID);
                            }
                            // 显示播放器
                            $(".AudioPlayer").attr("class", "player-container player-section artwork-zoom AudioPlayer")
                            $(".song-img").attr("src", result.File_Address[i].song_Imge);

                            // 设置歌曲图片
                            $(".song-img").attr("src", result.File_Address[i].song_Imge);
                            // 设置歌曲名
                            $(".song-name trans").html(result.File_Address[i].song_Name);
                            // 设置歌曲演唱者
                            $(".song-artists").html(result.File_Address[i].song_Artists);

                            // 设置音乐播放列表当前歌曲大图
                            $(".info-album-slide.track-artwork-mobile").attr("src", result.File_Address[i].song_Imge);

                            // 设置音乐文件
                            // $("#playlist a").attr("href",result.File_Address[i].song_AuditionAddress);

                            // 加载 音频
                            wavesurfer.load(result.File_Address[i].song_AuditionAddress);
                            // 加载完成后播放
                            wavesurfer.on('ready', function () {
                                wavesurfer.play();
                            });
                        }else{
                            $("#Suites").show();

                            $(".mobile-queue li").remove();
                            // 暂停音乐
                            wavesurfer.stop();
                            // 修改样式
                            $(".menu-queue-buttons-parent a").attr("class", "player-queue-button");
                            // 隐藏播放器
                            $(".AudioPlayer").attr("class", "player-container player-section artwork-zoom zero-state AudioPlayer");
                            $("#player-mobile-pop-up").attr("class", "player-mobile-pop-up player-section artwork-zoom zero-state");

                            console.log("套曲"+result.File_Address[i].song_Imge)

                            $("#Suites").html('<div style="width: 375px;float: left;border-right: 1px solid #444;overflow: hidden;margin-right: 10px;"><img src="'+result.File_Address[i].song_Imge+'" style="border:1px solid #ddd;width: 58px;height: 58px;float: left;margin: 5px;margin-left: 40px;" alt=""><div style="color: #fff;float: left;width:266px;margin-top: 10px;"><p style="font-size: 16px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">'+result.File_Address[i].song_Name+'</p><p style="font-size: 16px;margin-top: 10px;">'+result.File_Address[i].song_Artists +'</p></div></div>'+
                                '<audio height="0" autoplay="autoplay" width="0" id="music" src="'+result.File_Address[i].song_AuditionAddress+'"></audio>' +
                                '<div class="progress"><span class="start"></span><div class="progress-bar">' +
                                '<div class="now"></div></div><span class="end"></span></div>'+'<div style="position: absolute;top: 23px;right: 16px;"><button id="play" style="color: #fff;display: none;font-size: 24px;margin-right: 20px;"><i class="fa fa-play"></i></button><button id="pause" style="color: #fff;font-size: 24px;margin-right: 20px;"><i class="fa fa-pause"></i></button>' +
                                '<span style="font-size: 24px;color: #fff;margin: 0 10px;" id="rag"><i class="fa fa-music" ></i><input type="range" orient="vertical" min="0" style="width: 8px;height: 133px;position: absolute;top: -140px;right: 56px;-webkit-appearance: slider-vertical;opacity: 0;" max="100" class="Suites" value="60"></span><button class="downloader" style="color: #fff;font-size: 24px;margin-left: 20px;"><i class="fa fa-download"></i></button></div>')

                            $(".downloader").click(function () {
                                console.log(result.File_Address[i].song_ID)
                                Download(result.File_Address[i].song_ID);
                            })
                            $("#rag").click(function () {
                                $(".Suites").css("opacity","1");
                            })
                            $(".Suites").mouseout(function () {
                                $(".Suites").css("opacity","0");
                            })

                            const audio = document.getElementById('music')
                            const stop = document.getElementById('pause')
                            const play = document.getElementById('play')
                            const start = document.querySelector('.start')
                            const end = document.querySelector('.end')
                            const progressBar = document.querySelector('.progress-bar')
                            const now = document.querySelector('.now')

                            $(".Suites")[0].oninput = function () {
                                audio.volume = this.value / this.max;
                            }
                            $(".Suites")[0].oninput()

                            function conversion (value) {
                                let minute = Math.floor(value / 60)
                                minute = minute.toString().length === 1 ? ('0' + minute) : minute
                                let second = Math.round(value % 60)
                                second = second.toString().length === 1 ? ('0' + second) : second
                                return `${minute}:${second}`
                            }

                            audio.onloadedmetadata = function () {
                                end.innerHTML = conversion(audio.duration)
                                start.innerHTML = conversion(audio.currentTime)
                            }

                            progressBar.addEventListener('click', function (event) {
                                let coordStart = this.getBoundingClientRect().left
                                let coordEnd = event.pageX
                                let p = (coordEnd - coordStart) / this.offsetWidth
                                now.style.width = p.toFixed(3) * 100 + '%'

                                audio.currentTime = p * audio.duration
                                audio.play()
                            })
                            stop.addEventListener('click', function () {
                                now.style.width = 0+ '%';
                                audio.pause();
                                document.querySelector('#play').style.display = '';
                                document.querySelector('#pause').style.display = 'none';
                            })
                            play.addEventListener('click', function () {
                                audio.play();
                                document.querySelector('#play').style.display = 'none';
                                document.querySelector('#pause').style.display = '';
                            })

                            setInterval(() => {
                                start.innerHTML = conversion(audio.currentTime)
                                now.style.width = audio.currentTime / audio.duration.toFixed(3) * 100 + '%'
                            }, 1000)
                        }
                    }
                } else {
                    // 获取失败
                    if (result.State == "Current Token illegality") {
                        logout();
                    } else if (result.State == "You have to log in before you hear it") {
                        logout();
                    }
                    // 调用model,显示错误信息
                    var oDiv = document.createElement('div');
                    oDiv.className = "modal";
                    oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                        '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                        result.State + '</div></div>';
                    document.body.appendChild(oDiv);
                }
            });
        });
    });
}

/* 播放上一首*/
$(".prev-button").click(function () {
    // 拿到当前播放ID  与  播放列表匹配
    $.each($(".mobile-queue li").siblings(), function (i, node) {
        if ($(node).data("song-id") == $("#player-current-track-container").data("song-id")) {
            // 匹配成功  获取  上一首歌信息
            if ($(node).prev().length > 0) {
                PlayListClick($(node).prev().data("song-id"), this);
            }
        }
    });
})
/* 播放下一首*/
$(".next-button").click(function () {
    // 拿到当前播放ID  与  播放列表匹配
    $.each($(".mobile-queue li").siblings(), function (i, node) {
        if ($(node).data("song-id") == $("#player-current-track-container").data("song-id")) {
            // 匹配成功  获取  下一首歌信息
            if ($(node).next().length > 0) {
                PlayListClick($(node).next().data("song-id"), this);
            }
        }
    });
})
/* 清除当前所有列队*/
$(".queue-top-clear-all").click(function () {
    $(".mobile-queue li").remove();
    // 暂停音乐
    wavesurfer.stop();
    // 修改样式
    $(".menu-queue-buttons-parent a").attr("class", "player-queue-button");
    // 隐藏播放器
    $(".AudioPlayer").attr("class", "player-container player-section artwork-zoom zero-state AudioPlayer");
    $("#player-mobile-pop-up").attr("class", "player-mobile-pop-up player-section artwork-zoom zero-state");
})

/* 删除 所选列*/
function DeleteTrack(obj) {
    // 删除当前播放的歌曲
    if ($(obj).parent().parent().attr("class") == "queue-track ec-item current-track") {
        // 暂停音乐
        wavesurfer.stop();
        // 查看是否存在下一首music
        if ($(obj).parent().parent().next().data("song-id") != null) {
            // 播放下一首music
            Auditions($(obj).parent().parent().next().data("song-id"))
            // 查找是否存在上一首
        } else if ($(obj).parent().parent().prev().data("song-id") != null) {
            if ($(obj).parent().parent().prevAll().length == 1) {
                // 执行删除全部操作
                $(".mobile-queue li").remove();
                $("#player-current-track-container").data("song-id", "");
                $(".menu-queue-buttons-parent a").attr("class", "player-queue-button");
                $(".AudioPlayer").attr("class", "player-container player-section artwork-zoom zero-state AudioPlayer");
                $("#player-mobile-pop-up").attr("class", "player-mobile-pop-up player-section artwork-zoom zero-state");
            } else {
                // 播放上一首
                Auditions($(obj).parent().parent().prev().data("song-id"))
            }
        } else {
            // 执行删除全部操作
            $(".mobile-queue li").remove();
            $("#player-current-track-container").data("song-id", "");
            $(".menu-queue-buttons-parent a").attr("class", "player-queue-button");
            $(".AudioPlayer").attr("class", "player-container player-section artwork-zoom zero-state AudioPlayer");
            $("#player-mobile-pop-up").attr("class", "player-mobile-pop-up player-section artwork-zoom zero-state");
        }
        $(obj).parent().parent().remove();
    } else {
        $(obj).parent().parent().remove();
    }
}

/* 添加播放列表*/
function Play_list(Song_ID) {
    // 获取 所有 ul 的子节点
    $.each($("#ReleasesAll li").siblings(), function (i, node) {
        // 判断当前的子节点
        if ($(node).data("song-id") == Song_ID) {
            // 添加li
            $(".mobile-queue li").attr("class", "queue-track ec-item PlayListClick");
            $(".mobile-queue").append('<li class="queue-track ec-item current-track" ' +
                'data-song-id="' + $(this).data("song-id") + '" ' +
                'data-song-name="' + $(this).data("song-name") + '" ' +
                'data-song-artists="' + $(this).data("song-artists") + '"' +
                'data-song-label="' + $(this).data("song-label") + '" ' +
                'data-song-genre="' + $(this).data("song-genre") + '" ' +
                'data-song-releasedTime="' + $(this).data("song-releasedtime") + '" ' +
                'data-song-type="' + $(this).data("song-type") + '"' +
                'data-song-img="' + $(this).data("song-img") + '" onclick="PlayListClick(' + $(this).data("song-id") + ',this)">' +
                '<div class="player-track-artwork">' +
                '<span class="icon icon-play"></span>' +
                '<img src="' + $(this).data("song-img") + '" class="">' +
                '</div><div class="player-track-name-artist">' +
                '<span class="track-title">' +
                '<a href="javascript:void(0);" class="primary-title">' +
                '<trans>' + $(this).data("song-name") + '</trans></a></span>' +
                '<span class="track-artist"><a href="/artist/rousing-house/579249">' +
                '<trans>' + $(this).data("song-artists") + '</trans></a></span></div>' +
                '<div class="player-track-genre"><span class="track-title">' +
                '<a href="javascript:void(0);">' +
                '<trans>' + $(this).data("song-genre") + '</trans></a></span>' +
                '</div><div class="player-track-key">' +
                '<span class="track-title"><trans></trans></span>' +
                '<span class="track-artist"><trans></trans></span></div>' +
                '<div class="player-track-label"><span class="track-title">' +
                '<a href="javascript:void(0);">' +
                '<trans>' + $(this).data("song-label") + '</trans></a>' +
                '</span><span class="track-artist">' + $(this).data("song-releasedtime") + '' +
                '</span></div><div class="track-button-container">' +
                '<div class="buy-button" onclick="PlaylistDownload(this)">' +
                '<button class="add-to-default"><span class="add-to-default-price">download</span>' +
                '</button><button class="launch-menu">' +
                '<i class="fa fa-cloud-download xia"></i>' +
                '</button></div> <a href="#" onclick="DeleteTrack(this)" class="delete-track playlist-item-remove">' +
                '<svg viewBox="0 0 200 200" class="delete-track-icon">' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/MusicStyle/svg/defs.svg#icon-x"></use>' +
                '</svg></a></div></li>');
        }
    });
}

/* 点击播放列表中的歌曲时*/
function PlayListClick(Song_ID, obj) {
    var tmp = obj;
    if (($("#player-current-track-container").data("song-id") == Song_ID) && ($(tmp).attr("class") == "queue-track ec-item PlayListClick" || $(tmp).attr("class") == null)) {
        // 不能点击正在播放的歌曲
        $.each($(".mobile-queue li").siblings(), function (i, node) {
            // 查找 当前 播放的  歌曲
            if ($(node).attr("class") == "queue-track ec-item current-track") {
                // 修改当前播放歌曲的样式
                $(node).attr("class", "queue-track ec-item PlayListClick");

            }
            // 查找 需要 播放的 song-id
            if ($(node).data("song-id") == Song_ID) {
                // 修改  需要播放的 song-id  的样式
                $(node).attr("class", "queue-track ec-item current-track")

                Auditions($(node).data("song-id"))
            }
        });
    } else {
        // 不能点击正在播放的歌曲
        $.each($(".mobile-queue li").siblings(), function (i, node) {
            // 查找 当前 播放的  歌曲
            if ($(node).attr("class") == "queue-track ec-item current-track") {
                // 修改当前播放歌曲的样式
                $(node).attr("class", "queue-track ec-item PlayListClick");
                // 查找 需要 播放的 song-id
            } else if ($(node).data("song-id") == Song_ID) {
                // 修改  需要播放的 song-id  的样式
                $(node).attr("class", "queue-track ec-item current-track")
                Auditions($(node).data("song-id"))
            }
        });
    }
}

/* 关闭试听列表*/
$(".queue-top-toggle.open").click(function () {
    $(".menu-queue-buttons-parent a").attr("class", "player-queue-button");
    $("#player-mobile-pop-up").attr("class", "player-mobile-pop-up player-section artwork-zoom zero-state")
})

/* 打开试听列表*/
$(".menu-queue-buttons-parent a").click(function () {
    if ($(".menu-queue-buttons-parent a").attr("class") == "player-queue-button open") {
        $(".menu-queue-buttons-parent a").attr("class", "player-queue-button");
        $("#player-mobile-pop-up").attr("class", "player-mobile-pop-up player-section artwork-zoom zero-state")
    } else {
        $(".menu-queue-buttons-parent a").attr("class", "player-queue-button open")
        $("#player-mobile-pop-up").attr("class", "player-mobile-pop-up player-section artwork-zoom open")
    }
})

/* 关闭model*/
function Close() {
    $(".modal").remove();
}

/* 底部的跳转分页*/
$("input[name=JumpToPage]").keypress(function (e) {
    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    // 监听回车键
    if (eCode == 13) {
        var PageNum = $("input[name=JumpToPage]").val();
        // 验证是否是数字
        if (PageNum.match(/^[1-9]+[0-9]*]*$/)) {
            // 设置分页数
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                scriptCharset: 'utf-8',
                url: "/Paging_Action/Songs_TotalNumber",
                success: function (Pagedata) {
                    $.each(JSON.parse(Pagedata), function (i, PageInfo) {
                        if (PageInfo.State == "Current connection is unlawful") {
                            // 链接非法
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                PageInfo.Error + '</div></div>';
                            document.body.appendChild(oDiv);
                        } else if (PageInfo.State == "The token has failed") {
                            console.log("Token失效")
                            // Token 已失效
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                PageInfo.State + '</div></div>';
                            document.body.appendChild(oDiv);
                            // 删除 localStorage
                            $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
                                remove();
                                var oDiv = document.createElement('div');
                                oDiv.className = "modal";
                                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                    'Current Token illegality</div></div>';
                                document.body.appendChild(oDiv);
                                $(".head-parent").attr("class", "head-parent head-mybeatport-parent");
                                $(".head-parent").html('<span data-href="/my-beatport" class="head-mybeatport-link">' +
                                    '<svg viewBox="0 0 200 200" class="head-mybeatport-icon">' +
                                    '<embed src="/MusicStyle/images/login.png" style="height: 28px;width: 28px"/>' +
                                    '</svg><span class="head-mybeatport-content">My Edmland</span></span>' +
                                    '<div class="head-drop mybeatport-drop header-tooltip-menu">' +
                                    '<div class="mybeatport-logged-out-zero"><h2>Log in to start using My Edmland!</h2>' +
                                    '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                                    'and labels so you can find out when they release new tracks. Log in or create an' +
                                    'account today so you never miss a new release.</p>' +
                                    '<a href="javascript:void(0)" onclick="LoadRegistrationPage()" class="button button--large" style="">Create an Account</a>' +
                                    '<p class="login-link-parent">Already have an account? <a href="javascript:void(0);" onclick="loginPage();" ' +
                                    'class="blue-button head-mybeatport-zero-button" style="">Log In</a></p>' +
                                    '</div><div class="mybeatport-logged-in-zero"><h6>You\'re not following anyone yet!</h6>' +
                                    '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                                    'and labels so you can find out when they release new tracks. So go follow' +
                                    'someone!</p>' +
                                    '</div><div class="mybeatport-logged-in-data"><a href="/my-beatport" class="mobile-mybeatport-drop-link" style="">View My Edmland</a>' +
                                    '<div class="head-mybeatport-filter-parent"><input type="text" class="head-mybeatport-filter" placeholder="FILTER">' +
                                    '</div><div class="head-mybeatport-artists-parent"><h3>My Artists' +
                                    '<a href="/my-beatport/artists" class="view-more-link" style="">View All</a>' +
                                    '</h3><hr><ul class="head-mybeatport-artists">' +
                                    '</ul></div><div class="head-mybeatport-labels-parent"><h3>' +
                                    'My Labels<a href="/my-beatport/labels" class="view-more-link" style="">View All</a></h3>' +
                                    '<hr><ul class="head-mybeatport-labels"></ul></div></div></div></div>');
                            })
                        } else {
                            $("input[name=JumpToPageHeader]").html(PageNum);
                            PagingModule(PageInfo.Songs_TotalNumber, PageNum)
                            // 获取页面内容
                            $("#ReleasesAll").html("");
                            $.getScript("/MusicStyle/js/login/login.js", function () {
                                var Name = get("User_Name", 2000 * 60 * 60);
                                var ID = get("User_ID", 2000 * 60 * 60);
                                var Image = get("User_Image", 2000 * 60 * 60);
                                var Tokens = get("Token", 2000 * 60 * 60);
                                Page(PageNum, get("User_ID", 2000 * 60 * 60), Tokens);
                            })
                        }
                    });
                }
            });
        } else {
            // 跳出model
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'The number of pages is positive integer</div></div>';
            document.body.appendChild(oDiv);

        }
    }
})
/* 头部的跳转分页*/
$("input[name=JumpToPageHeader]").keypress(function (e) {
    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    // 监听回车键
    if (eCode == 13) {
        var PageNum = $("input[name=JumpToPageHeader]").val();
        // 验证是否是数字
        if (PageNum.match(/^[1-9]+[0-9]*]*$/)) {
            // 设置分页数
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                scriptCharset: 'utf-8',
                url: "/Paging_Action/Songs_TotalNumber",
                success: function (Pagedata) {
                    $.each(JSON.parse(Pagedata), function (i, PageInfo) {
                        if (PageInfo.State == "Current connection is unlawful") {
                            // 链接非法
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                PageInfo.Error + '</div></div>';
                            document.body.appendChild(oDiv);
                        } else if (PageInfo.State == "The token has failed") {
                            console.log("Token失效")
                            // Token 已失效
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                PageInfo.State + '</div></div>';
                            document.body.appendChild(oDiv);
                            // 删除 localStorage
                            $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
                                remove();
                                var oDiv = document.createElement('div');
                                oDiv.className = "modal";
                                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                    'Current Token illegality</div></div>';
                                document.body.appendChild(oDiv);
                                $(".head-parent").attr("class", "head-parent head-mybeatport-parent");
                                $(".head-parent").html('<span data-href="/my-beatport" class="head-mybeatport-link">' +
                                    '<svg viewBox="0 0 200 200" class="head-mybeatport-icon">' +
                                    '<embed src="/MusicStyle/images/login.png" style="height: 28px;width: 28px"/>' +
                                    '</svg><span class="head-mybeatport-content">My Edmland</span></span>' +
                                    '<div class="head-drop mybeatport-drop header-tooltip-menu">' +
                                    '<div class="mybeatport-logged-out-zero"><h2>Log in to start using My Edmland!</h2>' +
                                    '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                                    'and labels so you can find out when they release new tracks. Log in or create an' +
                                    'account today so you never miss a new release.</p>' +
                                    '<a href="javascript:void(0)" onclick="LoadRegistrationPage()" class="button button--large" style="">Create an Account</a>' +
                                    '<p class="login-link-parent">Already have an account? <a href="javascript:void(0);" onclick="loginPage();" ' +
                                    'class="blue-button head-mybeatport-zero-button" style="">Log In</a></p>' +
                                    '</div><div class="mybeatport-logged-in-zero"><h6>You\'re not following anyone yet!</h6>' +
                                    '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                                    'and labels so you can find out when they release new tracks. So go follow' +
                                    'someone!</p>' +
                                    '</div><div class="mybeatport-logged-in-data"><a href="/my-beatport" class="mobile-mybeatport-drop-link" style="">View My Edmland</a>' +
                                    '<div class="head-mybeatport-filter-parent"><input type="text" class="head-mybeatport-filter" placeholder="FILTER">' +
                                    '</div><div class="head-mybeatport-artists-parent"><h3>My Artists' +
                                    '<a href="/my-beatport/artists" class="view-more-link" style="">View All</a>' +
                                    '</h3><hr><ul class="head-mybeatport-artists">' +
                                    '</ul></div><div class="head-mybeatport-labels-parent"><h3>' +
                                    'My Labels<a href="/my-beatport/labels" class="view-more-link" style="">View All</a></h3>' +
                                    '<hr><ul class="head-mybeatport-labels"></ul></div></div></div></div>');
                            })
                        } else {
                            $("input[name=JumpToPage]").html(PageNum)
                            PagingModule(PageInfo.Songs_TotalNumber, PageNum)
                            // 获取页面内容
                            $("#ReleasesAll").html("");
                            $.getScript("/MusicStyle/js/login/login.js", function () {
                                var Name = get("User_Name", 2000 * 60 * 60);
                                var ID = get("User_ID", 2000 * 60 * 60);
                                var Image = get("User_Image", 2000 * 60 * 60);
                                var Tokens = get("Token", 2000 * 60 * 60);
                                Page(PageNum, get("User_ID", 2000 * 60 * 60), Tokens);
                            })
                        }
                    });
                }
            });
        } else {
            // 跳出model
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'The number of pages is positive integer</div></div>';
            document.body.appendChild(oDiv);

        }
    }
})
/* 鼠标移入移出事件*/
$.getScript("/MusicStyle/js/login/login.js", function () {
    var Name = get("User_Name", 2000 * 60 * 60);
    var ID = get("User_ID", 2000 * 60 * 60);
    var Image = get("User_Image", 2000 * 60 * 60);
    var Tokens = get("Token", 2000 * 60 * 60);
    $(".head-parent").mouseover(function () {
        if (ID != null || Name != null || Image != null || Tokens != null) {
            $(".head-parent").attr("class", "head-parent head-account-parent head-hover-on");
            $(".account-drop-logged-in").removeClass("abc");
            $(".account-drop-logged-in").addClass("aabb");
        } else {
            $(".head-parent").attr("class", "head-parent head-mybeatport-parent head-hover-on");
        }
    })
    $(".mybeatport-logged-out-zero").mouseover(function () {
        if (ID != null || Name != null || Image != null || Tokens != null) {
            $(".head-parent").attr("class", "head-parent head-account-parent head-hover-on");
            $(".account-drop-logged-in").removeClass("abc");
            $(".account-drop-logged-in").addClass("aabb");
        } else {
            $(".head-parent").attr("class", "head-parent head-mybeatport-parent head-hover-on");
        }
    })

    $(".mybeatport-logged-out-zero").mouseout(function () {
        if (ID != null || Name != null || Image != null || Tokens != null) {
            $(".head-parent").attr("class", "head-parent head-account-parent head-hover-on");
            $(".account-drop-logged-in").removeClass("aabb");
            $(".account-drop-logged-in").addClass("abc");
        } else {
            $(".head-parent").attr("class", "head-parent head-account-parent");
        }
    })
    $(".head-parent").mouseout(function () {
        if (ID != null || Name != null || Image != null || Tokens != null) {
            $(".head-parent").attr("class", "head-parent head-account-parent head-hover-on");
            $(".account-drop-logged-in").removeClass("aabb");
            $(".account-drop-logged-in").addClass("abc");
        } else {
            $(".head-parent").attr("class", "head-parent head-account-parent");
        }
    })
})

/* 打开model*/
$(".head-mybeatport-link").click(function () {
    var name = "";
    var password = "";
    // 获取Cookie中的 信息
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        name = GetCookie("name");
        password = GetCookie("password");
        /* 调用 login.js*/
        $.getScript("/MusicStyle/js/login/login.js", function () {
            // 获取本地 localStorage 数据
            var User_Name = get("User_Name", 2000 * 60 * 60);
            var User_ID = get("User_ID", 2000 * 60 * 60);
            var User_Image = get("User_Image", 2000 * 60 * 60);
            var Token = get("Token", 2000 * 60 * 60);
            if (User_ID == null || User_Name == null || User_Image == null || Token == null) {
                // 跳出登陆model
                var loginModel = document.createElement('div');
                loginModel.className = "modal";
                loginModel.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Please login</h1>' +
                    '<a onclick="Close()" id="Close" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                    '<div class="existing-users"><h2>现有用户</h2><form class="modal-login-signup-form"><p class="login-form-error-message">' +
                    '<span class="icon icon-dead-robot-head"></span><span class="login-form-error-message-text">无效登录。请再试一次.</span></p>' +
                    '<input type="text" name="username" placeholder="Username" required="" value="' + name + '"><input type="password" name="password" placeholder="Password" value="' + password + '" autocomplete="off" required="">' +
                    '<div class="forgot-login-link-parent"><span class="Error_Prompt" style="float: left;color: red;position: relative;top: -5px;"></span><a href="javascript:void(0)" onclick="Forget_password()" class="forgot-login-link">忘了密码？</a>' +
                    '</div><div class="login-remember-parent"><input type="button" class="blue-button login" value="Log In"><div class="remember-me-parent">' +
                    '<input type="checkbox" class="remember-me-checkbox"><label class="remember-me-label">记着我</label></div></div></form>' +
                    '</div><div class="new-users"><h2>新用户</h2><a href="javascript:void(0);" onclick="LoadRegistrationPage();" class="green-button">创建帐户</a>' +
                    '</div></div></div></div>';
                document.body.appendChild(loginModel);
                // 回车确定
                $("input[name=password]").keypress(function (e) {
                    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
                    if (eCode == 13) {
                        // 获取用户名和密码
                        var name = $("input[name=username]").val();
                        var password = $("input[name=password]").val();
                        // 调用 用户登陆
                        user_login(name, password);
                    }
                })


                // 点击 login 事件
                $(".login").click(function () {
                    // 获取用户名和密码
                    var name = $("input[name=username]").val();
                    var password = $("input[name=password]").val();
                    // 调用 用户登陆
                    user_login(name, password);
                });
            } else {
                /* 验证用户名 等于 用户输入的用户名*/
                if (User_Name == name) {
                    // 存在本地数据
                    // 删除model
                    $(".modal").remove();
                    // 修改用户头部
                    User_head(User_Name, User_Image, get("User_ID", 2000 * 60 * 60), Token);
                }
            }
        })
    });
});

/* 搜索功能*/
$("input[name=Search]").keypress(function (e) {
    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    if (eCode == 13) {
        /* 验证Key是否合法*/
        var Key = $("input[name=Search]").val();
        if (Key.match(/^\s+$/) || Key.match(/^[ ]+$/)
            || Key.match(/^[ ]/)
            || Key.match(/^[ ]*$/)
            || Key.match(/^\s*$/)) {
            // 跳出Error model
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'String unlawful</div></div>';
            document.body.appendChild(oDiv);
        } else {
            $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
                var User_Name = get("User_Name", 2000 * 60 * 60);
                var User_ID = get("User_ID", 2000 * 60 * 60);
                var User_Image = get("User_Image", 2000 * 60 * 60);
                var Token = get("Token", 2000 * 60 * 60);
                /* 加载 loading*/
                $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
                // 调取接口获取结果的数量
                $.post("/SongInfo/The_number_of_search_results", {
                    Key: Key,
                    Token: get("Token", 2000 * 60 * 60),
                    UserID: get("User_ID", 2000 * 60 * 60)
                }, function (result) {
                    $.each(JSON.parse(result), function (i, ResultsNumber) {
                        if (ResultsNumber.Error == null) {
                            // 获取成功
                            layui.use(['laypage', 'layer'], function () {
                                var laypage = layui.laypage
                                    , layer = layui.layer;
                                laypage.render({
                                    elem: 'PageCodeTail'
                                    , count: ResultsNumber.ResultsNumber//数据总数
                                    , groups: 4 // 连续显示分页数
                                    , curr: 1 // 设置当前页
                                    , limit : 30
                                    //,skin: 'pag-number'   //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                                    , prev: '<P class="icon icon-scroll-left"></P>' //若不显示，设置false即可
                                    , next: '<P class="icon icon-scroll-right"></P>'//若不显示，设置false即可
                                    , jump: function (obj) {
                                        /* 加载 loading*/
                                        $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
                                        $.post("/SongInfo/SongInfo_Search", {
                                            Key: Key,
                                            Page: obj.curr,
                                            User_ID: get("User_ID", 2000 * 60 * 60),
                                            Token: get("Token", 2000 * 60 * 60)
                                        }, function (PageResults) {
                                            $("#ReleasesAll").html("");
                                            $.each(JSON.parse(PageResults), function (i, PageResult) {
                                                // 取出搜索结果
                                                if (PageResult.Error == null) {
                                                    // 关闭loading
                                                    $(".load").css("display", "none");
                                                    Song_list(PageResult);
                                                } else {
                                                    // 关闭loading
                                                    $(".load").css("display", "none");
                                                    var oDiv = document.createElement('div');
                                                    oDiv.className = "modal";
                                                    oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                                        '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                                        PageResult.Error + '</div></div>';
                                                    document.body.appendChild(oDiv);
                                                    if (PageResult.Error == "Current connection is unlawful") {
                                                        // 删除 localStorage
                                                        remove();
                                                        var oDiv = document.createElement('div');
                                                        oDiv.className = "modal";
                                                        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                                            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                                            'Current Token illegality</div></div>';
                                                        document.body.appendChild(oDiv);
                                                        $(".head-parent").attr("class", "head-parent head-mybeatport-parent");
                                                        $(".head-parent").html('<span data-href="/my-beatport" class="head-mybeatport-link">' +
                                                            '<svg viewBox="0 0 200 200" class="head-mybeatport-icon">' +
                                                            '<embed src="/MusicStyle/images/login.png" style="height: 28px;width: 28px"/>' +
                                                            '</svg><span class="head-mybeatport-content">My Edmland</span></span>' +
                                                            '<div class="head-drop mybeatport-drop header-tooltip-menu">' +
                                                            '<div class="mybeatport-logged-out-zero"><h2>Log in to start using My Edmland!</h2>' +
                                                            '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                                                            'and labels so you can find out when they release new tracks. Log in or create an' +
                                                            'account today so you never miss a new release.</p>' +
                                                            '<a href="javascript:void(0)" onclick="LoadRegistrationPage()" class="button button--large" style="">Create an Account</a>' +
                                                            '<p class="login-link-parent">Already have an account? <a href="javascript:void(0);" onclick="loginPage();" ' +
                                                            'class="blue-button head-mybeatport-zero-button" style="">Log In</a></p>' +
                                                            '</div><div class="mybeatport-logged-in-zero"><h6>You\'re not following anyone yet!</h6>' +
                                                            '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                                                            'and labels so you can find out when they release new tracks. So go follow' +
                                                            'someone!</p>' +
                                                            '</div><div class="mybeatport-logged-in-data"><a href="/my-beatport" class="mobile-mybeatport-drop-link" style="">View My Edmland</a>' +
                                                            '<div class="head-mybeatport-filter-parent"><input type="text" class="head-mybeatport-filter" placeholder="FILTER">' +
                                                            '</div><div class="head-mybeatport-artists-parent"><h3>My Artists' +
                                                            '<a href="/my-beatport/artists" class="view-more-link" style="">View All</a>' +
                                                            '</h3><hr><ul class="head-mybeatport-artists">' +
                                                            '</ul></div><div class="head-mybeatport-labels-parent"><h3>' +
                                                            'My Labels<a href="/my-beatport/labels" class="view-more-link" style="">View All</a></h3>' +
                                                            '<hr><ul class="head-mybeatport-labels"></ul></div></div></div></div>');
                                                    }
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        } else {
                            // 获取失败
                            if (ResultsNumber.Error == "Current Token illegality") {
                                remove();
                                var oDiv = document.createElement('div');
                                oDiv.className = "modal";
                                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                    'Current Token illegality</div></div>';
                                document.body.appendChild(oDiv);
                                $(".head-parent").attr("class", "head-parent head-mybeatport-parent");
                                $(".head-parent").html('<span data-href="/my-beatport" class="head-mybeatport-link">' +
                                    '<svg viewBox="0 0 200 200" class="head-mybeatport-icon">' +
                                    '<embed src="/MusicStyle/images/login.png" style="height: 28px;width: 28px"/>' +
                                    '</svg><span class="head-mybeatport-content">My Edmland</span></span>' +
                                    '<div class="head-drop mybeatport-drop header-tooltip-menu">' +
                                    '<div class="mybeatport-logged-out-zero"><h2>Log in to start using My Edmland!</h2>' +
                                    '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                                    'and labels so you can find out when they release new tracks. Log in or create an' +
                                    'account today so you never miss a new release.</p>' +
                                    '<a href="javascript:void(0)" onclick="LoadRegistrationPage()" class="button button--large" style="">Create an Account</a>' +
                                    '<p class="login-link-parent">Already have an account? <a href="javascript:void(0);" onclick="loginPage();" ' +
                                    'class="blue-button head-mybeatport-zero-button" style="">Log In</a></p>' +
                                    '</div><div class="mybeatport-logged-in-zero"><h6>You\'re not following anyone yet!</h6>' +
                                    '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                                    'and labels so you can find out when they release new tracks. So go follow' +
                                    'someone!</p>' +
                                    '</div><div class="mybeatport-logged-in-data"><a href="/my-beatport" class="mobile-mybeatport-drop-link" style="">View My Edmland</a>' +
                                    '<div class="head-mybeatport-filter-parent"><input type="text" class="head-mybeatport-filter" placeholder="FILTER">' +
                                    '</div><div class="head-mybeatport-artists-parent"><h3>My Artists' +
                                    '<a href="/my-beatport/artists" class="view-more-link" style="">View All</a>' +
                                    '</h3><hr><ul class="head-mybeatport-artists">' +
                                    '</ul></div><div class="head-mybeatport-labels-parent"><h3>' +
                                    'My Labels<a href="/my-beatport/labels" class="view-more-link" style="">View All</a></h3>' +
                                    '<hr><ul class="head-mybeatport-labels"></ul></div></div></div></div>');
                            }
                            // 显示失败model
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                ResultsNumber.Error + '</div></div>';
                            document.body.appendChild(oDiv);
                        }
                        // 关闭loading
                        $(".load").css("display", "none");
                    });
                });
            })
        }
    }
})

/* 用户头部标签*/
function User_head(User_Name, User_Img, User_ID, Token) {
    // 验证Token
    $.post("/Token/Verify_Token", {
        Token: Token,
        User_ID: User_ID
    }, function (VerificationResult) {
        $.each(JSON.parse(VerificationResult), function (i, result) {
            if (result.State == "true") {
                $(".head-parent").attr("class", "head-parent head-account-parent");
                $(".head-parent").html('<span data-href="javascript:void(0)" onclick="Load_AccountSettings()" class="head-account-link">' +
                    '<span class="head-account-user-image" style="display: none;"></span>' +
                    '<span class="head-account-default-image" style="display: inline-block;background: none;"><img src="' + User_Img + '" alt=""></span>' +
                    '<span class="head-account-content">' + User_Name + '</span></span>' +
                    '<div class="head-drop account-drop header-tooltip-menu">' +
                    '<div class="account-drop-logged-in" style="display: block;">' +
                    '<a href="javascript:void(0)" onclick="Load_AccountSettings()" style="">Account Settings</a>' +
                    '<a href="javascript:void(0)" onclick="Historical_Download()"  style="">My Downloads</a>' +
                    '<a href="javascript:void(0)" onclick="MyCharts()"  style="">My Charts</a>' +
                    '<a href="javascript:void(0)" onclick="Membershop()" style="">Membershop</a>'+
                    '<a class="log-out" style="" onclick="logout()">Log Out</a>' +
                    '</div></div></div>');
            } else {
                var oDiv = document.createElement('div');
                oDiv.className = "modal";
                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                    'Current Token illegality</div></div>';
                document.body.appendChild(oDiv);
                logout();
            }
        });
    });
}


/* 用户退出事件*/
function logout() {
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        // 删除 本地存储
        remove();
        // 等待登陆的头部标签
        $(".head-parent").attr("class", "head-parent head-mybeatport-parent");
        $(".head-parent").html('<span data-href="/my-beatport" class="head-mybeatport-link">' +
            '<svg viewBox="0 0 200 200" class="head-mybeatport-icon">' +
            '<embed src="/MusicStyle/images/login.png" style="height: 28px;width: 28px"/>' +
            '</svg><span class="head-mybeatport-content">My Edmland</span></span>' +
            '<div class="head-drop mybeatport-drop header-tooltip-menu">' +
            '<div class="mybeatport-logged-out-zero"><h2>Log in to start using My Edmland!</h2>' +
            '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
            'and labels so you can find out when they release new tracks. Log in or create an' +
            'account today so you never miss a new release.</p>' +
            '<a href="javascript:void(0)" onclick="LoadRegistrationPage()" class="button button--large" style="">Create an Account</a>' +
            '<p class="login-link-parent">Already have an account? <a href="javascript:void(0);" onclick="loginPage();" ' +
            'class="blue-button head-mybeatport-zero-button" style="">Log In</a></p>' +
            '</div><div class="mybeatport-logged-in-zero"><h6>You\'re not following anyone yet!</h6>' +
            '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
            'and labels so you can find out when they release new tracks. So go follow' +
            'someone!</p>' +
            '</div><div class="mybeatport-logged-in-data"><a href="/my-beatport" class="mobile-mybeatport-drop-link" style="">View My Edmland</a>' +
            '<div class="head-mybeatport-filter-parent"><input type="text" class="head-mybeatport-filter" placeholder="FILTER">' +
            '</div><div class="head-mybeatport-artists-parent"><h3>My Artists' +
            '<a href="/my-beatport/artists" class="view-more-link" style="">View All</a>' +
            '</h3><hr><ul class="head-mybeatport-artists">' +
            '</ul></div><div class="head-mybeatport-labels-parent"><h3>' +
            'My Labels<a href="/my-beatport/labels" class="view-more-link" style="">View All</a></h3>' +
            '<hr><ul class="head-mybeatport-labels"></ul></div></div></div></div>');
    });
}

function Song_list(Song_Info) {
    $("#ReleasesAll").append("<li class=\"bucket-item ec-item horz-release\" data-song-id='" + Song_Info.song_ID + "' data-song-name='" + Song_Info.song_Name + "' data-song-artists='" + Song_Info.song_Artists + "'" +
        " data-song-label='" + Song_Info.song_Label + "' data-song-genre='" + Song_Info.song_Genre + "' data-song-releasedtime='" + Song_Info.song_ReleasedTime + "'" +
        " data-song-type='" + Song_Info.song_Type + "' data-song-img='" + Song_Info.song_Imge + "' ><div class=\"horz-release-artwork-parent\"><a href=\"#\"><img class=\"horz-release-artwork\" src=\"" + Song_Info.song_Imge + "\"></a></div><div class=\"horz-release-meta-parent\"><div class=\"horz-release-meta\"><p class=\"buk-horz-release-title\"><a href=\"#\"><trans>" + Song_Info.song_Name + "</trans></a></p><p class=\"buk-horz-release-artists\"><a href=\"#\"><trans>" + Song_Info.song_Artists + "</trans></a></p><p class=\"buk-horz-release-labels\"><a href=\"#\" data-item='" + Song_Info.song_Label + "' data-classname='Song_Label' onclick=\"Classification(this)\"><trans>" + Song_Info.song_Label + "</trans></a></p><p class=\"buk-horz-release-released\">" + Song_Info.song_ReleasedTime + "</p></div><div class=\"horz-release-actions-parent\"><div class=\"horz-release-actions\"><div class=\"horz-release-play-queue\"><button class=\"playable-play\" onclick=\"Auditions(" + Song_Info.song_ID + ")\" data-release=\"2284991\" data-track=\"10563140\"><i class='fa fa-caret-right'></i></button><button class=\"playable-queue\" data-release=\"2284991\" data-track=\"10563140\" onclick='Collection(this)'><i class='fa fa-server cunAn'></i></button></div><div class=\"buy-button horz-release-buy-button\" onclick=\"PlayPanelDownload(this)\"><button class=\"add-to-default\">Mp3</button><button class=\"launch-menu\"><i class='fa fa-cloud-download xia'></i></div></div><a href=\"#\" class=\"icon icon-ellipsis horz-release-ellipsis mobile-action\"></a></div></div></li>");
}

/* 动态添加js/css文件*/
function loadjscssfile(filename, filetype) {
    if (filetype == "js") {
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") {
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

/* Music面板下载*/
function PlayPanelDownload(obj) {
    Download($(obj).parent().parent().parent().parent().data("song-id"), obj)
}

/* 播放列表*/
function PlaylistDownload(obj) {
    Download($(obj).parent().parent().data("song-id"), obj)
}

/* 音频控制器中的下载*/
function ControllerDownload(obj) {
    Download($(obj).parent().parent().prev().prev().data("song-id"), obj)
}

function funDownload(content, filename) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    eleLink.href = content;
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};

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
 * 页面打包下载
 */
function packDownload() {

    let songId = [];
    let taoqu = false;
    $("#ReleasesAll").find("li").each(function () {
        if ($(this).data("song-type") == "套曲" || $(this).data("song-genre") == "套曲"){
            taoqu = true;
        } else {
	    songId.push($(this).data("song-id"));
	}
    })

    // 加载 loading
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");

    // 获取用户信息
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        var User_Name = get("User_Name", 2000 * 60 * 60);
        var User_ID = get("User_ID", 2000 * 60 * 60);
        var User_Image = get("User_Image", 2000 * 60 * 60);
        var Token = get("Token", 2000 * 60 * 60);
        if (User_Name != null && User_ID != null && Token != null) {
            $.post('/SongInfo/homeDownload', {
                "User_ID": get("User_ID", 2000 * 60 * 60),
                "Song_ID": JSON.stringify(songId)
            }, function (Result) {
                // 关闭loading
                $(".load").css("display", "none");
                let res = JSON.parse(Result);
                console.info(res);
                if (res.code == "0") {
                    downloadFile(res.data);
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


/* 配置下载按钮*/
function Download(songid, obj) {
    // 加载 loading
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    // 获取用户信息
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        var User_Name = get("User_Name", 2000 * 60 * 60);
        var User_ID = get("User_ID", 2000 * 60 * 60);
        var User_Image = get("User_Image", 2000 * 60 * 60);
        var Token = get("Token", 2000 * 60 * 60);
        if (User_Name != null && User_ID != null && Token != null) {

            $.ajax({
                type: "POST",
                data: {
                    "User_ID": get("User_ID", 2000 * 60 * 60),
                    "Token": get("Token", 2000 * 60 * 60),
                    "Song_ID": songid
                },
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                scriptCharset: 'utf-8',
                url: "/SongInfo/Get_Downloadaddress",
                success: function (VerificationResult) {
                    // 关闭loading
                    $(".load").css("display", "none");

                    // let res = JSON.parse(Result);
                    // console.info(res);
                    // if (res.code == "0") {
                    //     downloadFile(res.data);
                    //
                    // } else {
                    //     // 打印错误信息
                    //     var oDiv = document.createElement('div');
                    //     oDiv.className = "modal";
                    //     oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                    //         '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                    //         res.message + '</div></div>';
                    //     document.body.appendChild(oDiv);
                    // }


                    $.each(JSON.parse(VerificationResult), function (i, result) {
                        if (result.State == null || result.State == "") {
                            // 没有下载链接
                            if (result.File_Address == "There is no download link for this music") {
                                var oDiv = document.createElement('div');
                                oDiv.className = "modal";
                                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                    'There is no download link for this music</div></div>';
                                document.body.appendChild(oDiv);
                            } else {
                                funDownload(result.File_Address, result.File_Address.split("/").pop())
                            }
                        } else {
                            // Token 不通过
                            if (result.State == "Current Token illegality") {
                                // 执行退出操作
                                logout();
                            }
                            // 打印错误信息
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                result.State + '</div></div>';
                            document.body.appendChild(oDiv);
                        }
                    });

                }
            });
        } else {
            // 关闭loading
            $(".load").css("display", "none");
            // 打印错误信息
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'You have to log in before you can download it</div></div>';
            document.body.appendChild(oDiv);
        }
    })
}

/* 分类 js*/
function Classification(obj) {
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        // 加载 loading
        $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
        var item = $(obj).data("item");

        var classname = $(obj).data("classname");
        if (classname == "Release Date") {
            if (item == "Today") {
                FixedTime("Today");
            } else if (item == "Yesterday") {
                FixedTime("Yesterday");
            } else if (item == "Last_7Days") {
                FixedTime("Last_7Days");
            } else if (item == "Last_30Days") {
                FixedTime("Last_30Days");
            }
        } else {
            // 获取总的数量
            $.post("/SongInfo/Classification_conditions_Total_Number", {
                item: item,
                classname: classname
            }, function (The_number_of_search_resultsResult) {
                $.each(JSON.parse(The_number_of_search_resultsResult), function (i, The_number_of_search_results) {
                    if (The_number_of_search_results.Result != null) {
                        // 取出 第一页
                        layui.use(['laypage', 'layer'], function () {
                            var laypage = layui.laypage
                                , layer = layui.layer;
                            laypage.render({
                                elem: 'PageCodeTail'
                                , count: The_number_of_search_results.Result//数据总数
                                , groups: 4 // 连续显示分页数
                                , curr: 1 // 设置当前页
                                , limit : 30
                                , prev: '<P class="icon icon-scroll-left"></P>' //若不显示，设置false即可
                                , next: '<P class="icon icon-scroll-right"></P>'//若不显示，设置false即可
                                , jump: function (PageData) {
                                    // 加载 loading
                                    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
                                    $.post("/SongInfo/Definition_classification", {
                                        item: item,
                                        classname: classname,
                                        UserID: get("User_ID", 2000 * 60 * 60),
                                        Token: get("Token", 2000 * 60 * 60),
                                        Page: PageData.curr
                                    }, function (Definition_classificationResults) {
                                        $("#ReleasesAll").html("");
                                        $.each(JSON.parse(Definition_classificationResults), function (i, ClassificationInfo) {
                                            if (ClassificationInfo.Error == null) {
                                                // 获取成功
                                                Song_list(ClassificationInfo);
                                            } else {
                                                if (ClassificationInfo.Error == "Current Token illegality") {
                                                    remove();
                                                }
                                                var oDiv = document.createElement('div');
                                                oDiv.className = "modal";
                                                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                                    ClassificationInfo.Error + '</div></div>';
                                                document.body.appendChild(oDiv);
                                            }
                                        });
                                    });
                                    // 关闭loading
                                    $(".load").css("display", "none");
                                }
                            });
                        });
                    } else {
                        // 打印错误信息
                        var oDiv = document.createElement('div');
                        oDiv.className = "modal";
                        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                            'There are some unknown mistakes</div></div>';
                        document.body.appendChild(oDiv);
                    }
                });
            });
            // 关闭loading
            $(".load").css("display", "none");
        }
    });
}

/* 清除所有*/
function ResetAll() {
    // 加载 loading
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    /* 获取首页第一页*/
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        scriptCharset: 'utf-8',
        url: "/Paging_Action/Songs_TotalNumber",
        success: function (Pagedata) {
            $.each(JSON.parse(Pagedata), function (i, PageInfo) {
                if (PageInfo.State == "Current connection is unlawful") {
                    // 链接非法
                    var oDiv = document.createElement('div');
                    oDiv.className = "modal";
                    oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                        '<a href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                        PageInfo.Error + '</div></div>';
                    document.body.appendChild(oDiv);
                } else if (PageInfo.State == "The token has failed") {
                    // Token 已失效
                    var oDiv = document.createElement('div');
                    oDiv.className = "modal";
                    oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                        '<a href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                        PageInfo.State + '</div></div>';
                    document.body.appendChild(oDiv);
                    // 删除 localStorage
                    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
                        remove();
                        var oDiv = document.createElement('div');
                        oDiv.className = "modal";
                        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                            '<a onclick="Close()" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                            'Current Token illegality</div></div>';
                        document.body.appendChild(oDiv);
                        $(".head-parent").attr("class", "head-parent head-mybeatport-parent");
                        $(".head-parent").html('<span data-href="/my-beatport" class="head-mybeatport-link">' +
                            '<svg viewBox="0 0 200 200" class="head-mybeatport-icon">' +
                            '<embed src="/MusicStyle/images/login.png" style="height: 28px;width: 28px"/>' +
                            '</svg><span class="head-mybeatport-content">My Edmland</span></span>' +
                            '<div class="head-drop mybeatport-drop header-tooltip-menu">' +
                            '<div class="mybeatport-logged-out-zero"><h2>Log in to start using My Edmland!</h2>' +
                            '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                            'and labels so you can find out when they release new tracks. Log in or create an' +
                            'account today so you never miss a new release.</p>' +
                            '<a href="javascript:void(0)" onclick="LoadRegistrationPage()" class="button button--large" style="">Create an Account</a>' +
                            '<p class="login-link-parent">Already have an account? <a href="javascript:void(0);" onclick="loginPage();" ' +
                            'class="blue-button head-mybeatport-zero-button" style="">Log In</a></p>' +
                            '</div><div class="mybeatport-logged-in-zero"><h6>You\'re not following anyone yet!</h6>' +
                            '<p class="head-mybeatport-zero-message">My Edmland lets you follow your favorite DJs' +
                            'and labels so you can find out when they release new tracks. So go follow' +
                            'someone!</p>' +
                            '</div><div class="mybeatport-logged-in-data"><a href="/my-beatport" class="mobile-mybeatport-drop-link" style="">View My Edmland</a>' +
                            '<div class="head-mybeatport-filter-parent"><input type="text" class="head-mybeatport-filter" placeholder="FILTER">' +
                            '</div><div class="head-mybeatport-artists-parent"><h3>My Artists' +
                            '<a href="/my-beatport/artists" class="view-more-link" style="">View All</a>' +
                            '</h3><hr><ul class="head-mybeatport-artists">' +
                            '</ul></div><div class="head-mybeatport-labels-parent"><h3>' +
                            'My Labels<a href="/my-beatport/labels" class="view-more-link" style="">View All</a></h3>' +
                            '<hr><ul class="head-mybeatport-labels"></ul></div></div></div></div>');
                    })
                } else {
                    PagingModule(PageInfo.Songs_TotalNumber, 1)
                }
            });
            // 关闭loading
            $(".load").css("display", "none");
        }
    });
}

/* 加载日期*/
function LoadDateControl(obj, panel) {
    /* 加载日期控件*/
    $.getScript("/MusicStyle/js/schedule.js", function () {
        var mySchedule = new Schedule({
            el: panel,
            //date: '2018-9-20',
            clickCb: function (y, m, d) {
                $(obj).attr("value", y + '-' + m + '-' + d);
            },
            nextMonthCb: function (y, m, d) {
                $(obj).attr("value", y + '-' + m + '-' + d);
            },
            nextYeayCb: function (y, m, d) {
                $(obj).attr("value", y + '-' + m + '-' + d);
            },
            prevMonthCb: function (y, m, d) {
                $(obj).attr("value", y + '-' + m + '-' + d);
            },
            prevYearCb: function (y, m, d) {
                $(obj).attr("value", y + '-' + m + '-' + d);
            }
        });
    });
}

/* 固定时间*/
function FixedTime(Time) {
    if (Time == "Today") {
        // 获取  当前苏宁易购  网络时间
        $.getJSON("http://quan.suning.com/getSysTime.do", function (data) {
            // 转换时间格式,获取数据
            Date_Classification_Data(formatDate(data.sysTime2, 'YY-MM-DD'), formatDate(data.sysTime2, 'YY-MM-DD'));
        });
    } else if (Time == "Yesterday") {
        $.getJSON("http://quan.suning.com/getSysTime.do", function (data) {
            // 获取昨天的时间
            Date_Classification_Data(AddDays(data.sysTime2, -1), AddDays(data.sysTime2, -1));
        });
    } else if (Time == "Last_7Days") {
        $.getJSON("http://quan.suning.com/getSysTime.do", function (data) {
            // 获取后面7天的日期
            Date_Classification_Data(AddDays(data.sysTime2, -7), data.sysTime2);
        });
    } else if (Time == "Last_30Days") {
        $.getJSON("http://quan.suning.com/getSysTime.do", function (data) {
            // 获取后面30天的日期
            Date_Classification_Data(AddDays(data.sysTime2, -30), data.sysTime2);
        });
    }
}

/* 获取开始结束时间*/
function DateQueryAPI() {
    // 拿到 开始日期 和 结束 日期
    var start = $("#P856329471").val();
    var end = $("#P102947222").val();
    Date_Classification_Data(start, end);
}

/* 获取时间分类数据*/
function Date_Classification_Data(start, end) {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        // 获取总数
        $.post("/SongInfo/Time_Classification_TotalNumber", {
            START: start,
            END: end
        }, function (Time_Classification_TotalNumber) {
            $.each(JSON.parse(Time_Classification_TotalNumber), function (i, Time_Classification_TotalNumber_Result) {
                if (Time_Classification_TotalNumber_Result.Result != null) {
                    if (Time_Classification_TotalNumber_Result.Result == 0) {
                        var oDiv = document.createElement('div');
                        oDiv.className = "modal";
                        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                            'The search results are empty</div></div>';
                        document.body.appendChild(oDiv);
                    }
                    layui.use(['laypage', 'layer'], function () {
                        var laypage = layui.laypage
                            , layer = layui.layer;
                        laypage.render({
                            elem: 'PageCodeTail'
                            , count: Time_Classification_TotalNumber_Result.Result//数据总数
                            , groups: 4 // 连续显示分页数
                            , curr: 1 // 设置当前页
                            , limit : 30
                            , prev: '<P class="icon icon-scroll-left"></P>' //若不显示，设置false即可
                            , next: '<P class="icon icon-scroll-right"></P>'//若不显示，设置false即可
                            , jump: function (PageData) {
                                /* 加载 loading*/
                                $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
                                $.post("/SongInfo/DateQuery", {
                                    START: start,
                                    END: end,
                                    User_ID: get("User_ID", 2000 * 60 * 60),
                                    Token: get("Token", 2000 * 60 * 60),
                                    Page: PageData.curr
                                }, function (DateQueryResults) {
                                    $("#ReleasesAll").html("");
                                    $.each(JSON.parse(DateQueryResults), function (i, DateQueryResultsInfo) {
                                        if (DateQueryResultsInfo.Error == null) {
                                            // 获取成功
                                            Song_list(DateQueryResultsInfo);
                                        } else {
                                            if (DateQueryResultsInfo.Error == "Current Token illegality") {
                                                remove();
                                            }
                                            var oDiv = document.createElement('div');
                                            oDiv.className = "modal";
                                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                                DateQueryResultsInfo.Error + '</div></div>';
                                            document.body.appendChild(oDiv);
                                        }
                                    });
                                    // 关闭loading
                                    $(".load").css("display", "none");
                                });
                            }
                        });
                    });
                }
            });
            // 关闭loading
            $(".load").css("display", "none");
        });
    });
}

/* 格式化时间格式*/
function formatDate(time, format = 'YY-MM-DD hh:mm:ss') {
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });////开个长度为10的数组 格式为 00 01 02 03

    var newTime = format.replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

    // formatDate(new Date().getTime());//2017-05-12 10:05:44
    // formatDate(new Date().getTime(),'YY年MM月DD日');//2017年05月12日
    // formatDate(new Date().getTime(),'今天是YY/MM/DD hh:mm:ss');//今天是2017/05/12 10:07:45
    return newTime;
}
/* 时间加减*/
function AddDays(date, days) {
    var nd = new Date(date);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);
    //alert(nd.getFullYear() + "年" + (nd.getMonth() + 1) + "月" + nd.getDate() + "日");
    var y = nd.getFullYear();
    var m = nd.getMonth() + 1;
    var d = nd.getDate();
    if (m <= 9) m = "0" + m;
    if (d <= 9) d = "0" + d;
    var cdate = y + "-" + m + "-" + d;
    return cdate;
}
/* 菜单栏方法*/
function menu() {
    $(".nav-links ul").html("");// 清空头部菜单
    $(".Company").html("");// 清空公司COMPANY
    $(".NETWORK").html("");// 清空网络NETWORK
    $(".Technical-support").html("");// 清空友情链接Friendship link
    /* 加载菜单栏*/
    $.post("/HomePage/Home_header", function (Results) {
        $.each(JSON.parse(Results), function (i, Home_header) {
            if (Home_header.Error == null) {
                // 判断 所有 头部菜单只能有 9 个
                if(Home_header.article_Status=="发布"){
                    if(Home_header.position=="head"){
                        // 排行榜
                        if (Home_header.fixed_link == 'top100'){
                            $(".nav-links ul").append('<li class="">' +
                                '<a class="header-container__link" href="javascript:void(0)" ' +
                                'target="_Blank" onclick="getTop();">'+Home_header.label+'</a>' +
                                '</li>')
                        } else {
                            // 获取所有头部菜单名  赋值头部菜单li
                            $(".nav-links ul").append('<li class="">' +
                                '<a class="header-container__link" href="'+Home_header.fixed_link+'" data-articleid="'+Home_header.article_ID+'"' +
                                'target="_Blank" style="">'+Home_header.label+'</a>' +
                                '</li>')
                        }
                    }else if(Home_header.position=="tail"){
                        // 公司  COMPANY
                        if(Home_header.degree_Openness=="COMPANY"){

                            if (Home_header.fixed_link == 'top100'){
                                $(".Company").append('<li class="footer-list-item">' +
                                    '<a class="footer-link" href="javascript:void(0)" ' +
                                    'target="_Blank" style="" onclick="getTop();">'+Home_header.label+'</a>' +
                                    '</li>')
                            } else {
                                $(".Company").append('<li class="footer-list-item">' +
                                    '<a class="footer-link" href="'+Home_header.fixed_link+'" data-articleid="'+Home_header.article_ID+'"' +
                                    'target="_Blank" style="">'+Home_header.label+'</a>' +
                                    '</li>')
                            }
                            // 网络  NETWORK
                        }else if(Home_header.degree_Openness=="NETWORK"){
                            if (Home_header.fixed_link == 'top100'){
                                $(".NETWORK").append('<li class="footer-list-item">' +
                                    '<a class="footer-link" href="javascript:void(0)" data-articleid="'+Home_header.article_ID+'"' +
                                    'target="_Blank" style="" onclick="getTop();">'+Home_header.label+'</a>' +
                                    '</li>')
                            } else {
                                $(".NETWORK").append('<li class="footer-list-item">' +
                                    '<a class="footer-link" href="'+Home_header.fixed_link+'" data-articleid="'+Home_header.article_ID+'"' +
                                    'target="_Blank" style="">'+Home_header.label+'</a>' +
                                    '</li>')
                            }
                            // 友情链接Friendship link
                        }else if(Home_header.degree_Openness=="Friendship link"){
                            if (Home_header.fixed_link == 'top100'){
                                $(".Technical-support").append('<li class="footer-list-item">' +
                                    '<a class="footer-link" href="javascript:void(0)" data-articleid="'+Home_header.article_ID+'"' +
                                    'target="_Blank" style="" onclick="getTop();">'+Home_header.label+'</a>' +
                                    '</li>')
                            } else {
                                $(".Technical-support").append('<li class="footer-list-item">' +
                                    '<a class="footer-link" href="'+Home_header.fixed_link+'" data-articleid="'+Home_header.article_ID+'"' +
                                    'target="_Blank" style="">'+Home_header.label+'</a>' +
                                    '</li>')
                            }
                        }
                    }
                }
            }
        });
    });
}
/* 加载 登陆页面*/
function loginPage(){
    // 不跳转页面 防止用户听歌 被打断
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    // 查看 本地数据
    $.getScript("/MusicStyle/js/login/login.js", function () {
        var Name = get("User_Name", 2000 * 60 * 60);
        var ID = get("User_ID", 2000 * 60 * 60);
        var Image = get("User_Image", 2000 * 60 * 60);
        var Tokens = get("Token", 2000 * 60 * 60);
        /* 判断用户登陆 取出本地数据*/
        if (ID != null || Name != null || Image != null || Tokens != null) {
            // 修改用户头部
            User_head(Name, Image, ID, Tokens);
        }else{
            // 关闭 播放面板
            $("#pjax-inner-wrapper").hide();
            // 关闭 分类  选项
            $(".Classification").hide();
            // 修改 登陆/注册  页面
            $(".page-content-container").html('<main class="interior misc-account login-page">' +
                '<div class="small-mid-col"><h1>登陆</h1>' +
                '<div class="misc-account-content">' +
                '<div class="login-page-form">' +
                '<input class="login-page-form-username" placeholder="USERNAME" type="text" id="login-label-username" value="">' +
                '<input autocomplete="off" class="login-page-form-password" id="login-label-password" name="login-label-password" placeholder="PASSWORD" type="password" value="">' +
                '<div class="login-error-wrapper"><span class="Error_Prompt" style="color: red;float: right;margin-top: -10px;position: relative;top: 14px;"></span></div>' +
                '<a href="javascript:void(0)" onclick="Forget_password()" class="login-page-form-forgot-password">忘记密码?</a>' +
                '<button type="button" value="Log In" class="login-page-form-button">登陆</button>' +
                '<div class="login-page-form-remember">' +
                '<input id="remember-me" name="remember_me" type="checkbox" class="login-page-form-remember-checkbox remember-me-checkbox">' +
                '<label for="remember-me" class="login-page-form-remember-label">记住我</label>' +
                '</div></div>' +
                '<div class="misc-account-content-other-links">还没有账户吗? <a href="javascript:void(0)" onclick="LoadRegistrationPage()">创造一个!</a>' +
                '</div></div></div></main>')


            // 打开 登陆/注册  页面
            $(".page-content-container").show();
            $.getScript("/MusicStyle/js/login/login.js", function () {
                // 监听 回车 事件
                $("input[name=login-label-password]").keypress(function (e) {
                    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
                    if (eCode == 13) {
                        // 获取用户名和密码
                        var name = $("#login-label-username").val();
                        var password = $("#login-label-password").val();
                        user_login(name, password);
                    }
                });
                $(".login-page-form-button").click(function () {
                    // 获取用户名和密码
                    var name = $("#login-label-username").val();
                    var password = $("#login-label-password").val();
                    user_login(name, password);
                })
            })
        }
        // 关闭loading
        $(".load").css("display", "none");
    });
}
/* 加载注册页面*/
function LoadRegistrationPage() {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    // 关闭 播放面板
    $("#pjax-inner-wrapper").hide();
    // 关闭 分类  选项
    $(".Classification").hide();
    // 修改 登陆/注册  页面
    $(".page-content-container").html('<main class="interior misc-account signup-page">' +
        '<div class="small-mid-col"><h1>获取访问权限</h1>' +
        '<p class="signup-page-message">欢迎光临 请填写以下字段</p>' +
        '<div class="misc-account-content">' +
        '<div class="signup-page-form">' +
        '<ul class="signup-page-form-list">' +
        '<li class="account-form-item account-form-item-text-box">' +
        '<label class="account-form-label account-form-label-text-box" for="registration-username">选择用户名</label>' +
        '<input class="account-form-value account-form-value-text-box" id="registration-username" name="registration-username" type="text" Onblur="Verifying_username(this)" required="required">' +
        '</li>' +
        '<li class="account-form-item account-form-item-text-box">' +
        '<label class="account-form-label account-form-label-text-box" for="registration-password">选择口令</label>' +
        '<input autocomplete="off" class="account-form-value account-form-value-text-box" id="registration-password" ' +
        'name="password" type="password" value="" required="required" Onblur="Verifying_password(this)" onkeyup="this.value=this.value.replace(/[^\\w]/g,\'\');">' +
        '<p class="signup-page-form-password-explanation">您的密码必须至少有9个字符长，不包含空格。记住，您的密码是区分大小写的。</p>' +
        '</li>' +
        '<li class="account-form-item account-form-item-text-box">' +
        '<label class="account-form-label account-form-label-text-box" for="password_conf">确认密码</label>' +
        '<input autocomplete="off" class="account-form-value account-form-value-text-box" Onblur="Verifying_password_conf(this)" onkeyup="this.value=this.value.replace(/[^\\w]/g,\'\');" id="password_conf" name="password_conf" type="password" required="required">' +
        '</li>' +
        '<li class="account-form-item account-form-item-text-box">' +
        '<label class="account-form-label account-form-label-text-box" for="email_address">电子邮件地址</label>' +
        '<input class="account-form-value account-form-value-text-box" id="email_address" Onblur="Verifying_email_address(this)" name="email_address" type="text" ' +
        'value="" required="required">' +
        '</li>' +
        '<li class="account-form-item account-form-item-text-box">' +
        '<label class="account-form-label account-form-label-text-box" for="email_conf">验证码</label>' +
        '<input class="account-form-value account-form-value-text-box" id="email_conf" onfocus="Judgement_verifying_code()" style="width: 34%;float: left;" name="email_conf" ' +
        'type="text" value="" required="required"><input type="button" id="verificationCode" onclick="verificationCode(this)" value="获取邮箱验证码" style="border: 1px solid #ccc;float:right;height: 26px;width: 18%;background: #fff;">'+
        '</li>' +
        '<li class="account-form-item account-form-item-button-parent">' +
        '<input type="submit" value="Create Account" class="signup-page-form-button green-button" onclick="Submission_Registration()">' +
        '</li>' +
        '</ul></div><div class="misc-account-content-other-links">已经有一个账号了?<a href="javascript:void(0)" onclick="loginPage()">Log in.</a></div></div></div></main>')
    // 打开 登陆/注册  页面
    $(".page-content-container").show();
    // 关闭loading
    $(".load").css("display", "none");
}
function GetCookie(cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if(cookieName == arr[0]){
            return arr[1];
        }
    }
    return "";
}
/* 验证用户名 合法 同时 不存在*/
function Verifying_username(obj) {
    var name = $("#registration-username").val();

    if (name.match(/^\s+$/) || name.match(/^[ ]+$/)
        || name.match(/^[ ]/)
        || name.match(/^[ ]*$/)
        || name.match(/^\s*$/)) {
        Add_ErrorMessage($(obj).parent(),"Your username doesn't meet the criteria")
        return false;
    }else{
        if(name.length>4){
            // 判断用户名是否存在
            $.post("/UserInfo/UserName_IsEmpty",{
                "UserName" : name
            }, function (Results) {
                $.each(JSON.parse(Results), function (i, Info) {
                    if(Info.IsEmpty=="true"){
                        // 存在 相同的用户名
                        Add_ErrorMessage($(obj).parent(),Info.State)
                        return false;
                    }else{
                        $(".form-error-message").remove()
                        return true;
                    }
                });
            });
        }else{
            Add_ErrorMessage($(obj).parent(),"Username must be at least 5 characters long")
            return false;
        }
    }
}
/* 验证 密码*/
function Verifying_password(obj) {
    var password = $("#registration-password").val();

    if (password.match(/^\s+$/) || password.match(/^[ ]+$/)
        || password.match(/^[ ]/)
        || password.match(/^[ ]*$/)
        || password.match(/^\s*$/)
        || password.length<8) {
        Add_ErrorMessage($(obj).parent(),"Your password doesn't meet the criteria")
        return false;
    }else{
        $(".form-error-message").remove()
        return true;
    }
}
/* 验证 确认密码*/
function Verifying_password_conf(obj) {
    var password_conf = $("#password_conf").val();
    if (password_conf.match(/^\s+$/) || password_conf.match(/^[ ]+$/)
        || password_conf.match(/^[ ]/)
        || password_conf.match(/^[ ]*$/)
        || password_conf.match(/^\s*$/)
        || password_conf.length<8) {
        Add_ErrorMessage($(obj).parent(),"Your password doesn't meet the criteria")
        return false;
    }else{
        if(password_conf==$("#registration-password").val()){
            $(".form-error-message").remove()
            return true;
        }else{
            Add_ErrorMessage($(obj).parent(),"The passwords do not match.")
            return false;
        }
    }
}
/* 验证 邮箱格式*/
function Verifying_email_address(obj) {
    var text = $("#email_address").val();
    var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    if (text.match(/^\s+$/) || text.match(/^[ ]+$/)
        || text.match(/^[ ]/)
        || text.match(/^[ ]*$/)
        || text.match(/^\s*$/)
        || text.length<3) {
        // 关闭loading
        $(".load").css("display", "none");
        Add_ErrorMessage($(obj).parent(),"Your email address doesn't meet the criteria")
        return false
    } else {
        if(text.length>85){
            // 关闭loading
            $(".load").css("display", "none");
            Add_ErrorMessage($(obj).parent(),"Your email address doesn't meet the criteria")
            return false
        }else{
            if (regex.test(text)) {
                // 关闭loading
                $(".load").css("display", "none");
                $(".form-error-message").remove()
                return true
            } else {
                // 关闭loading
                $(".load").css("display", "none");
                Add_ErrorMessage($(obj).parent(),"Your email address doesn't meet the criteria")
                return false
            }
        }
    }
}

/* 设置 禁止60s 方法*/
var wait = 60;
function Prohibit() {
    if (wait == 0) {
        $("#verificationCode").attr("disabled",false);
        $("#verificationCode").val("获取邮箱验证码");
        wait = 60;
    } else {
        $("#verificationCode").attr("disabled",true);
        $("#verificationCode").val(wait+"秒后可以重新发送");
        wait--;
        setTimeout(function() {
            Prohibit()
        }, 1000)
    }
}
/* 发送邮箱验证码*/
function verificationCode(obj) {
    // 判断邮箱是否正确
    if(Verifying_email_address("#email_address")){
        // 格式正确,验证邮箱是否存在
        $.ajax({
            data : {
                "User_Email" : $("#email_address").val()
            },
            type : "POST",
            contentType : "application/x-www-form-urlencoded;charset=utf-8",
            scriptCharset : 'utf-8',
            url : "/UserInfo/UserEmail_IsEmpty",  //  请更换验证 Userlogin 的URL
            success : function(Results) {
                $.each(JSON.parse(Results), function (i, Info) {
                    if(Info.IsEmpty=="false"){
                        // 这个邮箱不存在
                        $(".form-error-message").remove()
                        // 邮箱 格式正确  禁止  按钮60s
                        Prohibit();
                        // 发送验证码
                        $.ajax({
                            data : {
                                "Email_Address" : $("#email_address").val()
                            },
                            type : "POST",
                            contentType : "application/x-www-form-urlencoded;charset=utf-8",
                            scriptCharset : 'utf-8',
                            url : "/EMail/Mailbox_Verification",
                            success : function(JSONdatas) {
                                //解析JSON数据
                                $.each(JSON.parse(JSONdatas),function(i,datas) {
                                    if (datas.State == "true") {
                                        $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
                                            SetCookie("5d5d4c91047b3b501",datas.Verification_Code);
                                            setTimeout(function(){
                                                DelCookie("5d5d4c91047b3b501");
                                                },300000)
                                        });
                                    } else {
                                        Add_ErrorMessage($(obj).parent(),"Send failure")
                                    }
                                });
                            }
                        });

                    }else{
                        Add_ErrorMessage($("#email_address").parent(),Info.State)
                    }
                });
            }
        });
    }
}
/* 判断验证码是否正确*/
function Judgement_verifying_code() {
    var email_conf = $("#email_conf").val();
    var cookie = '';
    if(email_conf.length>5){
        if (GetCookie("5d5d4c91047b3b501") != md5(email_conf + "Verification_Code")) {
            Add_ErrorMessage($("#email_conf").parent(), "Sorry for your verification code error")
            return false
        } else {
            $(".form-error-message").remove();
            return true
        }
    }
}
/* 添加错误信息*/
function Add_ErrorMessage(id,Message) {
    // 清空 错误信息
    $(".form-error-message").remove()
    $(id).append('<p class="form-error-message"><small class="form-error-message">' +
        '<span class = "icon icon-dead-robot-head"></span>' +
        '<span class="form-error-message-text">'+Message+'</span ></small></p>')
}
/* 提交注册信息*/
function Submission_Registration() {
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    // 验证用户名
    if(Verifying_username("#registration-username")||Verifying_username("#registration-username")==null){
        $.post("/UserInfo/UserName_IsEmpty",{
            "UserName" : $("#registration-username").val()
        }, function (Result) {
            $.each(JSON.parse(Result), function (i, Info) {
                if(Info.IsEmpty=="true"){
                    Add_ErrorMessage($(obj).parent(),Info.State)
                }else{
                    // 验证密码
                    if(Verifying_password("#registration-password")){
                        // 验证 确认密码
                        if(Verifying_password_conf("#password_conf")){
                            // 验证 邮箱 格式
                            if(Verifying_email_address("#email_address")){
                                $.ajax({
                                    data : {
                                        "User_Email" : $("#email_address").val()
                                    },
                                    type : "POST",
                                    contentType : "application/x-www-form-urlencoded;charset=utf-8",
                                    scriptCharset : 'utf-8',
                                    url : "/UserInfo/UserEmail_IsEmpty",  //  请更换验证 Userlogin 的URL
                                    success : function(Results) {
                                        $.each(JSON.parse(Results), function (i, Infos) {
                                            if(Infos.IsEmpty=="false"){
                                                // 判读验证码
                                                if(Judgement_verifying_code()){
                                                    $.ajax({
                                                        data : {
                                                            "UserName" : $("#registration-username").val(),
                                                            "Password" : $("#registration-password").val(),
                                                            "User_Email":$("#email_address").val(),
                                                            "User_Sex" : "男"
                                                        },
                                                        type : "POST",
                                                        contentType : "application/x-www-form-urlencoded;charset=utf-8",
                                                        scriptCharset : 'utf-8',
                                                        url : "/UserInfo/Create_Account",
                                                        success : function(JSONdata) {
                                                            //解析JSON数据
                                                            $.each(JSON.parse(JSONdata), function (i, dataInfo) {
                                                                if(dataInfo.State=="User creation failure"){
                                                                    var oDiv = document.createElement('div');
                                                                    oDiv.className = "modal";
                                                                    oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                                                        '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                                                        'User creation failure</div></div>';
                                                                    document.body.appendChild(oDiv);
                                                                }else if(dataInfo.State=="User creation Success"){
                                                                    logout();
                                                                    $.getScript("/MusicStyle/js/login/login.js", function () {
                                                                        user_login($("#registration-username").val(), $("#registration-password").val());
                                                                    });
                                                                    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
                                                                        DelCookie("5d5d4c91047b3b501");
                                                                    });

                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }else{
                                                Add_ErrorMessage($(obj).parent(),Infos.State)
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                }
            });
        });
    }
    // 关闭loading
    $(".load").css("display", "none");
}
/* 忘记密码*/
function Forget_password() {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    // 关闭 播放面板
    $("#pjax-inner-wrapper").hide();
    // 关闭 分类  选项
    $(".Classification").hide();
    // 写入 忘记密码页面
    $(".page-content-container").html('<main class="interior misc-account forgot-password"><div class="small-mid-col">' +
        '<h1>FORGOT YOUR PASSWORD?</h1><div class="misc-account-content"><p>' +
        'If you forget your password, please enter an e-mail address related to your account. We will send your username and a new password.' +
        '<div class="forgot-password-form">' +
        '<input class="account-form-value account-form-value-text-box" id="email_address" name="email_address" placeholder="EMAIL ADDRESS" type="text" value="">' +
        '<button type="button" value="button" class="forgot-password-form-button">Submit</button></div>' +
        '<p><a href="javascript:void(0)" onclick="loginPage()">Log In</a> | <a href="javascript:void(0)" onclick="LoadRegistrationPage()">Create a Beatport account</a></p>' +
        '</div></div></main>');
    $(".page-content-container").show();
    // 关闭loading
    $(".load").css("display", "none");
    $("#email_address").keypress(function (e) {
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13) {
            $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
            ResetPassword();
        }
    });
    $(".forgot-password-form-button").click(function () {
        $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
        ResetPassword();
    })
}
/* 重置密码方法*/
function ResetPassword() {
    if($.cookie('6a46ff6a6aa384ab')!="341bc326a1b1965be217f26d7d500825"){
        // 验证 邮件地址
        if(Verifying_email_address("#email_address")){
            // 向用户邮箱发送新密码
            $.post("/EMail/Forget_password",{
                "Email_Address" : $("#email_address").val()
            }, function (Result) {
                $.each(JSON.parse(Result), function (i, type) {
                    if(type.Error!=null){
                        // 打开错误 model
                        var oDiv = document.createElement('div');
                        oDiv.className = "modal";
                        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                            type.Error+'</div></div>';
                        document.body.appendChild(oDiv);
                        // 关闭loading
                        $(".load").css("display", "none");
                    }else if(type.Success!=null){
                        // 设置成功页面
                        $(".page-content-container").html('<main class="interior misc-account forgot-password-success">' +
                            '<div class="small-mid-col"><h1>Success!</h1>' +
                            '<div class="misc-account-content">' +
                            '<p>You will receive an email, your username and a new password, you can use it to login.</p>' +
                            '<p><a href="javascript:void(0)" onclick="loginPage()">Log In</a></p>' +
                            '</div></div></main>');
                        // 加入cookie 设置3分钟计时  防止 用户 重复 发送
                        $.cookie('6a46ff6a6aa384ab', '341bc326a1b1965be217f26d7d500825', { expires: 0.0020833, path: '/' });
                        // 关闭loading
                        $(".load").css("display", "none");
                    }
                });
            });
        }
    }else{
        // 打开错误 model
        var oDiv = document.createElement('div');
        oDiv.className = "modal";
        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
            'Do not repeat the submission</div></div>';
        document.body.appendChild(oDiv);
        // 关闭loading
        $(".load").css("display", "none");
    }
}
/* 点击加入收藏*/
function Collection(obj) {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    // 查看 用户 是否 登陆
    $.getScript("/MusicStyle/js/login/login.js", function () {
        var Name = get("User_Name", 2000 * 60 * 60);
        var ID = get("User_ID", 2000 * 60 * 60);
        var Image = get("User_Image", 2000 * 60 * 60);
        var Tokens = get("Token", 2000 * 60 * 60);
        // 判断用户 已  登陆
        if (ID != null && Name != null && Image != null && Tokens != null) {
            // 收藏
            $.post("/SongInfo/User_Collection",{
                User_ID : get("User_ID", 2000 * 60 * 60),
                Token : get("Token", 2000 * 60 * 60),
                Song_ID : $(obj).parent().parent().parent().parent().parent().data("song-id")
            }, function (Result) {
                $.each(JSON.parse(Result), function (i, type) {
                    if(type.State=="true"){

                        $(".CollectionResult").css("height","30px");
                        setTimeout(function () {
                            $(".CollectionResult").css("height","0px");
                        },2000)
                        // 关闭loading
                        $(".load").css("display", "none");
                    }else{
                        var oDiv = document.createElement('div');
                        oDiv.className = "modal";
                        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                            type.Error+'</div></div>';
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
                'You have to land in order to use the collection</div></div>';
            document.body.appendChild(oDiv);
            // 关闭loading
            $(".load").css("display", "none");
        }
    });
}
/* 删除用户收藏*/
function Delete_UserCollection(obj) {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        if (get("User_ID", 2000 * 60 * 60) != null && get("User_Name", 2000 * 60 * 60) != null && get("User_Image", 2000 * 60 * 60) != null && get("Token", 2000 * 60 * 60) != null) {

            /* 删除收藏*/
            $.post("/UserInfo/Delete_UserCollection",{
                User_ID:get("User_ID", 2000 * 60 * 60),
                Token  :get("Token", 2000 * 60 * 60),
                Song_ID:$(obj).data("song-id")
            },function (Result) {
                $.each(JSON.parse(Result), function (i, type) {
                    if(type.Error=="true"){
                        $(".load").css("display", "none");
                        MyCharts();
                    }else{
                        if(type.Error=="false"){
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                '数据修改失败</div></div>';
                            document.body.appendChild(oDiv);
                            // 关闭loading
                            $(".load").css("display", "none");
                        }else{
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                type.Error+'</div></div>';
                            document.body.appendChild(oDiv);
                            // 关闭loading
                            $(".load").css("display", "none");
                        }
                    }
                });

            });
        }else{
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'You have to land in order to use the collection</div></div>';
            document.body.appendChild(oDiv);
            // 关闭loading
            $(".load").css("display", "none");
        }
    });
}
/* 一键删除用户收藏*/
function OnekeyDeleteCollection() {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        if (get("User_ID", 2000 * 60 * 60) != null && get("User_Name", 2000 * 60 * 60) != null && get("User_Image", 2000 * 60 * 60) != null && get("Token", 2000 * 60 * 60) != null) {
            /* 批量删除收藏*/
            $.post("/UserInfo/BatchDelete_UserCollection",{
                User_ID:get("User_ID", 2000 * 60 * 60),
                Token:get("Token", 2000 * 60 * 60)
            },function (Result) {
                $.each(JSON.parse(Result), function (i, type) {
                    if(type.Error=="true"){
                        $(".load").css("display", "none");
                        window.location.href="";
                    }else{
                        if(type.Error=="false"){
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                '数据修改失败</div></div>';
                            document.body.appendChild(oDiv);
                            // 关闭loading
                            $(".load").css("display", "none");
                        }else{
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                type.Error+'</div></div>';
                            document.body.appendChild(oDiv);
                            // 关闭loading
                            $(".load").css("display", "none");
                        }
                    }
                });
            });
        }
    });
}
/* 加载会员页面*/
function Membershop() {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    // 关闭 播放面板
    $("#pjax-inner-wrapper").hide();
    // 关闭 分类  选项
    $(".Classification").hide();
    $.post("/OpenMember/GetInto_MembershipPage",{
        User_ID : get("User_ID", 2000 * 60 * 60),
        Token : get("Token", 2000 * 60 * 60)
    }, function (Result) {
        if(JSON.parse(Result)=="[{'Error':'Current Token illegality'}]"){
            logout();
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'Current Token illegality</div></div>';
            document.body.appendChild(oDiv);
            // 关闭loading
            $(".load").css("display", "none");
        }else{
            $(".page-content-container").html('<div style="position: relative;top: -40px;"><h1>PREMIUM VIP</h1>' +
                '<p style="font-size: 16px">目前我们支持添加 微信后支付，信用卡支付，花呗及支付宝支付，如果你不懂得如何去完成会员购买的方法</p>' +
                '<p style="font-size: 16px">记得添加客服微信或者在线QQ客服|微信/QQ:374560004</p></div>'+JSON.parse(Result)+'<div style="line-height: 30px;font-size: 15px;position: relative;top: 100px;"><p>- 请记住所有会员所包含的资源来源！(beatport/traxsource)  ， 不排除其他国外收费资源更新。</p><p>- 请注意在支付宝二维码付款时请备注网站用户名 (便于我们查找你的注册信息)。</p><p>- 付款后请耐心等待，因为会员账号需要手动完成！(5分钟至30分钟).</p></div>')
            $(".page-content-container").show();


            $(".pricing_table .pricing_head").mousemove(function () {
                $(this).find(".ewm").css("height","200px");
            })

            $(".pricing_table .pricing_head").mouseout(function () {
                $(this).find(".ewm").css("height","0px");
            })


            // 关闭loading
            $(".load").css("display", "none");
        }
    });
}
/* 充值会员*/
function Buy_Member(MemberID) {
    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");
    $.getScript("/MusicStyle/js/login/login.js", function () {
        var Name = get("User_Name", 2000 * 60 * 60);
        var ID = get("User_ID", 2000 * 60 * 60);
        var Image = get("User_Image", 2000 * 60 * 60);
        var Tokens = get("Token", 2000 * 60 * 60);
        if (ID != null || Name != null || Image != null || Tokens != null) {
            //调用后台支付
            $.ajax({
                data : {
                    "MembershipPriceID" : MemberID,
                    "User_ID" : get("User_ID", 2000 * 60 * 60),
                    "Token" : get("Token", 2000 * 60 * 60)
                },
                type : "POST",
                contentType : "application/x-www-form-urlencoded;charset=utf-8",
                scriptCharset : 'utf-8',
                url : "/OpenMember/Member_payment",
                success : function(JSONdata) {

                    if(JSON.parse(JSONdata)=="Current Token illegality"){
                        logout();
                        var oDiv = document.createElement('div');
                        oDiv.className = "modal";
                        oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                            '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                            'Current Token illegality</div></div>';
                        document.body.appendChild(oDiv);
                        // 关闭loading
                        $(".load").css("display", "none");
                    }else{
                        //判断用户ID是否成功传入后台
                        if(JSON.parse(JSONdata)=="The user is not logged in"){
                            var oDiv = document.createElement('div');
                            oDiv.className = "modal";
                            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                'User information does not exist</div></div>';
                            document.body.appendChild(oDiv);
                        }else{
                            //判断资费ID是否存在
                            if(JSON.parse(JSONdata)=="Membership price ID does not exist"){
                                var oDiv = document.createElement('div');
                                oDiv.className = "modal";
                                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                    'Order error, please refresh retry</div></div>';
                                document.body.appendChild(oDiv);
                            }else if(JSON.parse(JSONdata)=="Failure to add order information"){
                                var oDiv = document.createElement('div');
                                oDiv.className = "modal";
                                oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                                    '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                                    'Failure to add order information</div></div>';
                                document.body.appendChild(oDiv);
                            }else {
                                $("body").html(JSON.parse(JSONdata))
                            }
                        }
                        // 关闭loading
                        $(".load").css("display", "none");
                    }
                }
            });
        }else{
            var oDiv = document.createElement('div');
            oDiv.className = "modal";
            oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                'Current Token illegality</div></div>';
            document.body.appendChild(oDiv);
            // 关闭loading
            $(".load").css("display", "none");
        }
    });
}

// 获取下载的前100名
function getTop() {

    /* 加载 loading*/
    $("body").append("<div class='load'><div class='loadimg'><img src='/MusicStyle/images/loading.gif' alt=''></div></div>");

    /* 调用 login.js*/
    $.getScript("/MusicStyle/js/login/login.js", function () {
        var Name = get("User_Name", 2000 * 60 * 60);
        var ID = get("User_ID", 2000 * 60 * 60);
        var Image = get("User_Image", 2000 * 60 * 60);
        var Tokens = get("Token", 2000 * 60 * 60);
        /* 加载分类*/
        $.post("/SongInfo/getTop", {
            User_ID: get("User_ID", 2000 * 60 * 60),
            Token: Tokens
        }, function (Result) {
            var result = JSON.parse(Result);


            console.log(result);

            switch (result.code){
                case "0":
                    console.info('请求成功:');
                    console.info(result.data);

                    layui.use(['laypage', 'layer'], function () {
                        var laypage = layui.laypage
                            , layer = layui.layer;
                        laypage.render({
                            elem: 'PageCodeTail'
                            , count: 1//数据总数
                            , groups: 4 // 连续显示分页数
                            , curr: 1 // 设置当前页
                            , limit : 30
                            //,skin: 'pag-number'   //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                            , prev: '<P class="icon icon-scroll-left"></P>' //若不显示，设置false即可
                            , next: '<P class="icon icon-scroll-right"></P>'//若不显示，设置false即可
                            , jump: function (obj) {
                            }
                        });
                        $("#ReleasesAll").html("");
                        $.each(result.data, function (i, Song_Info) {

                            $("#ReleasesAll").append("<li class=\"bucket-item ec-item horz-release\" " +
                                "data-song-id='" + Song_Info.song_ID + "' " +
                                "data-song-name='" + Song_Info.song_Name + "' " +
                                "data-song-artists='" + Song_Info.song_Artists + "'" +
                                " data-song-label='" + Song_Info.song_Label + "' " +
                                "data-song-genre='" + Song_Info.song_Genre + "' " +
                                "data-song-releasedtime='" + Song_Info.song_ReleasedTime + "'" +
                                " data-song-type='" + Song_Info.song_Type + "' " +
                                "data-song-img='" + Song_Info.song_Imge + "' >" +
                                "<div class=\"horz-release-artwork-parent\"><a href=\"#\"><img class=\"horz-release-artwork\" src=\"" + Song_Info.song_Imge + "\"></a></div><div class=\"horz-release-meta-parent\"><div class=\"buk-track-num\" id='ranking'>"+ (i+1) +"</div><div class=\"horz-release-meta\"><p class=\"buk-horz-release-title\"><a href=\"#\"><trans>" + Song_Info.song_Name + "</trans></a></p><p class=\"buk-horz-release-artists\"><a href=\"#\"><trans>" + Song_Info.song_Artists + "</trans></a></p><p class=\"buk-horz-release-labels\"><a href=\"#\" data-item='" + Song_Info.song_Label + "' data-classname='Song_Label' onclick=\"Classification(this)\"><trans>" + Song_Info.song_Label + "</trans></a></p><p class=\"buk-horz-release-released\">" + Song_Info.song_ReleasedTime + "</p></div><div class=\"horz-release-actions-parent\"><div class=\"horz-release-actions\"><div class=\"horz-release-play-queue\"><button class=\"playable-play\" onclick=\"Auditions(" + Song_Info.song_ID + ")\" data-release=\"2284991\" data-track=\"10563140\"><i class='fa fa-caret-right'></i></button><button class=\"playable-queue\" data-release=\"2284991\" data-track=\"10563140\" onclick='Collection(this)'><i class='fa fa-server cunAn'></i></button></div><div class=\"buy-button horz-release-buy-button\" onclick=\"PlayPanelDownload(this)\"><button class=\"add-to-default\">Mp3</button><button class=\"launch-menu\"><i class='fa fa-cloud-download xia'></i></div></div><a href=\"#\" class=\"icon icon-ellipsis horz-release-ellipsis mobile-action\"></a></div></div></li>");

                        });
                    });

                    break;
                case "1":
                    // 打印错误信息
                    var oDiv = document.createElement('div');
                    oDiv.className = "modal";
                    oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                        '<a onclick="Close()" href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                        result.message + '</div></div>';
                    document.body.appendChild(oDiv);
                    break;
                case "401":
                    logout();
                    var oDiv = document.createElement('div');
                    oDiv.className = "modal";
                    oDiv.innerHTML = '<div class="modal-body"><div class="modal-title-bar"><h1>Error message</h1>' +
                        '<a href="#" class="close-modal-link icon icon-delete"></a></div><div class="modal-main-content modal-login-signup-main-content">' +
                        '您已退出登陆</div></div>';
                    document.body.appendChild(oDiv);
                    break
            }

            // 关闭loading
            $(".load").css("display", "none");
        });
    })
}