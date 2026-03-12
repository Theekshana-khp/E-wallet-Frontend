import React from "react";
import WaveChart from "../../../components/waveChart/waveChart";
import BarStat from "../../../components/barStat/barStat";
import "../../../style/wallet/pages/analytics.css";

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
    red: "#F04444",
    amber: "#F5A623",
};

const Analytics = () => {
    const topStats = [
        { label: "Total Volume", val: "$28.9k", change: "+12.4%", up: true, bg: "#181528" },
        { label: "Transactions", val: "142", change: "+8.2%", up: true, bg: "#1B1528" },
        { label: "Avg. Transfer", val: "$203", change: "-2.1%", up: false, bg: "#251515" },
    ];

    const categoryData = [
        ["🍔 Food", "$1,250", D.accent],
        ["💼 Salary", "$12,840", D.green],
        ["🛒 Shopping", "$2,300", "#A78BFA"],
        ["💡 Bills", "$800", D.accent2],
    ];

    const barStats = [
        { label: "Food & Dining", value: 1250, max: 15000, color: D.accent },
        { label: "Salary & Income", value: 12840, max: 15000, color: D.green },
        { label: "Shopping", value: 2300, max: 15000, color: "#A78BFA" },
        { label: "Bills & Utilities", value: 800, max: 15000, color: D.accent2 },
        { label: "Transfers Sent", value: 3500, max: 15000, color: D.amber },
    ];

    return (
        <div className="analytics-container">
            <div className="analytics-main">
                <div className="top-stats">
                    {topStats.map(c => (
                        <div key={c.label} className="stat-card" style={{ background: c.bg, border: `1px solid ${D.border}` }}>
                            <div className="stat-label">{c.label}</div>
                            <div className="stat-value">{c.val}</div>
                            <div className={`stat-change ${c.up ? "up" : "down"}`}>{c.change} vs last month</div>
                        </div>
                    ))}
                </div>

                <div className="transaction-trends">
                    <div className="trends-header">Transaction Trends</div>
                    <WaveChart />
                    <div className="bar-stats">
                        {barStats.map(b => (
                            <BarStat key={b.label} label={b.label} value={b.value} max={b.max} color={b.color} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="analytics-sidebar">
                <div className="sidebar-title">Category Breakdown</div>
                {categoryData.map(([cat, amt, color]) => (
                    <div key={cat} className="category-row">
                        <div className="category-label">
                            <div className="category-color" style={{ background: color }} />
                            <span>{cat}</span>
                        </div>
                        <span className="category-amount">{amt}</span>
                    </div>
                ))}
                <button className="btn-primary">↓ Download Report</button>
            </div>
        </div>
    );
};

export default Analytics;