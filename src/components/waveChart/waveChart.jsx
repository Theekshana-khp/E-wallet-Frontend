import React, {useEffect} from "react";
import "../../style/wallet/components/waveChart.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function WaveChart({ chartData }) {
  const data = {
    labels: chartData.label,
    datasets: [
      {
        data: chartData.data,
        borderColor: "rgb(7, 7, 118)",
        backgroundColor: "rgba(64, 64, 101, 0.2)",
        fill: true,
        tension: 0.5
      }
    ]
  };

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Users Gained between 2016-2020"
      },
      legend: {
        display: false
      },
    },
    scales: { 
        y: {
            beginAtZero: true
        }
  }
  };

  useEffect(() => {
      fetch("http://localhost:8085/dashboard",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res => res.json())
      .then(data => {
        console.log("Fetched wave data:", data);
      })
      .catch(err => {
        console.error("Error fetching wave data:", err);
      });
  })

  return (
    <div style={{ width: "100%", height: "260px" }}>
      <Line data={data} options={option} />
    </div>
  );
}

export default WaveChart;