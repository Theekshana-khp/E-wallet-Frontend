import React, { useState } from "react";
import "../../../style/wallet/pages/sendMoney.css";

const contacts = [
    { initials: "KP", name: "Kamal", bg: "#1e3a5f", color: "#60a5fa" },
    { initials: "NA", name: "Nimal", bg: "#1e3a2f", color: "#34d399" },
    { initials: "SB", name: "Saman", bg: "#3a1e3a", color: "#c084fc" },
    { initials: "RP", name: "Roshan", bg: "#3a2a1e", color: "#fb923c" },
    { initials: "DK", name: "Dilshan", bg: "#1e2a3a", color: "#38bdf8" }
];

const scheduledData = [
    { id: 1, name: "Electricity Bill", account: "LKB Power", amount: 8500, date: "Jun 5, 2026", repeat: "Monthly", icon: "⚡", color: "#fbbf24" },
    { id: 2, name: "Kamal Perera", account: "ACC-20045", amount: 5000, date: "Jun 1, 2026", repeat: "One-time", icon: "👤", color: "#a5b4fc" },
    { id: 3, name: "Loan Installment", account: "Bank of Ceylon", amount: 12000, date: "Jun 10, 2026", repeat: "Monthly", icon: "🏦", color: "#a5b4fc" },
    { id: 4, name: "Internet Bill", account: "SLT Mobitel", amount: 2990, date: "Jun 8, 2026", repeat: "Monthly", icon: "📡", color: "#fbbf24" }
];

export default function SendMoney() {
    const [activeTab, setActiveTab] = useState("New Transactions");
    const [selectedContact, setSelectedContact] = useState(null);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [schedule, setSchedule] = useState("now");
    const [showSuccess, setShowSuccess] = useState(false);
    const [pin, setPin] = useState(true);
    const [notifToggle, setNotifToggle] = useState(true);
    const [limitToggle, setLimitToggle] = useState(true);
    const [schedList, setSchedList] = useState(scheduledData);
    const [showNewSched, setShowNewSched] = useState(false);
    const [newSched, setNewSched] = useState({ name: "", amount: "", date: "", repeat: "Once" });

    const formatted = Number(amount || 0).toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const selectContact = (c) => {
        setSelectedContact(c.initials);
        setRecipient(`${c.name} · saved contact`);
    };

    const confirmSend = () => {
        if (!amount) return;
        setShowSuccess(true);
        setAmount("");
        setRecipient("");
        setSelectedContact(null);
        setNote("");
    };

    const addScheduled = () => {
        if (!newSched.name || !newSched.amount) return;
        setSchedList([...schedList, {
            id: Date.now(),
            name: newSched.name,
            account: "—",
            amount: parseFloat(newSched.amount),
            date: newSched.date || "—",
            repeat: newSched.repeat,
            icon: "👤",
            color: "#a5b4fc"
        }]);
        setNewSched({ name: "", amount: "", date: "", repeat: "Once" });
        setShowNewSched(false);
    };

    const deleteScheduled = (id) => {
        setSchedList(schedList.filter(s => s.id !== id));
    };

    return (
        <>
            <div className="sm-content">
                <div className="sm-panel" style={{overflow: "auto" , maxHeight: "calc(100vh - 50px)"}}>
                    <div className="sm-tabs">
                        {["New Transactions", "Scheduled Transactions"].map((tab) => (
                            <div
                                key={tab}
                                className={`sm-tab ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>

                    {activeTab === "New Transactions" && (
                        <div className="sm-form-area">
                            <p className="sm-section-title">Recent contacts</p>
                            <div className="sm-contacts-row">
                                {contacts.map((c) => (
                                    <div
                                        key={c.initials}
                                        className={`sm-contact-chip ${selectedContact === c.initials ? "selected" : ""}`}
                                        onClick={() => selectContact(c)}
                                    >
                                        <div className="sm-contact-avatar" style={{ background: c.bg, color: c.color }}>
                                            {c.initials}
                                        </div>
                                        <span className="sm-contact-name">{c.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="sm-form-group">
                                <label>Recipient</label>
                                <input
                                    className="sm-input"
                                    placeholder="Account number or mobile"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                />
                            </div>

                            <div className="sm-form-group">
                                <label>Amount</label>
                                <div className="sm-currency-row">
                                    <div className="sm-currency-badge">LKR</div>
                                    <input
                                        className="sm-amount-input"
                                        type="number"
                                        value={amount}
                                        placeholder="0.00"
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                <div className="sm-quick-amounts">
                                    {[1000, 5000, 10000, 25000, 50000].map((v) => (
                                        <div key={v} className="sm-quick-btn" onClick={() => setAmount(v)}>
                                            {v.toLocaleString()}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sm-form-group">
                                <label>Note (optional)</label>
                                <input
                                    className="sm-input"
                                    placeholder="What's this for?"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>

                            <div className="sm-two-col">
                                <div className={`sm-schedule-box ${schedule === "now" ? "selected" : ""}`} onClick={() => setSchedule("now")}>
                                    <span className="sm-sched-icon">⚡</span>
                                    <div>
                                        <div className="sm-sched-label">Send now</div>
                                        <div className="sm-sched-sub">Instant</div>
                                    </div>
                                </div>
                                <div className={`sm-schedule-box ${schedule === "later" ? "selected" : ""}`} onClick={() => setSchedule("later")}>
                                    <span className="sm-sched-icon">📅</span>
                                    <div>
                                        <div className="sm-sched-label">Schedule</div>
                                        <div className="sm-sched-sub">Set date</div>
                                    </div>
                                </div>
                            </div>

                            {schedule === "later" && (
                                <div className="sm-form-group">
                                    <label>Transfer date</label>
                                    <input type="date" className="sm-input" />
                                </div>
                            )}

                            <div className="sm-summary-card">
                                <div className="sm-fee-row">
                                    <span>Transfer amount</span>
                                    <span>LKR {formatted}</span>
                                </div>
                                <div className="sm-fee-row">
                                    <span>Service fee</span>
                                    <span className="sm-free">Free</span>
                                </div>
                                <div className="sm-fee-row total">
                                    <span>Total deducted</span>
                                    <span>LKR {formatted}</span>
                                </div>
                            </div>

                            <div className="sm-toggle-row">
                                <span className="sm-toggle-label">Require PIN confirmation</span>
                                <div className={`sm-toggle ${pin ? "on" : ""}`} onClick={() => setPin(!pin)} />
                            </div>

                            <button className="sm-send-btn" onClick={confirmSend}>
                                Send Money
                            </button>
                        </div>
                    )}

                    {activeTab === "Scheduled Transactions" && (
                        <div className="sm-form-area">
                            <div className="sm-sched-header">
                                <p className="sm-section-title" style={{ margin: 0 }}>Upcoming transfers</p>
                                <button className="sm-new-btn" onClick={() => setShowNewSched(!showNewSched)}>
                                    + New
                                </button>
                            </div>

                            {showNewSched && (
                                <div className="sm-new-sched-form">
                                    <div className="sm-form-group">
                                        <label>Recipient</label>
                                        <input
                                            className="sm-input"
                                            placeholder="Name or account"
                                            value={newSched.name}
                                            onChange={(e) => setNewSched({ ...newSched, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="sm-two-col-inputs">
                                        <div className="sm-form-group">
                                            <label>Amount (LKR)</label>
                                            <input
                                                className="sm-input"
                                                type="number"
                                                placeholder="0.00"
                                                value={newSched.amount}
                                                onChange={(e) => setNewSched({ ...newSched, amount: e.target.value })}
                                            />
                                        </div>
                                        <div className="sm-form-group">
                                            <label>Date</label>
                                            <input
                                                className="sm-input"
                                                type="date"
                                                value={newSched.date}
                                                onChange={(e) => setNewSched({ ...newSched, date: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm-form-group">
                                        <label>Repeat</label>
                                        <select
                                            className="sm-input sm-select"
                                            value={newSched.repeat}
                                            onChange={(e) => setNewSched({ ...newSched, repeat: e.target.value })}
                                        >
                                            <option>Once</option>
                                            <option>Weekly</option>
                                            <option>Monthly</option>
                                        </select>
                                    </div>
                                    <div className="sm-new-sched-actions">
                                        <button className="sm-send-btn sm-send-btn--small" onClick={addScheduled}>Save</button>
                                        <button className="sm-cancel-btn" onClick={() => setShowNewSched(false)}>Cancel</button>
                                    </div>
                                </div>
                            )}

                            <div className="sm-sched-list">
                                {schedList.map((s) => (
                                    <div key={s.id} className="sm-sched-card">
                                        <div className="sm-sched-card-icon">{s.icon}</div>
                                        <div className="sm-sched-card-info">
                                            <div className="sm-sched-card-name">{s.name}</div>
                                            <div className="sm-sched-card-meta">
                                                <span className="sm-repeat-badge">{s.repeat}</span>
                                                {s.date}
                                            </div>
                                        </div>
                                        <div className="sm-sched-card-right">
                                            <div className="sm-sched-card-amount" style={{ color: s.color }}>
                                                LKR {s.amount.toLocaleString("en", { minimumFractionDigits: 2 })}
                                            </div>
                                            <span className="sm-upcoming-badge">Upcoming</span>
                                        </div>
                                        <button className="sm-delete-btn" onClick={() => deleteScheduled(s.id)}>✕</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="sm-right">
                    <p className="sm-section-title">Account</p>
                    <div className="sm-account-card">
                        <div className="sm-account-label">Available balance</div>
                        <div className="sm-account-balance">LKR 74,470.00</div>
                        <div className="sm-account-number">ACC100001 · Ambalangoda</div>
                    </div>

                    <div className="sm-stats-grid">
                        <div className="sm-stat-card">
                            <div className="sm-stat-lbl">Sent (May)</div>
                            <div className="sm-stat-val">LKR 14.4k</div>
                            <div className="sm-stat-up">▲ 10.3%</div>
                        </div>
                        <div className="sm-stat-card">
                            <div className="sm-stat-lbl">This week</div>
                            <div className="sm-stat-val">LKR 3.45k</div>
                            <div className="sm-stat-down">▼ 6.4%</div>
                        </div>
                    </div>

                    <p className="sm-section-title" style={{ marginTop: "20px" }}>Recent transfers</p>

                    {[
                        { initials: "KP", name: "Kamal Perera", date: "May 10, 2026", amount: "-LKR 2,200", type: "red", bg: "#1e3a5f", color: "#60a5fa" },
                        { initials: "NA", name: "Nimal Abeynayake", date: "May 10, 2026", amount: "-LKR 5,000", type: "red", bg: "#1e3a2f", color: "#34d399" },
                        { initials: "RP", name: "Roshan Perera", date: "May 8, 2026", amount: "+LKR 20,000", type: "green", bg: "#3a2a1e", color: "#fb923c" }
                    ].map((r) => (
                        <div key={r.initials} className="sm-recent-item">
                            <div className="sm-r-avatar" style={{ background: r.bg, color: r.color }}>{r.initials}</div>
                            <div className="sm-r-info">
                                <div className="sm-r-name">{r.name}</div>
                                <div className="sm-r-date">{r.date}</div>
                            </div>
                            <div className={`sm-r-amount ${r.type}`}>{r.amount}</div>
                        </div>
                    ))}

                    <p className="sm-section-title" style={{ marginTop: "20px" }}>Preferences</p>

                    <div className="sm-toggle-row">
                        <div>
                            <div className="sm-toggle-label">Transfer notifications</div>
                            <div className="sm-toggle-sub">Alert on every transfer</div>
                        </div>
                        <div className={`sm-toggle ${notifToggle ? "on" : ""}`} onClick={() => setNotifToggle(!notifToggle)} />
                    </div>
                    <div className="sm-toggle-row no-border">
                        <div>
                            <div className="sm-toggle-label">Daily limit alerts</div>
                            <div className="sm-toggle-sub">Warn at 80% of limit</div>
                        </div>
                        <div className={`sm-toggle ${limitToggle ? "on" : ""}`} onClick={() => setLimitToggle(!limitToggle)} />
                    </div>
                </div>
            </div>

            {showSuccess && (
                <div className="sm-success-overlay">
                    <div className="sm-success-icon">✓</div>
                    <div className="sm-success-title">Transfer Successful!</div>
                    <div className="sm-success-sub">Your money is on its way.</div>
                    <button className="sm-done-btn" onClick={() => setShowSuccess(false)}>Done</button>
                </div>
            )}
        </>
    );
}
