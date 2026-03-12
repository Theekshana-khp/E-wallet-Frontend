import React from "react";
import "../../style/wallet/components/donutRings.css";

const DonutRing = ({ pct, color, label, amount, bgColor = "#20243A", textColor = "#E8E9F5" }) => {
    const r = 26; // radius
    const c = 32; // center
    const circ = 2 * Math.PI * r;

    return (
        <div className="donut-ring">
            <svg width="64" height="64" className="donut-svg">
                {/* Background circle */}
                <circle
                    cx={c}
                    cy={c}
                    r={r}
                    fill="none"
                    stroke={bgColor}
                    strokeWidth="5.5"
                />
                {/* Foreground progress */}
                <circle
                    cx={c}
                    cy={c}
                    r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth="5.5"
                    strokeDasharray={`${pct * circ} ${circ}`}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${c} ${c})`}
                />
            </svg>
            <div className="donut-labels">
                <div className="donut-label" style={{ color }}>{label}</div>
                <div className="donut-amount" style={{ color: textColor }}>{amount}</div>
            </div>
        </div>
    );
};

export default DonutRing;