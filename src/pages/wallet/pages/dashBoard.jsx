import React, {useEffect, useState} from "react";
import "../../../style/wallet/pages/dashBoard.css";
import WaveChart from "../../../components/waveChart/waveChart";
import transferImg from "../../../assets/images/logo/transfer.png";
import depositImg from "../../../assets/images/logo/deposit.png";
import withdrawImg from "../../../assets/images/logo/withdraw.png";
import DashRightPanel from "../../../components/dashRightPanel/dashRightPanel";

import keycloak from "../../../keycloak/keycloak";

function Dashboard({navigater}) {
    const [period, setPeriod] = useState("Day");
    const [labels, setLabels] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [transactions, setTransactions] = useState([]);
    const [accountCredit, setAccountCredit] = useState(0);
    const [notification, setNotification] = useState(0);

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
                setNotification(data.notifications);
                setAccountCredit(data.accounts);
                setIsDataLoaded(true);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (transactions.length === 0) return;
        let date = new Date();
        let tempLabels = [];
        let tempdata=[];
        let lastTransactionId = '' ;
        let lastTransactionDay = new Date(transactions[0].createdAt);

        let accountCredit = transactions[transactions.length - 1]?.currentWalletAmount || 0;

        if (period === "Day") {
            for (let i = 0; i < 14; i++) {
                let day = date.getDate();
                let month = date.toLocaleString("default", { month: "short" });

                let currentDate = date.toISOString().split("T")[0];

                let todayTransactions = transactions.filter(
                    tx => {
                        return tx.createdAt.split("T")[0] === currentDate
                    }
                );


                if(todayTransactions.length > 0){
                    lastTransactionId = todayTransactions[todayTransactions.length-1].transactionId;
                    accountCredit = todayTransactions[0].currentWalletAmount;
                }else{

                    if(lastTransactionDay >= date){
                        accountCredit=0;
                    }else{
                        for(let j =0; j < transactions.length; j++){
                            if(transactions[j].transactionId === lastTransactionId){
                                accountCredit = transactions[j-1].currentWalletAmount;
                            }
                        }
                    }
                }

                tempLabels.push(`${month} ${day}`);
                tempdata.push(accountCredit);

                date.setDate(date.getDate() - 1);
            }
        }else if(period === "Month") {

            for (let i = 0; i < 12; i++) {

                let currentMonth = date.getMonth();
                let currentYear = date.getFullYear();

                let monthName = date.toLocaleString("default", {
                    month: "short"
                });

                let monthTransactions = transactions.filter(tx => {

                    let txDate = new Date(tx.createdAt);

                    return (
                        txDate.getMonth() === currentMonth &&
                        txDate.getFullYear() === currentYear
                    );
                });

                if(monthTransactions.length > 0){

                    monthTransactions.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    accountCredit = monthTransactions[0].currentWalletAmount;

                }else{
                    accountCredit = 0;
                }

                tempLabels.push(monthName);
                tempdata.push(accountCredit);

                date.setMonth(date.getMonth() - 1);
            }
        }else if(period === "Week") {
            for (let i = 0; i < 12; i++) {
                let month = date.toLocaleString("default" , {month : "short"});

                let currentDate = date.toISOString().split("T")[0];

                let todayTransactions = transactions.filter(
                    tx => tx.createdAt.split("T")[0] === currentDate
                );

                if(todayTransactions.length > 0){
                    lastTransactionId = todayTransactions[todayTransactions.length-1].transactionId;
                    accountCredit = todayTransactions[0].currentWalletAmount;
                }else{

                    if(lastTransactionDay >= date){
                        accountCredit=0;
                    }else{
                        for(let j =0; j < transactions.length; j++){
                            if(transactions[j].transactionId === lastTransactionId){
                                accountCredit = transactions[j-1].currentWalletAmount;
                            }
                        }
                    }
                }

                tempdata.push(accountCredit);

                let day = date.getDate();

                tempLabels.push(`${month} ${day}`);
                date.setDate(date.getDate() - 7);
            }
        }
        setLabels(tempLabels.reverse());
        setChartData(tempdata.reverse());
    }, [period, transactions]);

    if(!isDataLoaded) {
        return (
            <div>Data Loading</div>
        )
    }

    return (
        <div className="dashboard">
            <div className="dashboard-left">
                <div className="card" style={{maxHeight:"370px"}}>
                    <div className="card-header">
                        <span className="card-title">Account Balance</span>
                    </div>
                    <WaveChart chartData={{ label: labels, data: chartData }} />
                
                    <div className="period-buttons" style={{marginTop:"10px"}}>
                        {["Day","Week","Month"].map(p => (
                            <button key={p} className={`chip ${period === p ? "active" : ""}`} onClick={() => setPeriod(p)}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="card" style={{maxHeight:"350px" , overflow:"auto" }}>
                    <div className="card-header" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <span className="card-title">Recent Transactions</span>
                        <span style={{fontWeight:"700" , fontSize:"12px" , color:"#9f3636"}}>See All</span>
                    </div>

                    {transactions.slice().reverse().map((tx,index )=>(index <10)&& (
                        <div key={tx.transactionId}>
                            <div className="tx-row">
                                <div className="avatar">
                                    <img style={{width:"25px",height:"25px"}}
                                        src={
                                            tx.type === "TRANSFER"
                                                ? transferImg
                                                : tx.type === "DEPOSIT"
                                                    ? depositImg
                                                    : withdrawImg
                                        }
                                        alt="transaction"
                                    />
                                </div>                                <div className="tx-info">
                                    <div className="tx-name">{tx.description}</div>
                                    <div className="tx-sub">Date {tx.createdAt.split('T')[0]}</div>
                                </div>
                                <div className={`tx-amount ${tx.type === "DEPOSIT" ? "credit" : tx.type === "WITHDRAW" ? "debit" :"" }`}>
                                    {tx.type === "DEPOSIT" ? "+" : tx.type === "WITHDRAW" ? "-" :"" }RS {Math.abs(tx.amount).toLocaleString("en",{minimumFractionDigits:2})}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="dashboard-Right" style={{overflow:"hidden"}}>
                <DashRightPanel accountDetails={accountCredit} notifications={notification} navigate={navigater} />
            </div>
        </div>
    );
}

export default Dashboard;