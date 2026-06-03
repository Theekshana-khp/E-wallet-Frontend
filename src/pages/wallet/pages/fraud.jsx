import React, { useState } from "react";
import "../../../style/wallet/pages/fraud.css";

const FRAUD_ALERTS = [
    { id: 1, title: "Suspicious Login",     desc: "Login detected from unknown device in Colombo.",      time: "2 min ago",  severity: "HIGH",   status: "active"   },
    { id: 2, title: "Large Transfer",       desc: "LKR 25,000 transfer flagged for review.",              time: "1 hr ago",   severity: "MEDIUM", status: "active"   },
    { id: 3, title: "Failed PIN Attempts",  desc: "3 consecutive incorrect PIN entries detected.",        time: "3 hr ago",   severity: "LOW",    status: "resolved" },
    { id: 4, title: "New Device Login",     desc: "Account accessed from a new browser on Windows 11.",  time: "5 hr ago",   severity: "MEDIUM", status: "resolved" },
    { id: 5, title: "Unusual Transfer Time", desc: "Transfer initiated at 03:14 AM outside normal hours.", time: "1 day ago", severity: "LOW",    status: "resolved" },
];

const SEV = {
    HIGH:   { bg: "#2a1010", color: "#f87171", border: "#f87171" },
    MEDIUM: { bg: "#2a1f08", color: "#fbbf24", border: "#fbbf24" },
    LOW:    { bg: "#1c2040", color: "#a5b4fc", border: "#a5b4fc" },
};

const RULES = [
    { label: "Daily transfer limit",  value: "LKR 500,000" },
    { label: "Single transfer max",   value: "LKR 100,000" },
    { label: "Failed PIN lock",       value: "3 attempts"  },
    { label: "New device verify",     value: "Required"    },
    { label: "Overseas transfers",    value: "Blocked"     },
];

const FraudAlerts = () => {
    const [alerts, setAlerts] = useState(FRAUD_ALERTS);
    const [filter, setFilter] = useState("all");

    const resolve = (id) => setAlerts(alerts.map(a => a.id === id ? { ...a, status: "resolved" } : a));

    const filtered = filter === "all" ? alerts : alerts.filter(a =>
        filter === "active" ? a.status === "active" : a.status === "resolved"
    );

    const activeCount = alerts.filter(a => a.status === "active").length;

    return (
        <div className="fa-content">
            <div className="fa-panel">
                <div className="fa-topbar">
                    <div className="fa-topbar-left">
                        <span className="fa-page-title">Fraud & Security Alerts</span>
                        {activeCount > 0 && (
                            <span className="fa-active-badge">{activeCount} active</span>
                        )}
                    </div>
                </div>

                <div className="fa-filters">
                    {[["all", "All"], ["active", "Active"], ["resolved", "Resolved"]].map(([key, label]) => (
                        <div
                            key={key}
                            className={`fa-chip ${filter === key ? "on" : ""}`}
                            onClick={() => setFilter(key)}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                <div className="fa-list">
                    {filtered.map(a => {
                        const s = SEV[a.severity];
                        return (
                            <div key={a.id} className="fa-row">
                                <div className="fa-row-top">
                                    <span className="fa-severity" style={{ background: s.bg, color: s.color }}>
                                        {a.severity}
                                    </span>
                                    <span className="fa-title">{a.title}</span>
                                    <span className={`fa-status ${a.status}`}>{a.status}</span>
                                </div>
                                <div className="fa-desc">{a.desc}</div>
                                <div className="fa-bottom">
                                    <span className="fa-time">{a.time}</span>
                                    {a.status === "active" && (
                                        <div className="fa-actions">
                                            <button className="fa-resolve-btn" onClick={() => resolve(a.id)}>
                                                <i className="ti ti-circle-check" aria-hidden="true" /> Resolve
                                            </button>
                                            <button className="fa-investigate-btn">
                                                <i className="ti ti-search" aria-hidden="true" /> Investigate
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {filtered.length === 0 && (
                        <div className="fa-empty">No alerts found.</div>
                    )}
                </div>
            </div>

            <div className="fa-right">
                <p className="fa-sec-title">Security rules</p>

                {RULES.map(({ label, value }) => (
                    <div className="fa-rule-row" key={label}>
                        <span className="fa-rule-label">{label}</span>
                        <span className="fa-rule-val">{value}</span>
                    </div>
                ))}

                <button className="fa-edit-rules-btn">
                    <i className="ti ti-adjustments" aria-hidden="true" /> Edit rules
                </button>

                <div className="fa-divider" />
                <p className="fa-sec-title">Overview</p>

                <div className="fa-stat-card">
                    <div className="fa-stat-lbl">Total alerts</div>
                    <div className="fa-stat-val">{alerts.length}</div>
                </div>
                <div className="fa-stats-grid">
                    <div className="fa-stat-card">
                        <div className="fa-stat-lbl">Active</div>
                        <div className="fa-stat-val" style={{ color: "#f87171" }}>{activeCount}</div>
                    </div>
                    <div className="fa-stat-card">
                        <div className="fa-stat-lbl">Resolved</div>
                        <div className="fa-stat-val" style={{ color: "#22c55e" }}>{alerts.length - activeCount}</div>
                    </div>
                </div>

                <div className="fa-divider" />
                <p className="fa-sec-title">Quick actions</p>
                <button className="fa-outline-btn fa-danger">
                    <i className="ti ti-lock" aria-hidden="true" /> Freeze account
                </button>
                <button className="fa-outline-btn" style={{ marginTop: 8 }}>
                    <i className="ti ti-phone" aria-hidden="true" /> Contact support
                </button>
            </div>
        </div>
    );
};

export default FraudAlerts;
