$("#login_Btn").mouseover(function () {
    $(".loginym").css("display","block");
})
$(".neirong").mouseover(function () {
    $(".loginym").css("display","block");
})
$(".neirong").mouseout(function () {
    $(".loginym").css("display","none");
})
$("#Btn").click(function () {
    $(".loginym").css("display","none");
})

$("#music i").click(function () {
    $(".range #inputrange").css("display","block");
})
$(".range #inputrange").mouseleave(function () {
    setTimeout(function(){
        $(".range #inputrange").css("display","none");
    },1000);
})


$(".playable-play").click(function () {
    $("#playlist a").attr("href","");
    var rel = $(this).attr("rel");
    alert(rel)
    $("#playlist a").attr("href",rel);
});