'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { monthlySales } from '../data/salesData';

// LINE CHART — shows Sales, Profit, and Target across 12 months
export default function MonthlySalesChart() {
  return (
    // Makes chart responsive to its container size
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={monthlySales}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {/* Dashed background grid */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* X-axis uses the 'month' field (Jan, Feb...) */}
        <XAxis dataKey="month" />

        {/* Y-axis auto-scales */}
        <YAxis />

        {/* Hover tooltip: formats numbers as $25,000 */}
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />

        {/* Color legend at bottom */}
        <Legend />

        {/* Purple solid line for Sales */}
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          strokeWidth={2}
          name="Sales"
        />

        {/* Green solid line for Profit */}
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#82ca9d"
          strokeWidth={2}
          name="Profit"
        />

        {/* Orange DASHED line for Target */}
        <Line
          type="monotone"
          dataKey="target"
          stroke="#ff7300"
          strokeDasharray="5 5"
          name="Target"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
