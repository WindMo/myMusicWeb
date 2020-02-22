// 创建WaveSurver实例
var wavesurfer = Object.create(WaveSurfer);
// 在DOM准备就绪
document.addEventListener('DOMContentLoaded', function () {
    wavesurfer.init({
        container: '#waveform',
        waveColor: '#8D8D8D',
        progressColor: '#7ED035',
        height: 65,
        barWidth: 1
    });
});


// 绑定控件
document.addEventListener('DOMContentLoaded', function () {
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

    // 加载 音频
    wavesurfer.load('/MusicFile/Auditions/突然的自我.m4a');
// 加载完成后播放
    wavesurfer.on('ready', function () {
        wavesurfer.play();
    });

    // 播放音频负载
    // wavesurfer.on('ready', function () {
    //     wavesurfer.play();
    // });

    // 完成下一个轨道
    wavesurfer.on('finish', function () {
        setCurrentSong((currentTrack + 1) % links.length);
    });
    // 载入第一轨道
    setCurrentSong(currentTrack);


    // 音量调整
    function changeVolume(percent){
        wavesurfer.backend.setVolume($(".volume-drop-range").val()/2);
    }
    $(".volume-drop-range")[0].oninput = function(){
        changeVolume(this.value/this.max);
    }
    $(".volume-drop-range")[0].oninput()

});