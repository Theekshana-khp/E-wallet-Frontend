import React, { useState } from "react";
import "../../../style/wallet/pages/wallet.css";
import CreditCard from "../../../components/creditCard/creditCard";

const RECIPIENTS = [
    { name: "Mikey", avatar: "M", color: "#FF6B6B" },
    { name: "Nika", avatar: "N", color: "#4ADE80" },
    { name: "Sam", avatar: "S", color: "#A78BFA" },
    { name: "Jade", avatar: "J", color: "#F472B6" },
    { name: "Tom", avatar: "T", color: "#34D399" },
];

function Wallet() {
    const [topAmt, setTopAmt] = useState("");
    const [topOk, setTopOk] = useState(false);
    const [ setSelectedRecipient] = useState(null);

    const limits = [
        { label: "Daily Transfer", used: 4000, max: 5000 },
        { label: "Monthly Spend", used: 12900, max: 20000 }
    ];

    return (
        <div className="wallet-container">
            {/* Left */}
            <div className="wallet-left">
                <div className="wallet-card">
                    <div style={{ fontSize: 13, color: "#5A5F80", marginBottom: 4 }}>Total Balance</div>
                    <div className="wallet-balance">$12,840.00</div>
                    <div className="wallet-balance-text">▲ +$3,200 this month</div>
                    <div className="wallet-actions">
                        <button className="send">↗ Send</button>
                        <button className="add">+ Add Money</button>
                        <button className="request">↙ Request</button>
                    </div>
                </div>

                <div className="wallet-card">
                    <h2>Top-Up Wallet</h2>
                    {topOk ? (
                        <div style={{ textAlign: "center", padding: "24px 0" }}>
                            <div style={{ fontSize: 44 }}>✅</div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: "#22D47A", marginTop: 12 }}>Top-Up Successful!</div>
                            <div style={{ color: "#5A5F80", marginTop: 6 }}>${topAmt} added</div>
                            <button className="wallet-btn primary" style={{ marginTop: 18 }} onClick={() => { setTopOk(false); setTopAmt(""); }}>Done</button>
                        </div>
                    ) : (
                        <>
                            <div className="topup-chips">
                                {["50","100","250","500"].map(a => (
                                    <button
                                        key={a}
                                        className={`wallet-chip ${topAmt===a ? "selected" : ""}`}
                                        onClick={() => setTopAmt(a)}
                                    >
                                        ${a}
                                    </button>
                                ))}
                            </div>
                            <input placeholder="Custom amount…" value={topAmt} onChange={e => setTopAmt(e.target.value)} />
                            <button className="wallet-btn primary" style={{ width: "100%", marginTop: 14 }} onClick={() => setTopOk(true)}>
                                Confirm Top-Up {topAmt ? `$${topAmt}` : ""}
                            </button>
                        </>
                    )}
                </div>

                <div className="wallet-card">
                    <h2>Frequent Recipients</h2>
                    <div className="wallet-recipients">
                        {RECIPIENTS.map(r => (
                            <div key={r.name} className="wallet-recipient" onClick={() => setSelectedRecipient(r)}>
                                <div className="wallet-recipient-avatar" style={{ backgroundColor: r.color }}>{r.avatar}</div>
                                <div className="wallet-recipient-name">{r.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="wallet-right">
                <h2>Your Cards</h2>
                <div className="wallet-cards-wrapper">
                    <div className="wallet-card-back">
                        <CreditCard last4="1847" holder="Anita Rose" expiry="03/26" brand="MC" shrink />
                    </div>
                    <div className="wallet-card-front">
                        <CreditCard last4="5025" holder="Anita Rose" expiry="09/27" brand="VISA" />
                    </div>
                </div>

                <h2>Spending Limits</h2>
                {limits.map(l => (
                    <div key={l.label} className="wallet-spending-limit">
                        <div className="wallet-spending-limit-text">
                            <span>{l.label}</span>
                            <span style={{ fontWeight: 600 }}>${l.used.toLocaleString()} / ${l.max.toLocaleString()}</span>
                        </div>
                        <div className="wallet-spending-limit-bar">
                            <div className="wallet-spending-limit-fill" style={{ width: `${(l.used/l.max)*100}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wallet;