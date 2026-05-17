'use client';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,  // Dots on the line
  LineElement,   // The line stroke
  Title,
  Tooltip,
  Filler,        // ⬅️ This fills the area UNDER the line
  Legend,
} from 'chart.js';
import { weeklyVisitors } from '../data/salesData';

// ⚠️ Must register — Filler is what creates the area chart effect
ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Filler, Legend
);

// AREA CHART — Weekly visitor count across 52 weeks
export default function WeeklyVisitorsChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Label each point as "Week 1", "Week 2" ... "Week 52"
    const labels = weeklyVisitors.map(item => `Week ${item.week}`);

    setChartData({
      labels,
      datasets: [
        {
          fill: true,                                    // ⬅️ Creates the filled area
          label: 'Weekly Visitors',
          data: weeklyVisitors.map(item => item.visitors),
          borderColor: 'rgb(75, 192, 192)',              // Teal line
          backgroundColor: 'rgba(75, 192, 192, 0.2)',   // Transparent teal fill
          tension: 0.4                                   // Curve smoothness
        }
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          // Format tooltip as "Weekly Visitors: 12,345"
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: { beginAtZero: false }  // Y axis starts near actual data range
    },
  };

  return <Line options={options} data={chartData} />;
}
