// Affiche « Bac à sable + nouveautés 0.6 · 0.7 · 0.8 » pour les réseaux sociaux (1080 × 1350, rendue en 2160 × 2700) :
//   node docs/communication/playground.mjs   → afroicons-playground-fr.html / -en.html, puis les captures indiquées.
// Fond sombre ; au centre, un portable et un téléphone qui montrent le bac à sable, la fenêtre de choix d'icône ouverte.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = join(here, "../..");
const afro = JSON.parse(readFileSync(join(root, "packages/afroicons/icons.json"), "utf8"));
const ui = JSON.parse(readFileSync(join(root, "packages/afroicons-ui/icons.json"), "utf8"));
const by = { ...Object.fromEntries(afro.map((i) => [i.id, i])), ...Object.fromEntries(ui.map((u) => [u.id, u])) };
const cnt = (f) => afro.filter(f).length;
const N = { total: afro.length + ui.length, emojis: cnt((i) => i.cat === "emojis"), flags: cnt((i) => i.cat === "drapeaux"), maps: cnt((i) => i.cat === "cartes"), fauna: cnt((i) => i.cat === "faune") };
const fmt = (v, l) => v.toLocaleString(l === "en" ? "en-US" : "fr-FR").replace(/ /g, " ");
const logo = (s) => readFileSync(join(root, "docs/logo.svg"), "utf8").replace("<svg", `<svg width="${s}" height="${s}"`);

const INK = "#14110E", CREAM = "#FBF3E4", TERRE = "#C24E2A", OCRE = "#E8A93A", VERT = "#2E6B4E", INDIGO = "#22305C";
const get = (id) => { const i = by[id]; if (!i) throw new Error("icône inconnue : " + id); return i; };
/** Icône au trait (culturelle ou d'interface), couleur du texte par défaut. */
const ic = (id, s, c = "currentColor", w = 1.75) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" color="${c}">${get(id).body}</svg>`;
/** Drapeau ou emoji, en couleur. */
const col = (id, s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">${get(id).body}</svg>`;

const T = {
  fr: {
    lang: "fr", badge: "v0.8 · nouveau", kick: "Nouveau · le bac à sable",
    h1: "Voyez vos icônes<br>dans <em>votre</em> app.",
    lead: "Vos couleurs, votre logo, votre appareil. Cliquez sur une icône pour la remplacer ou la personnaliser, puis copiez le code.",
    menu: ["Tableau de bord", "Ventes", "Stock", "Clients", "Portefeuille", "Paramètres"],
    kpi: [["2,4 M", "Ventes"], ["845 000", "FCFA"], ["128", "Livraisons"]],
    rows: [["Awa Diallo", "Payée", "ok"], ["Kofi Mensah", "En attente", "wait"]],
    list: ["Livraison", "Ticket de caisse", "Mobile money", "Adresse"], tabs: ["Accueil", "Ventes", "Wallet", "Profil"],
    pick: ["Remplacer", "Personnaliser"], pickq: "panier", hint: "↑ Cliquez sur une icône pour la changer",
    feats: ["Votre logo et vos couleurs", "Version 100 % africaine", "Contrastes WCAG", "Code React · Angular · HTML"],
    vers: [["0.6", "31 oct.", `${N.flags} drapeaux africains`], ["0.7", "1er nov.", "372 emojis, 5 teintes"], ["0.8", "1er nov.", `${N.maps} cartes · 80 animaux · bac à sable`]],
    cta: "Essayer : afroicons.org/playground", side: [`${fmt(N.total, "fr")} icônes et emojis`, "Gratuit · open source · MIT"],
  },
  en: {
    lang: "en", badge: "v0.8 · new", kick: "New · the playground",
    h1: "See your icons<br>in <em>your</em> app.",
    lead: "Your colours, your logo, your device. Click any icon to swap or customise it, then copy the code.",
    menu: ["Dashboard", "Sales", "Stock", "Customers", "Wallet", "Settings"],
    kpi: [["2.4 M", "Sales"], ["845,000", "FCFA"], ["128", "Deliveries"]],
    rows: [["Awa Diallo", "Paid", "ok"], ["Kofi Mensah", "Pending", "wait"]],
    list: ["Delivery", "Receipt", "Mobile money", "Address"], tabs: ["Home", "Sales", "Wallet", "Profile"],
    pick: ["Swap", "Customise"], pickq: "basket", hint: "↑ Click any icon to swap it",
    feats: ["Your logo and colours", "100% African version", "WCAG contrast", "React · Angular · HTML code"],
    vers: [["0.6", "Oct 31", `${N.flags} African flags`], ["0.7", "Nov 1", "372 emojis, 5 skin tones"], ["0.8", "Nov 1", `${N.maps} maps · 80 animals · playground`]],
    cta: "Try it: afroicons.org/playground", side: [`${fmt(N.total, "en")} icons and emojis`, "Free · open source · MIT"],
  },
};

const SIDE = ["LayoutDashboard", "panier", "grenier", "Users", "cauri", "Settings"];
const page = (t) => `<!doctype html><html lang="${t.lang}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=DM+Sans:opsz,wght@9..40,500;9..40,700&family=JetBrains+Mono:wght@500;700&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
html,body{width:1080px;height:1350px;overflow:hidden;background:${INK};color:${CREAM};font-family:"DM Sans"}
body{position:relative;background:radial-gradient(900px 600px at 78% 46%,#3A1E14 0%,transparent 70%),radial-gradient(700px 520px at 10% 70%,#16233F 0%,transparent 70%),${INK}}
/* bande kente en haut et en bas */
.kente{position:absolute;left:0;right:0;height:14px;background:repeating-linear-gradient(90deg,${TERRE} 0 44px,${OCRE} 44px 66px,${VERT} 66px 110px,${INK} 110px 118px,${INDIGO} 118px 162px,${OCRE} 162px 176px)}
.kente.t{top:0}.kente.b{bottom:0}
.top{position:absolute;left:70px;right:70px;top:52px;display:flex;align-items:center;gap:14px}
.top b{font:800 36px "Bricolage Grotesque";letter-spacing:-.03em}
.badge{margin-left:auto;font:700 15px "JetBrains Mono";letter-spacing:.12em;text-transform:uppercase;color:${INK};background:${OCRE};padding:8px 14px;border-radius:99px}
.kick{position:absolute;left:70px;top:146px;font:700 16px "JetBrains Mono";letter-spacing:.16em;text-transform:uppercase;color:${OCRE};display:flex;align-items:center;gap:10px}
.kick::before{content:"";width:28px;height:3px;background:${OCRE};border-radius:2px}
h1{position:absolute;left:70px;top:178px;font:800 96px/0.94 "Bricolage Grotesque";letter-spacing:-.05em}
h1 em{font-style:normal;color:${OCRE};position:relative}
h1 em::after{content:"";position:absolute;left:2px;right:2px;bottom:4px;height:8px;border-radius:4px;background:${TERRE};z-index:-1;opacity:.9}
.lead{position:absolute;left:70px;top:385px;width:720px;font:500 23px/1.45 "DM Sans";color:#D8CBB8}

/* portable */
.lap{position:absolute;left:52px;top:500px;width:740px}
.lid{background:#2A2420;border-radius:20px 20px 6px 6px;padding:14px 14px 16px;box-shadow:inset 0 0 0 2px #3A322B,0 40px 70px -30px #000}
.lid::before{content:"";display:block;width:6px;height:6px;border-radius:50%;background:#4A4038;margin:-6px auto 6px}
.scr{background:#fff;border-radius:6px;overflow:hidden;color:#1F1A15;height:420px}
.bar{display:flex;align-items:center;gap:6px;padding:7px 10px;background:#F4EEE3;border-bottom:1px solid #E8DCC8}
.bar i{width:9px;height:9px;border-radius:50%;background:#FF5F57}.bar i:nth-child(2){background:#FEBC2E}.bar i:nth-child(3){background:#28C840}
.bar span{margin:0 auto;font:500 11px "DM Sans";color:#8A7D6C;background:#fff;padding:3px 16px;border-radius:7px}
.nav{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #EFE6D6}
.nav b{font:800 16px "Bricolage Grotesque";letter-spacing:-.02em;display:flex;align-items:center;gap:6px;color:${TERRE}}
.nav b span{color:#1F1A15}
.srch{flex:1;max-width:240px;display:flex;align-items:center;gap:6px;background:#F6F1E8;border-radius:9px;padding:6px 10px;font-size:12px;color:#8A7D6C}
.navr{margin-left:auto;display:flex;gap:12px;align-items:center;color:#1F1A15}
.body{display:grid;grid-template-columns:168px 1fr;height:100%}
.side{background:#F8F4EC;padding:10px 8px;display:grid;gap:3px;align-content:start;border-right:1px solid #EFE6D6}
.it{display:flex;align-items:center;gap:9px;padding:7px 9px;border-radius:9px;font-size:13px;color:#6E6253}
.it.on{background:#F7E2D9;color:${TERRE};font-weight:700}
.it.sel{outline:2px dashed ${TERRE};outline-offset:1px;background:#fff;color:#1F1A15}
.main{padding:14px;display:grid;gap:12px;align-content:start}
.main h4{font:800 17px "Bricolage Grotesque";display:flex;align-items:center;justify-content:space-between}
.main h4 span{font:700 12px "DM Sans";background:${TERRE};color:#fff;padding:6px 10px;border-radius:9px;display:flex;align-items:center;gap:5px}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.kpi{border:1px solid #EFE6D6;border-radius:12px;padding:10px;display:grid;gap:2px}
.kpi .k{width:30px;height:30px;border-radius:9px;background:#F7E2D9;color:${TERRE};display:grid;place-items:center;margin-bottom:4px}
.kpi b{font:800 18px "Bricolage Grotesque"}.kpi small{font-size:11px;color:#8A7D6C}
.tb{border:1px solid #EFE6D6;border-radius:12px;overflow:hidden;font-size:12px}
.tr{display:grid;grid-template-columns:52px 1fr 104px 52px;align-items:center;gap:8px;padding:8px 10px;border-top:1px solid #EFE6D6}
.tr:first-child{border-top:0;background:#F8F4EC;font:700 10px "JetBrains Mono";letter-spacing:.08em;color:#8A7D6C;text-transform:uppercase}
.pill{display:inline-flex;align-items:center;gap:4px;font-weight:700;padding:3px 8px;border-radius:99px;font-size:11px}
.pill.ok{background:#E3F1E8;color:#2E7D4F}.pill.wait{background:#FBEFD8;color:#B7791F}
.acts{display:flex;gap:7px;color:#A89A88}
.base{width:112%;margin-left:-6%;height:16px;border-radius:2px 2px 16px 16px;background:linear-gradient(#D9D1C4,#A99F91);position:relative;box-shadow:0 18px 30px -14px #000}
.base::after{content:"";position:absolute;top:0;left:50%;width:15%;height:6px;border-radius:0 0 8px 8px;background:#9A9083;transform:translateX(-50%)}

/* téléphone */
.ph{position:absolute;left:820px;top:560px;width:220px;height:450px;border-radius:38px;background:#0E0C0A;padding:8px;box-shadow:inset 0 0 0 2px #2C2520,0 40px 70px -24px #000;transform:rotate(4deg)}
.phs{position:relative;width:100%;height:100%;border-radius:31px;overflow:hidden;background:#fff;color:#1F1A15;display:flex;flex-direction:column}
.notch{position:absolute;top:8px;left:50%;width:70px;height:20px;border-radius:12px;background:#0E0C0A;transform:translateX(-50%)}
.sb{display:flex;justify-content:space-between;padding:10px 18px 0;font:700 10px "DM Sans"}
.pbar{display:flex;align-items:center;justify-content:space-between;padding:14px 14px 6px;font:800 14px "Bricolage Grotesque"}
.li{display:flex;align-items:center;gap:10px;padding:9px 12px;border-bottom:1px solid #F0E8DA;font-size:12px}
.li .k{width:30px;height:30px;border-radius:9px;background:#F7E2D9;color:${TERRE};display:grid;place-items:center}
.li b{display:block;font-size:12px}.li small{font-size:10px;color:#8A7D6C}
.fab{position:absolute;right:14px;bottom:64px;width:44px;height:44px;border-radius:15px;background:${TERRE};display:grid;place-items:center;box-shadow:0 8px 16px -6px #0008}
.tabs{margin-top:auto;display:grid;grid-template-columns:repeat(4,1fr);padding:8px 4px 14px;border-top:1px solid #F0E8DA}
.tabs span{display:grid;justify-items:center;gap:2px;font-size:9px;color:#8A7D6C}.tabs span.on{color:${TERRE};font-weight:700}

/* fenêtre de choix */
.pick{position:absolute;left:470px;top:742px;width:330px;background:#FFFDF8;color:#1F1A15;border-radius:18px;box-shadow:0 30px 60px -18px #000c,0 0 0 1px #0001;overflow:hidden;transform:rotate(-2deg)}
.pt{display:flex;gap:4px;padding:10px;border-bottom:1px solid #EFE6D6}
.pt span{font:700 12px "DM Sans";padding:6px 10px;border-radius:9px;color:#8A7D6C}.pt span:first-child{background:#1F1A15;color:#fff}
.pq{margin:10px 10px 0;display:flex;align-items:center;gap:7px;border:1.5px solid #1F1A15;border-radius:10px;padding:7px 10px;font-size:12px}
.pg{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;padding:10px}
.pg span{display:grid;place-items:center;aspect-ratio:1;border-radius:11px;background:#F6F1E8;color:#1F1A15}
.pg span.on{background:${TERRE};color:#fff;box-shadow:0 0 0 3px #F7E2D9}
.cursor{position:absolute;left:600px;top:850px;filter:drop-shadow(0 4px 6px #0007)}
.hint{position:absolute;left:84px;top:838px;width:150px;font:700 13px/1.35 "JetBrains Mono";letter-spacing:.04em;color:${INK};background:${OCRE};padding:8px 11px;border-radius:10px;transform:rotate(-3deg)}
.hint::after{content:"";position:absolute;left:28px;top:-7px;border:7px solid transparent;border-bottom-color:${OCRE};border-top:0}

/* atouts, versions, appel */
.feats{position:absolute;left:70px;right:70px;top:1056px;display:flex;flex-wrap:wrap;gap:8px}
.feats span{font:700 15px "DM Sans";padding:8px 14px;border-radius:99px;border:1.5px solid #FBF3E455;color:${CREAM};display:flex;align-items:center;gap:7px}
.feats span::before{content:"✓";color:${OCRE};font-weight:800}
.vers{position:absolute;left:70px;right:70px;top:1124px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.ver{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;background:#FBF3E40F;border:1px solid #FBF3E422}
.ver.hot{background:#FBF3E4;color:${INK};border-color:${CREAM}}
.ver .ic{flex:none;width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:#fff}
.ver b{display:block;font:800 22px/1 "Bricolage Grotesque";letter-spacing:-.02em}
.ver b small{font:700 11px "JetBrains Mono";letter-spacing:.08em;margin-left:6px;opacity:.7;text-transform:uppercase}
.ver p{margin-top:4px;font:500 13.5px/1.3 "DM Sans";opacity:.85}
.cta{position:absolute;left:70px;right:70px;bottom:44px;display:flex;align-items:center;gap:18px}
.cta a{font:800 32px "Bricolage Grotesque";letter-spacing:-.02em;color:${INK};background:${OCRE};padding:14px 26px;border-radius:18px;text-decoration:none;box-shadow:6px 6px 0 ${TERRE}}
.cta small{margin-left:auto;text-align:right;font:700 14px/1.6 "JetBrains Mono";letter-spacing:.08em;text-transform:uppercase;color:#D8CBB8}
</style></head><body>
<div class="kente t"></div>
<div class="top">${logo(48)}<b>Afroicons</b><span class="badge">${t.badge}</span></div>
<div class="kick">${t.kick}</div>
<h1>${t.h1}</h1>
<p class="lead">${t.lead}</p>

<div class="lap"><div class="lid"><div class="scr">
  <div class="bar"><i></i><i></i><i></i><span>🔒 nafa-erp.app/${t.lang === "en" ? "dashboard" : "tableau-de-bord"}</span></div>
  <div class="nav"><b>${ic("case", 20, TERRE)}<span>NAFA ERP</span></b><span class="srch">${ic("Search", 14, "#8A7D6C")}${t.lang === "en" ? "Search…" : "Rechercher…"}</span><span class="navr">${ic("ngongi", 18)}${ic("UserCircle", 20)}</span></div>
  <div class="body">
    <div class="side">${t.menu.map((m, k) => `<span class="it${k === 0 ? " on" : ""}${k === 1 ? " sel" : ""}">${ic(SIDE[k], 17)}${m}</span>`).join("")}</div>
    <div class="main">
      <h4>${t.menu[0]}<span>${ic("Plus", 13, "#fff", 2.2)}${t.lang === "en" ? "New" : "Nouveau"}</span></h4>
      <div class="kpis">${[["TrendingUp"], ["sacdargent"], ["mototaxi"]].map(([id], k) => `<div class="kpi"><span class="k">${ic(id, 17, TERRE)}</span><b>${t.kpi[k][0]}</b><small>${t.kpi[k][1]}</small></div>`).join("")}</div>
      <div class="tb"><div class="tr"><span>#</span><span>${t.lang === "en" ? "Customer" : "Client"}</span><span>${t.lang === "en" ? "Status" : "Statut"}</span><span></span></div>
        ${t.rows.map(([c, s, k], n) => `<div class="tr"><b>#204${1 - n}</b><span>${c}</span><span class="pill ${k}">${ic(k === "ok" ? "CheckCircle" : "Clock", 12, "currentColor", 2)}${s}</span><span class="acts">${ic("Eye", 14)}${ic("Pencil", 14)}</span></div>`).join("")}</div>
    </div>
  </div>
</div></div><div class="base"></div></div>

<div class="ph"><div class="phs"><div class="notch"></div><div class="sb"><span>9:41</span><span>●●● 4G</span></div>
  <div class="pbar">${ic("Menu", 16)}<span>NAFA ERP</span>${ic("ngongi", 16)}</div>
  ${["taxibrousse", "ardoise", "mobilemoney", "baobab"].map((id, k) => `<div class="li"><span class="k">${ic(id, 17, TERRE)}</span><div><b>${t.list[k]}</b><small>${t.lang === "en" ? "2 h ago" : "Il y a 2 h"}</small></div></div>`).join("")}
  <span class="fab">${ic("Plus", 20, "#fff", 2.2)}</span>
  <div class="tabs">${["case", "boutique", "cauri", "User"].map((id, k) => `<span class="${k === 0 ? "on" : ""}">${ic(id, 18, k === 0 ? TERRE : "#8A7D6C")}${t.tabs[k]}</span>`).join("")}</div>
</div></div>

<div class="hint">${t.hint}</div>
<div class="pick"><div class="pt"><span>${t.pick[0]}</span><span>${t.pick[1]}</span></div>
  <div class="pq">${ic("Search", 14)}${t.pickq}</div>
  <div class="pg">${["panier", "ShoppingCart", "ShoppingBag", "calebassepleine", "etal", "boutique", "Store", "marmite", "Package", "Tag"].map((id) => `<span class="${id === "panier" ? "on" : ""}">${ic(id, 22, "currentColor")}</span>`).join("")}</div>
</div>
<svg class="cursor" width="34" height="40" viewBox="0 0 24 28"><path d="M3 2L3 22L8.5 17L12.5 26L16 24.4L12 15.6L19.5 15.2Z" fill="#fff" stroke="#14110E" stroke-width="1.6" stroke-linejoin="round"/></svg>

<div class="feats">${t.feats.map((f) => `<span>${f}</span>`).join("")}</div>
<div class="vers">${t.vers.map(([v, d, s], k) => `<div class="ver${k === 2 ? " hot" : ""}"><span class="ic">${k === 0 ? col("drapeau-cameroun", 34) : k === 1 ? col("emoji-thieboudienne", 34) : col("emoji-guepard", 34)}</span><div><b>v${v}<small>${d}</small></b><p>${s}</p></div></div>`).join("")}</div>
<div class="cta"><a>${t.cta}</a><small>${t.side[0]}<br>${t.side[1]}</small></div>
<div class="kente b"></div>
<script>
document.fonts.ready.then(() => {
  // contrôle de mise en page : rien ne déborde de l'affiche, les blocs du bas ne se chevauchent pas
  const r = (s) => document.querySelector(s).getBoundingClientRect();
  document.body.dataset.fit = [r(".lead").bottom < r(".lap").top, r(".lap").bottom < r(".feats").top, r(".feats").bottom < r(".vers").top, r(".vers").bottom < r(".cta").top, document.querySelector(".cta").scrollWidth <= 940, r(".feats").height < 50].join(",");
});
</script>
</body></html>`;

for (const t of Object.values(T)) writeFileSync(join(here, `afroicons-playground-${t.lang}.html`), page(t));
const chrome = `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --virtual-time-budget=5000 --force-device-scale-factor=2 --window-size=1080,1350`;
console.log(`✔ affiches bac à sable (${N.total} icônes) — captures :\n${["fr", "en"].map((l) => `${chrome} --screenshot=docs/communication/afroicons-playground-${l}.png docs/communication/afroicons-playground-${l}.html`).join("\n")}`);
