import React, { useState } from "react";
import '../../../style/wallet/pages/transactions.css';

const TRANSACTIONS = [
    { id: 1,  name: "Alice Johnson",   sub: "Wallet ID 123", type: "credit", amount: 100,    date: "Apr 01, 2026" },
    { id: 2,  name: "Bob Smith",       sub: "Wallet ID 234", type: "debit",  amount: 50,     date: "Apr 02, 2026" },
    { id: 3,  name: "Charlie Kumar",   sub: "Wallet ID 345", type: "credit", amount: 200,    date: "Apr 03, 2026" },
    { id: 4,  name: "Dana Lee",        sub: "Wallet ID 456", type: "debit",  amount: 75,     date: "Apr 03, 2026" },
    { id: 5,  name: "Eve Perera",      sub: "Wallet ID 567", type: "credit", amount: 500,    date: "Apr 04, 2026" },
    { id: 6,  name: "Frank Silva",     sub: "Wallet ID 678", type: "debit",  amount: 120,    date: "Apr 05, 2026" },
    { id: 7,  name: "Grace Fernando",  sub: "Wallet ID 789", type: "credit", amount: 340,    date: "Apr 06, 2026" },
    { id: 8,  name: "Hana Bandara",    sub: "Wallet ID 890", type: "debit",  amount: 90,     date: "Apr 06, 2026" },
];

const Transactions = ({transaction , account}) => {
    const [txFilter, setTxFilter] = useState("all");

    const filtered = txFilter === "all"
        ? transaction
        : transaction.filter(t => t.type === txFilter);

    const totalIncome   = TRANSACTIONS.filter(t => t.type === "credit").reduce((s, t) => s + t.amount, 0);
    const totalExpenses = TRANSACTIONS.filter(t => t.type === "debit").reduce((s, t) => s + t.amount, 0);
    const net = totalIncome - totalExpenses;

    const fmt = (v) => v.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    console.log(transaction);
    console.log(account);
    return (
        <div className="tx-content">
            <div className="tx-panel">
                <div className="tx-tabs">
                    {["all", "credit", "debit"].map(f => (
                        <div
                            key={f}
                            className={`tx-tab ${txFilter === f ? "active" : ""}`}
                            onClick={() => setTxFilter(f)}
                        >
                            {f === "all" ? "All" : f === "credit" ? "Income" : "Expenses"}
                        </div>
                    ))}
                </div>

                <div className="tx-list-area">
                    <div className="tx-list-header">
                        <span className="tx-section-title">Transaction History</span>
                        <button className="tx-export-btn">↓ Export CSV</button>
                    </div>

                    {filtered.map((tx, i) => (
                        <div key={tx.transactionId} className={`tx-list-item ${tx.type}`}>
                            {(i === 0 || filtered[i - 1]?.createdAt !== tx.createdAt) && (
                                <div className="tx-date-label">{tx.createdAt}</div>
                            )}
                            <div className="tx-row">
                                <div className={`tx-icon ${tx.type}`}>
                                    {tx.type === "credit" ? "+" : "−"}
                                </div>
                                <div className="tx-info">
                                    <div className="tx-name">
                                        {!(tx.fromWalletId)
                                            ? "You"
                                            : !(tx.toWalletId)
                                                ? "You"
                                                    : (tx.fromWalletId !== account.accountNumber)
                                                        ? tx.receiverName : tx.senderName
                                        }
                                    </div>
                                    <div className="tx-sub">{tx.description}</div>
                                </div>
                                <div className="tx-right">
                                    <div className={`tx-amount ${tx.type}`}>
                                        {tx.type === "credit" ? "+" : "−"}LKR {fmt(tx.amount)}
                                    </div>
                                    <div className="tx-status-badge">Completed</div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="tx-empty">No transactions found.</div>
                    )}
                </div>
            </div>

            <div className="tx-right">
                <p className="tx-section-title">Summary</p>

                <div className="tx-summary-card income">
                    <div className="tx-summary-label">Total Income</div>
                    <div className="tx-summary-val green">+LKR {fmt(totalIncome)}</div>
                </div>

                <div className="tx-summary-card expenses">
                    <div className="tx-summary-label">Total Expenses</div>
                    <div className="tx-summary-val red">−LKR {fmt(totalExpenses)}</div>
                </div>

                <div className="tx-summary-card net">
                    <div className="tx-summary-label">Net Balance</div>
                    <div className={`tx-summary-val ${net >= 0 ? "green" : "red"}`}>
                        {net >= 0 ? "+" : "−"}LKR {fmt(Math.abs(net))}
                    </div>
                </div>

                <p className="tx-section-title" style={{ marginTop: "20px" }}>Export</p>

                {["CSV", "PDF", "Excel"].map(f => (
                    <button key={f} className="tx-outline-btn">↓ Download {f}</button>
                ))}

                <p className="tx-section-title" style={{ marginTop: "20px" }}>Filters</p>

                <div className="tx-filter-group">
                    <label>From</label>
                    <input className="tx-input" type="date" />
                </div>
                <div className="tx-filter-group">
                    <label>To</label>
                    <input className="tx-input" type="date" />
                </div>
            </div>
        </div>
    );
};

export default Transactions;
