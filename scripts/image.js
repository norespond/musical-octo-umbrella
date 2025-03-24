const repoOwner = "norespond";  // GitHub 用户名
const repoName = "picx-images-hosting";  // 仓库名
const folderPath = "20250324";  // 图片目录
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const images = data
            .filter(file => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) // 只筛选图片
            .map(file => ({
                src: file.download_url, // 获取原始图片链接
                alt: file.name
            }));

        loadImages(images);
    })
    .catch(error => console.error("图片加载失败", error));

function loadImages(images) {
    const imageGrid = document.getElementById('image-grid');
    const overlay = document.getElementById('image-overlay');
    const overlayImg = document.getElementById('overlay-img');
    const downloadBtn = document.getElementById('download-btn');

    images.forEach(image => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        const img = document.createElement('img');
        img.dataset.src = image.src; // 懒加载
        img.alt = image.alt;
        img.classList.add('lazy-load');

        // 点击图片放大查看
        img.addEventListener('click', () => {
            overlay.style.display = "flex";
            overlayImg.src = image.src;
            overlayImg.alt = image.alt;
            downloadBtn.href = image.src; // 设置下载链接
            downloadBtn.download = image.alt; // 设置下载文件名
        });

        gridItem.appendChild(img);
        imageGrid.appendChild(gridItem);
    });

    // 启用懒加载
    const lazyImages = document.querySelectorAll('.lazy-load');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));

    // 关闭放大图片
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('close-btn')) {
            overlay.style.display = "none";
        }
    });
}
