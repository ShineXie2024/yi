class YijingApp {
    constructor() {
        this.appContainer = document.getElementById('app-container');
        this.init();
    }

    init() {
        this.renderHome();
        this.setupRouting();
    }

    renderHome() {
        const grid = document.createElement('div');
        grid.className = 'hexagram-grid';
        
        hexagrams.forEach(hexagram => {
            const card = document.createElement('div');
            card.className = 'hexagram-card';
            card.innerHTML = `
                <div class="symbol">${hexagram.symbol}</div>
                <h3>${hexagram.name}</h3>
                <p>${hexagram.composition}</p>
            `;
            card.addEventListener('click', () => this.showDetail(hexagram.id));
            grid.appendChild(card);
        });
        
        this.appContainer.innerHTML = '';
        this.appContainer.appendChild(grid);
    }

    showDetail(id) {
        const hexagram = hexagrams.find(h => h.id === id);
        
        const detailHTML = `
            <div class="detail-container">
                <div class="symbol-section">
                    <img src="${hexagram.image}" alt="${hexagram.name}" class="symbol-img">
                    <div class="symbol-text">${hexagram.symbol}</div>
                </div>

                <div class="info-section">
                    <h2>${hexagram.name}</h2>
                    <p><strong>卦象组成：</strong>${hexagram.composition}</p>
                    <p><strong>属性：</strong>${hexagram.attributes.join(' · ')}</p>
                </div>

                <div class="info-section">
                    <h3>卦辞</h3>
                    <blockquote>${hexagram.judgment}</blockquote>
                </div>

                <div class="info-section">
                    <h3>彖传</h3>
                    <p>${hexagram.tuan}</p>
                </div>

                <div class="info-section">
                    <h3>象传</h3>
                    <p>${hexagram.xiang}</p>
                </div>

                <div class="info-section">
                    <h3>爻辞详解</h3>
                    <ul>
                        ${hexagram.lines.map(line => `<li>${line}</li>`).join('')}
                    </ul>
                </div>

                <div class="info-section">
                    <h3>关联卦象</h3>
                    <div class="related-gua">
                        ${hexagram.related.map(name => 
                            `<button class="related-btn">${name}</button>`
                        ).join('')}
                    </div>
                </div>

                <div class="navigation">
                    <button class="btn" onclick="window.history.back()">返回首页</button>
                </div>
            </div>
        `;

        this.appContainer.innerHTML = detailHTML;
        this.addRelatedListeners();
    }

    addRelatedListeners() {
        document.querySelectorAll('.related-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.textContent;
                const hexagram = hexagrams.find(h => h.name === name);
                if (hexagram) this.showDetail(hexagram.id);
            });
        });
    }

    setupRouting() {
        window.addEventListener('popstate', () => {
            if (!location.hash) this.renderHome();
        });
    }
}

// 初始化应用
new YijingApp();
