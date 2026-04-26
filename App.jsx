import { useState, useEffect, useRef } from "react";

const WA = "244957261939";
const WA_URL = `https://wa.me/${WA}`;
const ADMIN_PW = "bancada2024";
const OWNER_NAME = "Filipe Monteiro Francisco";
const EXPRESS = "922 290 890";
const BAI_IBAN = "004000008292033210168";
const BFA_IBAN = "000600006577241630135";
const FACEBOOK = "https://facebook.com/abancada";
const INSTAGRAM = "https://www.instagram.com/abancadaa?igsh=bDN0aWVqOXlhbzdw&utm_source=qr";

const INITIAL_PRODUCTS = [
  {
    id: 1, emoji: "💻", name: "Lenovo Chromebook 2 em 1",
    desc: "Importado dos EUA · Sistema Chrome OS · Converte em tablet · Certificado e pronto a usar.",
    price: "KZ 149.000", state: "Usado como novo", category: "Laptops",
    available: true, cover: "", gallery: []
  },
  { id: 2, emoji: "📱", name: "iPhones", desc: "Novos e usados como novos. Em breve disponíveis.", price: "Em breve", state: "A caminho", category: "iPhones", available: false, cover: "", gallery: [] },
  { id: 3, emoji: "💻", name: "MacBooks", desc: "MacBook Air e Pro. Stock a chegar em breve.", price: "Em breve", state: "A caminho", category: "Laptops", available: false, cover: "", gallery: [] },
  { id: 4, emoji: "🎤", name: "Lapelas Sem Fio", desc: "Para criadores de conteúdo. Em breve.", price: "Em breve", state: "A caminho", category: "Criação", available: false, cover: "", gallery: [] },
  { id: 5, emoji: "💡", name: "Luzes LED", desc: "Ring lights e painéis LED. A caminho.", price: "Em breve", state: "A caminho", category: "Criação", available: false, cover: "", gallery: [] },
  { id: 6, emoji: "🎧", name: "Acessórios Apple", desc: "AirPods, Apple Watch, carregadores e mais.", price: "Em breve", state: "A caminho", category: "Acessórios", available: false, cover: "", gallery: [] },
];

const CATS = ["Todos", "iPhones", "Laptops", "Acessórios", "Criação"];
const EMOJIS = ["📱","💻","🖥️","🎧","⌚","🔋","🎤","💡","🖱️","⌨️","📷","🎮","📦","🔌","🖨️","💾"];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#ffffff; --bg2:#f7f8fc; --bg3:#eef1f8;
  --dark:#0b1a2e; --dark2:#162540;
  --txt:#0b1a2e; --txt2:#4a5f82; --txt3:#7a90b8;
  --accent:#f5c842; --accent-d:#d4a820; --accent-bg:rgba(245,200,66,0.1);
  --green:#16a34a; --green-bg:rgba(22,163,74,0.08);
  --border:#e2e8f4; --border2:#c8d4eb;
  --shadow:0 4px 24px rgba(11,26,46,0.08);
  --shadow-lg:0 16px 48px rgba(11,26,46,0.14);
  --r:14px; --r2:10px;
  --fh:'Syne',sans-serif; --fb:'DM Sans',sans-serif;
  --tr:0.25s cubic-bezier(0.4,0,0.2,1);
}
html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--bg);color:var(--txt);overflow-x:hidden;-webkit-font-smoothing:antialiased}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 5vw;height:68px;background:rgba(255,255,255,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);box-shadow:0 1px 12px rgba(11,26,46,0.06)}
.nav-logo{font-family:var(--fh);font-size:1.1rem;font-weight:800;color:var(--dark);cursor:pointer;letter-spacing:-0.02em;user-select:none}
.nav-logo span{color:var(--accent)}
.nav-links{display:flex;align-items:center;gap:28px;list-style:none}
.nav-links a{font-size:0.85rem;color:var(--txt2);text-decoration:none;cursor:pointer;transition:color var(--tr);font-weight:500}
.nav-links a:hover{color:var(--dark)}
.nav-cta{background:var(--dark)!important;color:#fff!important;padding:9px 20px;border-radius:100px;font-weight:600!important;font-size:0.8rem!important;transition:background var(--tr)!important}
.nav-cta:hover{background:var(--accent-d)!important;color:var(--dark)!important}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
.hamburger span{display:block;width:22px;height:2px;background:var(--dark);border-radius:2px}
.mobile-nav{display:none;position:fixed;inset:0;z-index:200;background:var(--dark);flex-direction:column;align-items:center;justify-content:center;gap:28px}
.mobile-nav.open{display:flex}
.mobile-nav a{font-family:var(--fh);font-size:1.8rem;font-weight:800;color:#fff;text-decoration:none;cursor:pointer;transition:color var(--tr)}
.mobile-nav a:hover{color:var(--accent)}

/* ── HERO ── */
.hero{min-height:100vh;display:flex;align-items:center;padding:100px 5vw 80px;background:var(--dark);position:relative;overflow:hidden}
.hero-glow{position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 65% 50%,rgba(245,200,66,0.12) 0%,transparent 65%),radial-gradient(ellipse 40% 50% at 10% 80%,rgba(255,255,255,0.03) 0%,transparent 60%)}
.hero-grid{position:absolute;inset:0;opacity:0.04;background-image:linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px);background-size:56px 56px}
.hero-content{position:relative;z-index:1;max-width:680px}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,200,66,0.12);border:1px solid rgba(245,200,66,0.3);color:var(--accent);padding:6px 16px;border-radius:100px;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:28px;animation:fadeUp .5s ease both}
.hero h1{font-family:var(--fh);font-size:clamp(2.8rem,6.5vw,5rem);font-weight:800;line-height:1.03;letter-spacing:-0.04em;color:#fff;animation:fadeUp .5s .08s ease both}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero p{margin-top:20px;font-size:1.05rem;color:#7a90b8;line-height:1.75;max-width:480px;font-weight:300;animation:fadeUp .5s .16s ease both}
.hero-btns{display:flex;gap:12px;margin-top:36px;flex-wrap:wrap;animation:fadeUp .5s .24s ease both}
.hero-stats{display:flex;gap:36px;margin-top:56px;flex-wrap:wrap;animation:fadeUp .5s .32s ease both;padding-top:40px;border-top:1px solid rgba(255,255,255,0.08)}
.stat-n{font-family:var(--fh);font-size:1.7rem;font-weight:800;color:#fff;letter-spacing:-0.03em;display:block}
.stat-l{font-size:0.78rem;color:#7a90b8;font-weight:300;margin-top:2px;display:block}

/* ── BUTTONS ── */
.btn-primary{background:var(--accent);color:var(--dark);padding:13px 26px;border-radius:100px;font-family:var(--fb);font-size:0.88rem;font-weight:700;border:none;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:background var(--tr),transform var(--tr),box-shadow var(--tr)}
.btn-primary:hover{background:var(--accent-d);transform:translateY(-2px);box-shadow:0 10px 28px rgba(245,200,66,0.3)}
.btn-outline{background:rgba(255,255,255,0.07);color:#fff;padding:13px 26px;border-radius:100px;font-family:var(--fb);font-size:0.88rem;font-weight:500;border:1px solid rgba(255,255,255,0.15);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:background var(--tr),transform var(--tr)}
.btn-outline:hover{background:rgba(255,255,255,0.13);transform:translateY(-2px)}
.btn-dark{background:var(--dark);color:#fff;padding:13px 26px;border-radius:100px;font-family:var(--fb);font-size:0.88rem;font-weight:600;border:none;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:background var(--tr),transform var(--tr)}
.btn-dark:hover{background:var(--dark2);transform:translateY(-2px)}

/* ── TRUST ── */
.trust-bar{background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:18px 5vw;display:flex;align-items:center;justify-content:center;gap:36px;flex-wrap:wrap}
.trust-item{display:flex;align-items:center;gap:9px;font-size:0.8rem;color:var(--txt2);font-weight:500}

/* ── SECTIONS ── */
.section{padding:88px 5vw}
.section-alt{background:var(--bg2)}
.sec-label{font-size:0.68rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin-bottom:14px;display:block}
.sec-title{font-family:var(--fh);font-size:clamp(1.7rem,3.5vw,2.8rem);font-weight:800;letter-spacing:-0.04em;line-height:1.1;color:var(--dark)}
.sec-sub{margin-top:12px;color:var(--txt2);font-size:0.97rem;line-height:1.7;max-width:480px;font-weight:300}

/* ── PRODUCTS ── */
.prod-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:36px;flex-wrap:wrap;gap:16px}
.tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px}
.tab{padding:8px 18px;border-radius:100px;font-size:0.82rem;font-weight:500;border:1.5px solid var(--border2);background:#fff;color:var(--txt2);cursor:pointer;font-family:var(--fb);transition:all var(--tr)}
.tab.active,.tab:hover{background:var(--dark);color:#fff;border-color:var(--dark)}
.prod-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
.prod-card{background:#fff;border:1.5px solid var(--border);border-radius:var(--r);overflow:hidden;transition:transform var(--tr),box-shadow var(--tr),border-color var(--tr);cursor:pointer}
.prod-card:hover{transform:translateY(-5px);box-shadow:var(--shadow-lg);border-color:var(--border2)}
.prod-img-wrap{width:100%;aspect-ratio:1/1;background:var(--bg2);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.prod-img-wrap img{width:100%;height:100%;object-fit:cover}
.prod-img-emoji{font-size:4.5rem}
.prod-badge{position:absolute;top:12px;left:12px;font-size:0.63rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 11px;border-radius:100px}
.badge-green{background:var(--green-bg);color:var(--green);border:1px solid rgba(22,163,74,0.2)}
.badge-yellow{background:var(--accent-bg);color:#b07c00;border:1px solid rgba(245,200,66,0.35)}
.prod-info{padding:18px}
.prod-name{font-family:var(--fh);font-size:0.93rem;font-weight:700;color:var(--dark);margin-bottom:6px;letter-spacing:-0.01em}
.prod-state{font-size:0.72rem;color:var(--txt3);font-weight:500;margin-bottom:8px}
.prod-desc{font-size:0.79rem;color:var(--txt2);line-height:1.55;margin-bottom:14px;font-weight:300}
.prod-price{font-family:var(--fh);font-size:1.15rem;font-weight:800;color:var(--dark);margin-bottom:14px;letter-spacing:-0.02em}
.prod-price.soon{font-size:0.85rem;color:var(--txt3);font-weight:400}
.prod-actions{display:flex;gap:8px}
.btn-buy{flex:1;padding:10px 0;background:var(--dark);color:#fff;border:none;border-radius:8px;font-family:var(--fb);font-size:0.8rem;font-weight:600;cursor:pointer;transition:background var(--tr)}
.btn-buy:hover{background:var(--dark2)}
.btn-wa-sm{padding:10px 13px;background:#f0fdf4;color:#16a34a;border:1.5px solid rgba(22,163,74,0.2);border-radius:8px;font-size:0.9rem;cursor:pointer;transition:background var(--tr);text-decoration:none;display:flex;align-items:center;justify-content:center}
.btn-wa-sm:hover{background:#dcfce7}
.btn-notify{flex:1;padding:10px 14px;background:var(--bg2);color:var(--txt2);border:1.5px solid var(--border);border-radius:8px;font-family:var(--fb);font-size:0.78rem;cursor:pointer;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;transition:background var(--tr);font-weight:500}
.btn-notify:hover{background:var(--bg3)}

/* ── PRODUCT MODAL ── */
.modal-overlay{position:fixed;inset:0;z-index:300;background:rgba(11,26,46,0.7);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px)}
.prod-modal{background:#fff;border-radius:20px;width:100%;max-width:860px;max-height:92vh;overflow-y:auto;display:grid;grid-template-columns:1fr 1fr}
.prod-modal-gallery{background:var(--bg2);display:flex;flex-direction:column;gap:0;position:sticky;top:0}
.prod-modal-main-img{width:100%;aspect-ratio:1/1;object-fit:cover;display:flex;align-items:center;justify-content:center;font-size:6rem;background:var(--bg2)}
.prod-modal-main-img img{width:100%;height:100%;object-fit:cover}
.prod-modal-thumbs{display:flex;gap:8px;padding:12px;flex-wrap:wrap;background:#fff;border-top:1px solid var(--border)}
.thumb{width:56px;height:56px;border-radius:8px;object-fit:cover;cursor:pointer;border:2px solid transparent;transition:border-color var(--tr)}
.thumb.active,.thumb:hover{border-color:var(--dark)}
.prod-modal-info{padding:32px;display:flex;flex-direction:column}
.prod-modal-close{align-self:flex-end;background:var(--bg2);border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1rem;color:var(--txt2);transition:background var(--tr);margin-bottom:16px;display:flex;align-items:center;justify-content:center}
.prod-modal-close:hover{background:var(--bg3)}
.prod-modal-name{font-family:var(--fh);font-size:1.4rem;font-weight:800;color:var(--dark);letter-spacing:-0.03em;margin-bottom:8px}
.prod-modal-state{font-size:0.8rem;font-weight:600;padding:4px 12px;border-radius:100px;display:inline-flex;margin-bottom:16px}
.prod-modal-desc{font-size:0.9rem;color:var(--txt2);line-height:1.7;font-weight:300;margin-bottom:20px;flex:1}
.prod-modal-price{font-family:var(--fh);font-size:2rem;font-weight:800;color:var(--dark);letter-spacing:-0.04em;margin-bottom:24px}
.prod-modal-actions{display:flex;flex-direction:column;gap:10px}
.btn-pay-now{padding:14px;background:var(--accent);color:var(--dark);border:none;border-radius:12px;font-family:var(--fh);font-size:0.95rem;font-weight:700;cursor:pointer;transition:background var(--tr),transform var(--tr);display:flex;align-items:center;justify-content:center;gap:8px}
.btn-pay-now:hover{background:var(--accent-d);transform:translateY(-1px)}
.btn-pay-wa{padding:14px;background:#f0fdf4;color:#16a34a;border:1.5px solid rgba(22,163,74,0.25);border-radius:12px;font-family:var(--fh);font-size:0.95rem;font-weight:700;cursor:pointer;text-decoration:none;transition:background var(--tr);display:flex;align-items:center;justify-content:center;gap:8px}
.btn-pay-wa:hover{background:#dcfce7}

/* ── PAYMENT MODAL ── */
.pay-modal{background:#fff;border-radius:20px;width:100%;max-width:480px;padding:36px;position:relative}
.pay-modal-title{font-family:var(--fh);font-size:1.3rem;font-weight:800;color:var(--dark);margin-bottom:6px}
.pay-modal-sub{font-size:0.85rem;color:var(--txt2);margin-bottom:28px;font-weight:300;line-height:1.6}
.pay-method{padding:18px 20px;border:1.5px solid var(--border);border-radius:var(--r2);margin-bottom:12px;cursor:pointer;transition:border-color var(--tr),background var(--tr)}
.pay-method:hover,.pay-method.active{border-color:var(--dark);background:var(--bg2)}
.pay-method-title{font-family:var(--fh);font-size:0.9rem;font-weight:700;color:var(--dark);margin-bottom:4px}
.pay-method-sub{font-size:0.8rem;color:var(--txt2);font-weight:300}
.pay-details{background:var(--bg2);border:1.5px solid var(--border);border-radius:var(--r2);padding:20px;margin:16px 0}
.pay-detail-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.pay-detail-row:last-child{margin-bottom:0;padding-top:10px;border-top:1px solid var(--border)}
.pay-detail-label{font-size:0.78rem;color:var(--txt2);font-weight:400}
.pay-detail-value{font-size:0.85rem;color:var(--dark);font-weight:600;font-family:monospace;word-break:break-all;text-align:right;max-width:55%}
.pay-note{background:var(--accent-bg);border:1px solid rgba(245,200,66,0.3);border-radius:10px;padding:14px;font-size:0.8rem;color:#7a5c00;line-height:1.6;margin-bottom:20px}
.pay-close{position:absolute;top:20px;right:20px;background:var(--bg2);border:none;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:1rem;color:var(--txt2);display:flex;align-items:center;justify-content:center;transition:background var(--tr)}
.pay-close:hover{background:var(--bg3)}

/* ── HOW ── */
.steps-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0;margin-top:52px;border:1.5px solid var(--border);border-radius:var(--r);overflow:hidden}
.step-card{padding:32px 24px;background:#fff;border-right:1.5px solid var(--border);transition:background var(--tr)}
.step-card:last-child{border-right:none}
.step-card:hover{background:var(--bg2)}
.step-num{font-family:var(--fh);font-size:2.8rem;font-weight:800;color:var(--accent);opacity:.35;line-height:1;margin-bottom:14px;letter-spacing:-0.05em}
.step-title{font-family:var(--fh);font-size:0.95rem;font-weight:700;color:var(--dark);margin-bottom:8px}
.step-desc{font-size:0.82rem;color:var(--txt2);line-height:1.6;font-weight:300}

/* ── WHY ── */
.why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:52px}
.why-card{padding:26px;border-radius:var(--r);border:1.5px solid var(--border);background:#fff;transition:border-color var(--tr),transform var(--tr),box-shadow var(--tr)}
.why-card:hover{border-color:var(--dark);transform:translateY(-3px);box-shadow:var(--shadow)}
.why-icon{font-size:1.7rem;margin-bottom:12px}
.why-title{font-family:var(--fh);font-size:0.92rem;font-weight:700;color:var(--dark);margin-bottom:7px}
.why-desc{font-size:0.8rem;color:var(--txt2);line-height:1.6;font-weight:300}

/* ── ABOUT ── */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
.about-text p{color:var(--txt2);font-size:0.97rem;line-height:1.85;font-weight:300;margin-bottom:16px}
.about-text p strong{color:var(--dark);font-weight:600}
.about-visual{border:1.5px solid var(--border);border-radius:var(--r);overflow:hidden}
.about-stat{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid var(--border)}
.about-stat:last-child{border-bottom:none}
.about-stat-label{font-size:0.83rem;color:var(--txt2);font-weight:400}
.about-stat-value{font-family:var(--fh);font-size:1.35rem;font-weight:800;color:var(--dark);letter-spacing:-0.03em}

/* ── CONTACT ── */
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start;margin-top:52px}
.contact-info{display:flex;flex-direction:column;gap:12px}
.contact-item{padding:18px 20px;background:#fff;border:1.5px solid var(--border);border-radius:var(--r2);display:flex;gap:14px;align-items:flex-start;transition:border-color var(--tr)}
.contact-item:hover{border-color:var(--border2)}
.contact-item-title{font-family:var(--fh);font-size:0.82rem;font-weight:700;color:var(--dark);margin-bottom:3px}
.contact-item-desc{font-size:0.8rem;color:var(--txt2);line-height:1.5;font-weight:300}
.wa-big{display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#25d366,#128c7e);color:#fff;padding:18px 24px;border-radius:14px;font-size:0.97rem;font-weight:700;text-decoration:none;gap:10px;transition:transform var(--tr),box-shadow var(--tr);font-family:var(--fh)}
.wa-big:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(37,211,102,0.28)}
.social-row{display:flex;gap:10px;margin-top:14px}
.social-btn{flex:1;padding:12px;border-radius:12px;border:1.5px solid var(--border);background:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font-size:0.82rem;font-weight:600;color:var(--dark);text-decoration:none;transition:all var(--tr);font-family:var(--fb)}
.social-btn:hover{background:var(--dark);color:#fff;border-color:var(--dark)}
.iban-box{padding:14px 18px;background:var(--bg2);border-radius:10px;border:1.5px solid var(--border);margin-bottom:10px}
.iban-bank{font-size:0.68rem;font-weight:700;color:var(--accent-d);letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px}
.iban-num{font-size:0.82rem;color:var(--dark);font-family:monospace;letter-spacing:.04em;word-break:break-all;font-weight:600}
.iban-note{padding:12px 16px;background:var(--accent-bg);border-radius:10px;border:1px solid rgba(245,200,66,.3);font-size:0.79rem;color:#7a5c00;line-height:1.65}
.pay-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.pay-tag{padding:6px 14px;background:var(--bg2);border:1.5px solid var(--border);color:var(--txt2);font-size:0.76rem;border-radius:100px;font-weight:500}

/* ── FOOTER ── */
footer{background:var(--dark);padding:44px 5vw;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:24px;border-top:1px solid rgba(255,255,255,0.05)}
.footer-logo{font-family:var(--fh);font-size:1rem;font-weight:800;color:#fff;letter-spacing:-0.02em}
.footer-logo span{color:var(--accent)}
.footer-copy{font-size:0.75rem;color:#4a5f82;font-weight:300}
.footer-links{display:flex;gap:22px}
.footer-links a{font-size:0.75rem;color:#4a5f82;text-decoration:none;cursor:pointer;transition:color var(--tr);font-weight:400}
.footer-links a:hover{color:#fff}
.footer-social{display:flex;gap:10px}
.footer-soc-btn{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.07);border:none;color:#fff;cursor:pointer;text-decoration:none;display:flex;align-items:center;justify-content:center;font-size:.95rem;transition:background var(--tr)}
.footer-soc-btn:hover{background:var(--accent);color:var(--dark)}

/* ── ADMIN ── */
.admin-overlay{position:fixed;inset:0;z-index:400;background:rgba(11,26,46,0.82);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px)}
.admin-panel{background:#fff;border-radius:20px;width:100%;max-width:820px;max-height:90vh;overflow-y:auto;padding:32px}
.admin-title{font-family:var(--fh);font-size:1.3rem;font-weight:800;color:var(--dark);margin-bottom:24px;display:flex;justify-content:space-between;align-items:center}
.admin-close{background:var(--bg2);border:none;width:34px;height:34px;border-radius:50%;cursor:pointer;color:var(--txt2);font-size:1rem;display:flex;align-items:center;justify-content:center;transition:background var(--tr)}
.admin-close:hover{background:var(--bg3)}
.sec-divider{font-size:0.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--txt3);margin-bottom:14px;padding-bottom:8px;border-bottom:1.5px solid var(--border)}
.prod-row{display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg2);border:1.5px solid var(--border);border-radius:10px;margin-bottom:8px;transition:border-color var(--tr)}
.prod-row:hover{border-color:var(--border2)}
.prod-row-em{font-size:1.5rem;width:40px;text-align:center}
.prod-row-img{width:40px;height:40px;border-radius:8px;object-fit:cover}
.prod-row-info{flex:1;min-width:0}
.prod-row-name{font-size:0.86rem;font-weight:600;color:var(--dark);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.prod-row-price{font-size:0.76rem;color:var(--txt2);margin-top:2px}
.status-pill{font-size:0.68rem;padding:3px 10px;border-radius:100px;white-space:nowrap;font-weight:600}
.pill-green{background:var(--green-bg);color:var(--green)}
.pill-yellow{background:var(--accent-bg);color:#b07c00}
.btn-edit{padding:7px 14px;background:#fff;border:1.5px solid var(--border);color:var(--dark);border-radius:8px;font-size:0.75rem;cursor:pointer;font-family:var(--fb);font-weight:500;transition:all var(--tr)}
.btn-edit:hover{border-color:var(--dark);background:var(--bg2)}
.btn-del{padding:7px 11px;background:#fff5f5;border:1.5px solid #fecaca;color:#ef4444;border-radius:8px;font-size:0.75rem;cursor:pointer;transition:all var(--tr)}
.btn-del:hover{background:#fee2e2}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-field{display:flex;flex-direction:column;gap:6px}
.form-field.full{grid-column:1/-1}
.form-label{font-size:0.72rem;font-weight:700;color:var(--txt2);letter-spacing:.06em;text-transform:uppercase}
.form-input{background:var(--bg2);border:1.5px solid var(--border);border-radius:9px;padding:10px 14px;color:var(--dark);font-family:var(--fb);font-size:0.87rem;outline:none;transition:border-color var(--tr)}
.form-input:focus{border-color:var(--dark)}
.form-select{background:#fff;border:1.5px solid var(--border);border-radius:9px;padding:10px 14px;color:var(--dark);font-family:var(--fb);font-size:0.87rem;outline:none;cursor:pointer;transition:border-color var(--tr)}
.form-select:focus{border-color:var(--dark)}
.emoji-grid{display:flex;flex-wrap:wrap;gap:8px}
.emoji-btn{width:40px;height:40px;border-radius:9px;border:1.5px solid var(--border);background:#fff;font-size:1.2rem;cursor:pointer;transition:all var(--tr);display:flex;align-items:center;justify-content:center}
.emoji-btn.sel{border-color:var(--dark);background:var(--bg2)}
.toggle-wrap{display:flex;align-items:center;gap:10px;margin-top:6px}
.toggle{position:relative;width:44px;height:24px;flex-shrink:0}
.toggle input{opacity:0;width:0;height:0}
.toggle-slider{position:absolute;inset:0;background:var(--bg3);border:1.5px solid var(--border);border-radius:100px;cursor:pointer;transition:var(--tr)}
.toggle-slider:before{content:'';position:absolute;width:16px;height:16px;left:3px;top:2px;background:var(--txt3);border-radius:50%;transition:var(--tr)}
.toggle input:checked+.toggle-slider{background:var(--dark);border-color:var(--dark)}
.toggle input:checked+.toggle-slider:before{transform:translateX(20px);background:#fff}
.form-actions{display:flex;gap:10px;margin-top:20px}
.btn-save{flex:1;padding:13px;background:var(--dark);color:#fff;border:none;border-radius:10px;font-family:var(--fh);font-size:0.9rem;font-weight:700;cursor:pointer;transition:background var(--tr)}
.btn-save:hover{background:var(--dark2)}
.btn-cancel-form{padding:13px 20px;background:var(--bg2);color:var(--txt2);border:1.5px solid var(--border);border-radius:10px;font-family:var(--fb);font-size:0.87rem;cursor:pointer;transition:background var(--tr)}
.btn-cancel-form:hover{background:var(--bg3)}
.img-upload-area{border:2px dashed var(--border2);border-radius:10px;padding:20px;text-align:center;cursor:pointer;transition:border-color var(--tr),background var(--tr);background:var(--bg2)}
.img-upload-area:hover{border-color:var(--dark);background:var(--bg3)}
.img-upload-area input{display:none}
.img-upload-label{font-size:0.82rem;color:var(--txt2);font-weight:300;margin-top:6px;display:block}
.img-previews{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.img-preview-wrap{position:relative;width:70px;height:70px}
.img-preview{width:70px;height:70px;border-radius:8px;object-fit:cover;border:1.5px solid var(--border)}
.img-preview-del{position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;background:#ef4444;color:#fff;border:none;cursor:pointer;font-size:0.6rem;display:flex;align-items:center;justify-content:center}
.login-box{background:#fff;border-radius:20px;padding:36px;width:100%;max-width:380px}
.login-title{font-family:var(--fh);font-size:1.3rem;font-weight:800;color:var(--dark);margin-bottom:6px}
.login-sub{font-size:0.84rem;color:var(--txt2);margin-bottom:24px;font-weight:300}
.login-err{background:#fff5f5;border:1.5px solid #fecaca;color:#ef4444;padding:10px 14px;border-radius:9px;font-size:0.81rem;margin-bottom:14px}

@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

@media(max-width:768px){
  .nav-links{display:none}.hamburger{display:flex}
  .hero-stats{gap:24px}.stat-n{font-size:1.4rem}
  .about-grid,.contact-grid{grid-template-columns:1fr;gap:36px}
  .steps-grid{grid-template-columns:1fr}
  .step-card{border-right:none;border-bottom:1.5px solid var(--border)}
  .step-card:last-child{border-bottom:none}
  .trust-bar{gap:18px}.section{padding:72px 5vw}
  .form-grid{grid-template-columns:1fr}
  .prod-modal{grid-template-columns:1fr}
}
`;

// ─── WHATSAPP ICON ────────────────────────────────────────────────────────────
function WaIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.664 4.83 1.82 6.845L2 30l7.388-1.794A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" fill="#25D366"/>
      <path d="M22.5 19.5c-.4-.2-2.3-1.1-2.65-1.25-.35-.15-.6-.2-.85.2-.25.4-.95 1.25-1.17 1.5-.2.25-.42.28-.8.1-.4-.2-1.65-.6-3.14-1.93-1.16-1.03-1.94-2.3-2.17-2.68-.23-.4-.025-.62.17-.82.18-.18.4-.46.6-.7.2-.23.26-.4.4-.65.13-.25.07-.47-.03-.67-.1-.2-.85-2.05-1.17-2.8-.3-.73-.62-.63-.85-.64l-.72-.01c-.25 0-.65.09-.99.47-.34.38-1.3 1.27-1.3 3.1s1.33 3.6 1.52 3.85c.18.25 2.62 4 6.35 5.61.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.1 2.3-.94 2.63-1.85.32-.9.32-1.68.22-1.85-.1-.17-.35-.27-.75-.47z" fill="#fff"/>
    </svg>
  );
}

// ─── IMAGE UPLOAD HELPER ──────────────────────────────────────────────────────
function fileToDataUrl(file) {
  return new Promise((res) => {
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.readAsDataURL(file);
  });
}

// ─── PAYMENT MODAL ────────────────────────────────────────────────────────────
function PaymentModal({ product, onClose }) {
  const [method, setMethod] = useState(null);
  const [delivery, setDelivery] = useState(false);
  const [clientName, setClientName] = useState("");

  const basePrice = product.price;
  const deliveryFee = 2000;

  // Parse numeric price for sum
  const numericPrice = parseInt((basePrice || "").replace(/\D/g, ""), 10) || 0;
  const totalPrice = delivery ? numericPrice + deliveryFee : numericPrice;
  const totalLabel = totalPrice > 0
    ? `KZ ${totalPrice.toLocaleString("pt-PT")}`
    : basePrice;

  const buildWaMsg = () => {
    const prod = `Produto: ${product.name}`;
    const preco = `Valor pago: ${totalLabel}`;
    const entrega = delivery ? "Deslocação: Sim (+KZ 2.000)" : "";
    if (method === "express") {
      return `Olá! Sou ${clientName || "[o teu nome]"}.\n${prod}\n${preco}${entrega ? "\n" + entrega : ""}\nPagamento via Express. Segue o comprovativo.`;
    }
    return `Olá!\n${prod}\n${preco}${entrega ? "\n" + entrega : ""}\nPagamento via ${method?.toUpperCase()}. Segue o comprovativo.`;
  };

  const methodActive = (m) => ({
    borderColor: method === m ? "var(--dark)" : "var(--border)",
    background: method === m ? "var(--bg2)" : "#fff",
    cursor: "pointer"
  });

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pay-modal" style={{maxHeight:"90vh",overflowY:"auto"}}>
        <button className="pay-close" onClick={onClose}>✕</button>
        <div className="pay-modal-title">💳 Como queres pagar?</div>
        <div className="pay-modal-sub">
          <strong>{product.name}</strong> — <strong>{basePrice}</strong>
        </div>

        {/* METHOD SELECTION */}
        <div className="pay-method" style={methodActive("express")} onClick={() => setMethod("express")}>
          <div className="pay-method-title">⚡ Express</div>
          <div className="pay-method-sub">Transferência rápida via Express</div>
        </div>
        <div className="pay-method" style={methodActive("bai")} onClick={() => setMethod("bai")}>
          <div className="pay-method-title">🏦 BAI</div>
          <div className="pay-method-sub">Transferência bancária — Banco BAI</div>
        </div>
        <div className="pay-method" style={methodActive("bfa")} onClick={() => setMethod("bfa")}>
          <div className="pay-method-title">🏦 BFA</div>
          <div className="pay-method-sub">Transferência bancária — Banco BFA</div>
        </div>

        {/* DETAILS — only shown after method selected */}
        {method && <>
          <div className="pay-details" style={{marginTop:16}}>

            {/* EXPRESS */}
            {method === "express" && <>
              <div className="pay-detail-row">
                <span className="pay-detail-label">Número Express</span>
                <span className="pay-detail-value">{EXPRESS}</span>
              </div>
              <div style={{marginTop:12}}>
                <div style={{fontSize:"0.72rem",fontWeight:700,color:"var(--txt2)",letterSpacing:".06em",textTransform:"uppercase",marginBottom:6}}>O teu nome (primeiro e último)</div>
                <input
                  className="form-input"
                  placeholder="Ex: João Silva"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  style={{width:"100%"}}
                />
                <div style={{fontSize:"0.75rem",color:"var(--txt3)",marginTop:5,fontWeight:300}}>O teu nome aparece na mensagem do comprovativo.</div>
              </div>
            </>}

            {/* BAI */}
            {method === "bai" && <>
              <div className="pay-detail-row">
                <span className="pay-detail-label">IBAN BAI</span>
                <span className="pay-detail-value">{BAI_IBAN}</span>
              </div>
              <div className="pay-detail-row">
                <span className="pay-detail-label">Nome do titular</span>
                <span className="pay-detail-value" style={{fontFamily:"var(--fb)"}}>{OWNER_NAME}</span>
              </div>
            </>}

            {/* BFA */}
            {method === "bfa" && <>
              <div className="pay-detail-row">
                <span className="pay-detail-label">IBAN BFA</span>
                <span className="pay-detail-value">{BFA_IBAN}</span>
              </div>
              <div className="pay-detail-row">
                <span className="pay-detail-label">Nome do titular</span>
                <span className="pay-detail-value" style={{fontFamily:"var(--fb)"}}>{OWNER_NAME}</span>
              </div>
            </>}

            {/* TOTAL */}
            <div className="pay-detail-row" style={{marginTop:8,paddingTop:12,borderTop:"1px solid var(--border)"}}>
              <span className="pay-detail-label" style={{fontWeight:600,color:"var(--dark)"}}>Total a pagar</span>
              <span className="pay-detail-value" style={{color:"var(--dark)",fontSize:"1.05rem",fontWeight:800}}>{totalLabel}</span>
            </div>
          </div>

          {/* DELIVERY OPTION */}
          <div style={{margin:"14px 0",padding:"14px 18px",background:"var(--accent-bg)",border:"1.5px solid rgba(245,200,66,0.3)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
            <div>
              <div style={{fontSize:"0.85rem",fontWeight:700,color:"var(--dark)"}}>🛵 Deslocação (+KZ 2.000)</div>
              <div style={{fontSize:"0.78rem",color:"var(--txt2)",fontWeight:300,marginTop:2}}>Opcional — entrega no teu endereço em Luanda</div>
            </div>
            <label className="toggle" style={{flexShrink:0}}>
              <input type="checkbox" checked={delivery} onChange={e => setDelivery(e.target.checked)} />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="pay-note">
            {method !== "express"
              ? <>⚡ <strong>Mesmo banco:</strong> confirmação até 5 horas<br/>🕐 <strong>Bancos diferentes:</strong> até 24h em dias laborais<br/></>
              : null}
            📸 Após o pagamento, envia o comprovativo pelo WhatsApp.
          </div>

          <a
            href={`${WA_URL}?text=${encodeURIComponent(buildWaMsg())}`}
            target="_blank" rel="noreferrer"
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px",background:"#16a34a",color:"#fff",borderRadius:12,textDecoration:"none",fontWeight:700,fontSize:"0.92rem",fontFamily:"var(--fh)",transition:"background 0.2s",marginTop:4}}>
            <WaIcon size={18}/> Enviar comprovativo via WhatsApp
          </a>
        </>}
      </div>
    </div>
  );
}

// ─── PRODUCT DETAIL MODAL ─────────────────────────────────────────────────────
function ProductModal({ product, onClose, onBuy }) {
  const [activeImg, setActiveImg] = useState(0);
  const allImgs = [product.cover, ...(product.gallery||[])].filter(Boolean);
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="prod-modal">
        <div className="prod-modal-gallery">
          <div className="prod-modal-main-img">
            {allImgs.length > 0
              ? <img src={allImgs[activeImg]} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
              : <span>{product.emoji}</span>}
          </div>
          {allImgs.length > 1 && (
            <div className="prod-modal-thumbs">
              {allImgs.map((img, i) => (
                <img key={i} src={img} alt="" className={`thumb ${activeImg===i?"active":""}`} onClick={() => setActiveImg(i)} />
              ))}
            </div>
          )}
        </div>
        <div className="prod-modal-info">
          <button className="prod-modal-close" onClick={onClose}>✕</button>
          <div className="prod-modal-name">{product.name}</div>
          <span className={`prod-modal-state ${product.available ? "badge-green" : "badge-yellow"}`} style={{marginBottom:16}}>
            {product.available ? "✓ " + product.state : "🕐 " + product.state}
          </span>
          <div className="prod-modal-desc">{product.desc}</div>
          {product.available && <div className="prod-modal-price">{product.price}</div>}
          <div className="prod-modal-actions">
            {product.available ? <>
              <button className="btn-pay-now" onClick={() => onBuy(product)}>💳 Pagar agora</button>
              <a href={`${WA_URL}?text=Olá! Tenho interesse no ${product.name} (${product.price}). Está disponível?`}
                target="_blank" rel="noreferrer" className="btn-pay-wa">💬 Finalizar pelo WhatsApp</a>
            </> : (
              <a href={`${WA_URL}?text=Olá! Quero ser avisado quando o ${product.name} estiver disponível.`}
                target="_blank" rel="noreferrer" className="btn-pay-wa">💬 Avisar quando chegar</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ products, onSave, onClose }) {
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const emptyForm = { emoji:"💻", name:"", desc:"", price:"", state:"Novo", category:"Laptops", available:true, cover:"", gallery:[] };
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setForm(emptyForm); setEditing(null); setView("edit"); };
  const openEdit = (p) => { setForm({...p, gallery: p.gallery||[]}); setEditing(p.id); setView("edit"); };
  const handleDelete = (id) => {
    if (!window.confirm("Remover este produto?")) return;
    onSave(products.filter(p => p.id !== id));
  };
  const f = (k, v) => setForm(prev => ({...prev, [k]: v}));

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const url = await fileToDataUrl(file);
    f("cover", url);
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    const urls = await Promise.all(files.map(fileToDataUrl));
    f("gallery", [...(form.gallery||[]), ...urls].slice(0, 8));
  };

  const removeGalleryImg = (i) => f("gallery", form.gallery.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!form.name || !form.price) return alert("Nome e preço são obrigatórios.");
    if (editing) {
      onSave(products.map(p => p.id === editing ? {...form, id: editing} : p));
    } else {
      onSave([...products, {...form, id: Date.now()}]);
    }
    setView("list");
  };

  return (
    <div className="admin-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      {view === "list" ? (
        <div className="admin-panel">
          <div className="admin-title">
            🛠️ Painel de Gestão
            <button className="admin-close" onClick={onClose}>✕</button>
          </div>
          <div className="sec-divider">Produtos ({products.length})</div>
          {products.map(p => (
            <div key={p.id} className="prod-row">
              {p.cover
                ? <img src={p.cover} alt="" className="prod-row-img" />
                : <div className="prod-row-em">{p.emoji}</div>}
              <div className="prod-row-info">
                <div className="prod-row-name">{p.name}</div>
                <div className="prod-row-price">{p.price}</div>
              </div>
              <span className={`status-pill ${p.available?"pill-green":"pill-yellow"}`}>
                {p.available ? "✓ Disponível" : "🕐 Em breve"}
              </span>
              <div style={{display:"flex",gap:6}}>
                <button className="btn-edit" onClick={() => openEdit(p)}>✏️ Editar</button>
                <button className="btn-del" onClick={() => handleDelete(p.id)}>🗑</button>
              </div>
            </div>
          ))}
          <button className="btn-save" style={{width:"100%",marginTop:14}} onClick={openAdd}>+ Adicionar novo produto</button>
        </div>
      ) : (
        <div className="admin-panel">
          <div className="admin-title">
            {editing ? "✏️ Editar Produto" : "➕ Novo Produto"}
            <button className="admin-close" onClick={() => setView("list")}>✕</button>
          </div>

          <div style={{marginBottom:20}}>
            <div className="sec-divider">Ícone (se não tiver foto)</div>
            <div className="emoji-grid">
              {EMOJIS.map(e => (
                <button key={e} className={`emoji-btn ${form.emoji===e?"sel":""}`} onClick={() => f("emoji",e)}>{e}</button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:20}}>
            <div className="sec-divider">Imagem de capa</div>
            <label className="img-upload-area">
              <input type="file" accept="image/*" onChange={handleCoverUpload} />
              {form.cover
                ? <img src={form.cover} alt="capa" style={{width:120,height:120,objectFit:"cover",borderRadius:10}} />
                : <><div style={{fontSize:"2rem"}}>📷</div><span className="img-upload-label">Clica para adicionar foto de capa</span></>}
            </label>
          </div>

          <div style={{marginBottom:20}}>
            <div className="sec-divider">Galeria de imagens (até 8)</div>
            <label className="img-upload-area">
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
              <div style={{fontSize:"2rem"}}>🖼️</div>
              <span className="img-upload-label">Clica para adicionar fotos à galeria</span>
            </label>
            {form.gallery && form.gallery.length > 0 && (
              <div className="img-previews" style={{marginTop:10}}>
                {form.gallery.map((img, i) => (
                  <div key={i} className="img-preview-wrap">
                    <img src={img} alt="" className="img-preview" />
                    <button className="img-preview-del" onClick={() => removeGalleryImg(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-grid">
            <div className="form-field full">
              <label className="form-label">Nome do produto</label>
              <input className="form-input" placeholder="Ex: iPhone 15 Pro Max" value={form.name} onChange={e => f("name", e.target.value)} />
            </div>
            <div className="form-field full">
              <label className="form-label">Descrição</label>
              <input className="form-input" placeholder="Ex: 256GB, importado dos EUA, pronto a usar." value={form.desc} onChange={e => f("desc", e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label">Preço</label>
              <input className="form-input" placeholder="Ex: KZ 149.000" value={form.price} onChange={e => f("price", e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label">Estado</label>
              <select className="form-select" value={form.state} onChange={e => f("state", e.target.value)}>
                <option>Novo</option><option>Usado como novo</option><option>Usado</option><option>A caminho</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Categoria</label>
              <select className="form-select" value={form.category} onChange={e => f("category", e.target.value)}>
                {CATS.filter(c => c!=="Todos").map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Disponível para compra?</label>
              <div className="toggle-wrap">
                <label className="toggle">
                  <input type="checkbox" checked={form.available} onChange={e => f("available", e.target.checked)} />
                  <span className="toggle-slider" />
                </label>
                <span style={{fontSize:"0.83rem",color:form.available?"var(--green)":"var(--txt2)",fontWeight:500}}>
                  {form.available ? "Sim — visível e à venda" : "Não — aparece como em breve"}
                </span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-cancel-form" onClick={() => setView("list")}>Cancelar</button>
            <button className="btn-save" onClick={handleSubmit}>{editing ? "Guardar alterações" : "Adicionar produto"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function AdminLogin({ onLogin, onClose }) {
  const [pw, setPw] = useState(""); const [err, setErr] = useState(false);
  const submit = () => { if (pw === ADMIN_PW) { onLogin(); } else setErr(true); };
  return (
    <div className="admin-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="login-box">
        <div className="login-title">🔐 Área de Gestão</div>
        <div className="login-sub">Introduz a senha para aceder ao painel da loja.</div>
        {err && <div className="login-err">Senha incorrecta. Tenta novamente.</div>}
        <div className="form-field" style={{marginBottom:14}}>
          <label className="form-label">Senha</label>
          <input className="form-input" type="password" placeholder="••••••••" value={pw}
            onChange={e => setPw(e.target.value)} onKeyDown={e => e.key==="Enter" && submit()} />
        </div>
        <button className="btn-save" style={{width:"100%"}} onClick={submit}>Entrar</button>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Bancada() {
  const [products, setProducts] = useState(() => {
    try { const s = localStorage.getItem("bancada_v2"); return s ? JSON.parse(s) : INITIAL_PRODUCTS; }
    catch { return INITIAL_PRODUCTS; }
  });
  const [tab, setTab] = useState("Todos");
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [payProduct, setPayProduct] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    try { localStorage.setItem("bancada_v2", JSON.stringify(products)); } catch {}
  }, [products]);

  const filtered = tab === "Todos" ? products : products.filter(p => p.category === tab);
  const totalCart = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id===p.id ? {...i,qty:i.qty+1} : i);
      return [...prev, {...p, qty:1}];
    });
    setCartOpen(true);
  };

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenu(false); };

  const handleLogoClick = () => {
    setClicks(n => {
      const next = n + 1;
      if (next >= 3) { setShowLogin(true); return 0; }
      setTimeout(() => setClicks(0), 900);
      return next;
    });
  };

  return (
    <div>
      <style>{CSS}</style>

      {/* MODALS */}
      {showLogin && !isAdmin && <AdminLogin onLogin={() => { setIsAdmin(true); setShowLogin(false); setShowAdmin(true); }} onClose={() => setShowLogin(false)} />}
      {showAdmin && isAdmin && <AdminPanel products={products} onSave={p => setProducts(p)} onClose={() => setShowAdmin(false)} />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onBuy={p => { setSelectedProduct(null); setPayProduct(p); }} />}
      {payProduct && <PaymentModal product={payProduct} onClose={() => setPayProduct(null)} />}

      {/* MOBILE NAV */}
      <div className={`mobile-nav ${menu?"open":""}`}>
        <button onClick={() => setMenu(false)} style={{position:"absolute",top:24,right:24,background:"none",border:"none",color:"#fff",fontSize:"1.5rem",cursor:"pointer"}}>✕</button>
        {["produtos","como-funciona","sobre","contato"].map(id => (
          <a key={id} onClick={() => scrollTo(id)} style={{textTransform:"capitalize"}}>{id.replace("-"," ")}</a>
        ))}
        <a href={WA_URL} target="_blank" rel="noreferrer" style={{color:"#25d366"}}>WhatsApp</a>
      </div>

      {/* NAV */}
      <nav>
        <div className="nav-logo" onClick={handleLogoClick}>A<span> Bancada</span></div>
        <ul className="nav-links">
          {["produtos","como-funciona","sobre","contato"].map(id => (
            <li key={id}><a onClick={() => scrollTo(id)} style={{textTransform:"capitalize"}}>{id.replace("-"," ")}</a></li>
          ))}
          <li><a href={WA_URL} target="_blank" rel="noreferrer" className="nav-cta">💬 WhatsApp</a></li>
        </ul>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {isAdmin && <button onClick={() => setShowAdmin(true)} style={{background:"var(--accent)",border:"none",color:"var(--dark)",padding:"8px 16px",borderRadius:"100px",fontSize:"0.78rem",cursor:"pointer",fontFamily:"var(--fb)",fontWeight:700}}>🛠️ Gerir</button>}
          {totalCart > 0 && <button onClick={() => setCartOpen(!cartOpen)} style={{background:"var(--dark)",border:"none",color:"#fff",padding:"8px 16px",borderRadius:"100px",fontSize:"0.78rem",cursor:"pointer",fontFamily:"var(--fb)",fontWeight:600}}>🛒 {totalCart}</button>}
          <button className="hamburger" onClick={() => setMenu(true)}><span/><span/><span/></button>
        </div>
      </nav>

      {/* MINI CART */}
      {cartOpen && cart.length > 0 && (
        <div style={{position:"fixed",top:76,right:16,zIndex:150,background:"#fff",border:"1.5px solid var(--border)",borderRadius:16,padding:24,minWidth:300,boxShadow:"var(--shadow-lg)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:"0.95rem",color:"var(--dark)"}}>Carrinho</span>
            <button onClick={() => setCartOpen(false)} style={{background:"none",border:"none",color:"var(--txt2)",cursor:"pointer",fontSize:"1rem"}}>✕</button>
          </div>
          {cart.map(item => (
            <div key={item.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
              <div><div style={{fontSize:"0.85rem",fontWeight:600,color:"var(--dark)"}}>{item.name}</div><div style={{fontSize:"0.75rem",color:"var(--txt2)"}}>Qty: {item.qty}</div></div>
              <div style={{fontSize:"0.85rem",color:"var(--dark)",fontWeight:700}}>{item.price}</div>
            </div>
          ))}
          <button onClick={() => { setCartOpen(false); setPayProduct(cart[cart.length-1]); }} style={{display:"block",width:"100%",marginTop:14,background:"var(--accent)",color:"var(--dark)",border:"none",padding:"12px",borderRadius:10,fontWeight:700,fontSize:"0.88rem",cursor:"pointer",fontFamily:"var(--fh)"}}>💳 Pagar agora</button>
          <a href={`${WA_URL}?text=Olá! Quero encomendar: ${cart.map(i=>`${i.name} x${i.qty} (${i.price})`).join(", ")}`} target="_blank" rel="noreferrer" style={{display:"block",marginTop:8,background:"#f0fdf4",color:"#16a34a",border:"1.5px solid rgba(22,163,74,.2)",padding:"11px",borderRadius:10,textDecoration:"none",fontWeight:600,fontSize:"0.88rem",textAlign:"center",fontFamily:"var(--fh)"}}>
            💬 Finalizar pelo WhatsApp
          </a>
        </div>
      )}

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-glow"/><div className="hero-grid"/>
        <div className="hero-content">
          <div className="hero-badge">📍 Luanda, Angola</div>
          <h1>Tecnologia <em>prática,</em><br/>sem complicações.</h1>
          <p>Eletrônicos novos e usados, selecionados e testados. Apple, Windows, acessórios e muito mais — entregues em Luanda e em todo o país.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("produtos")}>🛍️ Ver Produtos</button>
            <a href={WA_URL} target="_blank" rel="noreferrer" className="btn-outline">💬 Falar no WhatsApp</a>
          </div>
          <div className="hero-stats">
            {[["500+","Clientes satisfeitos"],["100%","Produtos testados"],["2 dias","Entrega em Luanda"]].map(([n,l]) => (
              <div key={l}><span className="stat-n">{n}</span><span className="stat-l">{l}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div className="trust-bar">
        {[["✅","Produtos testados"],["🔒","Compra segura"],["🚚","Entrega nacional"],["💬","Suporte WhatsApp"],["💳","Vários pagamentos"]].map(([i,t]) => (
          <div key={t} className="trust-item"><span>{i}</span>{t}</div>
        ))}
      </div>

      {/* PRODUCTS */}
      <section id="produtos" className="section" style={{background:"#fff"}}>
        <div className="prod-header">
          <div><span className="sec-label">Catálogo</span><h2 className="sec-title">Os nossos produtos</h2></div>
          <a href={`${WA_URL}?text=Olá! Procuro um produto específico.`} target="_blank" rel="noreferrer" className="btn-dark" style={{fontSize:"0.82rem",padding:"10px 20px"}}>Pedir específico</a>
        </div>
        <div className="tabs">
          {CATS.map(c => <button key={c} className={`tab ${tab===c?"active":""}`} onClick={() => setTab(c)}>{c}</button>)}
        </div>
        <div className="prod-grid">
          {filtered.map(p => (
            <div key={p.id} className="prod-card" style={{opacity:p.available?1:0.7}} onClick={() => setSelectedProduct(p)}>
              <div className="prod-img-wrap">
                {p.cover ? <img src={p.cover} alt={p.name}/> : <span className="prod-img-emoji">{p.emoji}</span>}
                <span className={`prod-badge ${p.available?"badge-green":"badge-yellow"}`}>
                  {p.available ? "✓ Disponível" : "🕐 A caminho"}
                </span>
              </div>
              <div className="prod-info">
                <div className="prod-name">{p.name}</div>
                <div className="prod-state">{p.state}</div>
                <div className="prod-desc">{p.desc}</div>
                <div className={`prod-price ${!p.available?"soon":""}`}>{p.price}</div>
                <div className="prod-actions" onClick={e => e.stopPropagation()}>
                  {p.available ? <>
                    <button className="btn-buy" onClick={() => setPayProduct(p)}>💳 Comprar</button>
                    <a href={`${WA_URL}?text=Olá! Tenho interesse no ${p.name} (${p.price}). Está disponível?`} target="_blank" rel="noreferrer" className="btn-wa-sm">💬</a>
                  </> : (
                    <a href={`${WA_URL}?text=Olá! Quero ser avisado quando o ${p.name} estiver disponível.`} target="_blank" rel="noreferrer" className="btn-notify">💬 Avisar quando chegar</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section id="como-funciona" className="section section-alt">
        <div style={{textAlign:"center",maxWidth:540,margin:"0 auto"}}>
          <span className="sec-label">Processo</span>
          <h2 className="sec-title">Como funciona?</h2>
          <p className="sec-sub" style={{margin:"12px auto 0"}}>Simples, directo e sem complicações. Assim é a Bancada.</p>
        </div>
        <div className="steps-grid">
          {[["01","Escolhe o produto","Navega no catálogo e escolhe. Em dúvida? Fala connosco no WhatsApp."],
            ["02","Faz o pedido","Compra directamente ou envia mensagem pelo WhatsApp para tirar dúvidas."],
            ["03","Faz o pagamento","Express, transferência BAI ou BFA — no nome de Filipe Monteiro Francisco."],
            ["04","Recebe o produto","Entregamos em Luanda ou enviamos para qualquer ponto do país."]
          ].map(([n,t,d]) => (
            <div key={n} className="step-card"><div className="step-num">{n}</div><div className="step-title">{t}</div><div className="step-desc">{d}</div></div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="section" style={{paddingTop:0}}>
        <span className="sec-label">Diferencial</span>
        <h2 className="sec-title">Por que escolher a Bancada?</h2>
        <div className="why-grid">
          {[["🔍","Seleção rigorosa","Cada produto é inspecionado antes de chegar até ti. Nada passa sem teste."],
            ["💰","Preço justo","Qualidade acessível. Sem preços inflacionados, sem surpresas."],
            ["🤝","Confiança garantida","Compramos e vendemos com transparência. O teu dinheiro está seguro."],
            ["⚡","Processo simples","Escolhe, paga e recebe. Sem burocracia, sem complicação."],
            ["📦","Entrega rápida","Luanda em 1-2 dias. Resto do país via transportadora de confiança."],
            ["💬","Suporte real","Tens dúvidas? Estamos no WhatsApp. Pessoas reais, não robôs."]
          ].map(([i,t,d]) => (
            <div key={t} className="why-card"><div className="why-icon">{i}</div><div className="why-title">{t}</div><div className="why-desc">{d}</div></div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre" className="section section-alt">
        <div className="about-grid">
          <div className="about-text">
            <span className="sec-label">Sobre nós</span>
            <h2 className="sec-title" style={{marginBottom:24}}>Na Bancada,<br/>facilitamos o acesso.</h2>
            <p>Selecionamos, testamos e disponibilizamos equipamentos e acessórios prontos para uso diário, com foco em <strong>qualidade, funcionalidade e confiança.</strong></p>
            <p>Acreditamos que tecnologia não deve ser complicada, nem inacessível. Muita gente só quer um equipamento que resolva — sem pagar além do necessário, sem frustrações.</p>
            <p><strong>É por isso que a Bancada existe.</strong> Para simplificar a escolha, garantir confiança e entregar soluções que fazem sentido na vida real.</p>
            <p>Porque no final do dia, não é sobre ter tecnologia. <strong>É sobre ela funcionar para ti.</strong></p>
            <a href={WA_URL} target="_blank" rel="noreferrer" className="btn-dark" style={{display:"inline-flex",marginTop:24}}>💬 Falar connosco</a>
          </div>
          <div className="about-visual">
            {[["Clientes atendidos","500+"],["Produtos no catálogo","50+"],["Taxa de satisfação","98%"],["Anos no mercado","3+"],["Produtos testados","100%"]].map(([l,v]) => (
              <div key={l} className="about-stat"><span className="about-stat-label">{l}</span><span className="about-stat-value">{v}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contato" className="section">
        <span className="sec-label">Contato</span>
        <h2 className="sec-title">Fala connosco</h2>
        <p className="sec-sub">Estamos aqui para ajudar. Resposta rápida, sem complicações.</p>
        <div className="contact-grid">
          <div className="contact-info">
            {[["💬","WhatsApp","957 261 939"],["📞","Telefone / Express","922 290 890"],["✉️","E-mail","abacadaa@gmail.com"],["📍","Localização","Luanda, Angola\nEntrega em toda a cidade e envio nacional"]].map(([i,t,d]) => (
              <div key={t} className="contact-item">
                <span style={{fontSize:"1.2rem",marginTop:2}}>{i}</span>
                <div><div className="contact-item-title">{t}</div><div className="contact-item-desc" style={{whiteSpace:"pre-line"}}>{d}</div></div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <a href={WA_URL} target="_blank" rel="noreferrer" className="wa-big"><span style={{fontSize:"1.4rem"}}>💬</span>Falar no WhatsApp agora</a>
            <div className="social-row">
              <a href={FACEBOOK} target="_blank" rel="noreferrer" className="social-btn">📘 Facebook</a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="social-btn">📸 Instagram</a>
            </div>
            <div style={{padding:20,background:"var(--bg2)",border:"1.5px solid var(--border)",borderRadius:14}}>
              <div style={{fontSize:"0.78rem",fontWeight:700,color:"var(--txt2)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:14}}>🏦 Dados Bancários</div>
              <div className="iban-box"><div className="iban-bank">BAI</div><div className="iban-num">{BAI_IBAN}</div></div>
              <div className="iban-box"><div className="iban-bank">BFA</div><div className="iban-num">{BFA_IBAN}</div></div>
              <div className="iban-note">⚡ <strong>Mesmo banco:</strong> até 5 horas<br/>🕐 <strong>Bancos diferentes:</strong> até 24h laborais</div>
            </div>
            <div style={{padding:20,background:"var(--bg2)",border:"1.5px solid var(--border)",borderRadius:14}}>
              <div style={{fontSize:"0.78rem",fontWeight:700,color:"var(--txt2)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>💳 Formas de pagamento</div>
              <div className="pay-tags">
                {["Transferência BAI","Transferência BFA","Express (922 290 890)","Cash — Luanda"].map(m => <span key={m} className="pay-tag">{m}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">A<span> Bancada</span> Eletrônicos</div>
        <div className="footer-copy">© 2025 A Bancada Eletrônicos · Luanda, Angola</div>
        <div className="footer-social">
          <a href={FACEBOOK} target="_blank" rel="noreferrer" className="footer-soc-btn">📘</a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="footer-soc-btn">📸</a>
          <a href={WA_URL} target="_blank" rel="noreferrer" className="footer-soc-btn">💬</a>
        </div>
        <div className="footer-links">
          <a onClick={() => scrollTo("produtos")}>Produtos</a>
          <a onClick={() => scrollTo("sobre")}>Sobre</a>
          <a onClick={() => scrollTo("contato")}>Contato</a>
        </div>
      </footer>
    </div>
  );
}
