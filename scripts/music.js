document.addEventListener("DOMContentLoaded", function () {
    const ap = new APlayer({
        container: document.getElementById('player'),
        mini: false,
        autoplay: false,
        theme: '#FADFA3',
        loop: 'all',
        order: 'random',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: false,
        listMaxHeight: "720px",
        audio: [] // 先初始化为空，后续通过 API 添加
    });

    // GitHub 音乐文件夹信息
    const repoOwner = "norespond";
    const repoName = "musical-octo-umbrella";
    const folderPath = "music";
    const repoBaseUrl = `https://${repoOwner}.github.io/${repoName}/${folderPath}/`;
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

    fetch("https://norespond.github.io/musical-octo-umbrella/music/songs.json")
        .then(response => response.json())
        .then(songsData => {
            const audioList = songsData.map(song => ({
                name: song.name,
                artist: song.artist,
                cover: "../favicon.ico",
                url: repoBaseUrl + encodeURIComponent(song.file),
            }));
            ap.list.add(audioList);
        })
        .catch(error => console.error("加载歌曲信息失败:", error));

});

