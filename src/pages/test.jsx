import { useState } from "react";

const NAV_ITEMS = [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "wallet", icon: "◉", label: "MainDashBoard" },
    { id: "send", icon: "↗", label: "Send Money" },
    { id: "transactions", icon: "≡", label: "Transactions" },
    { id: "analytics", icon: "⬡", label: "Analytics" },
    { id: "cards", icon: "▣", label: "My Cards" },
    { id: "notifications", icon: "◎", label: "Notifications" },
    { id: "admin", icon: "⊞", label: "Admin" },
    { id: "fraud", icon: "⚑", label: "Fraud Alerts" },
    { id: "settings", icon: "⚙", label: "Settings" },
];

const TOP_NAV = ["summary", "my cards", "credit history", "installments"];

const TRANSACTIONS = [
    { id: 1, name: "Transfer to Mikey", sub: "Online food order", amount: -1250.60, type: "debit", date: "TODAY | 22ND JAN, 2020", avatar: "M" },
    { id: 2, name: "Salary For the Month of Apr", sub: "Monthly Salary", amount: 12840.00, type: "credit", date: "TODAY | 22ND JAN, 2020", avatar: "S" },
    { id: 3, name: "Transfer to Nika", sub: "Rent payment", amount: -800.00, type: "debit", date: "YESTERDAY | 21ST JAN, 2020", avatar: "N" },
    { id: 4, name: "Amazon Purchase", sub: "Online shopping", amount: -234.99, type: "debit", date: "YESTERDAY | 21ST JAN, 2020", avatar: "A" },
    { id: 5, name: "Freelance Payment", sub: "Design project", amount: 3200.00, type: "credit", date: "20TH JAN, 2020", avatar: "F" },
    { id: 6, name: "Netflix Subscription", sub: "Monthly bill", amount: -15.99, type: "debit", date: "20TH JAN, 2020", avatar: "N" },
];

const RECIPIENTS = [
    { name: "Mikey", avatar: "M", color: "#FF6B6B" },
    { name: "Nika", avatar: "N", color: "#4ECDC4" },
    { name: "Sam", avatar: "S", color: "#A78BFA" },
    { name: "Jade", avatar: "J", color: "#F472B6" },
    { name: "Tom", avatar: "T", color: "#34D399" },
];

const NOTIFICATIONS = [
    { id: 1, title: "Transfer Successful", desc: "You sent $1,250.60 to Mikey", time: "2 min ago", type: "success", read: false },
    { id: 2, title: "Salary Received", desc: "$12,840.00 credited to your wallet", time: "1 hr ago", type: "credit", read: false },
    { id: 3, title: "Fraud Alert", desc: "Unusual login detected from new device", time: "3 hr ago", type: "alert", read: false },
    { id: 4, title: "Bill Due", desc: "Netflix subscription due tomorrow", time: "5 hr ago", type: "info", read: true },
    { id: 5, title: "Limit Reached", desc: "80% of daily transfer limit used", time: "1 day ago", type: "warning", read: true },
];

const FRAUD_ALERTS = [
    { id: 1, severity: "HIGH", title: "Unusual Login Attempt", desc: "Login from new device in Moscow, Russia", time: "3 hrs ago", status: "active" },
    { id: 2, severity: "MEDIUM", title: "Daily Limit Warning", desc: "80% of daily transfer limit ($4,000) reached", time: "5 hrs ago", status: "active" },
    { id: 3, severity: "LOW", title: "Multiple Failed PINs", desc: "3 failed PIN attempts on card ending 5025", time: "1 day ago", status: "resolved" },
];

const ADMIN_USERS = [
    { id: "USR001", name: "Anita Rose", email: "anita@mail.com", balance: 12840, status: "active" },
    { id: "USR002", name: "Mikey B.", email: "mikey@mail.com", balance: 3450, status: "active" },
    { id: "USR003", name: "Nika S.", email: "nika@mail.com", balance: 890, status: "suspended" },
    { id: "USR004", name: "Tom K.", email: "tom@mail.com", balance: 6720, status: "active" },
];

const D = {
    bg: "#0D0F18", surface: "#141720", surface2: "#1A1D2E", surface3: "#20243A",
    border: "#272B40", text: "#E8E9F5", muted: "#5A5F80",
    accent: "#FF5252", accent2: "#7B68F0",
    green: "#22D47A", red: "#F04444", amber: "#F5A623",
    cardGrad: "linear-gradient(135deg,#FF7A6A 0%,#FF3D3D 55%,#C42828 100%)",
    cardGrad2: "linear-gradient(135deg,#3D33CC 0%,#7B68F0 100%)",
};

const WaveChart = () => (
    <svg viewBox="0 0 480 100" style={{ width: "100%", height: 85 }}>
        <defs>
            <linearGradient id="wf1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF5252" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF5252" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wf2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7B68F0" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#7B68F0" stopOpacity="0" />
            </linearGradient>
        </defs>
        <path d="M0,55 C40,18 80,90 120,46 C160,4 200,76 240,42 C280,8 320,70 360,36 C400,6 440,60 480,46 L480,100 L0,100 Z" fill="url(#wf1)" />
        <path d="M0,55 C40,18 80,90 120,46 C160,4 200,76 240,42 C280,8 320,70 360,36 C400,6 440,60 480,46" fill="none" stroke="#FF5252" strokeWidth="2.5" />
        <path d="M0,68 C40,44 80,86 120,62 C160,30 200,82 240,58 C280,30 320,76 360,52 C400,26 440,68 480,56 L480,100 L0,100 Z" fill="url(#wf2)" />
        <path d="M0,68 C40,44 80,86 120,62 C160,30 200,82 240,58 C280,30 320,76 360,52 C400,26 440,68 480,56" fill="none" stroke="#7B68F0" strokeWidth="2.5" />
        <circle cx="240" cy="42" r="4.5" fill="#7B68F0" stroke="#7B68F030" strokeWidth="7" />
        <rect x="194" y="6" width="96" height="30" rx="8" fill="#1A1D2E" style={{filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.6))"}} />
        <text x="242" y="18" textAnchor="middle" fontSize="7.5" fill="#5A5F80">05.04.20</text>
        <text x="242" y="30" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#E8E9F5">$840.00</text>
    </svg>
);

const DonutRing = ({ pct, color, label, amount }) => {
    const r = 26, c = 32, circ = 2 * Math.PI * r;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
            <svg width="64" height="64" style={{ flexShrink: 0 }}>
                <circle cx={c} cy={c} r={r} fill="none" stroke={D.surface3} strokeWidth="5.5" />
                <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth="5.5"
                        strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="round"
                        transform={`rotate(-90 ${c} ${c})`} />
            </svg>
            <div>
                <div style={{ fontSize: 11, color, marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: D.text }}>{amount}</div>
            </div>
        </div>
    );
};

const BarStat = ({ label, value, max, color }) => (
    <div style={{ marginBottom: 13 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: D.muted, marginBottom: 5 }}>
            <span>{label}</span><span style={{ color: D.text, fontWeight: 600 }}>${value.toLocaleString()}</span>
        </div>
        <div style={{ height: 7, background: D.surface3, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: color, borderRadius: 4 }} />
        </div>
    </div>
);

const CreditCard = ({ gradient, last4, holder, expiry, brand = "VISA", shrink = false }) => (
    <div style={{
        width: "100%", height: shrink ? 160 : 186, borderRadius: 22,
        background: gradient, padding: "20px 24px", color: "white",
        position: "relative", overflow: "hidden",
        boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
        transition: "transform 0.2s",
    }}>
        <div style={{ position: "absolute", top: -28, right: -28, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -36, left: 50, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ display: "flex" }}>
                <div style={{ width: 25, height: 25, borderRadius: "50%", background: "rgba(255,255,255,0.55)" }} />
                <div style={{ width: 25, height: 25, borderRadius: "50%", background: "rgba(255,255,255,0.25)", marginLeft: -9 }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: 1, opacity: 0.9 }}>{brand}</span>
        </div>
        <div style={{ fontSize: shrink ? 15 : 17, fontWeight: 700, letterSpacing: "3px", marginBottom: 18, fontFamily: "monospace" }}>
            •••• •••• •••• {last4}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>Card Holder</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{holder}</div>
            </div>
            <div>
                <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>Valid Thru</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{expiry}</div>
            </div>
        </div>
    </div>
);

export default function DigitalWallet() {
    const [activeNav, setActiveNav] = useState("dashboard");
    const [activeTab, setActiveTab] = useState("summary");
    const [period, setPeriod] = useState("1w");
    const [sendStep, setSendStep] = useState(1);
    const [sendAmt, setSendAmt] = useState("");
    const [sendTo, setSendTo] = useState(null);
    const [sendNote, setSendNote] = useState("");
    const [sendOk, setSendOk] = useState(false);
    const [topAmt, setTopAmt] = useState("");
    const [topOk, setTopOk] = useState(false);
    const [txFilter, setTxFilter] = useState("all");
    const [notifs, setNotifs] = useState(NOTIFICATIONS);
    const [adminTab, setAdminTab] = useState("users");
    const [profEdit, setProfEdit] = useState(false);
    const [profName, setProfName] = useState("Anita Rose");
    const [profEmail, setProfEmail] = useState("anita@mail.com");

    const unread = notifs.filter(n => !n.read).length;
    const avBg = ["#FF6B6B","#4ECDC4","#A78BFA","#F472B6","#34D399","#F59E0B","#7B68F0"];

    const card = (ex = {}) => ({ background: D.surface, borderRadius: 18, padding: 22, marginBottom: 18, boxShadow: "0 4px 28px rgba(0,0,0,0.35)", ...ex });
    const chip = (a) => ({ padding: "7px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: a ? D.accent : D.surface3, color: a ? "white" : D.muted, transition: "all 0.2s", boxShadow: a ? "0 4px 14px rgba(255,82,82,0.35)" : "none" });
    const btn = (v) => ({
        padding: "11px 20px", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, transition: "all 0.2s",
        background: v === "primary" ? D.accent : v === "purple" ? D.accent2 : v === "outline" ? "transparent" : D.surface3,
        color: v === "outline" ? D.muted : "white",
        border: v === "outline" ? `1px solid ${D.border}` : "none",
        boxShadow: v === "primary" ? "0 4px 18px rgba(255,82,82,0.35)" : v === "purple" ? "0 4px 18px rgba(123,104,240,0.35)" : "none",
    });
    const inp = { width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${D.border}`, fontSize: 14, background: D.surface3, color: D.text, outline: "none", boxSizing: "border-box" };
    const txRow = { display: "flex", alignItems: "center", padding: "13px 0", borderBottom: `1px solid ${D.border}` };
    const av = (c, sz = 40) => ({ width: sz, height: sz, borderRadius: Math.round(sz * 0.3), background: c, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: Math.round(sz * 0.36), color: "white", flexShrink: 0 });

    // ─── RIGHT PANEL for Dashboard (cards section, wider) ───────────────────────
    const DashRightPanel = () => (
        <div style={{ width: 440, background: D.surface, borderLeft: `1px solid ${D.border}`, padding: "24px 26px", overflowY: "auto", flexShrink: 0 }}>
            {/* Your Cards */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: D.text }}>Your Cards</span>
                <span style={{ fontSize: 13, color: D.accent, cursor: "pointer", fontWeight: 600 }}>See all ›</span>
            </div>

            {/* Stacked cards — front on top */}
            <div style={{ position: "relative", height: 220, marginBottom: 18 }}>
                {/* Back card (blue) — slightly visible behind */}
                <div style={{ position: "absolute", top: 20, left: 10, right: 10, zIndex: 1, transform: "scale(0.95)", transformOrigin: "bottom center", opacity: 0.85 }}>
                    <CreditCard gradient={D.cardGrad2} last4="1847" holder="Anita Rose" expiry="03/26" brand="MC" shrink />
                </div>
                {/* Front card (red) */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <CreditCard gradient={D.cardGrad} last4="5025" holder="Anita Rose" expiry="09/27" brand="VISA" />
                </div>
            </div>

            {/* Card action buttons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 26 }}>
                <button style={{ ...btn("primary"), flex: 1, fontSize: 13 }}>+ Add Card</button>
                <button style={{ ...btn("outline"), flex: 1, fontSize: 13 }}>Manage Cards</button>
            </div>

            {/* MainDashBoard Summary */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: D.text }}>Wallet Summary</span>
                <span style={{ fontSize: 13, color: D.accent, cursor: "pointer", fontWeight: 600 }}>›</span>
            </div>

            <div style={{ background: D.surface2, borderRadius: 16, padding: 18, marginBottom: 16, display: "flex", gap: 10, alignItems: "center" }}>
                <DonutRing pct={0.55} color={D.accent} label="Outcome" amount="$460.00" />
                <div style={{ width: 1, background: D.border, height: 50, flexShrink: 0 }} />
                <DonutRing pct={1} color={D.accent2} label="Income" amount="$840.00" />
            </div>

            {/* Mini stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                    { icon: "⚡", bg: "#1E1A3A", label: "This Week", val: "3.45k", trend: "+6.4%", up: true },
                    { icon: "↗", bg: "#152215", label: "This Month", val: "$12.9k", trend: "-3.1%", up: false },
                    { icon: "⏱", bg: "#251A15", label: "Upcoming", val: "$14.4k", trend: "+10.3%", up: true },
                ].map(s => (
                    <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: "14px 12px", textAlign: "center", border: `1px solid ${D.border}` }}>
                        <div style={{ fontSize: 18, marginBottom: 7 }}>{s.icon}</div>
                        <div style={{ fontSize: 10, color: D.muted, marginBottom: 4 }}>{s.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: D.text }}>{s.val}</div>
                        <div style={{ fontSize: 10, color: s.up ? D.green : D.red, marginTop: 3 }}>{s.trend}</div>
                    </div>
                ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10 }}>
                <button style={{ ...btn("purple"), flex: 1, fontSize: 13 }}>Request Money</button>
                <button style={{ ...btn("primary"), flex: 1, fontSize: 13 }}>Send Invoice</button>
            </div>
        </div>
    );

    // ─── DASHBOARD ──────────────────────────────────────────────────────────────
    const renderDashboard = () => (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "22px 24px", overflowY: "auto" }}>
                <div style={card()}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 17, fontWeight: 700, color: D.text }}>Income</span>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <span style={{ fontSize: 12, color: D.muted }}>Sort by:</span>
                            <select style={{ fontSize: 13, border: `1px solid ${D.border}`, borderRadius: 8, padding: "4px 10px", background: D.surface3, color: D.text }}>
                                <option>Month</option><option>Week</option><option>Year</option>
                            </select>
                        </div>
                    </div>
                    <WaveChart />
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0 14px", fontSize: 11, color: D.muted }}>
                        {["Apr 01","Apr 02","Apr 03","Apr 04","Apr 05","Apr 06","Apr 07"].map(d => <span key={d}>{d}</span>)}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        {["1d","1w","1m","3m","1y","all"].map(p => <button key={p} style={chip(period === p)} onClick={() => setPeriod(p)}>{p}</button>)}
                    </div>
                </div>

                <div style={card()}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 17, fontWeight: 700, color: D.text }}>Recent Transactions</span>
                        <select style={{ fontSize: 13, border: `1px solid ${D.border}`, borderRadius: 8, padding: "4px 10px", background: D.surface3, color: D.text }}>
                            <option>Month</option><option>Week</option>
                        </select>
                    </div>
                    {TRANSACTIONS.slice(0, 4).map((tx, i) => (
                        <div key={tx.id}>
                            {(i === 0 || TRANSACTIONS[i-1].date !== tx.date) && (
                                <div style={{ fontSize: 11, color: D.muted, padding: "10px 0 4px", letterSpacing: 0.8 }}>{tx.date}</div>
                            )}
                            <div style={txRow}>
                                <div style={av(avBg[i % avBg.length])}>{tx.avatar}</div>
                                <div style={{ flex: 1, marginLeft: 13 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: D.text }}>{tx.name}</div>
                                    <div style={{ fontSize: 12, color: D.muted, marginTop: 2 }}>{tx.sub}</div>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 14, color: tx.type === "credit" ? D.green : D.text }}>
                                    {tx.type === "credit" ? "+" : "−"}${Math.abs(tx.amount).toLocaleString("en",{minimumFractionDigits:2})}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <DashRightPanel />
        </div>
    );

    // ─── WALLET ─────────────────────────────────────────────────────────────────
    const renderWallet = () => (
                            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                                <div style={{ flex: 1, padding: "22px 24px", overflowY: "auto" }}>
                                    <div style={card()}>
                                        <div style={{ fontSize: 13, color: D.muted, marginBottom: 4 }}>Total Balance</div>
                                        <div style={{ fontSize: 44, fontWeight: 900, color: D.text, marginBottom: 6 }}>$12,840.00</div>
                                        <div style={{ fontSize: 13, color: D.green, marginBottom: 22 }}>▲ +$3,200 this month</div>
                                        <div style={{ display: "flex", gap: 10 }}>
                                            <button style={{ ...btn("primary"), flex: 1 }} onClick={() => setActiveNav("send")}>↗ Send</button>
                                            <button style={{ ...btn("purple"), flex: 1 }}>+ Add Money</button>
                                            <button style={{ ...btn("outline"), flex: 1 }}>↙ Request</button>
                                        </div>
                                    </div>
                                    <div style={card()}>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 16 }}>Top-Up Wallet</div>
                                        {topOk ? (
                                            <div style={{ textAlign: "center", padding: "24px 0" }}>
                                                <div style={{ fontSize: 44 }}>✅</div>
                                                <div style={{ fontSize: 18, fontWeight: 700, color: D.green, marginTop: 12 }}>Top-Up Successful!</div>
                                                <div style={{ color: D.muted, marginTop: 6 }}>${topAmt} added</div>
                                                <button style={{ ...btn("primary"), marginTop: 18 }} onClick={() => { setTopOk(false); setTopAmt(""); }}>Done</button>
                                            </div>
                                        ) : (
                                            <>
                                                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                                                    {["50","100","250","500"].map(a => <button key={a} style={chip(topAmt === a)} onClick={() => setTopAmt(a)}>${a}</button>)}
                                                </div>
                                                <input style={inp} placeholder="Custom amount…" value={topAmt} onChange={e => setTopAmt(e.target.value)} />
                                                <button style={{ ...btn("primary"), width: "100%", marginTop: 14 }} onClick={() => topAmt && setTopOk(true)}>Confirm Top-Up {topAmt ? `$${topAmt}` : ""}</button>
                                            </>
                                        )}
                                    </div>
                                    <div style={card()}>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 16 }}>Frequent Recipients</div>
                                        <div style={{ display: "flex", gap: 16 }}>
                                            {RECIPIENTS.map(r => (
                                                <div key={r.name} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => { setSendTo(r); setActiveNav("send"); }}>
                                                    <div style={{ ...av(r.color, 48), margin: "0 auto 8px", borderRadius: 14 }}>{r.avatar}</div>
                                                    <div style={{ fontSize: 12, color: D.muted }}>{r.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: 440, background: D.surface, borderLeft: `1px solid ${D.border}`, padding: 26, overflowY: "auto", flexShrink: 0 }}>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 18 }}>Your Cards</div>
                                    <div style={{ position: "relative", height: 220, marginBottom: 20 }}>
                                        <div style={{ position: "absolute", top: 20, left: 10, right: 10, zIndex: 1, transform: "scale(0.95)", transformOrigin: "bottom center", opacity: 0.85 }}>
                                            <CreditCard gradient={D.cardGrad2} last4="1847" holder="Anita Rose" expiry="03/26" brand="MC" shrink />
                                        </div>
                                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2 }}>
                                            <CreditCard gradient={D.cardGrad} last4="5025" holder="Anita Rose" expiry="09/27" brand="VISA" />
                                        </div>
                                    </div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: D.text, marginBottom: 14, marginTop: 8 }}>Spending Limits</div>
                                    {[{ label: "Daily Transfer", used: 4000, max: 5000 },{ label: "Monthly Spend", used: 12900, max: 20000 }].map(l => (
                                        <div key={l.label} style={{ marginBottom: 14 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                                                <span style={{ color: D.muted }}>{l.label}</span>
                                                <span style={{ color: D.text, fontWeight: 600 }}>${l.used.toLocaleString()} / ${l.max.toLocaleString()}</span>
                        </div>
                        <div style={{ height: 8, background: D.surface3, borderRadius: 4, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${(l.used/l.max)*100}%`, background: l.used/l.max > 0.8 ? D.red : D.accent, borderRadius: 4 }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // ─── SEND MONEY ─────────────────────────────────────────────────────────────
    const renderSend = () => (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "22px 24px", overflowY: "auto" }}>
                <div style={card()}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: D.text, marginBottom: 24 }}>Send Money</div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
                        {["Choose Recipient","Enter Amount","Confirm"].map((label, i) => (
                            <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: sendStep > i ? D.accent : D.surface3, border: sendStep === i+1 ? `2px solid ${D.accent}` : "2px solid transparent", color: sendStep > i ? "white" : sendStep === i+1 ? D.accent : D.muted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{sendStep > i ? "✓" : i+1}</div>
                                    <div style={{ fontSize: 11, color: sendStep === i+1 ? D.accent : D.muted, marginTop: 5, whiteSpace: "nowrap" }}>{label}</div>
                                </div>
                                {i < 2 && <div style={{ flex: 1, height: 2, background: sendStep > i+1 ? D.accent : D.border, margin: "0 4px", marginBottom: 16 }} />}
                            </div>
                        ))}
                    </div>
                    {sendOk ? (
                        <div style={{ textAlign: "center", padding: "32px 0" }}>
                            <div style={{ fontSize: 54, marginBottom: 14 }}>🎉</div>
                            <div style={{ fontSize: 22, fontWeight: 700, color: D.green }}>Transfer Successful!</div>
                            <div style={{ color: D.muted, marginTop: 8 }}>${sendAmt} sent to {sendTo?.name}</div>
                            <button style={{ ...btn("primary"), marginTop: 20 }} onClick={() => { setSendOk(false); setSendStep(1); setSendAmt(""); setSendTo(null); setSendNote(""); }}>New Transfer</button>
                        </div>
                    ) : sendStep === 1 ? (
                        <>
                            <input style={{ ...inp, marginBottom: 16 }} placeholder="Search name or wallet ID…" />
                            <div style={{ fontSize: 13, color: D.muted, marginBottom: 12 }}>Quick Select</div>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                                {RECIPIENTS.map(r => (
                                    <div key={r.name} onClick={() => setSendTo(r)} style={{ textAlign: "center", cursor: "pointer", padding: "12px 16px", borderRadius: 14, background: sendTo?.name === r.name ? D.surface3 : D.surface2, border: `2px solid ${sendTo?.name === r.name ? D.accent : D.border}`, transition: "all 0.2s" }}>
                                        <div style={{ ...av(r.color, 46), margin: "0 auto 8px", borderRadius: 14 }}>{r.avatar}</div>
                                        <div style={{ fontSize: 12, color: D.muted }}>{r.name}</div>
                                    </div>
                                ))}
                            </div>
                            <button style={{ ...btn("primary"), width: "100%" }} onClick={() => sendTo && setSendStep(2)}>Continue →</button>
                        </>
                    ) : sendStep === 2 ? (
                        <>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, background: D.surface2, borderRadius: 14, padding: 16, marginBottom: 18 }}>
                                <div style={{ ...av(sendTo?.color, 46), borderRadius: 14 }}>{sendTo?.avatar}</div>
                                <div><div style={{ fontWeight: 700, color: D.text }}>{sendTo?.name}</div><div style={{ fontSize: 12, color: D.muted }}>@{sendTo?.name?.toLowerCase()}</div></div>
                            </div>
                            <input style={{ ...inp, fontSize: 26, fontWeight: 800, marginBottom: 12 }} placeholder="$0.00" value={sendAmt} onChange={e => setSendAmt(e.target.value)} />
                            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                                {["50","100","250","500"].map(a => <button key={a} style={chip(sendAmt === a)} onClick={() => setSendAmt(a)}>${a}</button>)}
                            </div>
                            <input style={{ ...inp, marginBottom: 16 }} placeholder="Add a note…" value={sendNote} onChange={e => setSendNote(e.target.value)} />
                            <div style={{ display: "flex", gap: 10 }}>
                                <button style={{ ...btn("outline"), flex: 1 }} onClick={() => setSendStep(1)}>← Back</button>
                                <button style={{ ...btn("primary"), flex: 2 }} onClick={() => sendAmt && setSendStep(3)}>Review →</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ background: D.surface2, borderRadius: 16, padding: 20, marginBottom: 18 }}>
                                {[["To", sendTo?.name],["Amount",`$${sendAmt}`],["Fee","$0.00"],["Note",sendNote||"—"],["Total",`$${sendAmt}`]].map(([k,v]) => (
                                    <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 11, fontSize: 14 }}>
                                        <span style={{ color: D.muted }}>{k}</span>
                                        <span style={{ fontWeight: k==="Total"?800:600, color: k==="Total"?D.accent:D.text }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", gap: 10 }}>
                                <button style={{ ...btn("outline"), flex: 1 }} onClick={() => setSendStep(2)}>← Edit</button>
                                <button style={{ ...btn("primary"), flex: 2 }} onClick={() => setSendOk(true)}>✓ Confirm & Send</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div style={{ width: 360, background: D.surface, borderLeft: `1px solid ${D.border}`, padding: 24, overflowY: "auto" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 16 }}>Recent Transfers</div>
                {TRANSACTIONS.filter(t => t.type === "debit").map((tx, i) => (
                    <div key={tx.id} style={txRow}>
                        <div style={av(avBg[i], 38)}>{tx.avatar}</div>
                        <div style={{ flex: 1, marginLeft: 12 }}><div style={{ fontSize: 13, fontWeight: 600, color: D.text }}>{tx.name}</div><div style={{ fontSize: 11, color: D.muted }}>{tx.sub}</div></div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: D.text }}>−${Math.abs(tx.amount).toLocaleString("en",{minimumFractionDigits:2})}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    // ─── TRANSACTIONS ────────────────────────────────────────────────────────────
    const renderTransactions = () => {
        const filtered = txFilter === "all" ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === txFilter);
        return (
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                <div style={{ flex: 1, padding: "22px 24px", overflowY: "auto" }}>
                    <div style={card()}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <span style={{ fontSize: 17, fontWeight: 700, color: D.text }}>Transaction History</span>
                            <button style={{ ...btn("primary"), padding: "8px 16px", fontSize: 12 }}>↓ Export CSV</button>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                            {["all","credit","debit"].map(f => <button key={f} style={chip(txFilter === f)} onClick={() => setTxFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
                        </div>
                        {filtered.map((tx, i) => (
                            <div key={tx.id}>
                                {(i === 0 || filtered[i-1]?.date !== tx.date) && <div style={{ fontSize: 11, color: D.muted, padding: "10px 0 4px" }}>{tx.date}</div>}
                                <div style={txRow}>
                                    <div style={{ width: 38, height: 38, borderRadius: 11, background: tx.type==="credit"?"#152215":"#251515", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, color: tx.type==="credit"?D.green:D.accent }}>{tx.type==="credit"?"+":"−"}</div>
                                    <div style={{ flex: 1, marginLeft: 12 }}><div style={{ fontSize: 14, fontWeight: 600, color: D.text }}>{tx.name}</div><div style={{ fontSize: 12, color: D.muted }}>{tx.sub}</div></div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontWeight: 700, color: tx.type==="credit"?D.green:D.text }}>{tx.type==="credit"?"+":"−"}${Math.abs(tx.amount).toLocaleString("en",{minimumFractionDigits:2})}</div>
                                        <div style={{ fontSize: 11, color: D.muted, marginTop: 2 }}>Completed</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ width: 300, background: D.surface, borderLeft: `1px solid ${D.border}`, padding: 24, overflowY: "auto" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 14 }}>Summary</div>
                    <div style={{ background: "#152215", borderRadius: 14, padding: 16, marginBottom: 12 }}>
                        <div style={{ fontSize: 12, color: D.green }}>Total Income</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: D.green }}>+$16,040.00</div>
                    </div>
                    <div style={{ background: "#251515", borderRadius: 14, padding: 16, marginBottom: 22 }}>
                        <div style={{ fontSize: 12, color: D.red }}>Total Expenses</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: D.red }}>-$2,300.98</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: D.text, marginBottom: 12 }}>Export</div>
                    {["CSV","PDF","Excel"].map(f => <button key={f} style={{ ...btn("outline"), width: "100%", marginBottom: 8, textAlign: "left" }}>↓ Download {f}</button>)}
                </div>
            </div>
        );
    };

    // ─── ANALYTICS ──────────────────────────────────────────────────────────────
    const renderAnalytics = () => (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "22px 24px", overflowY: "auto" }}>
                <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
                    {[{label:"Total Volume",val:"$28.9k",change:"+12.4%",up:true,bg:"#181528"},{label:"Transactions",val:"142",change:"+8.2%",up:true,bg:"#1B1528"},{label:"Avg. Transfer",val:"$203",change:"-2.1%",up:false,bg:"#251515"}].map(c => (
                        <div key={c.label} style={{ flex: 1, background: c.bg, borderRadius: 16, padding: 18, border: `1px solid ${D.border}` }}>
                            <div style={{ fontSize: 12, color: D.muted }}>{c.label}</div>
                            <div style={{ fontSize: 26, fontWeight: 900, color: D.text, margin: "6px 0 4px" }}>{c.val}</div>
                            <div style={{ fontSize: 12, color: c.up ? D.green : D.red }}>{c.change} vs last month</div>
                        </div>
                    ))}
                </div>
                <div style={card()}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: D.text, marginBottom: 14 }}>Transaction Trends</div>
                    <WaveChart />
                    <div style={{ marginTop: 20 }}>
                        <BarStat label="Food & Dining" value={1250} max={15000} color={D.accent} />
                        <BarStat label="Salary & Income" value={12840} max={15000} color={D.green} />
                        <BarStat label="Shopping" value={2300} max={15000} color="#A78BFA" />
                        <BarStat label="Bills & Utilities" value={800} max={15000} color={D.accent2} />
                        <BarStat label="Transfers Sent" value={3500} max={15000} color={D.amber} />
                    </div>
                </div>
            </div>
            <div style={{ width: 300, background: D.surface, borderLeft: `1px solid ${D.border}`, padding: 24, overflowY: "auto" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 16 }}>Category Breakdown</div>
                {[["🍔 Food","$1,250",D.accent],["💼 Salary","$12,840",D.green],["🛒 Shopping","$2,300","#A78BFA"],["💡 Bills","$800",D.accent2]].map(([cat,amt,color]) => (
                    <div key={cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} /><span style={{ fontSize: 14, color: D.muted }}>{cat}</span></div>
                        <span style={{ fontWeight: 700, color: D.text }}>{amt}</span>
                    </div>
                ))}
                <button style={{ ...btn("primary"), width: "100%", marginTop: 10, fontSize: 13 }}>↓ Download Report</button>
            </div>
        </div>
    );

    // ─── NOTIFICATIONS ──────────────────────────────────────────────────────────
    const renderNotifications = () => (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "22px 24px", overflowY: "auto" }}>
                <div style={card()}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <span style={{ fontSize: 17, fontWeight: 700, color: D.text }}>Notifications</span>
                        <button style={{ fontSize: 12, color: D.accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }} onClick={() => setNotifs(notifs.map(n => ({...n, read: true})))}>Mark all read</button>
                    </div>
                    {notifs.map(n => (
                        <div key={n.id} onClick={() => setNotifs(notifs.map(x => x.id===n.id?{...x,read:true}:x))} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: `1px solid ${D.border}`, opacity: n.read ? 0.45 : 1, cursor: "pointer" }}>
                            <div style={{ width: 42, height: 42, borderRadius: 13, background: D.surface3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                                {n.type==="success"?"✅":n.type==="alert"?"🚨":n.type==="credit"?"💰":n.type==="warning"?"⚠️":"ℹ️"}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontWeight: n.read?500:700, fontSize: 14, color: D.text }}>{n.title}</span>
                                    {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: D.accent, marginTop: 5 }} />}
                                </div>
                                <div style={{ fontSize: 13, color: D.muted, marginTop: 2 }}>{n.desc}</div>
                                <div style={{ fontSize: 11, color: D.muted, marginTop: 4 }}>{n.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ width: 300, background: D.surface, borderLeft: `1px solid ${D.border}`, padding: 24, overflowY: "auto" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 16 }}>Settings</div>
                {[["Transfer Alerts",true],["Login Activity",true],["Fraud Alerts",true],["Promotions",false],["Monthly Reports",true]].map(([label,on]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: `1px solid ${D.border}` }}>
                        <span style={{ fontSize: 14, color: D.text }}>{label}</span>
                        <div style={{ width: 46, height: 26, borderRadius: 13, background: on ? D.accent : D.surface3, cursor: "pointer", position: "relative" }}>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.2s" }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // ─── ADMIN ──────────────────────────────────────────────────────────────────
    const renderAdmin = () => (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "22px 24px", overflowY: "auto" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                    {["users","transactions"].map(t => <button key={t} style={chip(adminTab===t)} onClick={() => setAdminTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
                </div>
                <div style={card()}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: D.text, marginBottom: 16 }}>{adminTab==="users"?"User Management":"All Transactions"}</div>
                    {adminTab==="users" ? (
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead><tr style={{ borderBottom: `2px solid ${D.border}` }}>
                                {["ID","Name","Email","Balance","Status","Action"].map(h => <th key={h} style={{ textAlign: "left", padding: "8px 10px", color: D.muted, fontWeight: 600 }}>{h}</th>)}
                            </tr></thead>
                            <tbody>{ADMIN_USERS.map(u => (
                                <tr key={u.id} style={{ borderBottom: `1px solid ${D.border}` }}>
                                    <td style={{ padding: "12px 10px", color: D.muted }}>{u.id}</td>
                                    <td style={{ padding: "12px 10px", fontWeight: 600, color: D.text }}>{u.name}</td>
                                    <td style={{ padding: "12px 10px", color: D.muted }}>{u.email}</td>
                                    <td style={{ padding: "12px 10px", fontWeight: 600, color: D.text }}>${u.balance.toLocaleString()}</td>
                                    <td style={{ padding: "12px 10px" }}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: u.status==="active"?"#152215":"#251515", color: u.status==="active"?D.green:D.red }}>{u.status}</span></td>
                                    <td style={{ padding: "12px 10px" }}><button style={{ fontSize: 11, color: D.accent, background: "none", border: `1px solid ${D.border}`, borderRadius: 6, padding: "3px 10px", cursor: "pointer" }}>Manage</button></td>
                                </tr>
                            ))}</tbody>
                        </table>
                    ) : TRANSACTIONS.map((tx,i) => (
                        <div key={tx.id} style={txRow}>
                            <div style={av(avBg[i%avBg.length],38)}>{tx.avatar}</div>
                            <div style={{ flex: 1, marginLeft: 12 }}><div style={{ fontSize: 13, fontWeight: 600, color: D.text }}>{tx.name}</div><div style={{ fontSize: 11, color: D.muted }}>{tx.date}</div></div>
                            <div style={{ fontWeight: 700, color: tx.type==="credit"?D.green:D.text }}>{tx.type==="credit"?"+":"−"}${Math.abs(tx.amount).toLocaleString("en",{minimumFractionDigits:2})}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ width: 280, background: D.surface, borderLeft: `1px solid ${D.border}`, padding: 24, overflowY: "auto" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 14 }}>Platform Stats</div>
                {[{label:"Total Users",val:"1,284",bg:"#181528",color:D.accent2},{label:"Active Today",val:"342",bg:"#152215",color:D.green},{label:"Suspended",val:"12",bg:"#251515",color:D.red},{label:"Total Volume",val:"$2.4M",bg:"#201A10",color:D.amber}].map(s => (
                    <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
                        <div style={{ fontSize: 12, color: D.muted }}>{s.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    // ─── FRAUD ──────────────────────────────────────────────────────────────────
    const renderFraud = () => (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "22px 24px", overflowY: "auto" }}>
                <div style={card()}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: D.text, marginBottom: 16 }}>Fraud & Security Alerts</div>
                    {FRAUD_ALERTS.map(a => (
                        <div key={a.id} style={{ background: D.surface2, borderRadius: 14, padding: 18, marginBottom: 12, borderLeft: `4px solid ${a.severity==="HIGH"?D.red:a.severity==="MEDIUM"?D.amber:D.accent2}` }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: a.severity==="HIGH"?"#251515":a.severity==="MEDIUM"?"#201A10":"#181528", color: a.severity==="HIGH"?D.red:a.severity==="MEDIUM"?D.amber:D.accent2 }}>{a.severity}</span>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: D.text }}>{a.title}</span>
                                    </div>
                                    <div style={{ fontSize: 13, color: D.muted }}>{a.desc}</div>
                                    <div style={{ fontSize: 11, color: D.muted, marginTop: 6 }}>{a.time}</div>
                                </div>
                                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: a.status==="active"?"#152215":D.surface3, color: a.status==="active"?D.green:D.muted, height: "fit-content" }}>{a.status}</span>
                            </div>
                            {a.status==="active" && (
                                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                                    <button style={{ ...btn("primary"), padding: "7px 14px", fontSize: 12 }}>Resolve</button>
                                    <button style={{ ...btn("outline"), padding: "7px 14px", fontSize: 12 }}>Investigate</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ width: 280, background: D.surface, borderLeft: `1px solid ${D.border}`, padding: 24, overflowY: "auto" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 14 }}>Security Rules</div>
                {[["Daily Transfer Limit","$5,000"],["Single Transfer Max","$2,000"],["Failed PIN Lock","3 attempts"],["New Device Verify","Required"]].map(([rule,val]) => (
                    <div key={rule} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${D.border}` }}>
                        <span style={{ fontSize: 13, color: D.muted }}>{rule}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: D.text }}>{val}</span>
                    </div>
                ))}
                <button style={{ ...btn("primary"), width: "100%", marginTop: 16, fontSize: 13 }}>Edit Rules</button>
            </div>
        </div>
    );

    // ─── SETTINGS ───────────────────────────────────────────────────────────────
    const renderSettings = () => (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "22px 24px", overflowY: "auto" }}>
                <div style={card()}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: D.text, marginBottom: 18 }}>Profile & Settings</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, background: D.surface2, borderRadius: 14, padding: 16, marginBottom: 22 }}>
                        <div style={{ width: 60, height: 60, borderRadius: 18, background: D.cardGrad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "white", fontWeight: 700 }}>A</div>
                        <div><div style={{ fontSize: 18, fontWeight: 700, color: D.text }}>{profName}</div><div style={{ fontSize: 13, color: D.muted }}>{profEmail}</div></div>
                        <button style={{ ...btn("primary"), marginLeft: "auto", padding: "8px 16px", fontSize: 12 }} onClick={() => setProfEdit(!profEdit)}>{profEdit?"Save":"Edit"}</button>
                    </div>
                    {profEdit && (
                        <div style={{ marginBottom: 22 }}>
                            <label style={{ fontSize: 13, color: D.muted, marginBottom: 6, display: "block" }}>Full Name</label>
                            <input style={{ ...inp, marginBottom: 12 }} value={profName} onChange={e => setProfName(e.target.value)} />
                            <label style={{ fontSize: 13, color: D.muted, marginBottom: 6, display: "block" }}>Email</label>
                            <input style={inp} value={profEmail} onChange={e => setProfEmail(e.target.value)} />
                        </div>
                    )}
                    <div style={{ fontSize: 15, fontWeight: 700, color: D.text, marginBottom: 14 }}>Security</div>
                    {[["Change Password","Last changed 30 days ago"],["Two-Factor Auth","Enabled via SMS"],["Biometric Login","Active on this device"]].map(([t,sub]) => (
                        <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${D.border}` }}>
                            <div><div style={{ fontSize: 14, color: D.text }}>{t}</div><div style={{ fontSize: 12, color: D.muted, marginTop: 2 }}>{sub}</div></div>
                            <button style={{ fontSize: 12, color: D.accent, background: "none", border: `1px solid ${D.border}`, borderRadius: 8, padding: "5px 12px", cursor: "pointer" }}>Manage</button>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ width: 280, background: D.surface, borderLeft: `1px solid ${D.border}`, padding: 24, overflowY: "auto" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 14 }}>Preferences</div>
                {[["Currency","USD ($)"],["Language","English"],["Timezone","UTC-5 (EST)"],["Theme","Dark Mode"]].map(([pref,val]) => (
                    <div key={pref} style={{ display: "flex", justifyContent: "space-between", padding: "13px 0", borderBottom: `1px solid ${D.border}` }}>
                        <span style={{ fontSize: 13, color: D.muted }}>{pref}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: D.accent, cursor: "pointer" }}>{val} ›</span>
                    </div>
                ))}
                <button style={{ ...btn("outline"), width: "100%", marginTop: 20, color: D.red }}>Sign Out</button>
            </div>
        </div>
    );

    const pageContent = () => {
        switch(activeNav) {
            case "dashboard": return renderDashboard();
            case "wallet": return renderWallet();
            case "send": return renderSend();
            case "transactions": return renderTransactions();
            case "analytics": return renderAnalytics();
            case "cards": return renderDashboard();
            case "notifications": return renderNotifications();
            case "admin": return renderAdmin();
            case "fraud": return renderFraud();
            case "settings": return renderSettings();
            default: return renderDashboard();
        }
    };

    const pageLabel = NAV_ITEMS.find(n => n.id === activeNav)?.label || "Dashboard";

    return (
        <div style={{ display: "flex", height: "100vh", background: D.bg, fontFamily: "'DM Sans', system-ui, sans-serif", overflow: "hidden", color: D.text }}>

            {/* ── Sidebar ── */}
            <div style={{ width: 64, background: D.surface, display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 0", gap: 4, borderRight: `1px solid ${D.border}`, flexShrink: 0 }}>
                <div style={{ width: 38, height: 38, background: D.cardGrad, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20, fontWeight: 900, marginBottom: 16, boxShadow: "0 4px 20px rgba(255,82,82,0.4)" }}>▲</div>
                {NAV_ITEMS.map(item => (
                    <div key={item.id} style={{ position: "relative" }} title={item.label}>
                        {activeNav === item.id && <div style={{ position: "absolute", left: -10, top: "50%", transform: "translateY(-50%)", width: 4, height: 24, borderRadius: 2, background: D.accent }} />}
                        <button onClick={() => setActiveNav(item.id)} style={{ width: 42, height: 42, borderRadius: 13, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, background: activeNav===item.id ? D.accent : "transparent", color: activeNav===item.id ? "white" : D.muted, boxShadow: activeNav===item.id ? "0 4px 14px rgba(255,82,82,0.4)" : "none", transition: "all 0.2s" }}>
                            {item.icon}
                        </button>
                        {item.id==="notifications" && unread>0 && <div style={{ position: "absolute", top: -1, right: -1, width: 16, height: 16, borderRadius: "50%", background: D.red, color: "white", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{unread}</div>}
                    </div>
                ))}
                <div style={{ marginTop: "auto" }}>
                    <button style={{ width: 42, height: 42, borderRadius: 13, border: "none", cursor: "pointer", background: "transparent", color: D.muted, fontSize: 17 }}>⏻</button>
                </div>
            </div>

            {/* ── Main ── */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Top bar */}
                <div style={{ height: 58, background: D.surface, borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", flexShrink: 0 }}>
                    <div style={{ display: "flex", gap: 26 }}>
                        {(activeNav==="dashboard"||activeNav==="cards") ? TOP_NAV.map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: activeTab===tab?D.text:D.muted, fontWeight: activeTab===tab?700:400, padding: "18px 0", borderBottom: activeTab===tab?`2px solid ${D.accent}`:"2px solid transparent", transition: "all 0.2s", textTransform: "capitalize" }}>{tab}</button>
                        )) : (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 13, color: D.muted }}>Dashboard</span>
                                <span style={{ color: D.border }}>›</span>
                                <span style={{ fontSize: 14, fontWeight: 700, color: D.text }}>{pageLabel}</span>
                            </div>
                        )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: D.muted, fontSize: 18 }}>⌕</button>
                        <button onClick={() => setActiveNav("notifications")} style={{ background: "none", border: "none", cursor: "pointer", color: D.muted, fontSize: 17, position: "relative" }}>
                            🔔
                            {unread > 0 && <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: D.red }} />}
                        </button>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: D.cardGrad, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, cursor: "pointer", fontSize: 15 }}>A</div>
                    </div>
                </div>

                {pageContent()}
            </div>
        </div>
    );
}