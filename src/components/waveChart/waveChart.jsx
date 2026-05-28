
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

  return (
    <div style={{ width: "100%", height: "260px" }}>
      <Line data={data} options={option} />
    </div>
  );
}

export default WaveChart;