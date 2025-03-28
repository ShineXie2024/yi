import { initRouter } from './router.js';

class App {
    constructor() {
        this.app = document.getElementById('app');
        this.init();
    }

    async init() {
        await this.loadHexagrams();
        initRouter(this);
    }

    async loadHexagrams() {
    try {
        // 显示加载状态
        this.app.innerHTML = `<div class="loading">加载卦象数据中...</div>`;
        
        // 生成ID数组 [1,2,...,64]
        const ids = Array.from({length: 64}, (_, i) => i + 1);
        
        // 并行请求优化方案
        this.hexagrams = await Promise.allSettled(
            ids.map(id => 
                fetch(`data/${id}.json`)
                    .then(response => {
                        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                        return response.json();
                    })
                    .catch(error => {
                        console.error(`加载卦象 ${id} 失败:`, error);
                        return null; // 保持数组位置
                    })
            )
        ).then(results => 
            results
                .filter(r => r.status === 'fulfilled' && r.value) // 过滤成功项
                .map(r => r.value) // 提取数据
                .sort((a, b) => a.id - b.id) // 确保顺序正确
        );

        // 检查数据完整性
        if (this.hexagrams.length < 64) {
            console.warn(`部分数据加载失败，成功加载 ${this.hexagrams.length}/64 卦`);
        }

        // 缓存到本地
        localStorage.setItem('hexagrams', JSON.stringify({
            timestamp: Date.now(),
            data: this.hexagrams
        }));

        this.renderHome();
    } catch (error) {
        // 尝试使用缓存
        const cache = localStorage.getItem('hexagrams');
        if (cache) {
            try {
                const { data } = JSON.parse(cache);
                this.hexagrams = data;
                this.app.innerHTML = `<p class="warning">网络异常，显示缓存数据</p>`;
                this.renderHome();
                return;
            } catch (e) {
                console.error('缓存解析失败:', e);
            }
        }
        
        this.app.innerHTML = `
            <p class="error">数据加载失败！</p>
            <button onclick="location.reload()">点击重试</button>
        `;
        console.error('数据加载失败:', error);
    }
}

    renderHome() {
        this.app.innerHTML = `
            <div class="hexagram-list">
                ${this.hexagrams.map(hexagram => `
                    <div class="hexagram-card" data-id="${hexagram.id}">
                        <div class="symbol">${hexagram.symbol}</div>
                        <h3>${hexagram.name}</h3>
                        <p>${hexagram.judgment.text}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderDetail(hexagram) {
        this.app.innerHTML = `
            <div class="detail-container">
                <button class="back-btn">返回列表</button>
                
                <h2 class="section-title">${hexagram.symbol} ${hexagram.name}</h2>
                
                <div class="info-section">
                    <h3>卦辞</h3>
                    <blockquote>${hexagram.judgment.text}</blockquote>
                    <p>${hexagram.judgment.explanation}</p>
                </div>

                <div class="info-section">
                    <h3>彖传</h3>
                    <p>${hexagram.tuan.text}</p>
                    <p>${hexagram.tuan.explanation}</p>
                </div>

                <div class="info-section">
                    <h3>爻辞详解</h3>
                    <ul>
                        ${hexagram.lines.map(line => `
                            <li>
                                <strong>${line.text}</strong>
                                <p>${line.explanation}</p>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="info-section">
                    <h3>占卜指引</h3>
                    <div class="zhan-grid">
                        ${Object.entries(hexagram.zhan).map(([key, value]) => `
                            <div class="zhan-item">
                                <h4>${key}</h4>
                                <p><strong>现状：</strong>${value.explanation}</p>
                                <p><strong>建议：</strong>${value.advice}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

new App();
