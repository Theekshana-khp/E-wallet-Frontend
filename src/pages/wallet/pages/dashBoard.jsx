import React, { useState } from "react";
import "../../../style/wallet/pages/dashBoard.css";
import WaveChart from "../../../components/waveChart/waveChart";
import DashRightPanel from "../../../components/dashRightPanel/dashRightPanel";

function Dashboard({ TRANSACTIONS, D }) {
    const [period, setPeriod] = useState("1d");

    const avBg = ["#ff5252", "#ff8a65", "#ffb74d", "#4db6ac"]; // example avatar backgrounds

    return (
        <div className="dashboard">
            <div className="dashboard-left">
                <div className="card" style={{maxHeight:"370px"}}>
                    <div className="card-header">
                        <span className="card-title">Income</span>
                        <div className="card-sort">
                            <span className="sort-label">Sort by:</span>
                            <select className="sort-select">
                                <option>Month</option>
                                <option>Week</option>
                                <option>Year</option>
                            </select>
                        </div>
                    </div>
                    <WaveChart chartData={{ label: ["Apr ", "Apr 02", "Apr 03", "Apr 04", "Apr 05", "Apr 06", "Apr 07" , "Apr ", "Apr 02", "Apr 03", "Apr 04", "Apr 05"], data: [65, 59, 80, 81, 56, 55, 40,20.13,23,54,52,32] }} />
                
                    <div className="period-buttons" style={{marginTop:"10px"}}>
                        {["day","week","month","3months","year"].map(p => (
                            <button key={p} className={`chip ${period === p ? "active" : ""}`} onClick={() => setPeriod(p)}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Recent Transactions</span>
                        <select className="sort-select">
                            <option>Month</option>
                            <option>Week</option>
                        </select>
                    </div>

                    {TRANSACTIONS.slice(0, 4).map((tx, i) => (
                        <div key={tx.id}>
                            {(i === 0 || TRANSACTIONS[i-1].date !== tx.date) && (
                                <div className="transaction-date">{tx.date}</div>
                            )}
                            <div className="tx-row">
                                <div className="avatar" style={{ background: avBg[i % avBg.length] }}>{tx.avatar}</div>
                                <div className="tx-info">
                                    <div className="tx-name">{tx.name}</div>
                                    <div className="tx-sub">{tx.sub}</div>
                                </div>
                                <div className={`tx-amount ${tx.type === "credit" ? "credit" : "debit"}`}>
                                    {tx.type === "credit" ? "+" : "−"}${Math.abs(tx.amount).toLocaleString("en",{minimumFractionDigits:2})}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="dashboard-Right">
                <DashRightPanel />
            </div>
        </div>
    );
}

export default Dashboard;