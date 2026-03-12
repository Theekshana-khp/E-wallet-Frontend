import React from "react";
import CreditCard from "../creditCard/creditCard";
import DonutRing from "../donutRings/donutRings";
import "../../style/wallet/components/dashRight.css";

const DashRightPanel = ({ btn }) => {
    return (
        <div className="dash-right-panel">
            <div className="dash-header">
                <span>Your Cards</span>
                <span className="see-all">See all ›</span>
            </div>

            <div className="card-stack">
                <div className="card-back">
                    <CreditCard gradient="linear-gradient(135deg,#3D33CC 0%,#7B68F0 100%)" last4="1847" holder="Anita Rose" expiry="03/26" brand="MC" shrink />
                </div>
                <div className="card-front">
                    <CreditCard gradient="linear-gradient(135deg,#FF7A6A 0%,#FF3D3D 55%,#C42828 100%)" last4="5025" holder="Anita Rose" expiry="09/27" brand="VISA" />
                </div>
            </div>

            <div className="card-actions">
                <button className="btn-primary">+ Add Card</button>
                <button className="btn-outline">Manage Cards</button>
            </div>

            <div className="wallet-summary-header">
                <span>Wallet Summary</span>
                <span className="see-all">›</span>
            </div>

            <div className="wallet-summary">
                <DonutRing pct={0.55} color="#FF5252" label="Outcome" amount="$460.00" />
                <div className="divider" />
                <DonutRing pct={1} color="#7B68F0" label="Income" amount="$840.00" />
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
                <button className="btn-purple">Request Money</button>
                <button className="btn-primary">Send Invoice</button>
            </div>
        </div>
    );
};

export default DashRightPanel;