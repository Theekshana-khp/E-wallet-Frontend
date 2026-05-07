import React,{useState} from "react";
import "../../style/wallet/components/dashRight.css";

const NOTIFICATIONS = [
    { id: 1, title: "Transfer Successful", desc: "You sent $1,250.60 to Mikey", time: "2 min ago", type: "success", read: false },
    { id: 2, title: "Salary Received", desc: "$12,840.00 credited to your wallet", time: "1 hr ago", type: "credit", read: false },
    { id: 3, title: "Fraud Alert", desc: "Unusual login detected from new device", time: "3 hr ago", type: "alert", read: false },
    { id: 4, title: "Bill Due", desc: "Netflix subscription due tomorrow", time: "5 hr ago", type: "info", read: true },
    { id: 5, title: "Limit Reached", desc: "80% of daily transfer limit used", time: "1 day ago", type: "warning", read: true },
];

const DashRightPanel = ({ btn }) => {
const [notifs, setNotifs] = useState(NOTIFICATIONS);

    return (
        <div className="dash-right-panel">
            <div className="wallet-summary-header">
                <span>Account Summary</span>
            </div>

            <div className="wallet-summary">
                <div>Acoount Balence : 20000.00 LKR</div>
            </div>

            <div className="mini-stats-grid">
                {[
                    { icon: "⚡", bg: "#1E1A3A", label: "This Week", val: "3.45k", trend: "+6.4%", up: true },
                    { icon: "↗", bg: "#152215", label: "This Month", val: "$12.9k", trend: "-3.1%", up: false },
                    { icon: "⏱", bg: "#251A15", label: "Upcoming", val: "$14.4k", trend: "+10.3%", up: true },
                ].map((s) => (
                    <div key={s.label} className="mini-stat" style={{ background: s.bg }}>
                        <div className="icon">{s.icon}</div>
                        <div className="label">{s.label}</div>
                        <div className="value">{s.val}</div>
                        <div className={`trend ${s.up ? "up" : "down"}`}>{s.trend}</div>
                    </div>
                ))}
            </div>

            <div className="action-buttons">
                <button className="btn-purple-dash">Transfer</button>
                <button className="btn-primary-dash">Pay</button>
            </div>

            <div className="dash-notifi" style={{overflow:"auto",maxHeight:"350px" , marginTop:"10px"}}>
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
    );
};

export default DashRightPanel;