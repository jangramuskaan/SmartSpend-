import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const { expenses } = useContext(ExpenseContext);

  const totalExpenses = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  // Group by category
  const categories = {};
  expenses.forEach(exp => {
    categories[exp.category] = (categories[exp.category] || 0) + parseFloat(exp.amount);
  });

  // Calculate statistics
  const avgExpense = expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : 0;
  const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(e => parseFloat(e.amount))).toFixed(2) : 0;

  const chartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Amount by Category',
        data: Object.values(categories),
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          padding: 15,
          font: { size: 12, weight: '500' },
        },
      },
    },
  };

  return (
    <div className="page-container">
      <h2>Financial Dashboard</h2>
      
      {/* Stats Cards Grid */}
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Spent</p>
            <h3 className="stat-value">${totalExpenses.toFixed(2)}</h3>
          </div>
          <div className="stat-icon">💰</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Expenses</p>
            <h3 className="stat-value">{expenses.length}</h3>
          </div>
          <div className="stat-icon">📊</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-content">
            <p className="stat-label">Average Expense</p>
            <h3 className="stat-value">${avgExpense}</h3>
          </div>
          <div className="stat-icon">📈</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-content">
            <p className="stat-label">Max Expense</p>
            <h3 className="stat-value">${maxExpense}</h3>
          </div>
          <div className="stat-icon">🎯</div>
        </div>
      </div>

      {/* Charts Grid */}
      {expenses.length > 0 ? (
        <div className="charts-grid">
          <div className="card chart-container">
            <h3>Spending by Category</h3>
            <Pie data={chartData} options={chartOptions} />
          </div>
          
          <div className="card chart-container">
            <h3>Category Breakdown</h3>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      ) : (
        <div className="card empty-state">
          <p>📊 No expenses recorded yet. Add some to see your dashboard!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;