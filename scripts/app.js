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
            const requests = [];
            for (let i = 1; i <= 64; i++) {
                requests.push(fetch(`data/${i}.json`).then(r => r.json()));
            }
            this.hexagrams = await Promise.all(requests);
            this.renderHome();
        } catch (error) {
            this.app.innerHTML = `<p class="error">数据加载失败，请刷新重试</p>`;
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
