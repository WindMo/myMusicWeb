/* 加载loading*/
$(".loading").show();
$.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
    if (   get("User_ID", 2000 * 60 * 60) != null
        && get("User_Name", 2000 * 60 * 60) != null
        && get("User_Image", 2000 * 60 * 60) != null
        && get("Token", 2000 * 60 * 60) != null) {
        //判断是否是管理员
        $.ajax({
            data : {
                "User_ID" : get("User_ID", 2000 * 60 * 60),
                "Token" : get("Token", 2000 * 60 * 60)
            },
            type : "POST",
            contentType : "application/x-www-form-urlencoded;charset=utf-8",
            scriptCharset : 'utf-8',
            url : "/Controller/Verifying_administrator",
            success : function(JSONdata) {
                $.each(JSON.parse(JSONdata), function (i, UserInfo) {
                    if(UserInfo.State=="success"){
                        /* 定义 头部标签*/
                        $("#User_Img").attr("src",get("User_Image", 2000 * 60 * 60));
                        $("#User_Name").html(get("User_Name", 2000 * 60 * 60));
                        /* 打开 文章 列表*/
                        ArticlePage();
                        /* 关闭loading*/
                        $(".loading").hide();
                    }else{
                        /* 关闭loading*/
                        $(".loading").hide();
                        if(UserInfo.Error=="Current Token illegality"){
                            remove();
                        }
                        /* 弹出 model*/
                        $(".tanchuang").show();
                        $(".error-Written").html(UserInfo.Error)
                        /* 关闭 model 后 跳转首页*/
                        ValidationError();
                    }
                })
            }
        });
    } else {
        /* 弹出 model*/
        $(".tanchuang").show();
        $(".error-Written").html("error:未验证管理者身份");
        /* 关闭loading*/
        $(".loading").hide();
        ValidationError();
    }
});

/* 修改文章信息*/
function ArticleInfo(Article_ID,obj) {
    /* 加载 loading*/
    $(".loading").show();

    // 显示 model
    Text_Editing("modify");
    // 获取 单个信息

    /* 设置 model 内容*/
    $(".file-upload-dialog.js-drag-area").html("")
    $(".file-upload-dialog.js-drag-area")
        .append('<div class="formControls col-xs-8 col-sm-9" data-type="article">' +
        '文章ID: &nbsp;&nbsp;<input type="text" class="input-text valid" value="'+$(obj).parent().parent().data("article-id")+'" placeholder="" id="article_id">' +
        '</div><br/>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '标题: &nbsp;&nbsp;' +
            '<input type="text" class="input-text valid" value="'+$(obj).parent().parent().data("article-label")+'" id="article_label"></div>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '链接: &nbsp;&nbsp;' +
            '<input type="text" class="input-text valid" value="'+$(obj).parent().parent().data("article-fixed_link")+'" id="article_fixed_Link"></div>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '状态: &nbsp;&nbsp;' +
            '<select id="article_Status" style="width: 100px;margin-top: 10px;margin-bottom: 10px;"><option value="发布">发布</option>' +
            '<option value="草稿">草稿</option>' +
            '</select></div>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '栏目: &nbsp;&nbsp;' +
            '<select id="article_degree_Openness" style="width: 100px;margin-bottom: 10px;">' +
            '<option value="Head menu">Head menu</option>' +
            '<option value="Friendship link">Friendship link</option>' +
            '<option value="COMPANY">COMPANY</option>' +
            '<option value="NETWORK">NETWORK</option>' +
            '</select></div>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '部位: &nbsp;&nbsp;' +
            '<select id="article_position" style="width: 100px;margin-bottom: 10px;">' +
            '<option value="head">head</option>' +
            '<option value="tail">tail</option>' +
            '</select></div>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '内容: &nbsp;&nbsp;' +
            '<textarea name="textarea" id="article_release_Time2" cols="30" rows="10" class="input-text valid" style="height: 170px;width: 520px;padding: 10px;resize:none;"></textarea>' +
            '');



    // 状态
    $('#article_Status').find("option[value='"+$(obj).parent().parent().data("article-article_status")+"']").attr("selected",true);
    // 栏目
    $('#article_degree_Openness').find("option[value='"+$(obj).parent().parent().data("article-degree_openness")+"']").attr("selected",true);
    // 部位
    $('#article_position').find("option[value='"+$(obj).parent().parent().data("article-position")+"']").attr("selected",true);


    $.getJSON("/Article_Page/Article_Conn", {
        article_name:$(obj).parent().parent().data("article-label")
    }, function (data) {
        $("#article_release_Time2").html(data[0].article_Content);
    });

    $(".loading").hide();
}



/* 加载文章 列表*/
function ArticlePage() {

    /* 加载 loading*/
    $(".loading").show();
    $(".Article_ReleaseSystem").html('<div class="panel">' +
        '<div class="panel-body"><div class="col-md-6 col-sm-12">' +
        '<p class="animated fadeInDown"><span class="fa  fa-map-marker"></span>文章管理</p></div>' +
        '</div></div>' +
        '<a class="btn btn-primary radius article_add article"  data-title="歌曲上传" onclick="article_add()"' +
        ' href="javascript:void(0);" style="position: relative;top: -10px;margin-left: 20px;"><i class="Hui-iconfont"></i> 添加文章</a>' +
        '<div id="DataTables_Table_0_filter" class="dataTables_filter article" style="float: right;margin-right: 8%;position: relative;top: -5px;">' +
        '<label>从当前数据中检索:' +
        '<input type="search" class="input-text " name="keyword" placeholder="输入关键字搜索" aria-controls="DataTables_Table_0" style="border: 1px solid #ccc;padding-left: 1em;height: 26px;">' +
        '</label></div>' +
        '<div class="col-md-12 padding-0 form-element">' +
        '<div class="col-md-12"><div class="panel">' +
        '<div class="panel-heading">' +
        '<h3 class="Info">文章状态</h3>' +
        '</div><div class="panel-body">' +
        '<div class="responsive-table">' +
        '<div id="datatables-example_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">' +
        '<div class="row">' +
        '<div class="col-sm-12">' +
        '<table class="table table-striped table-bordered dataTable no-footer" width="100%" cellspacing="0" style="width: 100%;">' +
        '<thead><tr role="row">' +
        '<th class="sorting_asc" style="width: 60px;">文章ID</th>' +
        '<th class="sorting" style="width: 60px;">标题</th>' +
        '<th class="sorting" style="width: 60px;">链接</th>' +
        '<th class="sorting" style="width: 60px;">状态</th>' +
        '<th class="sorting" style="width: 60px;">栏目</th>' +
        '<th class="sorting" style="width: 60px;">部位</th>' +
        '<th class="sorting" style="width: 60px;">时间</th>' +
        '<th class="sorting" style="width: 61px;">操 作</th>' +
        '</tr></thead><tbody class="ListInfo"></tbody>' +
        '</table></div></div></div></div></div></div></div><div id="PageCodeTails" class="pag-number"></div>')

    // 取出文章 Info
    $.post("/Controller/List_articles", {
        User_ID: get("User_ID", 2000 * 60 * 60),
        Token: get("Token", 2000 * 60 * 60)
    }, function (ArticleResult) {
        /* 加载 loading*/
        $(".loading").hide();
        $(".ListInfo").html("");
        $.each(JSON.parse(ArticleResult), function (i, ArticleInfo) {
            if(ArticleInfo.Error==null){
                // 取出信息
                $(".ListInfo").append('<tr role="row" class="even" data-article-id="'+ArticleInfo.article_ID+'"' +
                    ' data-article-label="'+ArticleInfo.label+'" ' +
                    ' data-article-fixed_Link="'+ArticleInfo.fixed_link+'" ' +
                    ' data-article-article_Status="'+ArticleInfo.article_Status+'" ' +
                    ' data-article-degree_Openness="'+ArticleInfo.degree_Openness+'" ' +
                    ' data-article-position="'+ArticleInfo.position+'" ' +
                    ' data-article-release_Time="'+ArticleInfo.release_Time+'" >' +
                    '<td class="sorting_1">'+ArticleInfo.article_ID+'</td>' +
                    '<td>'+ArticleInfo.label+'</td>' +
                    '<td>'+ArticleInfo.fixed_link+'</td>' +
                    '<td>'+ArticleInfo.article_Status+'</td>' +
                    '<td>'+ArticleInfo.degree_Openness+'</td>' +
                    '<td>'+ArticleInfo.position+'</td>' +
                    '<td>'+ArticleInfo.release_Time+'</td>' +
                    '<td><a href="javascript:void(0)" onclick="ArticleInfo('+ArticleInfo.article_ID+',this)">编辑</a>||' +
                    '<a href="javascript:void(0)" onclick="article_del('+ArticleInfo.article_ID+')">删除</a>' +
                    '</td></tr>');
            }else{
                /* 弹出 model*/
                $(".tanchuang").show();
                $(".error-Written").html("error:"+ArticleInfo.Error);
                ValidationError();
            }
        });
    });


    $("input[name=keyword]").keypress(function (e) {
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13) {
            $(".loading").show();
            $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
                $.ajax({
                    type : "POST",
                    data : {
                        "User_ID" : get("User_ID", 2000 * 60 * 60),
                        "Token" : get("Token", 2000 * 60 * 60),
                        "keyword" : $("input[name=keyword]").val()
                    },
                    contentType : "application/x-www-form-urlencoded;charset=utf-8",
                    scriptCharset : 'utf-8',
                    url : "/Article_management/Article_Retrieval",
                    success : function(Article_Retrieval) {
                        $(".ListInfo").html("");
                        $.each(JSON.parse(Article_Retrieval), function (i, ArticleInfo) {
                            if(ArticleInfo.Error==null){
                                // 取出信息
                                $(".ListInfo").append('<tr role="row" class="even" data-article-id="'+ArticleInfo.article_ID+'"' +
                                    ' data-article-label="'+ArticleInfo.label+'" ' +
                                    ' data-article-fixed_Link="'+ArticleInfo.fixed_link+'" ' +
                                    ' data-article-article_Status="'+ArticleInfo.article_Status+'" ' +
                                    ' data-article-degree_Openness="'+ArticleInfo.degree_Openness+'" ' +
                                    ' data-article-position="'+ArticleInfo.position+'" ' +
                                    ' data-article-release_Time="'+ArticleInfo.release_Time+'" >' +
                                    '<td class="sorting_1">'+ArticleInfo.article_ID+'</td>' +
                                    '<td>'+ArticleInfo.label+'</td>' +
                                    '<td>'+ArticleInfo.fixed_link+'</td>' +
                                    '<td>'+ArticleInfo.article_Status+'</td>' +
                                    '<td>'+ArticleInfo.degree_Openness+'</td>' +
                                    '<td>'+ArticleInfo.position+'</td>' +
                                    '<td>'+ArticleInfo.release_Time+'</td>' +
                                    '<td><a href="javascript:void(0)" onclick="ArticleInfo('+ArticleInfo.article_ID+',this)">编辑</a>||' +
                                    '<a href="javascript:void(0)" onclick="article_del('+ArticleInfo.article_ID+')">删除</a>' +
                                    '</td></tr>');
                            }else{
                                /* 弹出 model*/
                                $(".tanchuang").show();
                                $(".error-Written").html("error:"+ArticleInfo.Error);
                            }
                        });
                        $(".loading").hide();
                    }
                });
            });
        }
    })


}

/* 显示 文本编辑页面*/
function Text_Editing(Category) {
    $("body").append('<div id="Modal-window"><div style="position: fixed; left: 0px; top: 0px; z-index: 1050; width: 100%; height: 100%; opacity: 0.5; background-color: rgb(0, 0, 0);" class="mask-in"></div>'
    +'<div style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 1051; overflow: auto;">' +
        '<div class="dialog-container js-upload-dialog modal-in" style="position: relative; z-index: 1051; width: 600px; top: 149.8px; margin: 10px auto;">' +
        '<div class="tc-15-rich-dialog" style="width: auto;">' +
        '<div class="tc-15-rich-dialog-hd">' +
        '<button class="tc-15-btn-close" title="关闭" href="javascript:;"><i>×</i></button>' +
        '</div>' +
        '<div class="tc-15-rich-dialog-bd">' +
        '<div class="file-upload-dialog js-drag-area">' +
        '</div></div>' +
        '<div class="tc-15-rich-dialog-ft">' +
        '<div class="tc-15-rich-dialog-ft-btn-wrap">' +
        '<button class="tc-15-btn weak"><span>提交</span></button>' +
        '</div></div></div></div></div></div>');
    /* 关闭*/
    $(".tc-15-btn-close").click(function () {
        $("#Modal-window").remove();
    });

    /* 提交修改*/
    $(".tc-15-btn.weak").click(function () {
        // 加载 loading
        $(".loading").show();
        $("#Modal-window .mask-in").remove();
        if($(".formControls.col-xs-8.col-sm-9").data("type")=="article"){
            if(IsCorrect()){
                $.getJSON("http://quan.suning.com/getSysTime.do", function (data) {
                    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
                        // 执行文章修改方法
                        $.post("/Article_management/Save_Article",{
                            Article_ID:$("#article_id").val(),
                            Fixed_link:$("#article_fixed_Link").val(),
                            Article_Status:$("#article_Status").val(),
                            Degree_Openness:$("#article_degree_Openness").val(),
                            Release_Time:data.sysTime2,
                            Article_Content:$("#article_release_Time2").val(),
                            Label:$("#article_label").val(),
                            Position:$("#article_position").val(),
                            Category: Category,
                            User_ID:get("User_ID", 2000 * 60 * 60),
                            Token:get("Token", 2000 * 60 * 60)
                        },function(result){
                            $.each(JSON.parse(result), function (i, Save_ArticleInfo) {
                                if(Save_ArticleInfo.State=="true"){
                                    $(".loading").hide();
                                    // 文章操作成功
                                    ArticlePage();
                                    $("#Modal-window").remove();
                                }else if(Save_ArticleInfo.State=="false"){
                                    $(".loading").hide();
                                    /* 显示错误model*/
                                    $(".tanchuang").show();
                                    $(".error-Written").html("error: 修改数据库失败");
                                }else{
                                    $(".loading").hide();
                                    /* 显示错误model*/
                                    $(".tanchuang").show();
                                    $(".error-Written").html("error:"+Save_ArticleInfo.Error);
                                }
                            })
                        });
                    });
                });

            }else{
                $(".loading").hide();
                /* 显示错误model*/
                $(".tanchuang").show();
                $(".error-Written").html("error: head 文章数量最高不能超过 8 篇");
            }
        }
    })
}

/* 验证 头部 head 是否超过限制*/
function IsCorrect() {
    if($("#article_position").val()=="head"){
        var headNum = 0;
        // 获取所有头部
        $.each($(".ListInfo tr").siblings(), function (i, node) {
            if($(node).data("article-position")=="head"){
                headNum++;
            }
        })
        if(headNum>9){
            return false;
        }else{
            return true;
        }
    }else{
        return true;
    }
}

/* 验证错误 跳转 网站首页*/
function ValidationError() {
    window.location.href = "http://djokawa.com";
}

/* 删除文章 */
function article_del(Article_ID) {
    $(".loading").show();
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        $.post("/Article_management/Del_Article",{
            User_ID :  get("User_ID", 2000 * 60 * 60),
            Token : get("Token", 2000 * 60 * 60),
            Article_ID: Article_ID
        },function(result){
            $.each(JSON.parse(result), function (i, Del_Article) {
                if(Del_Article.State=="true"){
                    ArticlePage();
                    $(".loading").hide();
                }else{
                    $(".loading").hide();
                    /* 显示错误model*/
                    $(".tanchuang").show();
                    if(Del_Article.State=="false"){
                        $(".error-Written").html("error: 删除 文章数据 出现错误");
                    }else{
                        $(".error-Written").html("error: "+Del_Article.Error);
                    }
                }
            });
        });
    });
}

/* 添加文章 */
function article_add() {

    $(".loading").show();

    Text_Editing("Article_add")

    /* 设置 model 内容*/
    $(".file-upload-dialog.js-drag-area").html("")
    $(".file-upload-dialog.js-drag-area")
        .append('<div class="formControls col-xs-8 col-sm-9" data-type="article">' +
            '文章ID: &nbsp;&nbsp;<input type="text" class="input-text valid" placeholder="" id="article_id">' +
            '</div><br/>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '标题: &nbsp;&nbsp;' +
            '<input type="text" class="input-text valid" id="article_label"></div>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '链接: &nbsp;&nbsp;' +
            '<input type="text" class="input-text valid" id="article_fixed_Link"></div>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '状态: &nbsp;&nbsp;' +
            '<select id="article_Status" style="width: 100px;margin-top: 10px;margin-bottom: 10px;"><option value="发布">发布</option>' +
            '<option value="草稿">草稿</option>' +
            '</select></div>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '栏目: &nbsp;&nbsp;' +
            '<select id="article_degree_Openness" style="width: 100px;margin-bottom: 10px;">' +
            '<option value="Head menu">Head menu</option>' +
            '<option value="Friendship link">Friendship link</option>' +
            '<option value="COMPANY">COMPANY</option>' +
            '<option value="NETWORK">NETWORK</option>' +
            '</select></div>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '部位: &nbsp;&nbsp;' +
            '<select id="article_position" style="width: 100px;margin-bottom: 10px;">' +
            '<option value="head">head</option>' +
            '<option value="tail">tail</option>' +
            '</select></div>' +
            '<div class="formControls col-xs-8 col-sm-9">' +
            '内容: &nbsp;&nbsp;' +
            '<textarea name="textarea" id="article_release_Time2" cols="30" rows="10" class="input-text valid" style="height: 170px;width: 520px;padding: 10px;resize:none;"></textarea></div>');

    $(".loading").hide();
}

/* 歌曲上传*/
function ViewAll_Upload() {

    /* 加载 loading*/
    $(".loading").show();

    $(".Article_ReleaseSystem").html('<div class="panel">' +
        '<div class="panel-body"><div class="col-md-6 col-sm-12">' +
        '<p class="animated fadeInDown"><span class="fa  fa-map-marker"></span>歌曲信息</p></div>' +
        '</div></div>' +
        '<a class="btn btn-primary radius article_add article Uploaded"  data-title="歌曲上传" ' +
        ' href="javascript:void(0);" style="position: relative;top: -10px;margin-left: 20px;"><i class="Hui-iconfont"></i> 歌曲上传</a>' +
        '<div id="DataTables_Table_0_filter" class="dataTables_filter article" style="float: right;margin-right: 8%;position: relative;top: -5px;">' +
        '<label>从当前数据中检索:' +
        '<input type="search" class="input-text " name="keyword" placeholder="输入关键字搜索" aria-controls="DataTables_Table_0" style="border: 1px solid #ccc;padding-left: 1em;height: 26px;">' +
        '</label></div>' +
        '<div class="col-md-12 padding-0 form-element">' +
        '<div class="col-md-12"><div class="panel">' +
        '<div class="panel-heading">' +
        '<h3 class="Info">歌曲信息</h3>' +
        '</div><div class="panel-body">' +
        '<div class="responsive-table">' +
        '<div id="datatables-example_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">' +
        '<div class="row">' +
        '<div class="col-sm-12">' +
        '<table class="table table-striped table-bordered dataTable no-footer" width="100%" cellspacing="0" style="width: 100%;">' +
        '<thead><tr role="row">' +
        '<th class="sorting_asc" style="width: 60px;">TITLE</th>' +
        '<th class="sorting" style="width: 60px;">ARTISTS</th>' +
        '<th class="sorting" style="width: 60px;">LABELS</th>' +
        '<th class="sorting" style="width: 60px;">RELEASED</th>' +
        '<th class="sorting" style="width: 60px;">操作</th>' +
        '</tr></thead><tbody class="ListInfo"></tbody>' +
        '</table></div></div></div></div></div></div></div><div id="PageCodeTails" class="pag-number"></div>' +
        '' +
        '<div class="shangchuan">' +
        '<div class="nr"><span class="cols">×</span><div class="top">' +
        '<p class="music"><label>歌曲类型：</label><input type="text" id="song_type"></p>' +
        '<p class="music"><label>文件类型：</label><select><option value="0">试听版</option>' +
        '<option value="1">完整版</option></select></p></div><div class="xuanze">' +
        '<button id="Selectfile">选择文件</button></div><div class="wenjian"><div class="weixuanze">未选择文件/文件夹</div>' +
        '<ul>' +
        '</ul></div><div class="but"><button>确定上传</button></div></div></div></div>' +
        '')

    $(".Uploaded").click(function () {
        $(".shangchuan").show();
    })

    $.getScript("/MusicStyle/js/upload/UploadMusicFile.js");

    var num=true;
    $('.xiala').click(function(){
        if(num==true){
            $(this).siblings().css("height","215px");
            $(this).find("i.fa-angle-down").css("display","none");
            $(this).find("i.fa-angle-up").css("display","block");
            num=false;
        }else if (num==false) {
            $(this).siblings().css("height","0");
            $(this).find("i.fa-angle-down").css("display","block");
            $(this).find("i.fa-angle-up").css("display","none");
            num=true;
        }
    });

    $(".xiala button").click(function () {
        $(this).parent().parent().remove();
    })

    $(".shangchuan .cols").click(function () {
        $(".shangchuan").css("display","none")
    })


    /* 搜索功能*/
    $("input[name=keyword]").keypress(function (e) {
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13) {
            /* 验证Key是否合法*/
            var Key = $("input[name=keyword]").val();
            if (Key.match(/^\s+$/) || Key.match(/^[ ]+$/)
                || Key.match(/^[ ]/)
                || Key.match(/^[ ]*$/)
                || Key.match(/^\s*$/)) {
                /* 显示错误model*/
                $(".tanchuang").show();
                $(".error-Written").html("error: 关键词不合法");
                ViewAll_Upload();
            } else {

                $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
                    $(".loading").show();
                    // 调取接口获取结果的数量
                    $.post("/SongInfo/The_number_of_search_results", {
                        Key: $("input[name=keyword]").val(),
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
                                        elem: 'PageCodeTails'
                                        , count: ResultsNumber.ResultsNumber//数据总数
                                        , groups: 4 // 连续显示分页数
                                        , curr: 1 // 设置当前页
                                        , limit : 30
                                        //,skin: 'pag-number'   //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                                        , prev: '<i class="fa fa-angle-double-left"></i>' //若不显示，设置false即可
                                        , next: '<i class="fa fa-angle-double-right"></i>'//若不显示，设置false即可
                                        , jump: function (obj) {
                                            $(".loading").show();
                                            $.post("/SongInfo/SongInfo_Search", {
                                                Key: Key,
                                                Page: obj.curr,
                                                User_ID: get("User_ID", 2000 * 60 * 60),
                                                Token: get("Token", 2000 * 60 * 60)
                                            }, function (PageResults) {
                                                $("#ReleasesAll").html("");
                                                $(".ListInfo").html("");
                                                $.each(JSON.parse(PageResults), function (i, PageResult) {
                                                    // 取出搜索结果
                                                    if (PageResult.Error == null) {
                                                        // 关闭loading
                                                        $(".loading").hide()
                                                        $(".ListInfo").append('<tr role="row" class="even" ' +
                                                            'data-song-id="' + PageResult.song_ID + '" ' +
                                                            'data-song-name="' + PageResult.song_Name + '"' +
                                                            'data-song-artists="' + PageResult.song_Artists + '"' +
                                                            'data-song-label="' + PageResult.song_Label + '"' +
                                                            'data-song-genre="' + PageResult.song_Genre + '"' +
                                                            'data-song-releasedTime="' + PageResult.song_ReleasedTime + '"' +
                                                            'data-song-type="' + PageResult.song_Type + '"' +
                                                            'data-song-auditionAddress="' + PageResult.song_AuditionAddress + '"' +
                                                            'data-song-downloadAddress="' + PageResult.song_DownloadAddress + '"' +
                                                            'data-song-imge="' + PageResult.song_Imge + '">' +
                                                            '<td class="sorting_1">' + PageResult.song_Name + '</td>' +
                                                            '<td class="sorting_1">' + PageResult.song_Artists + '</td>' +
                                                            '<td class="sorting_1">' + PageResult.song_Label + '</td>' +
                                                            '<td class="sorting_1">' + PageResult.song_ReleasedTime + '</td>' +
                                                            '<td class="sorting_1"><a href="javascript:void(0)" onclick="Song_Editors(this);">编辑</a>||<a href="javascript:void(0)" onclick="Song_Del(this);">删除</a></td>' +
                                                            '</tr>');

                                                    } else {
                                                        // 关闭loading
                                                        $(".loading").hide()
                                                        if (PageResult.Error == "Current connection is unlawful") {
                                                            remove();
                                                            $(".tanchuang").show();
                                                            $(".error-Written").html("error: Current Token illegality");
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
                                    /* 显示错误model*/
                                    $(".tanchuang").show();
                                    $(".error-Written").html("error: Current Token illegality");
                                }
                                /* 显示错误model*/
                                $(".tanchuang").show();
                                $(".error-Written").html("error: "+ResultsNumber.Error);
                            }
                            // 关闭loading
                            $(".loading").hide();
                        });
                    });
                })
            }
        }
    })



    // 获取歌曲信息
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        /* 获取首页第一页*/
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            scriptCharset: 'utf-8',
            url: "/Paging_Action/Songs_TotalNumber",
            success: function (Pagedata) {

                /* 加载 loading*/
                $(".loading").hide();
                $.each(JSON.parse(Pagedata), function (i, PageInfo) {
                    if (PageInfo.State == "Current connection is unlawful") {
                        /* 连接非法*/
                        $(".tanchuang").show();
                        $(".error-Written").html("error: Current connection is unlawful");
                    } else if (PageInfo.State == "The token has failed") {
                        remove();
                        /* Token 失效*/
                        $(".tanchuang").show();
                        $(".error-Written").html("error: The token has failed");
                    } else {
                        layui.use(['laypage', 'layer'], function () {
                            var laypage = layui.laypage
                                , layer = layui.layer;
                            //调用尾部分页
                            laypage.render({
                                elem: 'PageCodeTails'
                                , count: PageInfo.Songs_TotalNumber//数据总数
                                , groups: 4 // 连续显示分页数
                                , curr: 1 // 设置当前页
                                , limit : 30
                                //,skin: 'pag-number'   //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                                , prev: '<i class="fa fa-angle-double-left"></i>' //若不显示，设置false即可
                                , next: '<i class="fa fa-angle-double-right"></i>'//若不显示，设置false即可
                                , jump: function (obj) {

                                    /* 加载 loading*/
                                    $(".loading").show();
                                    $(".ListInfo").html("");
                                    $.ajax({
                                        data: {
                                            "Page": obj.curr,//传入页面数据
                                            "User_ID": get("User_ID", 2000 * 60 * 60),
                                            "Token": get("Token", 2000 * 60 * 60)
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
                                                    $(".ListInfo").append('<tr role="row" class="even" ' +
                                                        'data-song-id="' + Song_Info.song_ID + '" ' +
                                                        'data-song-name="' + Song_Info.song_Name + '"' +
                                                        'data-song-artists="' + Song_Info.song_Artists + '"' +
                                                        'data-song-label="' + Song_Info.song_Label + '"' +
                                                        'data-song-genre="' + Song_Info.song_Genre + '"' +
                                                        'data-song-releasedTime="' + Song_Info.song_ReleasedTime + '"' +
                                                        'data-song-type="' + Song_Info.song_Type + '"' +
                                                        'data-song-auditionAddress="' + Song_Info.song_AuditionAddress + '"' +
                                                        'data-song-downloadAddress="' + Song_Info.song_DownloadAddress + '"' +
                                                        'data-song-imge="' + Song_Info.song_Imge + '">' +
                                                        '<td class="sorting_1">' + Song_Info.song_Name + '</td>' +
                                                        '<td class="sorting_1">' + Song_Info.song_Artists + '</td>' +
                                                        '<td class="sorting_1">' + Song_Info.song_Label + '</td>' +
                                                        '<td class="sorting_1">' + Song_Info.song_ReleasedTime + '</td>' +
                                                        '<td class="sorting_1"><a href="javascript:void(0)" onclick="Song_Editors(this);">编辑</a>||<a href="javascript:void(0)" onclick="Song_Del(this);">删除</a></td>' +
                                                        '</tr>');
                                                } else {

                                                    /* 弹出 model*/
                                                    $(".tanchuang").show();
                                                    $(".error-Written").html("error:" + Song_Info.Error);

                                                }
                                            });
                                            /* 加载 loading*/
                                            $(".loading").hide();
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });
    });
}
/* 歌曲删除*/
function Song_Del(obj) {

    /* 显示编辑页面*/
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        /* 加载loading*/
        $(".loading").show()
        // 获取数量
        $.post("/SongInfo/Delete_Song", {
            Song_ID:$(obj).parent().parent().data("song-id"),
            User_ID:get("User_ID", 2000 * 60 * 60),
            Token  :get("Token", 2000 * 60 * 60)
        },function (Song_DelResult) {
            $.each(JSON.parse(Song_DelResult), function (i, Song_DelInfo) {
                if(Song_DelInfo.Error==null){
                    if(Song_DelInfo.State=="true"){
                        $("#Modal-window").remove();
                        ViewAll_Upload();
                    }else if(Song_DelInfo.State=="false"){
                        /* 弹出 model*/
                        $(".tanchuang").show();
                        $(".error-Written").html("error: 修改数据库失败");
                    }
                }else{
                    /* 弹出 model*/
                    $(".tanchuang").show();
                    $(".error-Written").html("error:" + Song_DelInfo.Error);
                }
            });
        });
    });


}
/* 歌曲编辑*/
function Song_Editors(obj) {

    /* 显示编辑页面*/
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        /* 加载loading*/
        $(".loading").show()

        // 显示 model
        $("body").append('<div id="Modal-window"><div style="position: fixed; left: 0px; top: 0px; z-index: 1050; width: 100%; height: 100%; opacity: 0.5; background-color: rgb(0, 0, 0);" class="mask-in"></div>'
            +'<div style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 1051; overflow: auto;">' +
            '<div class="dialog-container js-upload-dialog modal-in" style="position: relative; z-index: 1051; width: 600px; top: 149.8px; margin: 10px auto;">' +
            '<div class="tc-15-rich-dialog" style="width: auto;">' +
            '<div class="tc-15-rich-dialog-hd">' +
            '<button class="tc-15-btn-close" title="关闭" href="javascript:;"><i>×</i></button>' +
            '</div>' +
            '<div class="tc-15-rich-dialog-bd">' +
            '<div class="file-upload-dialog js-drag-area">' +
            '</div></div>' +
            '<div class="tc-15-rich-dialog-ft">' +
            '<div class="tc-15-rich-dialog-ft-btn-wrap">' +
            '<button class="tc-15-btn weak"><span>提交</span></button>' +
            '</div></div></div></div></div></div>');
        /* 关闭*/
        $(".tc-15-btn-close").click(function () {
            $("#Modal-window").remove();
        });

        /* 设置 model 内容*/
        $(".file-upload-dialog.js-drag-area").html("")
        $(".file-upload-dialog.js-drag-area")
            .append('<div class="formControls col-xs-8 col-sm-9" data-type="article">' +
                '歌曲名: &nbsp;&nbsp;<input type="text" class="input-text valid" placeholder="" id="Song_Name" value="'+$(obj).parent().parent().data("song-name")+'">' +
                '</div><br/>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '演唱者: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="Song_Artists" value="'+$(obj).parent().parent().data("song-artists")+'"></div>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '唱片公司: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="Song_Label" value="'+$(obj).parent().parent().data("song-label")+'"></div>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '发布时间: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="Song_ReleasedTime" value="'+$(obj).parent().parent().data("song-releasedtime")+'"></div>'+
                '<div class="formControls col-xs-8 col-sm-9">' +
                '曲风: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="Song_Genre" value="'+$(obj).parent().parent().data("song-genre")+'"></div>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '类型: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="Song_Type" value="'+$(obj).parent().parent().data("song-type")+'"></div>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '试听地址: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="Song_AuditionAddress" value="'+$(obj).parent().parent().data("song-auditionaddress")+'"></div>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '下载地址: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="Song_DownloadAddress" value="'+$(obj).parent().parent().data("song-downloadaddress")+'"></div>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '图片地址: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="Song_Imge" value="'+$(obj).parent().parent().data("song-imge")+'"></div>');

        /* 提交*/
        $(".tc-15-btn.weak").click(function () {
            $.post("/SongInfo/Modify_SongInfo", {
                Song_ID     : $(obj).parent().parent().data("song-id"),
                Song_Name   : $("#Song_Name").val(),
                Song_Artists: $("#Song_Artists").val(),
                Song_Label  : $("#Song_Label").val(),
                Song_ReleasedTime:$("#Song_ReleasedTime").val(),
                Song_Genre  : $("#Song_Genre").val(),
                Song_Type   : $("#Song_Type").val(),
                Song_AuditionAddress:$("#Song_AuditionAddress").val(),
                Song_DownloadAddress:$("#Song_DownloadAddress").val(),
                Song_Imge   : $("#Song_Imge").val(),
                User_ID     : get("User_ID", 2000 * 60 * 60),
                Token       : get("Token", 2000 * 60 * 60)
            } , function (ModifyResult) {
                $.each(JSON.parse(ModifyResult), function (i, ModifyResultInfo) {
                    if(ModifyResultInfo.Error==null){
                        if(ModifyResultInfo.State=="true"){
                            $("#Modal-window").remove();
                            ViewAll_Upload();
                        }else{
                            $(".tanchuang").show();
                            $(".error-Written").html("error: 修改数据库失败");
                        }
                    }else{
                        /* 弹出 model*/
                        $(".tanchuang").show();
                        $(".error-Written").html("error:" + ModifyResultInfo.Error);
                    }
                });
            });
        })
        $(".loading").hide();
    });
}
/* 显示所有会员信息*/
function ViewAll_MemberInfo() {
    /* 加载 loading*/
    $(".loading").show();
    $(".Article_ReleaseSystem").html('<div class="panel">' +
        '<div class="panel-body"><div class="col-md-6 col-sm-12">' +
        '<p class="animated fadeInDown"><span class="fa  fa-map-marker"></span>会员统计</p></div>' +
        '</div></div>' +
        '<a class="btn btn-primary radius article_add article"  data-title="添加会员" onclick="member_add()"' +
        ' href="javascript:void(0);" style="position: relative;top: -10px;margin-left: 20px;"><i class="Hui-iconfont"></i> 添加会员</a>' +
        '<div id="DataTables_Table_0_filter" class="dataTables_filter article" style="float: right;margin-right: 8%;position: relative;top: -5px;">' +
        '<label>从当前数据中检索:' +
        '<input type="search" class="input-text " name="keyword" placeholder="输入用户名" aria-controls="DataTables_Table_0" style="border: 1px solid #ccc;padding-left: 1em;height: 26px;">' +
        '</label></div>' +
        '<div class="col-md-12 padding-0 form-element">' +
        '<div class="col-md-12"><div class="panel">' +
        '<div class="panel-heading">' +
        '<h3 class="Info">会员列表</h3>' +
        '</div><div class="panel-body">' +
        '<div class="responsive-table">' +
        '<div id="datatables-example_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">' +
        '<div class="row">' +
        '<div class="col-sm-12">' +
        '<table class="table table-striped table-bordered dataTable no-footer" width="100%" cellspacing="0" style="width: 100%;">' +
        '<thead><tr role="row">' +
        '<th class="sorting_asc" style="width: 60px;">会员ID</th>' +
        '<th class="sorting" style="width: 60px;">用户ID</th>' +
        '<th class="sorting" style="width: 60px;">用户名</th>' +
        '<th class="sorting" style="width: 60px;">开通时间</th>' +
        '<th class="sorting" style="width: 60px;">结束时间</th>' +
        '<th class="sorting" style="width: 60px;">状态</th>' +
        '<th class="sorting" style="width: 61px;">操 作</th>' +
        '</tr></thead><tbody class="ListInfo"></tbody>' +
        '</table></div></div></div></div></div></div></div><div id="PageCodeTails" class="pag-number"></div>');


    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {

        $("input[name=keyword]").keypress(function (e) {
            var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
            if (eCode == 13) {
                $.post("/OpenMember/MemberInfo_Search", {
                    Keyword:$("input[name=keyword]").val(),
                    User_ID: get("User_ID", 2000 * 60 * 60),
                    Token: get("Token", 2000 * 60 * 60)
                },function (MemberInfo_Search) {
                    $(".ListInfo").html("");
                    $.each(JSON.parse(MemberInfo_Search), function (i, MemberInfo) {
                        if(MemberInfo.MemberInfo[i].Error==null){
                            $(".ListInfo").append('<tr role="row" class="even">' +
                                '<td class="sorting_1">' + MemberInfo.MemberInfo[i].member_ID + '</td>' +
                                '<td class="sorting_1">' + MemberInfo.MemberInfo[i].user_ID + '</td>' +
                                '<td class="sorting_1">' + MemberInfo.User_Info[i].user_Name + '</td>' +
                                '<td class="sorting_1">' + MemberInfo.MemberInfo[i].opening_Time + '</td>' +
                                '<td class="sorting_1">' + MemberInfo.MemberInfo[i].expiry_Time + '</td>' +
                                '<td class="sorting_1">' + MemberInfo.MemberInfo[i].member_Type + '</td>' +
                                '<td class="sorting_1"><a href="javascript:void(0)"' +
                                ' data-member-id="' + MemberInfo.MemberInfo[i].member_ID + '"' +
                                ' data-user-id="' + MemberInfo.MemberInfo[i].user_ID + '"' +
                                ' data-member-opening_time="' + MemberInfo.MemberInfo[i].opening_Time + '"' +
                                ' data-member-expiry_time="' + MemberInfo.MemberInfo[i].expiry_Time + '"' +
                                ' data-member-type="' + MemberInfo.MemberInfo[i].member_Type + '"' +
                                'onclick="Member_editors(this)">编辑</a>||<a href="javascript:void(0)" onclick="Delete_member(' + MemberInfo.MemberInfo[i].member_ID + ')">删除</a></td>' +
                                '</tr>');
                            $("#PageCodeTails").remove();
                        }else{
                            /* 弹出 model*/
                            $(".tanchuang").show();
                            $(".error-Written").html("error:" + MemberInfo.MemberInfo[i].Error);
                            ViewAll_MemberInfo();
                        }
                    })
                });
            }
        });

        // 获取数量
        $.post("/Controller/Member_Number", function (Member_NumberResult) {

            $.each(JSON.parse(Member_NumberResult), function (i, Member_Number) {
                layui.use(['laypage', 'layer'], function () {
                    var laypage = layui.laypage
                        , layer = layui.layer;
                    laypage.render({
                        elem: 'PageCodeTails'
                        , count: Member_Number.number//数据总数
                        , groups: 4 // 连续显示分页数
                        , curr: 1 // 设置当前页
                        , limit : 30
                        //,skin: 'pag-number'   //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                        , prev: '<i class="fa fa-angle-double-left"></i>' //若不显示，设置false即可
                        , next: '<i class="fa fa-angle-double-right"></i>'//若不显示，设置false即可
                        , jump: function (obj) {
                            /* 加载 loading*/
                            $(".loading").show();
                            $.post("/Controller/Membership_ManagementSystem", {
                                User_ID: get("User_ID", 2000 * 60 * 60),
                                Token: get("Token", 2000 * 60 * 60),
                                Page: obj.curr
                            }, function (Result) {
                                $(".ListInfo").html("");
                                $.each(JSON.parse(Result), function (i, MemberInfo) {

                                    for(var i = 0 ; i < MemberInfo.Size ; i++){


                                        if (MemberInfo.MemberInfo[i].Error == null) {
                                            $(".ListInfo").append('<tr role="row" class="even">' +
                                                '<td class="sorting_1">' + MemberInfo.MemberInfo[i].member_ID + '</td>' +
                                                '<td class="sorting_1">' + MemberInfo.MemberInfo[i].user_ID + '</td>' +
                                                '<td class="sorting_1">' + MemberInfo.User_Info[i].user_Name + '</td>' +
                                                '<td class="sorting_1">' + MemberInfo.MemberInfo[i].opening_Time + '</td>' +
                                                '<td class="sorting_1">' + MemberInfo.MemberInfo[i].expiry_Time + '</td>' +
                                                '<td class="sorting_1">' + MemberInfo.MemberInfo[i].member_Type + '</td>' +
                                                '<td class="sorting_1"><a href="javascript:void(0)"' +
                                                ' data-member-id="' + MemberInfo.MemberInfo[i].member_ID + '"' +
                                                ' data-user-id="' + MemberInfo.MemberInfo[i].user_ID + '"' +
                                                ' data-member-opening_time="' + MemberInfo.MemberInfo[i].opening_Time + '"' +
                                                ' data-member-expiry_time="' + MemberInfo.MemberInfo[i].expiry_Time + '"' +
                                                ' data-member-type="' + MemberInfo.MemberInfo[i].member_Type + '"' +
                                                'onclick="Member_editors(this)">编辑</a>||<a href="javascript:void(0)" onclick="Delete_member(' + MemberInfo.MemberInfo[i].member_ID + ')">删除</a></td>' +
                                                '</tr>');
                                        } else {
                                            if (MemberInfo.MemberInfo[i].Error == "Identity check does not pass") {
                                                remove();
                                                /* Token 失效*/
                                                $(".tanchuang").show();
                                                $(".error-Written").html("error: The token has failed");
                                            } else {
                                                /* 弹出 model*/
                                                $(".tanchuang").show();
                                                $(".error-Written").html("error:" + MemberInfo.MemberInfo[i].Error);
                                            }
                                        }

                                    }


                                });
                                $(".loading").hide();
                            });
                        }
                    });
                });
            });
        })
    });
}

/* 会员编辑页面*/
function Member_editors(obj) {
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        /* 加载loading*/
        $(".loading").show()

        // 显示 model
        $("body").append('<div id="Modal-window"><div style="position: fixed; left: 0px; top: 0px; z-index: 1050; width: 100%; height: 100%; opacity: 0.5; background-color: rgb(0, 0, 0);" class="mask-in"></div>'
            +'<div style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 1051; overflow: auto;">' +
            '<div class="dialog-container js-upload-dialog modal-in" style="position: relative; z-index: 1051; width: 600px; top: 149.8px; margin: 10px auto;">' +
            '<div class="tc-15-rich-dialog" style="width: auto;">' +
            '<div class="tc-15-rich-dialog-hd">' +
            '<button class="tc-15-btn-close" title="关闭" href="javascript:;"><i>×</i></button>' +
            '</div>' +
            '<div class="tc-15-rich-dialog-bd">' +
            '<div class="file-upload-dialog js-drag-area">' +
            '</div></div>' +
            '<div class="tc-15-rich-dialog-ft">' +
            '<div class="tc-15-rich-dialog-ft-btn-wrap">' +
            '<button class="tc-15-btn weak"><span>提交</span></button>' +
            '</div></div></div></div></div></div>');
        /* 关闭*/
        $(".tc-15-btn-close").click(function () {
            $("#Modal-window").remove();
        });

        /* 设置 model 内容*/
        $(".file-upload-dialog.js-drag-area").html("")
        $(".file-upload-dialog.js-drag-area")
            .append('<div class="formControls col-xs-8 col-sm-9" data-type="article">' +
                '会员ID: &nbsp;&nbsp;<input type="text" class="input-text valid" placeholder="" id="member_id" value="'+$(obj).data("member-id")+'">' +
                '</div><br/>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '开通时间: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="Opening_Time" value="'+$(obj).data("member-opening_time")+'"></div>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '结束时间: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="expiry_Time" value="'+$(obj).data("member-expiry_time")+'"></div>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '会员状态: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="member_type" value="'+$(obj).data("member-type")+'"></div>');

        /* 提交*/
        $(".tc-15-btn.weak").click(function () {

            if($("#member_id").val()!=""&&$("#Opening_Time").val()!=""&&$("#expiry_Time").val()!=""&&$("#member_type").val()!=""){
                if(Validation_TimeFormat($("#Opening_Time").val())&&Validation_TimeFormat($("#expiry_Time").val())){

                    $.post("/OpenMember/Modifying_Member_Info", {
                        MemberOpening_Time: $("#Opening_Time").val(),
                        MemberExpiry_Time: $("#expiry_Time").val(),
                        Member_Type: $("#member_type").val(),
                        Member_ID: $("#member_id").val(),
                        User_ID: get("User_ID", 2000 * 60 * 60),
                        Token: get("Token", 2000 * 60 * 60)
                    }, function (result) {
                        $.each(JSON.parse(result), function (i, Modifying_Member_Info) {
                            if(Modifying_Member_Info.State=="true"){
                                $("#Modal-window").remove();
                                ViewAll_MemberInfo();
                            }else if(Modifying_Member_Info.State=="false"){
                                $(".tanchuang").show();
                                $(".error-Written").html("error: 修改数据库失败");
                            }else{
                                $(".tanchuang").show();
                                $(".error-Written").html("error: "+Modifying_Member_Info.Error);
                            }
                        });
                        $(".loading").hide();
                    });
                }else{
                    $(".tanchuang").show();
                    $(".error-Written").html("error: 请输入正确的时间格式 yyyy-MM-dd HH:mm:ss");
                }
            }else{
                /* 弹出 model*/
                $(".tanchuang").show();
                $(".error-Written").html("error: 不能修改为空值");
            }
        })
        $(".loading").hide();
    });
}
/* 删除一个会员*/
function Delete_member(Member_ID) {
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        $.ajax({
            type: "POST",
            data: {
                "Member_ID": Member_ID,
                "User_ID"  : get("User_ID", 2000 * 60 * 60),
                "Token"    : get("Token", 2000 * 60 * 60)
            },
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            scriptCharset: 'utf-8',
            url: "/OpenMember/Delete_member",
            success: function (result) {
                $.each(JSON.parse(result), function (i, ArticleInfo) {
                    if(ArticleInfo.State=="true"){
                        // 删除成功,重新载入会员列表页面
                        ViewAll_MemberInfo();
                    }else if(ArticleInfo.State=="false"){
                        $(".tanchuang").show();
                        $(".error-Written").html("error: 删除数据库出现错误");
                    }else{
                        $(".tanchuang").show();
                        $(".error-Written").html("error: "+ArticleInfo.Error);
                    }
                });
            }
        });
    });
}

/* 添加一个会员*/
function member_add() {
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        /* 加载loading*/
        $(".loading").show()

        // 显示 model
        $("body").append('<div id="Modal-window"><div style="position: fixed; left: 0px; top: 0px; z-index: 1050; width: 100%; height: 100%; opacity: 0.5; background-color: rgb(0, 0, 0);" class="mask-in"></div>'
            +'<div style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 1051; overflow: auto;">' +
            '<div class="dialog-container js-upload-dialog modal-in" style="position: relative; z-index: 1051; width: 600px; top: 149.8px; margin: 10px auto;">' +
            '<div class="tc-15-rich-dialog" style="width: auto;">' +
            '<div class="tc-15-rich-dialog-hd">' +
            '<button class="tc-15-btn-close" title="关闭" href="javascript:;"><i>×</i></button>' +
            '</div>' +
            '<div class="tc-15-rich-dialog-bd">' +
            '<div class="file-upload-dialog js-drag-area">' +
            '</div></div>' +
            '<div class="tc-15-rich-dialog-ft">' +
            '<div class="tc-15-rich-dialog-ft-btn-wrap">' +
            '<button class="tc-15-btn weak"><span>提交</span></button>' +
            '</div></div></div></div></div></div>');


        /* 关闭*/
        $(".tc-15-btn-close").click(function () {
            $("#Modal-window").remove();
        });

        /* 设置 model 内容*/
        $(".file-upload-dialog.js-drag-area").html("")
        $(".file-upload-dialog.js-drag-area")
            .append('<div class="formControls col-xs-8 col-sm-9" data-type="article">' +
                '用户名: &nbsp;&nbsp;<input type="text" class="input-text valid" placeholder="" id="user_name" >' +
                '</div><br/>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '开通时间: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="Opening_Time"></div>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '结束时间: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="expiry_Time"></div>' +
                '<div class="formControls col-xs-8 col-sm-9">' +
                '会员状态: &nbsp;&nbsp;' +
                '<input type="text" class="input-text valid" id="member_type"></div>');
        $(".loading").hide();
        $(".tc-15-btn.weak").click(function () {

            if($("#user_name").val()!=""&&$("#Opening_Time").val()!=""&&$("#expiry_Time").val()!=""&&$("#member_type").val()!=""){
                if(Validation_TimeFormat($("#Opening_Time").val())&&Validation_TimeFormat($("#expiry_Time").val())){

                    $.post("/OpenMember/Add_member", {
                        User_Name: $("#user_name").val(),
                        Opening_Time: $("#Opening_Time").val(),
                        Expiry_Time:$("#expiry_Time").val(),
                        Member_Type:$("#member_type").val(),
                        User_ID:get("User_ID", 2000 * 60 * 60),
                        Token:get("Token", 2000 * 60 * 60)
                    }, function (VerificationResult) {
                        $.each(JSON.parse(VerificationResult), function (i, ArticleInfo) {
                            if(ArticleInfo.Error==null){
                                if(ArticleInfo.state=="true"){
                                    ViewAll_MemberInfo();
                                }else{
                                    $(".tanchuang").show();
                                    $(".error-Written").html("error: 操作数据库失败");
                                }
                            }else{
                                $(".tanchuang").show();
                                $(".error-Written").html("error: "+ArticleInfo.Error);
                            }
                        });
                        $(".loading").hide();
                    });
                }else{
                    $(".tanchuang").show();
                    $(".error-Written").html("error: 请输入正确的时间格式 yyyy-MM-dd HH:mm:ss");
                }
            }else{
                /* 弹出 model*/
                $(".tanchuang").show();
                $(".error-Written").html("error: 不能保存为空值");
            }
        })
    });
}
/* 验证时间格式*/
function Validation_TimeFormat(Time) {
    // 定义正则 验证时间格式
    var regular_expression = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/;
    if(regular_expression.test(Time)){
        return true;
    }else{
        return false;
    }
}
/* 显示所有订单信息*/
function ViewAll_Order() {
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        $(".Article_ReleaseSystem").html('<div class="panel">' +
            '<div class="panel-body"><div class="col-md-6 col-sm-12">' +
            '<p class="animated fadeInDown"><span class="fa  fa-map-marker"></span>订单统计</p></div>' +
            '</div></div>' +
            '<div id="DataTables_Table_0_filter" class="dataTables_filter article" style="float: right;margin-right: 8%;position: relative;top: -5px;">' +
            '<label>从当前数据中检索:' +
            '<input type="search" class="input-text " name="keyword" placeholder="输入订单编号" aria-controls="DataTables_Table_0" style="border: 1px solid #ccc;padding-left: 1em;height: 26px;">' +
            '</label></div>' +
            '<div class="col-md-12 padding-0 form-element">' +
            '<div class="col-md-12"><div class="panel">' +
            '<div class="panel-heading">' +
            '<h3 class="Info">订单列表</h3>' +
            '</div><div class="panel-body">' +
            '<div class="responsive-table">' +
            '<div id="datatables-example_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">' +
            '<div class="row">' +
            '<div class="col-sm-12">' +
            '<table class="table table-striped table-bordered dataTable no-footer" width="100%" cellspacing="0" style="width: 100%;">' +
            '<thead><tr role="row">' +
            '<th class="sorting_asc" style="width: 60px;">商户订单编号</th>' +
            '<th class="sorting" style="width: 60px;">订单名称</th>' +
            '<th class="sorting" style="width: 60px;">支付宝订单编号</th>' +
            '<th class="sorting" style="width: 60px;">订单金额</th>' +
            '<th class="sorting" style="width: 61px;">实际支付金额</th>' +
            '<th class="sorting" style="width: 60px;">订单状态</th>' +
            '<th class="sorting" style="width: 61px;">用户ID</th>' +
            '<th class="sorting" style="width: 61px;">操作</th>' +
            '</tr></thead><tbody class="ListInfo"></tbody>' +
            '</table></div></div></div></div></div></div></div><div id="PageCodeTails" class="pag-number"></div>');
        /* 加载 loading*/
        $(".loading").show();


        $("input[name=keyword]").keypress(function (e) {
            var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
            if (eCode == 13) {

                if($("input[name=keyword]").val()==""){
                    ViewAll_Order();
                }else{
                    $.post("/Order_Management/Order_Search", {
                        KeyWord:$("input[name=keyword]").val(),
                        User_ID: get("User_ID", 2000 * 60 * 60),
                        Token: get("Token", 2000 * 60 * 60)
                    },function (MemberInfo_Search) {
                        /* 加载 loading*/
                        $(".loading").hide();
                        $("#PageCodeTails").remove();
                        $(".ListInfo").html("");
                        $.each(JSON.parse(MemberInfo_Search), function (i, MemberInfo_SearchInfo) {
                            if(MemberInfo_SearchInfo.Error==null){
                                $(".ListInfo").append('<tr role="row" class="even">' +
                                    '<td class="sorting_1">' + MemberInfo_SearchInfo.order_Number + '</td>' +
                                    '<td class="sorting_1">' + MemberInfo_SearchInfo.order_Name + '</td>' +
                                    '<td class="sorting_1">' + MemberInfo_SearchInfo.alipay_Order_Id + '</td>' +
                                    '<td class="sorting_1">' + MemberInfo_SearchInfo.order_Amount + '</td>' +
                                    '<td class="sorting_1">' + MemberInfo_SearchInfo.actual_payment + '</td>' +
                                    '<td class="sorting_1">' + MemberInfo_SearchInfo.order_Status + '</td>' +
                                    '<td class="sorting_1">' + MemberInfo_SearchInfo.user_ID + '</td>' +
                                    '<td class="sorting_1"><a href="javascript:void(0)"' +
                                    'onclick="Delete_order('+MemberInfo_SearchInfo.order_ID+')">删除</a></td>' +
                                    '</tr>');
                            }else{
                                /* 弹出 model*/
                                $(".tanchuang").show();
                                $(".error-Written").html("error: "+MemberInfo_SearchInfo.Error);
                            }
                        });
                    });
                }
            }
        });

        // 获取订单数量
        $.post("/Controller/Order_Number", function (Order_Number) {
            $.each(JSON.parse(Order_Number), function (i, Number) {
                layui.use(['laypage', 'layer'], function () {
                    var laypage = layui.laypage
                        , layer = layui.layer;
                    laypage.render({
                        elem: 'PageCodeTails'
                        , count: Number.number//数据总数
                        , groups: 4 // 连续显示分页数
                        , curr: 1 // 设置当前页
                        , limit : 30
                        //,skin: 'pag-number'   //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                        , prev: '<i class="fa fa-angle-double-left"></i>' //若不显示，设置false即可
                        , next: '<i class="fa fa-angle-double-right"></i>'//若不显示，设置false即可
                        , jump: function (obj) {

                            // 获取订单信息
                            $.post("/Controller/Order_ManagementSystem", {
                                User_ID:get("User_ID", 2000 * 60 * 60),
                                Token:get("Token", 2000 * 60 * 60),
                                Page :obj.curr
                            }, function (Order_ManagementSystem) {
                                /* 加载 loading*/
                                $(".loading").hide();
                                $(".ListInfo").html("");
                                $.each(JSON.parse(Order_ManagementSystem), function (i, Order_ManagementSystemInfo) {
                                    if(Order_ManagementSystemInfo.Error==null){
                                        $(".ListInfo").append('<tr role="row" class="even">' +
                                            '<td class="sorting_1">' + Order_ManagementSystemInfo.order_Number + '</td>' +
                                            '<td class="sorting_1">' + Order_ManagementSystemInfo.order_Name + '</td>' +
                                            '<td class="sorting_1">' + Order_ManagementSystemInfo.alipay_Order_Id + '</td>' +
                                            '<td class="sorting_1">' + Order_ManagementSystemInfo.order_Amount + '</td>' +
                                            '<td class="sorting_1">' + Order_ManagementSystemInfo.actual_payment + '</td>' +
                                            '<td class="sorting_1">' + Order_ManagementSystemInfo.order_Status + '</td>' +
                                            '<td class="sorting_1">' + Order_ManagementSystemInfo.user_ID + '</td>' +
                                            '<td class="sorting_1"><a href="javascript:void(0)"' +
                                            'onclick="Delete_order('+Order_ManagementSystemInfo.order_ID+')">删除</a></td>' +
                                            '</tr>');
                                    }else{
                                        /* 弹出 model*/
                                        $(".tanchuang").show();
                                        $(".error-Written").html("error: "+Order_ManagementSystemInfo.Error);
                                    }
                                });
                            });

                        }
                    })
                })
            });
        });
    });
}
/* 删除一条订单信息*/
function Delete_order(Order_ID) {
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {
        $.ajax({
            type: "POST",
            data: {
                "Order_ID": Order_ID,
                "User_ID" : get("User_ID", 2000 * 60 * 60),
                "Token"   : get("Token", 2000 * 60 * 60)
            },
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            scriptCharset: 'utf-8',
            url: "/Order_Management/Delete_order_information",
            success: function (result) {
                $.each(JSON.parse(result), function (i, OrderInfo) {
                    if(OrderInfo.State=="true"){
                        // 删除成功,重新载入订单页面
                        ViewAll_Order();
                    }else{
                        if(OrderInfo.State=="false"){
                            /* 弹出 model*/
                            $(".tanchuang").show();
                            $(".error-Written").html("error: 修改数据库失败");
                        }else{
                            /* 弹出 model*/
                            $(".tanchuang").show();
                            $(".error-Written").html("error: "+OrderInfo.Error);
                        }
                    }
                });
            }
        });
    });
}

/* 用户管理*/
function user_management() {
    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {


        $(".Article_ReleaseSystem").html('<div class="panel">' +
            '<div class="panel-body"><div class="col-md-6 col-sm-12">' +
            '<p class="animated fadeInDown"><span class="fa  fa-map-marker"></span>用户管理</p></div>' +
            '</div></div>' +
            '<div id="DataTables_Table_0_filter" class="dataTables_filter article" style="float: right;margin-right: 8%;position: relative;top: -5px;">' +
            '<label>从当前数据中检索:' +
            '<input type="search" class="input-text " name="keyword" placeholder="输入用户名或邮箱" aria-controls="DataTables_Table_0" style="border: 1px solid #ccc;padding-left: 1em;height: 26px;">' +
            '</label></div>' +
            '<div class="col-md-12 padding-0 form-element">' +
            '<div class="col-md-12"><div class="panel">' +
            '<div class="panel-heading">' +
            '<h3 class="Info">用户列表</h3>' +
            '</div><div class="panel-body">' +
            '<div class="responsive-table">' +
            '<div id="datatables-example_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">' +
            '<div class="row">' +
            '<div class="col-sm-12">' +
            '<table class="table table-striped table-bordered dataTable no-footer" width="100%" cellspacing="0" style="width: 100%;">' +
            '<thead><tr role="row">' +
            '<th class="sorting_asc" style="width: 60px;">用户名</th>' +
            '<th class="sorting" style="width: 60px;">用户密码</th>' +
            '<th class="sorting" style="width: 60px;">用户邮箱</th>' +
            '<th class="sorting" style="width: 60px;">角色</th>' +
            '<th class="sorting" style="width: 60px;">操作</th>' +
            '</tr></thead><tbody class="ListInfo"></tbody>' +
            '</table></div></div></div></div></div></div></div><div id="PageCodeTails" class="pag-number"></div>');
        /* 加载 loading*/
        $(".loading").show();


        /* 定义用户搜索*/
        $("input[name=keyword]").keypress(function (e) {
            var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
            if (eCode == 13) {
                $(".loading").show();
                $.ajax({
                    type: "POST",
                    data: {
                        "User_ID": get("User_ID", 2000 * 60 * 60),
                        "Token": get("Token", 2000 * 60 * 60),
                        "keyword": $("input[name=keyword]").val()
                    },
                    contentType: "application/x-www-form-urlencoded;charset=utf-8",
                    scriptCharset: 'utf-8',
                    url: "/UserInfo/UserSearch",
                    success: function (Search_Result) {
                        $(".ListInfo").html("");
                        $.each(JSON.parse(Search_Result), function (i, UserInfo) {
                            if(UserInfo.errMsg=="OK"){
                                $(".ListInfo").append('<tr role="row" class="even">' +
                                    '<td class="sorting_1">' + UserInfo.user_info[i].user_Name + '</td>' +
                                    '<td class="sorting_1">' + UserInfo.user_info[i].user_Password + '</td>' +
                                    '<td class="sorting_1">' + UserInfo.user_info[i].user_Email + '</td>' +
                                    '<td class="sorting_1">' + UserInfo.user_info[i].user_Job + '</td>' +
                                    '<td class="sorting_1"><a href="javascript:void(0)"' +
                                    'onclick="Delete_user('+UserInfo.user_info[i].user_ID+')">删除</a></td>' +
                                    '</tr>');
                            }else{
                                /* 弹出 model*/
                                $(".tanchuang").show();
                                $(".error-Written").html("error: "+UserInfo.errMsg);
                            }
                        });
                        $(".loading").hide();
                    }
                });
            }
        })

        // 拿到所有用户数量
        $.post("/UserInfo/User_InfoNumberInquire", function (User_InfoNumber) {
            $.each(JSON.parse(User_InfoNumber), function (i, Number) {
                if(Number.errMsg=="OK"){
                    layui.use(['laypage', 'layer'], function () {
                        var laypage = layui.laypage
                            , layer = layui.layer;
                        laypage.render({
                            elem: 'PageCodeTails'
                            , count: Number.number//数据总数
                            , groups: 4 // 连续显示分页数
                            , curr: 1 // 设置当前页
                            , limit : 30
                            //,skin: 'pag-number'   //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                            , prev: '<i class="fa fa-angle-double-left"></i>' //若不显示，设置false即可
                            , next: '<i class="fa fa-angle-double-right"></i>'//若不显示，设置false即可
                            , jump: function (obj) {
                                Page :
                                // 拿到用户信息
                                $.post("/UserInfo/User_overview",{
                                    User_ID:get("User_ID", 2000 * 60 * 60),
                                    Token  :get("Token", 2000 * 60 * 60),
                                    Page   :obj.curr
                                },function (Result_infor) {
                                    /* 加载 loading*/
                                    $(".loading").hide();
                                    $(".ListInfo").html("");
                                    // 获取结果信息
                                    $.each(JSON.parse(Result_infor), function (i, UserInfo) {
                                        console.log(UserInfo);
                                        for(var i = 0 ; i < UserInfo.Size ; i++){
                                            if(UserInfo.errMsg=="OK"){
                                                $(".ListInfo").append('<tr role="row" class="even">' +
                                                    '<td class="sorting_1">' + UserInfo.user_info[i].user_Name + '</td>' +
                                                    '<td class="sorting_1">' + UserInfo.user_info[i].user_Password + '</td>' +
                                                    '<td class="sorting_1">' + UserInfo.user_info[i].user_Email + '</td>' +
                                                    '<td class="sorting_1">' + UserInfo.user_info[i].user_Job + '</td>' +
                                                    '<td class="sorting_1"><a href="javascript:void(0)"' +
                                                    'onclick="Delete_user('+UserInfo.user_info[i].user_ID+')">删除</a></td>' +
                                                    '</tr>');
                                            }else{
                                                /* 弹出 model*/
                                                $(".tanchuang").show();
                                                $(".error-Written").html("error: "+UserInfo.errMsg);
                                            }
                                        }
                                    })
                                })
                            }
                        })
                    })
                }else{
                    /* 弹出 model*/
                    $(".tanchuang").show();
                    $(".error-Written").html("error: "+Number.errMsg);
                }
            });
        });
    })
}

/* 删除一个用户*/
function Delete_user(user_id) {

    $.getScript("/MusicStyle/js/localStorage/localStorage.js", function () {

        /* 加载 loading*/
        $(".loading").show();

        $.post("/UserInfo/Delete_user",{
            Administrator_ID:get("User_ID", 2000 * 60 * 60),
            Token   :get("Token", 2000 * 60 * 60),
            User_ID : user_id
        },function (Result_infor) {
            /* 关闭loading */
            $(".loading").hide();
            $.each(JSON.parse(Result_infor), function (i, Delete_Result) {
                if(Delete_Result.errMsg=="OK"){
                    // 重新加载用户管理
                    user_management();
                }else{
                    /* 弹出 model*/
                    $(".tanchuang").show();
                    $(".error-Written").html("error: "+Delete_Result.errMsg);
                }
            })
        });
    });
}

/* 设置下载量*/
function Download_Setting() {

    $(".loading").show();

    // 显示 model
    $("body").append('<div id="Modal-window"><div style="position: fixed; left: 0px; top: 0px; z-index: 1050; width: 100%; height: 100%; opacity: 0.5; background-color: rgb(0, 0, 0);" class="mask-in"></div>'
        +'<div style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 1051; overflow: auto;">' +
        '<div class="dialog-container js-upload-dialog modal-in" style="position: relative; z-index: 1051; width: 600px; top: 149.8px; margin: 10px auto;">' +
        '<div class="tc-15-rich-dialog" style="width: auto;">' +
        '<div class="tc-15-rich-dialog-hd">' +
        '<button class="tc-15-btn-close" title="关闭" href="javascript:;"><i>×</i></button>' +
        '</div>' +
        '<div class="tc-15-rich-dialog-bd">' +
        '<div class="file-upload-dialog js-drag-area">' +
        '</div></div>' +
        '<div class="tc-15-rich-dialog-ft">' +
        '<div class="tc-15-rich-dialog-ft-btn-wrap">' +
        '<button class="tc-15-btn weak"><span>提交</span></button>' +
        '</div></div></div></div></div></div>');
    /* 关闭*/
    $(".tc-15-btn-close").click(function () {
        $("#Modal-window").remove();
    });

    // 获取价格信息
    $.post("/OpenMember/Download_Setting", {
        User_ID: get("User_ID", 2000 * 60 * 60),
        Token: get("Token", 2000 * 60 * 60)
    }, function (Result) {
        $.each(JSON.parse(Result), function (i, ResultInfo) {
            if(ResultInfo.errMsg=="OK"){
                for(var i = 0 ; i < ResultInfo.Size ; i++){

                    var month,season,year,monthDownloads,seasonDownloads,yearDownloads,monthId,seasonId,yearId;
                    if(ResultInfo.priceInfo[i].membership_Name=="包月"){
                        month = ResultInfo.priceInfo[i].membership_Price;
                        monthDownloads = ResultInfo.priceInfo[i].downloads;
                        monthId = ResultInfo.priceInfo[i].price_ID;
                    }else if(ResultInfo.priceInfo[i].membership_Name=="包季"){
                        season = ResultInfo.priceInfo[i].membership_Price;
                        seasonDownloads = ResultInfo.priceInfo[i].downloads;
                        seasonId = ResultInfo.priceInfo[i].price_ID;
                    }else if(ResultInfo.priceInfo[i].membership_Name=="包年"){
                        year  = ResultInfo.priceInfo[i].membership_Price;
                        yearDownloads = ResultInfo.priceInfo[i].downloads;
                        yearId = ResultInfo.priceInfo[i].price_ID;
                    }

                    /* 设置 model 内容*/
                    $(".file-upload-dialog.js-drag-area")
                        .html('<div class="formControls col-xs-8 col-sm-9">' +
                            '会员类目  : &nbsp;&nbsp;<select onchange="getDiscount(this)" id="select">' +
                            '<option value="0" price="'+month+'" downloads="'+monthDownloads+'" priceId="'+monthId+'">包月度</option>' +
                            '<option value="1" price="'+season+'" downloads="'+seasonDownloads+'" priceId="'+seasonId+'">包季度</option>' +
                            '<option value="2" price="'+year+'" downloads="'+yearDownloads+'" priceId="'+yearId+'">包年度</option>' +
                            '</select>' +
                            '</div><br/><br/>' +
                            '<div class="formControls col-xs-8 col-sm-9">' +
                            '<br/>会员价格  : &nbsp;&nbsp;' +
                            '<input type="text" class="input-text valid" id="Membership_price" value="'+month+'"></div>' +
                            '<div class="formControls col-xs-8 col-sm-9">' +
                            '<br/>会员可下载量: &nbsp;&nbsp;' +
                            '<input type="text" class="input-text valid" id="Downloads" value="'+monthDownloads+'"></div>');

                }
            }else{
                $(".loading").hide();
                /* 弹出 model*/
                $(".tanchuang").show();
                $(".error-Written").html("error: "+ResultInfo.errMsg);
            }
        })
        $(".loading").hide();
    });

    $(".tc-15-btn.weak").click(function () {
        $(".loading").show();
        console.log("Save submission");
        $.post("/OpenMember/Modify_Membership_Price", {
            User_ID: get("User_ID", 2000 * 60 * 60),
            Token: get("Token", 2000 * 60 * 60),
            Price: $("#Membership_price").val(),
            Num  : $("#Downloads").val(),
            PriceID:$("#select").find("option:selected").attr("priceId")
        },function (Result) {
            $.each(JSON.parse(Result), function (i, ResultInfo) {
                if(ResultInfo.errMsg=="OK"){
                    if(ResultInfo.result==true){
                        $(".loading").hide();
                        $("#Modal-window").remove();
                        /* 弹出 model*/
                        $(".tanchuang").show();
                        $(".error-Written").html("error: 修改成功");
                    }else{
                        $(".loading").hide();
                        /* 弹出 model*/
                        $(".tanchuang").show();
                        $(".error-Written").html("error: 修改数据库失败");
                    }
                }else{
                    $(".loading").hide();
                    /* 弹出 model*/
                    $(".tanchuang").show();
                    $(".error-Written").html("error: "+ResultInfo.errMsg);
                }
            });
        });
    })




}
/* 动态切换数据*/
function getDiscount(obj) {
    if($(obj).val()==0){
        /* 包月 */
        $("#Membership_price").val($(obj).find("option:selected").attr("price"))
        $("#Downloads").val($(obj).find("option:selected").attr("downloads"))
    }else if($(obj).val()==1){
        /* 包季 */
        $("#Membership_price").val($(obj).find("option:selected").attr("price"))
        $("#Downloads").val($(obj).find("option:selected").attr("downloads"))
    }else if($(obj).val()==2){
        /* 包年 */
        $("#Membership_price").val($(obj).find("option:selected").attr("price"))
        $("#Downloads").val($(obj).find("option:selected").attr("downloads"))
    }

}