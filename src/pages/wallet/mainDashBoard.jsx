import React, { useState } from "react";
import "../../style/wallet/mainDashBoard.css";
import Wallet from "./pages/wallet";

function MainDashBoard() {

    const [activeNav, setActiveNav] = useState("dashboard");
    const [activeTab, setActiveTab] = useState("summary");

    const TOP_NAV = ["summary", "my cards", "credit history", "installments"];

    const NAV_ITEMS = [
        { id: "dashboard", icon: "◈", label: "Dashboard" },
        { id: "wallet", icon: "◉", label: "MainDashBoard" },
        { id: "send", icon: "↗", label: "Send Money" },
        { id: "transactions", icon: "≡", label: "Transactions" },
        { id: "analytics", icon: "⬡", label: "Analytics" },
        { id: "cards", icon: "▣", label: "My Cards" },
        { id: "notifications", icon: "◎", label: "Notifications" },
        { id: "admin", icon: "⊞", label: "Admin" },
        { id: "fraud", icon: "⚑", label: "Fraud Alerts" },
        { id: "settings", icon: "⚙", label: "Settings" }
    ];

    const unread = 3;

    const D = {
        bg: "#0D0F18", surface: "#141720", surface2: "#1A1D2E", surface3: "#20243A",
        border: "#272B40", text: "#E8E9F5", muted: "#5A5F80",
        accent: "#FF5252", accent2: "#7B68F0",
        green: "#22D47A", red: "#F04444", amber: "#F5A623",
        cardGrad: "linear-gradient(135deg,#FF7A6A 0%,#FF3D3D 55%,#C42828 100%)",
        cardGrad2: "linear-gradient(135deg,#3D33CC 0%,#7B68F0 100%)",
    };

    const pageLabel =
        NAV_ITEMS.find((item) => item.id === activeNav)?.label || "Page";

    const pageContent = () => {
        switch(activeNav) {
            case "wallet": return <Wallet D={D} />;
            case "send": return <div>Send Money</div>;
            default: return <div>Page not found</div>;
        }
    };

    return (
        <div className="wallet-layout">
            <div className="sidebar">
                <div className="logo">▲</div>
                {NAV_ITEMS.map((item) => (
                    <div key={item.id} className="nav-item">
                        <button className={`nav-button ${activeNav === item.id ? "active" : ""}`}
                            onClick={() => setActiveNav(item.id)}>
                            {item.icon}
                        </button>
                        {item.id === "notifications" && (<div className="badge">{unread}</div>)}
                    </div>
                ))}
                <button className="logout">⏻</button>
            </div>
            <div className="main">
                <div className="topbar">
                    <div className="tabs">
                        {(activeNav === "dashboard" || activeNav === "cards")
                            ? TOP_NAV.map((tab) => (
                                <button key={tab} className={activeTab === tab ? "tab active-tab" : "tab"}
                                    onClick={() => setActiveTab(tab)}>
                                    {tab}
                                </button>
                            )) : (<div className="breadcrumb">Dashboard › {pageLabel}</div>)
                        }
                    </div>
                    <div className="top-actions">
                        <button className="icon-btn">⌕</button>
                        <button className="icon-btn"
                            onClick={() => setActiveNav("notifications")}>
                            🔔
                        </button>
                        <div className="avatar">A</div>
                    </div>
                </div>
                {pageContent()}
            </div>
        </div>
    );
}

export default MainDashBoard;