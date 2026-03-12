import React from "react";
import "../../../style/wallet/pages/fraud.css";

const D = {
    surface: "#141720",
    surface2: "#1A1D2E",
    surface3: "#20243A",
    border: "#272B40",
    text: "#E8E9F5",
    muted: "#5A5F80",
    accent: "#FF5252",
    accent2: "#7B68F0",
    green: "#22D47A",
    red: "#F04444",
    amber: "#F5A623",
};

const FRAUD_ALERTS = [
    { id: 1, title: "Suspicious Login", desc: "Login detected from unknown device", time: "2 min ago", severity: "HIGH", status: "active" },
    { id: 2, title: "Large Transfer", desc: "$2,500 transfer flagged for review", time: "1 hr ago", severity: "MEDIUM", status: "active" },
    { id: 3, title: "Failed PIN Attempts", desc: "Multiple incorrect PIN entries detected", time: "3 hr ago", severity: "LOW", status: "resolved" },
];

const FraudAlerts = () => {
    return (
        <div className="fraud-container">
            <div className="fraud-main">
                <div className="fraud-card">
                    <div className="fraud-header">Fraud & Security Alerts</div>
                    {FRAUD_ALERTS.map((a) => (
                        <div
                            key={a.id}
                            className="fraud-row"
                            style={{
                                borderLeft: `4px solid ${a.severity === "HIGH" ? D.red : a.severity === "MEDIUM" ? D.amber : D.accent2}`,
                            }}
                        >
                            <div className="fraud-info">
                                <div className="fraud-title-row">
                  <span
                      className="fraud-severity"
                      style={{
                          background:
                              a.severity === "HIGH" ? "#251515" : a.severity === "MEDIUM" ? "#201A10" : "#181528",
                          color: a.severity === "HIGH" ? D.red : a.severity === "MEDIUM" ? D.amber : D.accent2,
                      }}
                  >
                    {a.severity}
                  </span>
                                    <span className="fraud-title">{a.title}</span>
                                </div>
                                <div className="fraud-desc">{a.desc}</div>
                                <div className="fraud-time">{a.time}</div>
                            </div>
                            <span
                                className="fraud-status"
                                style={{
                                    background: a.status === "active" ? "#152215" : D.surface3,
                                    color: a.status === "active" ? D.green : D.muted,
                                }}
                            >
                {a.status}
              </span>
                            {a.status === "active" && (
                                <div className="fraud-actions">
                                    <button className="btn-primary">Resolve</button>
                                    <button className="btn-outline">Investigate</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="fraud-sidebar">
                <div className="rules-header">Security Rules</div>
                {[
                    ["Daily Transfer Limit", "$5,000"],
                    ["Single Transfer Max", "$2,000"],
                    ["Failed PIN Lock", "3 attempts"],
                    ["New Device Verify", "Required"],
                ].map(([rule, val]) => (
                    <div key={rule} className="rule-row">
                        <span className="rule-label">{rule}</span>
                        <span className="rule-value">{val}</span>
                    </div>
                ))}
                <button className="btn-primary full-width">Edit Rules</button>
            </div>
        </div>
    );
};

export default FraudAlerts;