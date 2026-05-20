import './App.css';
import MonthlySalesChart from './components/MonthlySalesChart';
import ProductCategoryChart from './components/ProductCategoryChart';
import CustomerAcquisitionChart from './components/CustomerAcquisitionChart';
import WeeklyVisitorsChart from './components/WeeklyVisitorsChart';

// Main dashboard — renders all 4 charts in a 2x2 grid
export default function App() {
  return (
    <main className="main">
      <h1>Sales Analytics Dashboard</h1>

      <div className="grid">

        {/* Chart 1: Line chart — monthly sales/profit/target */}
        <section className="card">
          <h2>Monthly Sales Performance</h2>
          <div className="chartContainer">
            <MonthlySalesChart />
          </div>
        </section>

        {/* Chart 2: Pie chart — product category breakdown */}
        <section className="card">
          <h2>Product Category Distribution</h2>
          <div className="chartContainer">
            <ProductCategoryChart />
          </div>
        </section>

        {/* Chart 3: Stacked bar — new vs returning customers */}
        <section className="card">
          <h2>Customer Acquisition</h2>
          <div className="chartContainer">
            <CustomerAcquisitionChart />
          </div>
        </section>

        {/* Chart 4: Area chart — weekly visitor trends */}
        <section className="card">
          <h2>Weekly Visitors</h2>
          <div className="chartContainer">
            <WeeklyVisitorsChart />
          </div>
        </section>

      </div>
    </main>
  );
}