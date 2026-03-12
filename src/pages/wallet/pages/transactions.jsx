import React, { useState } from "react";
import '../../../style/wallet/pages/transactions.css';

const D = {
    surface: "#161a23",
    surface2: "#1A1D2E",
    surface3: "#20243A",
    border: "#2a2f3a",
    text: "#ffffff",
    muted: "#9aa0a6",
    accent: "#ff5252",
    green: "#22D47A",
    red: "#F04444",
};

const TRANSACTIONS = [
    { id: 1, name: "Alice", sub: "Wallet ID 123", type: "credit", amount: 100, date: "Apr 01" },
    { id: 2, name: "Bob", sub: "Wallet ID 234", type: "debit", amount: 50, date: "Apr 02" },
    { id: 3, name: "Charlie", sub: "Wallet ID 345", type: "credit", amount: 200, date: "Apr 03" },
];

const Transactions = () => {
    const [txFilter, setTxFilter] = useState("all");

    const filtered = txFilter === "all" ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === txFilter);

    return (
        <div className="transactions-container">
            <div className="transactions-main">
                <div className="transactions-card">
                    <div className="transactions-header">
                        <span>Transaction History</span>
                        <button className="btn-primary">↓ Export CSV</button>
                    </div>

                    <div className="transactions-filters">
                        {["all","credit","debit"].map(f => (
                            <button key={f} className={`chip ${txFilter === f ? "active" : ""}`} onClick={() => setTxFilter(f)}>
                                {f.charAt(0).toUpperCase()+f.slice(1)}
                            </button>
                        ))}
                    </div>

                    {filtered.map((tx, i) => (
                        <div key={tx.id}>
                            {(i === 0 || filtered[i-1]?.date !== tx.date) && <div className="tx-date">{tx.date}</div>}
                            <div className="tx-row">
                                <div className={`tx-icon ${tx.type}`}>{tx.type==="credit" ? "+" : "−"}</div>
                                <div className="tx-info">
                                    <div className="tx-name">{tx.name}</div>
                                    <div className="tx-sub">{tx.sub}</div>
                                </div>
                                <div className="tx-right">
                                    <div className={`tx-amount ${tx.type}`}>{tx.type==="credit" ? "+" : "−"}${Math.abs(tx.amount).toLocaleString("en",{minimumFractionDigits:2})}</div>
                                    <div className="tx-status">Completed</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="transactions-summary">
                <div className="summary-title">Summary</div>
                <div className="summary-card income">
                    <div>Total Income</div>
                    <div>+$16,040.00</div>
                </div>
                <div className="summary-card expenses">
                    <div>Total Expenses</div>
                    <div>-$2,300.98</div>
                </div>
                <div className="summary-title">Export</div>
                {["CSV","PDF","Excel"].map(f => (
                    <button key={f} className="btn-outline">↓ Download {f}</button>
                ))}
            </div>
        </div>
    );
};

export default Transactions;