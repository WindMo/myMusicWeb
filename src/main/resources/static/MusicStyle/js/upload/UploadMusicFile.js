/* 上传文件 js*/
var uploader;
$.getScript("http://cdn.staticfile.org/webuploader/0.1.0/webuploader.js", function () {
    if ( !WebUploader.Uploader.support() ) {
        alert( 'Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
        throw new Error( 'WebUploader does not support the browser you are using.' );
    }

    /* 初始化实例 */
    uploader = WebUploader.create({

        // swf文件路径
        swf: 'http://cdn.staticfile.org/webuploader/0.1.0/Uploader.swf',

        // 文件接收服务端。
        server: '/Upload_File',

        // 配置拖拽的容器
        dnd :'.wenjian',
        // 是否禁掉整个页面的拖拽功能
        disableGlobalDnd: true,

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id:'#Selectfile',//指定选择文件的按钮容器，不指定则不创建按钮
            multiple:true// 开启同时上传多个文件的能力
        },

        // 指定接受哪些类型的文件
        accept: {
            title: '音频文件',
            extensions: 'wav,mp3,m4a',
            mimeTypes: 'audio/*'
        },

        // 配置压缩图片的选项。如果此选项为false, 则图片在上传前不进行压缩
        compress:false,

        // 是否允许在文件传输时提前把下一个文件准备好。 对于一个
        // 文件的准备工作比较耗时，比如图片压缩，md5序列化。 如果能提前在当前文件传输期处理，可以节省总体耗时。
        prepareNextFile:true,

        // 开起分片上传。
        chunked: false,

        // 如果要分片，分多大一片？ 默认值：5242880 5M
        chunkSize:1048576,

        // 如果某个分片由于网络问题出错，允许自动重传多少次？
        chunkRetry: 3,

        // 上传并发数。允许同时最大上传进程数。默认值：3
        threads : 3,

        // 验证文件总数量, 超出则不允许加入队列
        fileNumLimit:1000

    });


    uploader.reset();

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        uploader.reset();
        $(".weixuanze").hide();

        $(".wenjian ul").append('<li id="'+file.id+'" data-file-id="'+file.id+'"><span class="xiala"><i class="fa fa-angle-right"></i>'+file.name+'<button>删除</button></span>' +
        '<div class="progressbar"><div class="progress"></div></div></li>');



        $(".Uploaded").click(function () {
            $(".shangchuan").show();
        })


        $(".xiala button").click(function () {
            console.log($(this).parent().parent().data("file-id"))
            uploader.removeFile($(this).parent().parent().data("file-id"));
            uploader.reset();
            $(this).parent().parent().remove();
        })

        $(".shangchuan .cols").click(function () {
            $(".shangchuan .wenjian").empty().html("<div class=\"weixuanze\">未选择文件/文件夹</div><ul></ul>");
            uploader.removeFile(file);
            uploader.reset();
        })

    });

    //带参数上传
    uploader.on('uploadBeforeSend', function(obj, data, headers) {
        if($(".music select").val()=="0"){
            data.Type  = "Auditions";
        }else{
            data.Type  = "Complete";
        }
    });

    // 配置上传
    $(".but").click(function () {
        if($(".wenjian ul")!=null){
            uploader.upload();
        }
    })

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {

        $("#"+file.id+" .progress").css("width",+percentage * 100+"%")
        console.log(file.id+" "+file.name+"   上传中  "+percentage * 100+"%")
    });


    // 上传出错
    uploader.on( 'uploadError', function( file ) {
        alert("文件: "+file.name+" 上传失败");
        $(".progress").css("background","red");
    });

    /* 配置上传成功*/
    uploader.on( 'uploadSuccess', function( file , response ) {
        // 获取 服务器路径  保存
        $("#"+file.id).data("route",response)
    });



    // 所有文件上传成功后调用
    uploader.on('uploadFinished', function (response) {
        $(".loading").show()
        // 所有文件上传成功后遍历 保存信息
        $.each(uploader.getFiles(), function (i, FileInfo) {
            ID3.loadTags($("#"+FileInfo.id).data("route"), function() {
                var tags = ID3.getAllTags($("#"+FileInfo.id).data("route"));
                var image = tags.picture;
                if (image) {
                    var base64String = "";
                    for (var i = 0; i < image.data.length; i++) {
                        base64String += String.fromCharCode(image.data[i]);
                    }
                    image=window.btoa(base64String);
                }
                if($(".music select").val()=="0"){
                    //试听
                    if(tags.title==null||tags.album==null||tags.artist==""||tags.year==""){
                        alert("error: 无法读取文件 "+FileInfo.name+" 的元信息")
                    }else{
                        $.post("/SongInfo/Song_Add", {
                            Song_Name: tags.title,
                            Song_Artists: tags.artist,
                            Song_Label:tags.album,
                            Song_ReleasedTime:tags.year,
                            Song_Genre:tags.genre,
                            Song_Type:$("#song_type").val(),
                            Song_Address:$("#"+FileInfo.id).data("route"),
                            Song_Imge:image,
                            fileType:"Auditions",
                            FileName : FileInfo.name
                        }, function (Song_AddResult) {
                            $.each(JSON.parse(Song_AddResult), function (i, Song_Add) {
                                if(Song_Add.Error==null){
                                    if(Song_Add.State=="true"){
                                        $(".loading").hide()
                                        $(".tanchuang").show();
                                        $(".error-Written").html("添加成功");
                                    }else{
                                        $(".loading").hide()
                                        $(".tanchuang").show();
                                        $(".error-Written").html("error: 歌曲信息添加失败");
                                        $("#"+FileInfo.id+" .progress").css("background","red");
                                    }
                                }else{
                                    $(".loading").hide()
                                    /* 显示错误model*/
                                    $(".tanchuang").show();
                                    $(".error-Written").html("error: "+Song_Add.Error);
                                }
                            });
                        });
                    }
                }else{
                    // 下载
                    if(tags.title==null||tags.album==null||tags.artist==""||tags.year==""){
                        alert("error: 无法读取文件 "+FileInfo.name+" 的元信息")
                    }else{
                        $.post("/SongInfo/Song_Add", {
                            Song_Name: tags.title,
                            Song_Artists: tags.artist,
                            Song_Label:tags.album,
                            Song_ReleasedTime:tags.year,
                            Song_Genre:tags.genre,
                            Song_Type:$("#song_type").val(),
                            Song_Address:$("#"+FileInfo.id).data("route"),
                            Song_Imge:image,
                            fileType:"Download",
                            FileName : FileInfo.name
                        }, function (Song_AddResult) {
                            $.each(JSON.parse(Song_AddResult), function (i, Song_Add) {
                                if(Song_Add.Error==null){
                                    if(Song_Add.State=="true"){
                                        $(".loading").hide()
                                        $(".tanchuang").show();
                                        $(".error-Written").html("修改成功");
                                    }else{
                                        $(".loading").hide()
                                        $(".tanchuang").show();
                                        $(".error-Written").html("error: 歌曲信息添加失败");
                                        $("#"+FileInfo.id+" .progress").css("background","red");
                                    }
                                }else{
                                    $(".loading").hide()
                                    /* 显示错误model*/
                                    $(".tanchuang").show();
                                    $(".error-Written").html("error: "+Song_Add.Error);
                                }
                            });
                        });
                    }

                }
            }, {
                tags: ["title","artist","album","picture","year","genre"]
            });
        });
        //清空队列
        uploader.reset();
    });



    /*
    * 错误信息
    * 当validate不通过时，会以派送错误事件的形式通知调用者
    * 通过upload.on('error', handler)可以捕获到此类错误，目前有以下错误会在特定的情况下派送错来
    *
    * Q_EXCEED_NUM_LIMIT 在设置了fileNumLimit且尝试给uploader添加的文件数量超出这个值时派送。
    * Q_EXCEED_SIZE_LIMIT 在设置了Q_EXCEED_SIZE_LIMIT且尝试给uploader添加的文件总大小超出这个值时派送。
    * Q_TYPE_DENIED 当文件类型不满足时触发。。
    *
    * */
    uploader.on('error',function( type ) {
        if(type=="Q_EXCEED_NUM_LIMIT"){
            $(".tanchuang").show();
            $(".error-Written").html("error: 文件数量超出限制");
        }else if(type=="Q_TYPE_DENIED"){
            $(".tanchuang").show();
            $(".error-Written").html("error: 文件类型不满足条件");
        }else{
            $(".tanchuang").show();
            $(".error-Written").html("error: 未定义错误的错误 "+type);
        }

    });
});
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}