import React from "react";
import "../../style/wallet/components/waveChart.css";

const WaveChart = () => (
    <svg viewBox="0 0 480 100" className="wavechart">
        <defs>
            <linearGradient id="wf1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF5252" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF5252" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wf2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7B68F0" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#7B68F0" stopOpacity="0" />
            </linearGradient>
        </defs>
        <path
            className="wave-fill-1"
            d="M0,55 C40,18 80,90 120,46 C160,4 200,76 240,42 C280,8 320,70 360,36 C400,6 440,60 480,46 L480,100 L0,100 Z"
            fill="url(#wf1)"/>
        <path
            className="wave-stroke-1"
            d="M0,55 C40,18 80,90 120,46 C160,4 200,76 240,42 C280,8 320,70 360,36 C400,6 440,60 480,46"/>

        <path
            className="wave-fill-2"
            d="M0,68 C40,44 80,86 120,62 C160,30 200,82 240,58 C280,30 320,76 360,52 C400,26 440,68 480,56 L480,100 L0,100 Z"
            fill="url(#wf2)"/>
        <path
            className="wave-stroke-2"
            d="M0,68 C40,44 80,86 120,62 C160,30 200,82 240,58 C280,30 320,76 360,52 C400,26 440,68 480,56"/>

        <circle className="wave-circle" cx="240" cy="42" r="4.5" />

        <rect className="wave-tooltip" x="194" y="6" width="96" height="30" rx="8" />
        <text className="wave-date" x="242" y="18" textAnchor="middle">
            05.04.20
        </text>
        <text className="wave-amount" x="242" y="30" textAnchor="middle">
            $840.00
        </text>
    </svg>
);

export default WaveChart;