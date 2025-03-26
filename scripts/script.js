const repoOwner = "norespond";  // GitHub 用户名
const repoName = "picx-images-hosting";  // 仓库名
const folderPath = "20250324";  // 图片目录
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

// 🌟 获取并展示最新图片
function fetchLatestImages() {
    const container = document.getElementById("latest-images-container");
    if (!container) {
        console.error("❌ 找不到最新图片的容器");
        return;
    }

    container.innerHTML = "<p>📡 正在加载最新图片...</p>"; // 加载中提示

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("🚨 网络请求失败");
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ API 返回的数据:", data);

            if (!Array.isArray(data)) {
                throw new Error("❌ API 数据格式错误");
            }

            const images = data
                .filter(file => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) // 筛选图片
                .slice(-2) // 取最新 4 张
                .reverse() // 最新的放前面
                .map(file => file.download_url);

            displayLatestImages(images);
        })
        .catch(error => {
            console.error("❌ 图片加载失败:", error);
            container.innerHTML = "<p>⚠️ 图片加载失败，请稍后再试。</p>";
        });
}

function displayLatestImages(images) {
    const container = document.getElementById("latest-images-container");
    container.innerHTML = ""; // 清空旧内容

    images.forEach(src => {
        const div = document.createElement("div");
        div.classList.add("single-column-item"); // 适配单列布局

        const img = document.createElement("img");
        img.src = src;
        img.alt = "最新图片";
        img.classList.add("clickable-image");

        // 绑定点击事件放大图片
        img.addEventListener("click", () => openImageModal(src));

        div.appendChild(img);
        container.appendChild(div);
    });
}

// 🔍 打开放大图片模态框
function openImageModal(imageSrc) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");

    modal.style.display = "block";
    modalImg.src = imageSrc;
}

// ❌ 关闭模态框
function closeModal() {
    document.getElementById("image-modal").style.display = "none";
}

// 页面加载时执行
document.addEventListener("DOMContentLoaded", fetchLatestImages);