import React,{useState} from "react";

import transferIcon from "../../assets/images/notification/transfer.png";
import encryptedIcon from "../../assets/images/notification/encrypted.png";
import walletIcon from "../../assets/images/notification/wallet.png";
import warningIcon from "../../assets/images/notification/warning.png";
import userIcon from "../../assets/images/notification/user (1).png";
import ringingIcon from "../../assets/images/notification/ringing.png";
import accDetailUser from "../../assets/images/notification/acc-user.png";
import accUpcomming from "../../assets/images/notification/money-bag.png";
import past from "../../assets/images/notification/dividend.png";

import "../../style/wallet/components/dashRight.css";

const DashRightPanel = ({accountDetails , notifications , navigate}) => {
const [notifs, setNotifs] = useState(notifications);
    return (

        <div className="dash-right-panel">
            <div className="wallet-summary">
                <div style={{fontsize:"18px"}}>Acoount Balence </div>
                <div>{Number(accountDetails.balance).toLocaleString("en-LK", {
                    style: "currency",
                    currency: "LKR",
                })}</div>
            </div>

            <div className="mini-stats-grid">
                {[
                    { icon: "acc-user", bg: "#152215",label: "Account Details", val: accountDetails.accountNumber, trend: "Ambalangoda", up: true },
                    { icon: "acc-upcomming", bg: "#251A15", label: "Upcoming", val: "$14.4k", trend: "+10.3%", up: true },
                    { icon: "⚡", bg: "#1E1A3A", label: "This Week", val: "3.45k", trend: "+6.4%", up: true }
                ].map((s) => (
                    <div key={s.label} className="mini-stat" style={{ background: s.bg }}>
                        <div className="icon">
                            <img src={s.icon === "acc-user" ? accDetailUser : s.icon === "acc-upcomming" ? accUpcomming:past}
                                                   style={{ width: "37px", height: "40px" }} alt={""}></img></div>
                        <div className="label">{s.label}</div>
                        <div className="value">{s.val}</div>
                        <div className={`trend ${s.up ? "up" : "down"}`}>{s.trend}</div>
                    </div>
                ))}
            </div>

            <div className="action-buttons">
                <button className="btn-purple-dash" onClick={()=>navigate("send")}>Transfer</button>
                <button className="btn-primary-dash">Pay</button>
            </div>

            <div className="dash-notifi" style={{overflow:"auto",maxHeight:"calc(100vh-1000px)" , marginTop:"10px"}}>
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
                            key={1}
                            className={`notif-row ${n.read ? "read" : ""}`}
                            onClick={() =>
                                setNotifs(
                                    notifs.map((x) => (x.id === n.id ? { ...x, read: true } : x))
                                )
                            }
                        >
                            <div className="notif-icon">
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
                            <div className="notif-content">
                                <div className="notif-title-row">
                                    <span className="notif-title">{n.title}</span>
                                    {!n.isRead && <div className="notif-dot" />}
                                </div>
                                <div className="notif-desc">{n.message}</div>
                                <div className="notif-time">{new Date(n.createdAt).toLocaleString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}</div>
                            </div>
                        </div>
                    ))}
                </div>
            
        </div>
    );
};

export default DashRightPanel;