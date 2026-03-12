import React, { useState } from "react";
import "../../../style/wallet/pages/sendMoney.css"; // optional for styles

const RECIPIENTS = [
    { name: "Alice", avatar: "A", color: "#FF5252" },
    { name: "Bob", avatar: "B", color: "#7B68F0" },
    { name: "Charlie", avatar: "C", color: "#22D47A" },
];

const TRANSACTIONS = [
    { id: 1, name: "Alice", sub: "Wallet ID 123", type: "debit", amount: 50, avatar: "A" },
    { id: 2, name: "Bob", sub: "Wallet ID 234", type: "debit", amount: 120, avatar: "B" },
];

const D = {
    surface: "#161a23",
    surface2: "#1A1D2E",
    surface3: "#20243A",
    border: "#2a2f3a",
    text: "#ffffff",
    muted: "#9aa0a6",
    accent: "#ff5252",
    accent2: "#7B68F0",
    green: "#22D47A",
};

const SendMoney = () => {
    const [sendStep, setSendStep] = useState(1);
    const [sendTo, setSendTo] = useState(null);
    const [sendAmt, setSendAmt] = useState("");
    const [sendNote, setSendNote] = useState("");
    const [sendOk, setSendOk] = useState(false);

    const av = (color, size) => ({ width: size, height: size, background: color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white" });
    const chip = (active) => ({ padding: "6px 12px", borderRadius: 12, border: `1px solid ${active ? D.accent : D.border}`, background: active ? D.accent : D.surface2, color: active ? "white" : D.text, cursor: "pointer" });
    const txRow = { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${D.border}` };

    return (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
                <div style={{ background: D.surface2, borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: D.text, marginBottom: 24 }}>Send Money</div>

                    {/* Steps */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
                        {["Choose Recipient","Enter Amount","Confirm"].map((label, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{
                                        width: 30, height: 30, borderRadius: "50%",
                                        background: sendStep > i ? D.accent : D.surface3,
                                        border: sendStep === i+1 ? `2px solid ${D.accent}` : "2px solid transparent",
                                        color: sendStep > i ? "white" : sendStep === i+1 ? D.accent : D.muted,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 12, fontWeight: 700
                                    }}>{sendStep > i ? "✓" : i+1}</div>
                                    <div style={{ fontSize: 11, color: sendStep === i+1 ? D.accent : D.muted, marginTop: 5, whiteSpace: "nowrap" }}>{label}</div>
                                </div>
                                {i < 2 && <div style={{ flex: 1, height: 2, background: sendStep > i+1 ? D.accent : D.border, margin: "0 4px", marginBottom: 16 }} />}
                            </div>
                        ))}
                    </div>

                    {/* Step content */}
                    {sendOk ? (
                        <div style={{ textAlign: "center", padding: "32px 0" }}>
                            <div style={{ fontSize: 54, marginBottom: 14 }}>🎉</div>
                            <div style={{ fontSize: 22, fontWeight: 700, color: D.green }}>Transfer Successful!</div>
                            <div style={{ color: D.muted, marginTop: 8 }}>${sendAmt} sent to {sendTo?.name}</div>
                            <button style={{ marginTop: 20, padding: "10px 16px", background: D.accent, color: "white", border: "none", borderRadius: 12, cursor: "pointer" }}
                                    onClick={() => { setSendOk(false); setSendStep(1); setSendAmt(""); setSendTo(null); setSendNote(""); }}>New Transfer</button>
                        </div>
                    ) : sendStep === 1 ? (
                        <>
                            <input placeholder="Search name or wallet ID…" style={{ width: "100%", padding: "12px", borderRadius: 12, border: `1px solid ${D.border}`, marginBottom: 16 }} />
                            <div style={{ fontSize: 13, color: D.muted, marginBottom: 12 }}>Quick Select</div>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                                {RECIPIENTS.map(r => (
                                    <div key={r.name} onClick={() => setSendTo(r)} style={{ textAlign: "center", cursor: "pointer", padding: "12px 16px", borderRadius: 14, background: sendTo?.name === r.name ? D.surface3 : D.surface2, border: `2px solid ${sendTo?.name === r.name ? D.accent : D.border}`, transition: "all 0.2s" }}>
                                        <div style={{ ...av(r.color, 46), margin: "0 auto 8px", borderRadius: 14 }}>{r.avatar}</div>
                                        <div style={{ fontSize: 12, color: D.muted }}>{r.name}</div>
                                    </div>
                                ))}
                            </div>
                            <button style={{ width: "100%", padding: "10px 16px", background: D.accent, color: "white", border: "none", borderRadius: 12, cursor: "pointer" }}
                                    onClick={() => sendTo && setSendStep(2)}>Continue →</button>
                        </>
                    ) : sendStep === 2 ? (
                        <>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, background: D.surface2, borderRadius: 14, padding: 16, marginBottom: 18 }}>
                                <div style={{ ...av(sendTo?.color, 46), borderRadius: 14 }}>{sendTo?.avatar}</div>
                                <div>
                                    <div style={{ fontWeight: 700, color: D.text }}>{sendTo?.name}</div>
                                    <div style={{ fontSize: 12, color: D.muted }}>@{sendTo?.name?.toLowerCase()}</div>
                                </div>
                            </div>
                            <input style={{ width: "100%", padding: "12px", fontSize: 26, fontWeight: 800, marginBottom: 12, borderRadius: 12, border: `1px solid ${D.border}`, background: D.surface3, color: D.text }} placeholder="$0.00" value={sendAmt} onChange={e => setSendAmt(e.target.value)} />
                            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                                {["50","100","250","500"].map(a => <button key={a} style={chip(sendAmt === a)} onClick={() => setSendAmt(a)}>${a}</button>)}
                            </div>
                            <input style={{ width: "100%", padding: "12px", marginBottom: 16, borderRadius: 12, border: `1px solid ${D.border}`, background: D.surface3, color: D.text }} placeholder="Add a note…" value={sendNote} onChange={e => setSendNote(e.target.value)} />
                            <div style={{ display: "flex", gap: 10 }}>
                                <button style={{ flex: 1, padding: "10px 16px", borderRadius: 12, border: `1px solid ${D.border}`, background: "transparent", color: D.text, cursor: "pointer" }} onClick={() => setSendStep(1)}>← Back</button>
                                <button style={{ flex: 2, padding: "10px 16px", borderRadius: 12, border: "none", background: D.accent, color: "white", cursor: "pointer" }} onClick={() => sendAmt && setSendStep(3)}>Review →</button>
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
                                <button style={{ flex: 1, padding: "10px 16px", borderRadius: 12, border: `1px solid ${D.border}`, background: "transparent", color: D.text, cursor: "pointer" }} onClick={() => setSendStep(2)}>← Edit</button>
                                <button style={{ flex: 2, padding: "10px 16px", borderRadius: 12, border: "none", background: D.accent, color: "white", cursor: "pointer" }} onClick={() => setSendOk(true)}>✓ Confirm & Send</button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Right Panel */}
            <div style={{ width: 360, background: D.surface, borderLeft: `1px solid ${D.border}`, padding: 24, overflowY: "auto" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 16 }}>Recent Transfers</div>
                {TRANSACTIONS.filter(t => t.type === "debit").map((tx, i) => (
                    <div key={tx.id} style={txRow}>
                        <div style={av(tx.avatar, 38)}>{tx.avatar}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: D.text }}>{tx.name}</div>
                            <div style={{ fontSize: 11, color: D.muted }}>{tx.sub}</div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: D.text }}>−${Math.abs(tx.amount).toLocaleString("en",{minimumFractionDigits:2})}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SendMoney;