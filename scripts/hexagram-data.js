// scripts/hexagram-data.js
const hexagrams = [
    {
        id: 1,
        name: "乾为天",
        symbol: "䷀",
        judgment: {
            text: "元亨利贞。",
            explanation: "创始、通达、适宜、正固。表示事物发展的四个阶段：开始要创造，过程中要顺利推进，时机要合适，最后要坚持正道。"
        },
        tuan: {
            text: "大哉乾元，万物资始，乃统天。",
            explanation: "伟大的乾元之气啊！万物都依靠它开始产生，它统领着整个自然界。"
        },
        xiang: {
            text: "天行健，君子以自强不息。",
            explanation: "天道运行刚劲强健，君子因此要求自己不断奋发图强。"
        },
        lines: [
            {
                text: "初九：潜龙勿用。",
                explanation: "龙潜藏在深水中，暂时不宜施展才能。此时应养精蓄锐，等待时机。"
            },
            // 其他爻...
        ],
        zhan: {
            运势: {
                explanation: "刚健进取之象，运势如日中天",
                advice: "宜积极行动，但忌刚愎自用"
            },
            事业: {
                explanation: "大有可为之时机",
                advice: "开拓新领域，争取领导支持"
            },
            财运: {
                explanation: "财星高照，正财旺盛",
                advice: "投资不动产，避免高风险投机"
            },
            婚姻: {
                explanation: "阳刚过盛，易生冲突",
                advice: "女方宜柔顺，避免七月争执"
            },
            学业: {
                explanation: "学业运势强劲",
                advice: "主攻理工科目，参加竞赛有利"
            },
            子女: {
                explanation: "得子聪慧但个性强",
                advice: "培养耐心，注意交通安全"
            },
            疾病: {
                explanation: "阳气过旺之症",
                advice: "调理心脑血管，忌辛辣食物"
            }
        }
    },
    {
        id: 2,
        name: "坤为地",
        symbol: "䷁",
        judgment: {
            text: "元亨，利牝马之贞。",
            explanation: "初始亨通，适宜像母马般保持柔顺的德行。强调柔顺包容的处世之道。"
        },
        tuan: {
            text: "至哉坤元，万物资生，乃顺承天。",
            explanation: "至极的坤元之气啊！万物都依靠它生长，柔顺地承接天的法则。"
        },
        xiang: {
            text: "地势坤，君子以厚德载物。",
            explanation: "大地气势宽厚和顺，君子因此增厚美德、容载万物。"
        },
        lines: [
            {
                text: "初六：履霜，坚冰至。",
                explanation: "当踩到薄霜时，就知道坚冰寒冬即将到来。强调见微知著的智慧。"
            },
            // 其他爻...
        ],
        zhan: {
            运势: {
                explanation: "柔顺包容之象，运势平稳",
                advice: "宜守成不宜冒进"
            },
            事业: {
                explanation: "稳定中求发展",
                advice: "巩固现有业务，十月有机遇"
            },
            财运: {
                explanation: "正财平稳，偏财不宜",
                advice: "定期储蓄，投资农业相关"
            },
            婚姻: {
                explanation: "姻缘和美，相敬如宾",
                advice: "农历八月提亲，注意婆媳关系"
            },
            学业: {
                explanation: "循序渐进可得进步",
                advice: "加强基础学习，晨读效果佳"
            },
            子女: {
                explanation: "子女温顺孝顺",
                advice: "培养艺术天赋，注意脾胃健康"
            },
            疾病: {
                explanation: "阴湿滞寒之症",
                advice: "调理脾胃，忌生冷食物"
            }
        }
    }
    // 其他62卦数据...
];

// 导出数据结构说明
/**
 * @typedef {Object} Hexagram
 * @property {number} id - 卦象ID
 * @property {string} name - 卦名
 * @property {string} symbol - 卦符
 * @property {Judgment} judgment - 卦辞
 * @property {TuanXiang} tuan - 彖传
 * @property {TuanXiang} xiang - 象传
 * @property {Line[]} lines - 爻辞
 * @property {Zhan} zhan - 占卜指引
 * 
 * @typedef {Object} Judgment
 * @property {string} text - 卦辞原文
 * @property {string} explanation - 白话解释
 * 
 * @typedef {Object} TuanXiang
 * @property {string} text - 原文
 * @property {string} explanation - 白话解释
 * 
 * @typedef {Object} Line
 * @property {string} text - 爻辞原文
 * @property {string} explanation - 白话解释
 * 
 * @typedef {Object} Zhan
 * @property {ZhanItem} 运势 - 运势占断
 * @property {ZhanItem} 事业 - 事业占断
 * @property {ZhanItem} 财运 - 财运占断
 * @property {ZhanItem} 婚姻 - 婚姻占断
 * @property {ZhanItem} 学业 - 学业占断
 * @property {ZhanItem} 子女 - 子女占断
 * @property {ZhanItem} 疾病 - 疾病占断
 * 
 * @typedef {Object} ZhanItem
 * @property {string} explanation - 现状解释
 * @property {string} advice - 具体建议
 */

export default hexagrams;
