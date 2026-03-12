import React, { useState } from "react";
import "../../../style/wallet/pages/notification.css";

const D = {
    surface: "#141720",
    surface3: "#20243A",
    border: "#272B40",
    text: "#E8E9F5",
    muted: "#5A5F80",
    accent: "#FF5252",
};

const NOTIFICATIONS = [
    { id: 1, title: "Transfer Successful", desc: "You sent $1,250.60 to Mikey", time: "2 min ago", type: "success", read: false },
    { id: 2, title: "Salary Received", desc: "$12,840.00 credited to your wallet", time: "1 hr ago", type: "credit", read: false },
    { id: 3, title: "Fraud Alert", desc: "Unusual login detected from new device", time: "3 hr ago", type: "alert", read: false },
    { id: 4, title: "Bill Due", desc: "Netflix subscription due tomorrow", time: "5 hr ago", type: "info", read: true },
    { id: 5, title: "Limit Reached", desc: "80% of daily transfer limit used", time: "1 day ago", type: "warning", read: true },
];

const Notifications = () => {
    const [notifs, setNotifs] = useState(NOTIFICATIONS);

    return (
        <div className="notifications-container">
            <div className="notifications-main">
                <div className="notifications-card">
                    <div className="notifications-header">
                        <span>Notifications</span>
                        <button
                            className="mark-read-btn"
                            onClick={() => setNotifs(notifs.map((n) => ({ ...n, read: true })))}
                        >
                            Mark all read
                        </button>
                    </div>

                    {notifs.map((n) => (
                        <div
                            key={n.id}
                            className={`notif-row ${n.read ? "read" : ""}`}
                            onClick={() =>
                                setNotifs(
                                    notifs.map((x) => (x.id === n.id ? { ...x, read: true } : x))
                                )
                            }
                        >
                            <div className="notif-icon">
                                {n.type === "success"
                                    ? "✅"
                                    : n.type === "alert"
                                        ? "🚨"
                                        : n.type === "credit"
                                            ? "💰"
                                            : n.type === "warning"
                                                ? "⚠️"
                                                : "ℹ️"}
                            </div>
                            <div className="notif-content">
                                <div className="notif-title-row">
                                    <span className="notif-title">{n.title}</span>
                                    {!n.read && <div className="notif-dot" />}
                                </div>
                                <div className="notif-desc">{n.desc}</div>
                                <div className="notif-time">{n.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="notifications-sidebar">
                <div className="settings-header">Settings</div>
                {[
                    ["Transfer Alerts", true],
                    ["Login Activity", true],
                    ["Fraud Alerts", true],
                    ["Promotions", false],
                    ["Monthly Reports", true],
                ].map(([label, on]) => (
                    <div key={label} className="setting-row">
                        <span className="setting-label">{label}</span>
                        <div className={`toggle-switch ${on ? "on" : ""}`}>
                            <div className="toggle-handle" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;