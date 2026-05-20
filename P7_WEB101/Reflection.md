# Reflection - Practical Assignment 7: Data Visualization Dashboard

## a) Documentation.

### Main Concepts Applied.

**Recharts Component-Based Charting**
Recharts is a declarative charting library built on React and D3 that lets you compose charts from individual components. The dashboard used LineChart with multiple Line components for the monthly sales chart, and PieChart with Pie and Cell components for the product category chart. Each chart element such as XAxis, YAxis, Tooltip, Legend, and CartesianGrid is its own composable component passed as children, making the chart structure readable and easy to modify.

**ResponsiveContainer for Fluid Layouts**
Recharts' ResponsiveContainer wraps any chart and listens to its parent element's resize events, passing the computed width and height down to the chart. Setting width="100%" and height="100%" ensures every chart fills its card container at any viewport size without hardcoding pixel dimensions.

**Chart.js Module Registration**
Chart.js uses a tree-shakeable architecture where only the modules you explicitly register are included in the bundle. Before rendering any react-chartjs-2 component, all required scales, elements, and plugins must be passed to ChartJS.register(). Forgetting to register a module such as Filler causes the feature to silently have no effect.

**Filler Plugin for Area Charts**
The Filler plugin is a Chart.js plugin that fills the area beneath a line dataset. It must be imported from chart.js and included in the ChartJS.register() call. Once registered, setting fill: true on a dataset activates the area effect. Without registration, the line renders normally with no fill regardless of the fill property value.

**React useState and useEffect for Chart Data**
Chart.js components expect data in a specific { labels, datasets } object shape. useState holds this object as local component state, initialised with empty arrays. useEffect with an empty dependency array runs once on mount and transforms the raw imported data arrays into the format Chart.js expects, then calls the state setter. This pattern avoids re-running the transformation on every render.

**date-fns for Date Formatting**
The customerData array contains ISO date strings such as '2023-01-01'. The date-fns library's parseISO() converts these strings into Date objects, and format() converts them into readable labels such as 'Jan 2023' for the bar chart X-axis. This is cleaner and more reliable than manual string slicing.

**Stacked Bar Charts**
The Customer Acquisition chart uses Chart.js stacked bar configuration. Setting stacked: true on both the x and y scale objects causes each month's new and returning customer bars to stack vertically rather than sit side by side, making the total customer count per month immediately visible while still showing the breakdown.

**Data-Driven Rendering with Array.map()**
The productSales array is mapped over to render a Cell component for each slice in the pie chart. The COLORS array is cycled using modulo (index % COLORS.length) so the color assignment works for any number of data entries, not just the current five categories.

---

## b) Reflection.

### What I Learned.

This assignment taught me that different charting libraries have different mental models, and understanding those models is essential before writing any code. Recharts is declarative and component-based, so building a chart feels like writing JSX. Chart.js is more configuration-driven, expecting data and options as plain JavaScript objects passed to a single component.

I learned that Chart.js's tree-shakeable architecture means nothing works until you register it. This was not obvious at first because the chart renders without errors even when a module is missing — it just silently does nothing. Understanding this saved me from hours of debugging later.

Working with useEffect to transform data on mount gave me a clearer understanding of when and why to use the effect hook. The empty dependency array is the key detail — it ensures the transformation runs exactly once rather than on every render, which would cause infinite re-render loops if the transformation also triggered a state update.

I also learned the difference between making charts responsive in the two libraries. In Recharts, ResponsiveContainer handles everything automatically. In react-chartjs-2, I had to set maintainAspectRatio: false in the options object and ensure the parent div has an explicit height, otherwise the chart collapses to zero height.

The date-fns library taught me the value of using a dedicated utility library for date operations rather than writing manual string parsing. parseISO and format together handle edge cases and timezone behaviour that manual slicing would get wrong.

### Challenges Faced and Solutions.

**Chart Height Collapsing to Zero**
The react-chartjs-2 Bar and Line charts rendered with zero height initially. The chart requires its parent container to have an explicit height set in CSS, and maintainAspectRatio must be set to false in the options so the chart fills its container height rather than maintaining a fixed aspect ratio. Adding height to the chartContainer class in App.css and setting maintainAspectRatio: false resolved this.

**Filler Plugin Not Producing Area Fill**
The Weekly Visitors chart rendered as a plain line with no area fill despite fill: true being set on the dataset. The issue was that the Filler plugin was not included in the ChartJS.register() call. Importing Filler from chart.js and adding it to the register call immediately produced the expected teal filled area beneath the line.

**Chart.js Module Not Registered Error**
When first creating the CustomerAcquisitionChart, the browser console showed an error about a missing scale. This was because CategoryScale and LinearScale had not been registered. Chart.js requires every scale, element, and plugin to be explicitly registered before use, unlike Recharts which includes everything by default.

**salesData Import Path**
The components are inside src/components/ but the data file is at src/data/salesData.js. The correct relative import path from inside a component is ../data/salesData, not ./data/salesData. Getting the path wrong caused a module not found error that was easy to fix once the directory structure was understood.

**Pie Chart Labels Overlapping**
With five category slices, the percentage labels rendered on top of each other on smaller slices. Setting labelLine={false} removed the connector lines and reduced clutter. The labels for very small slices such as Other at 5% still overlapped slightly, but this is a known limitation of rendering labels directly on slices without external label lines.

### Summary

Overall this assignment gave me practical experience working with two of the most widely used charting ecosystems in React — Recharts and react-chartjs-2. The key lesson was that each library has its own conventions and requirements that must be understood before effective use. Recharts rewards declarative component composition, while Chart.js rewards careful configuration and explicit module registration. Both approaches are valid, and knowing when to reach for each is a useful skill. I now feel confident implementing a variety of chart types, making them responsive, and feeding them real data from imported sources.

---

### References

- Recharts Team. (n.d.). Recharts Documentation. From https://recharts.org/en-US/
- Chart.js Team. (n.d.). Chart.js Documentation. From https://www.chartjs.org/docs/latest/
- react-chartjs-2 Team. (n.d.). react-chartjs-2 Documentation. From https://react-chartjs-2.js.org/
- Chart.js Team. (n.d.). Area Chart. From https://www.chartjs.org/docs/latest/charts/area.html
- date-fns Team. (n.d.). date-fns — Modern JavaScript Date Utility Library. From https://date-fns.org/
- React Team. (n.d.). useState Hook. From https://react.dev/reference/react/useState
- React Team. (n.d.). useEffect Hook. From https://react.dev/reference/react/useEffect
- recharts/recharts: Redefined Chart Library Built with React and D3. (n.d.). From https://github.com/recharts/recharts
