import React, { useState } from "react";
import "../../../style/wallet/pages/notification.css";
import walletIcon from "../../../assets/images/notification/wallet.png";
import encryptedIcon from "../../../assets/images/notification/encrypted.png";
import transferIcon from "../../../assets/images/notification/transfer.png";
import warningIcon from "../../../assets/images/notification/warning.png";
import userIcon from "../../../assets/images/notification/user (1).png";
import ringingIcon from "../../../assets/images/notification/ringing.png";



const NOTIFICATIONS = [
    { id: 1, title: "Transfer Successful",  desc: "Your fund transfer to account ACC100245 was completed.", time: "2 min ago",  type: "success", read: false },
    { id: 2, title: "Salary Credited",      desc: "Your salary deposit of LKR 120,000 was successfully credited.", time: "1 hr ago",  type: "credit",  read: false },
    { id: 3, title: "New Device Login Alert", desc: "A login was detected from a new device in Colombo.", time: "3 hr ago",  type: "alert",   read: false },
    { id: 4, title: "Bill Payment Successful", desc: "Electricity bill payment of LKR 8,500 completed successfully.", time: "5 hr ago",  type: "info",    read: true  },
    { id: 5, title: "Daily Limit Warning",  desc: "80% of your daily transfer limit has been used.", time: "1 day ago", type: "warning", read: true  },
    { id: 6, title: "Scheduled Transfer",   desc: "LKR 5,000 scheduled transfer to Kamal Perera is due tomorrow.", time: "1 day ago", type: "info",    read: true  },
];

const TYPE_META = {
    success: { icon: "ti-circle-check",     bg: "#0d2518", color: "#22c55e" },
    credit:  { icon: "ti-arrow-down-left",  bg: "#0d1e2a", color: "#60a5fa" },
    alert:   { icon: "ti-shield-exclamation", bg: "#2a1010", color: "#f87171" },
    info:    { icon: "ti-info-circle",      bg: "#1c2040", color: "#a5b4fc" },
    warning: { icon: "ti-alert-triangle",   bg: "#2a1f08", color: "#fbbf24" },
};

const SETTINGS = [
    { label: "Transfer Alerts",   sub: "Alert on every transfer",    key: "transfer",  on: true  },
    { label: "Login Activity",    sub: "Notify on new device login", key: "login",     on: true  },
    { label: "Fraud Alerts",      sub: "High priority security",     key: "fraud",     on: true  },
    { label: "Promotions",        sub: "Offers and rewards",         key: "promo",     on: false },
    { label: "Monthly Reports",   sub: "Summary every month",        key: "reports",   on: true  },
];

const Notifications = ({notification}) => {
    const [settings, setSettings] = useState(SETTINGS);

    const markAll  = () => {
        notification = (notification.map(n => ({...n, read: true})))
    };
    const markOne  = (id) => {notification = (notification.map(n => n.id === id ? {...n, read: true} : n))};
    const toggleS  = (key) => setSettings(settings.map(s => s.key === key ? { ...s, on: !s.on } : s));

    const unread = notification.filter(n => !n.isRead).length;
    return (
        <div className="nf-content">
            <div className="nf-panel">
                <div className="nf-topbar">
                    <div className="nf-topbar-left">
                        <span className="nf-page-title">Notifications</span>
                        {unread > 0 && <span className="nf-unread-badge">{unread} new</span>}
                    </div>
                    <button className="nf-mark-btn" onClick={markAll}>Mark all read</button>
                </div>

                <div className="nf-list">
                    {notification.map(n => {
                        return (
                            <div
                                key={n.userId}
                                className={`nf-row ${n.isRead ? "" : ""}`}
                                onClick={() => markOne(n.userId)}
                            >
                                <div className="nf-ico" >
                                    {n.notificationType === "PAYMENT"
                                        ? <img src={walletIcon} alt="payment" style={{ width: "37px", height: "40px" }} />
                                        : n.notificationType === "SECURITY"
                                            ? <img src={encryptedIcon} alt="security" style={{ width: "90px", height: "40px" }} />
                                            : n.notificationType === "TRANSFER"
                                                ? <img src={transferIcon} alt="transfer" style={{ width: "70px", height: "40px" }} />
                                                : n.notificationType === "ALERT"
                                                    ? <img src={warningIcon} alt="alert" style={{ width: "45px", height: "40px" }} />
                                                    : n.notificationType === "ACCOUNT"
                                                        ? <img src={userIcon} alt="account" style={{ width: "50px", height: "40px" }} />
                                                        : <img src={ringingIcon} alt="notification" style={{ width: "100px", height: "40px" }} />
                                    }
                                </div>
                                <div className="nf-body">
                                    <div className="nf-title-row">
                                        <span className="nf-title">{n.title}</span>
                                        {!n.isRead && <span className="nf-dot" />}
                                    </div>
                                    <div className="nf-desc">{n.message}</div>
                                    <div className="nf-time">{new Date(n.createdAt).toLocaleString("en-LK", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="nf-right">
                <p className="nf-sec-title">Notification settings</p>

                {settings.map(s => (
                    <div key={s.key} className="nf-setting-row">
                        <div>
                            <div className="nf-setting-label">{s.label}</div>
                            <div className="nf-setting-sub">{s.sub}</div>
                        </div>
                        <div
                            className={`nf-toggle ${s.on ? "on" : ""}`}
                            onClick={() => toggleS(s.key)}
                        >
                            <div className="nf-handle" />
                        </div>
                    </div>
                ))}

                <div className="nf-divider" />
                <p className="nf-sec-title">Quick actions</p>

                <button className="nf-action-btn">
                    <i className="ti ti-trash" aria-hidden="true" style={{ fontSize: 14 }} />
                    Clear all notifications
                </button>
                <button className="nf-action-btn danger">
                    <i className="ti ti-bell-off" aria-hidden="true" style={{ fontSize: 14 }} />
                    Mute all alerts
                </button>
            </div>
        </div>
    );
};

export default Notifications;
