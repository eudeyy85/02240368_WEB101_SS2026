'use client';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { productSales } from '../data/salesData';

// 5 colors — one per product category slice
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// PIE CHART — shows each product category as a percentage slice
export default function ProductCategoryChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={productSales}
          cx="50%"            // Horizontally centered
          cy="50%"            // Vertically centered
          labelLine={false}   // No lines from slices to labels
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"     // The number field in our data
          // Shows "Electronics 35%" on each slice
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {/* Give each slice its own color from COLORS array */}
          {productSales.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        {/* Hover tooltip */}
        <Tooltip formatter={(value) => `${value}%`} />

        {/* Legend showing color = category name */}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}