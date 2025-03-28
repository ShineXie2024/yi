export function initRouter(app) {
    // 列表点击处理
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.hexagram-card');
        if (card) {
            const id = card.dataset.id;
            history.pushState(null, '', `#${id}`);
            showDetail(id);
        }
    });

    // 返回按钮处理
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('back-btn')) {
            history.back();
        }
    });

    // 路由变化处理
    window.addEventListener('popstate', () => {
        const id = location.hash.substring(1);
        id ? showDetail(id) : app.renderHome();
    });

    // 显示详情页
    function showDetail(id) {
        const hexagram = app.hexagrams.find(h => h.id == id);
        if (hexagram) {
            app.renderDetail(hexagram);
        }
    }

    // 初始路由
    if (location.hash) {
        showDetail(location.hash.substring(1));
    }
}
