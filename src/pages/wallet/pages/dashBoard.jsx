import React, {useEffect, useState} from "react";
import "../../../style/wallet/pages/dashBoard.css";
import WaveChart from "../../../components/waveChart/waveChart";
import DashRightPanel from "../../../components/dashRightPanel/dashRightPanel";
import keycloak from "../../../keycloak/keycloak";

function Dashboard() {
    const [period, setPeriod] = useState("Day");
    const [labels, setLabels] = useState([]);
    const [chartData, setChartData] = useState([]);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8085/dashboard",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${keycloak.token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data.transactions);
                console.log((data.transactions).type);
                console.log(data.transactions);
            })
            .catch((err) => console.log(err));

        let date = new Date();
        let tempLabels = [];
        let tempdata=[];

        let accountCredit = transactions[transactions.length - 1]?.currentWalletAmount || 0;

        if (period === "Day") {
            for (let i = 0; i < 14; i++) {
                let day = date.getDate();
                let month = date.toLocaleString("default", { month: "short" });

                let currentDate = date.toISOString().split("T")[0];

                let todayTransactions = transactions.filter(
                    tx => tx.createdAt.split("T")[0] === currentDate
                );


                if(todayTransactions.length > 0){
                    accountCredit = todayTransactions[0].currentWalletAmount;
                }

                tempLabels.push(`${month} ${day}`);
                tempdata.push(accountCredit);

                date.setDate(date.getDate() - 1);
            }
        }else if(period === "Month") {
            for (let i = 0; i < 12; i++) {
                let month = date.toLocaleString("default", { month: "short" });

                tempLabels.push(`${month}`);
                date.setMonth(date.getMonth() - 1);
            }
        }else if(period === "Week") {
            for (let i = 0; i < 12; i++) {
                let month = date.toLocaleString("default" , {month : "short"});
                let day = date.getDate();

                tempLabels.push(`${month} ${day}`);
                date.setDate(date.getDate() - 7);
            }
        }else if(period === "Year") {
            for (let i = 0; i < 5; i++) {
                let year = date.getFullYear();

                tempLabels.push(`${year}`);
                date.setFullYear(date.getFullYear() - 1);
            }
        }
        setLabels(tempLabels.reverse());
        setChartData(tempdata.reverse());
    },[period , transactions])

    const avBg = ["#ff5252", "#ff8a65", "#ffb74d", "#4db6ac"];

    return (
        <div className="dashboard">
            <div className="dashboard-left">
                <div className="card" style={{maxHeight:"370px"}}>
                    <div className="card-header">
                        <span className="card-title">Account Balance</span>
                    </div>
                    <WaveChart chartData={{ label: labels, data: chartData }} />
                
                    <div className="period-buttons" style={{marginTop:"10px"}}>
                        {["Day","Week","Month","Year"].map(p => (
                            <button key={p} className={`chip ${period === p ? "active" : ""}`} onClick={() => setPeriod(p)}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="card" style={{maxHeight:"350px" , overflow:"auto" }}>
                    <div className="card-header">
                        <span className="card-title">Recent Transactions</span>
                        <select className="sort-select">
                            <option>Month</option>
                            <option>Week</option>
                        </select>
                    </div>

                    {transactions.map((tx,index )=>(index <10)&& (
                        <div key={tx.transactionId}>
                            <div className="tx-row">
                                <div className="avatar" style={{ background: avBg[avBg.length] }}>{tx.avatar}</div>
                                <div className="tx-info">
                                    <div className="tx-name">{tx.description}</div>
                                    <div className="tx-sub">Date {tx.createdAt.split('T')[0]}</div>
                                </div>
                                <div className={`tx-amount ${tx.type === "credit" ? "credit" : "debit"}`}>
                                    {tx.type === "credit" ? "+" : "−"}${Math.abs(tx.amount).toLocaleString("en",{minimumFractionDigits:2})}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="dashboard-Right" style={{overflow:"hidden"}}>
                <DashRightPanel />
            </div>
        </div>
    );
}

export default Dashboard;