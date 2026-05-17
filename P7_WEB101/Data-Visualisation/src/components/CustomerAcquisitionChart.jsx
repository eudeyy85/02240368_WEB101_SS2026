'use client';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,   // Needed for text-based X axis
  LinearScale,     // Needed for number-based Y axis
  BarElement,      // The actual bar shapes
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { format, parseISO } from 'date-fns';  // Date formatting helpers
import { customerData } from '../data/salesData';

// ⚠️ Must register before using — ChartJS requires this
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// STACKED BAR CHART — New vs Returning customers per month
export default function CustomerAcquisitionChart() {
  // ChartJS needs data in this specific {labels, datasets} shape
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Convert "2023-01-01" → "Jan 2023" for readable X-axis labels
    const labels = customerData.map(item =>
      format(parseISO(item.date), 'MMM yyyy')
    );

    setChartData({
      labels,
      datasets: [
        {
          label: 'New Customers',
          data: customerData.map(item => item.newCustomers),
          backgroundColor: 'rgba(53, 162, 235, 0.7)',  // Blue
        },
        {
          label: 'Returning Customers',
          data: customerData.map(item => item.returningCustomers),
          backgroundColor: 'rgba(255, 99, 132, 0.7)',  // Red/pink
        }
      ],
    });
  }, []); // Runs once on mount

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Fills container height
    scales: {
      x: { stacked: true },      // Bars stack on top of each other
      y: { stacked: true, beginAtZero: true },
    },
  };

  return <Bar options={options} data={chartData} />;
}
