import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { orderAPI } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    deliveredOrders: 0,
    ordersByTailor: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getDashboardStats();
      setStats(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="page-container"><p>Loading dashboard...</p></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to Tailor Management System</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="stats-grid">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="📦"
          color="#FF6B6B"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon="⏳"
          color="#FFD700"
        />
        <StatCard
          title="Completed Orders"
          value={stats.completedOrders}
          icon="✅"
          color="#00C851"
        />
        <StatCard
          title="Delivered Orders"
          value={stats.deliveredOrders}
          icon="🚚"
          color="#808080"
        />
      </div>

      <div className="dashboard-actions">
        <button className="btn btn-primary" onClick={() => navigate('/add-order')}>
          ➕ Create New Order
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/orders')}>
          📋 View All Orders
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/tailors')}>
          👥 Manage Tailors
        </button>
      </div>

      {stats.ordersByTailor && stats.ordersByTailor.length > 0 && (
        <div className="dashboard-section">
          <h2>Orders by Tailor</h2>
          <div className="tailor-stats">
            {stats.ordersByTailor.map((item) => (
              <div key={item.tailorId} className="tailor-stat-item">
                <span className="tailor-name">{item.Tailor?.name || `Tailor ${item.tailorId}`}</span>
                <span className="tailor-count">{item.count} orders</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
