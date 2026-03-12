import React from "react";
import "../../style/wallet/components/barStat.css";

const D = {
    surface3: "#20243A",
    text: "#ffffff",
    muted: "#9aa0a6",
};

const BarStat = ({ label, value, max, color }) => {
    const percent = (value / max) * 100;
    return (
        <div className="bar-stat">
            <div className="bar-label">
                <span>{label}</span>
                <span className="bar-value">${value.toLocaleString()}</span>
            </div>
            <div className="bar-track">
                <div className="bar-fill" style={{ width: `${percent}%`, background: color }} />
            </div>
        </div>
    );
};

export default BarStat;