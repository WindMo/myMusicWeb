/* 上传头像 js*/
$.getScript("http://cdn.staticfile.org/webuploader/0.1.0/webuploader.js", function () {
    // 初始化Web Uploader
    var uploader = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: false,

        // swf文件路径
        swf: 'http://cdn.staticfile.org/webuploader/0.1.0/Uploader.swf',

        // 文件接收服务端。
        server: '/Upload_Img',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id:'#image_uploader_browse_button',//指定选择文件的按钮容器，不指定则不创建按钮
            multiple:false
        },

        // 配置拖拽的容器
        dnd :'.image-uploader__content img',
        // 通过粘贴来添加截屏的图片
        paste: document.body,

        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },

        // 指定缩略图
        thumb:{
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: false,
            width: 300,
            height: 300,
            quality: 70,//图片质量
            crop: true,
            type: 'image/jpeg'
        },

        // 配置压缩 图片
        compress:{
            quality: 100,
            allowMagnify: false,
            crop: true,
            preserveHeaders: true,
            noCompressIfLarger: false,
            compressSize: 10

        },
        disableGlobalDnd: true,
        fileNumLimit:1,
        duplicate: true
    });

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $(".image-uploader__content img").attr("id",file.id)
            $(".image-uploader__content img").attr("src",src)
        }, 300, 300 );
    });

    /* 配置 上传按钮*/
    $("#PictureUploading").on('click', function() {
        var srcc = $(".image-uploader__content img").attr("src");
        // 判断是否存在图片
        if($(".image-uploader__content img").attr("src")!=null&&$(".image-uploader__content img").attr("src").length>10){
            uploader.upload();
        }else{
            console.log("请添加图片")
        }
    });

    //带参数上传
    uploader.on('uploadBeforeSend', function(obj, data, headers) {
        data.ID  = get("User_ID", 2000 * 60 * 60);
        data.Job = $("#Job").val();
        data.Sex = $("input[name='radio']:checked").val();
        data.Token  = get("Token", 2000 * 60 * 60);
    });

    // 上传出错
    uploader.on( 'uploadError', function( file ) {
        alert("文件: "+file.name+" 上传失败");
    });

    /* 配置上传成功*/
    uploader.on( 'uploadSuccess', function( file , response ) {
        /* 更新图片*/
        if(response!="false"){
            set("User_Image",response);
            $(".head-account-default-image img").attr("src",response);
            $(".CollectionResult").html("Amend the success")
        }else{
            $(".CollectionResult").html("Amend the fail")
        }
        $(".CollectionResult").css("height","30px");
        setTimeout(function () {
            $(".CollectionResult").css("height","0px");
        },2000)
    });
});
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
            if(dataObjDatatoJson==null||dataObjDatatoJson==""){
                dataObjDatatoJson="";
            }
            return dataObjDatatoJson;
        }
    }
}
function set(key,value){
    var curTime = new Date().getTime();
    localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}