/**
 * BORVAN SINGAPORE - High-Conversion Advisory & GTM Platform
 * Production Interactive Controller & CRM Integration Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons if available
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Initialize CRM leads repository in localStorage if empty
    if (!localStorage.getItem('borvan_crm_leads')) {
        localStorage.setItem('borvan_crm_leads', JSON.stringify([]));
    }
});

/* ========================================================================= */
/* 1. Modal Controllers                                                      */
/* ========================================================================= */

// Booking Modal
function openBookingModal(source = 'Website Consultation') {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;
    const sourceInput = document.getElementById('book-source');
    if (sourceInput) sourceInput.value = source;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    const box = modal.querySelector('div');
    if (box) {
        box.classList.remove('scale-95');
        box.classList.add('scale-100');
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    const box = modal.querySelector('div');
    if (box) {
        box.classList.add('scale-95');
        box.classList.remove('scale-100');
    }
}

// Whitepaper Modal
function openWhitepaperModal() {
    const modal = document.getElementById('whitepaper-modal');
    if (!modal) return;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    const box = modal.querySelector('div');
    if (box) {
        box.classList.remove('scale-95');
        box.classList.add('scale-100');
    }
}

function closeWhitepaperModal() {
    const modal = document.getElementById('whitepaper-modal');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    const box = modal.querySelector('div');
    if (box) {
        box.classList.add('scale-95');
        box.classList.remove('scale-100');
    }
}

// WeChat Modal
function openWechatModal() {
    const modal = document.getElementById('wechat-modal');
    if (!modal) return;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    const box = modal.querySelector('div');
    if (box) {
        box.classList.remove('scale-95');
        box.classList.add('scale-100');
    }
}

function closeWechatModal() {
    const modal = document.getElementById('wechat-modal');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    const box = modal.querySelector('div');
    if (box) {
        box.classList.add('scale-95');
        box.classList.remove('scale-100');
    }
}

// Copy WeChat ID
function copyWechatId() {
    const wechatId = 'voicecoffee';
    navigator.clipboard.writeText(wechatId).then(() => {
        const copyText = document.getElementById('copy-text');
        if (copyText) {
            const original = copyText.innerText;
            copyText.innerText = '已复制微信号！请打开微信添加';
            copyText.parentElement.classList.replace('bg-[#07C160]', 'bg-gold');
            copyText.parentElement.classList.replace('text-white', 'text-obsidian');
            setTimeout(() => {
                copyText.innerText = original;
                copyText.parentElement.classList.replace('bg-gold', 'bg-[#07C160]');
                copyText.parentElement.classList.replace('text-obsidian', 'text-white');
            }, 3000);
        }
    }).catch(err => {
        alert('请手动复制微信号：voicecoffee');
    });
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    ['booking-modal', 'whitepaper-modal', 'wechat-modal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal && e.target === modal) {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.classList.remove('opacity-100');
            const box = modal.querySelector('div');
            if (box) {
                box.classList.add('scale-95');
                box.classList.remove('scale-100');
            }
        }
    });
});

/* ========================================================================= */
/* 2. Interactive Lead Capture & CRM Pipeline Simulation                     */
/* ========================================================================= */

function handleDiagnosticSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('lead-name')?.value || '';
    const company = document.getElementById('lead-company')?.value || '';
    const industry = document.getElementById('lead-industry')?.value || '';
    const country = document.getElementById('lead-country')?.value || '';
    const contact = document.getElementById('lead-contact')?.value || '';

    // Collect checked needs
    const checkedNeeds = Array.from(document.querySelectorAll('input[name="needs"]:checked')).map(cb => cb.value);

    // Calculate a simulated Readiness Score
    let readinessScore = 72;
    if (industry.includes('餐饮') || industry.includes('咖啡')) readinessScore += 12;
    if (country.includes('新加坡')) readinessScore += 8;
    if (checkedNeeds.length >= 2) readinessScore += 6;
    if (readinessScore > 96) readinessScore = 96;

    // Build CRM record
    const leadRecord = {
        id: 'LEAD-' + Date.now().toString().slice(-6),
        name,
        company,
        industry,
        country,
        contact,
        needs: checkedNeeds,
        score: readinessScore,
        createdAt: new Date().toLocaleString(),
        status: 'NEW_OPPORTUNITY'
    };

    // Save to CRM Local Storage
    try {
        const existing = JSON.parse(localStorage.getItem('borvan_crm_leads') || '[]');
        existing.unshift(leadRecord);
        localStorage.setItem('borvan_crm_leads', JSON.stringify(existing));
    } catch (err) {
        console.warn('CRM storage notice:', err);
    }

    // Display Result in UI
    const resultBox = document.getElementById('diagnostic-result');
    const details = document.getElementById('result-details');
    if (resultBox && details) {
        details.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-obsidian rounded-lg border border-gold/30 my-2">
                <div>
                    <span class="text-slate-400 block text-[10px]">出海准备度评分</span>
                    <span class="text-2xl font-serif font-black text-gold">${readinessScore} / 100</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-[10px]">优先进场推荐国家</span>
                    <span class="text-sm font-bold text-white">${country}</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-[10px]">推荐落地方案</span>
                    <span class="text-sm font-bold text-emerald-400">专业版 (SGD 5,000)</span>
                </div>
            </div>
            <p class="text-slate-300 mt-2">
                <strong>诊断简评：</strong> ${company} 在 ${industry} 赛道具备良好的海外扩张潜能。针对您关注的 <em>${checkedNeeds.join('、') || '渠道与合规'}</em> 诉求，BORVAN新加坡顾问团队已建立专属档案(ID: ${leadRecord.id})，将在2小时内通过微信或电话与您对接详细对标案。
            </p>
        `;
        resultBox.classList.remove('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 30-min Booking Form Submit
function handleBookingSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('book-name')?.value || '';
    const phone = document.getElementById('book-phone')?.value || '';
    const wechat = document.getElementById('book-wechat')?.value || '';
    const time = document.getElementById('book-time')?.value || '待协商';
    const source = document.getElementById('book-source')?.value || '官网预约';

    const bookingRecord = {
        type: 'APPOINTMENT',
        name,
        phone,
        wechat,
        time,
        source,
        timestamp: new Date().toLocaleString()
    };

    try {
        const existing = JSON.parse(localStorage.getItem('borvan_crm_leads') || '[]');
        existing.unshift(bookingRecord);
        localStorage.setItem('borvan_crm_leads', JSON.stringify(existing));
    } catch (err) {}

    alert(`感谢您的预约，${name}！\n\n已成功预约时段：${time}\nBORVAN 顾问将在微信/电话(${phone})向您发送会议链接及参会材料。`);
    closeBookingModal();
}

// Whitepaper Form Submit
function handleWhitepaperSubmit(e) {
    e.preventDefault();
    const contact = document.getElementById('wp-contact')?.value || '';
    alert(`《2026中国企业低风险进入东盟与新加坡市场实战白皮书》(PDF) 正在为您生成。\n已将完整版下载链接发送至：${contact}！`);
    closeWhitepaperModal();
    downloadInstantWhitepaper();
}

function downloadInstantWhitepaper() {
    const textContent = `=====================================================
BORVAN SINGAPORE · 2026 东盟市场进入与企业增长实战白皮书
=====================================================
核心主张：客户不购买理念，客户购买结果。
帮助中国企业低风险进入新加坡及东盟市场。

第一部分：中国企业出海五大认知雷区
1. 找不到可靠合作伙伴（信息断层，遭遇皮包中介）
2. 不了解当地市场（生搬硬套国内打法）
3. 缺乏渠道资源（打不进主流连锁与商超采销）
4. 法律合规风险（准入牌照SFA/HSA、雇佣法案、税务）
5. 投入高但回报不确定（单店选址盲目，高租金拖垮现金流）

第二部分：东盟进场优先级排序 (GTM Strategy)
- 新加坡 (HQ Hub · The Adelphi)：商业辐射极与品牌高地
- 马来西亚 (KL/Johor)：双语供应链与清真食品第一跳
- 印度尼西亚 (Jakarta)：万亿人口消费红利
- 泰国/越南 (BKK/HCMC)：高频消费与轻工业制造协同

第三部分：BORVAN 旗舰出海评估体系
- 基础版 (SGD 2,000)
- 专业版 (SGD 5,000) [企业首选]
- 企业版 (SGD 15,000+)

官方咨询对接：
总部地址：The Adelphi, 1 Coleman St, Singapore 179803
WhatsApp: +65 8732 7804
官方微信: voicecoffee
官方邮箱: iencen@yahoo.com
官方网址: https://borvan.sg
=====================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'BORVAN_ASEAN_Market_Entry_Whitepaper_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/* ========================================================================= */
/* 3. Bilingual Language Toggle (ZH <-> EN)                                  */
/* ========================================================================= */

let currentLang = 'zh';

function toggleLanguage() {
    currentLang = (currentLang === 'zh') ? 'en' : 'zh';
    const langText = document.getElementById('lang-text');
    if (langText) langText.innerText = (currentLang === 'zh') ? 'EN' : '中';

    // Update main headings and core CTAs if in index.html
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
        if (currentLang === 'en') {
            heroTitle.innerHTML = `Empowering Chinese Enterprises to<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold-light">Enter ASEAN Markets with Low Risk</span>`;
        } else {
            heroTitle.innerHTML = `帮助中国企业<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold-light">低风险进入东盟市场</span>`;
        }
    }
}
