import React, { useEffect, useState } from 'react';
import OrdersTable from '../components/OrdersTable';
import { orderAPI, tailorAPI } from '../services/api';
import '../styles/Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    tailorId: '',
    search: ''
  });
  const [editingOrder, setEditingOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchTailors();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (filters.status) {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    if (filters.tailorId) {
      filtered = filtered.filter(order => order.tailorId === filters.tailorId);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(order =>
        order.Customer?.name?.toLowerCase().includes(searchLower) ||
        order.dressType?.toLowerCase().includes(searchLower) ||
        order.id.toString().includes(searchLower)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, filters]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAll();
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setMessage({ type: 'error', text: 'Failed to load orders' });
    } finally {
      setLoading(false);
    }
  };

  const fetchTailors = async () => {
    try {
      const response = await tailorAPI.getAll();
      setTailors(response.data.data);
    } catch (error) {
      console.error('Error fetching tailors:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;

    try {
      await orderAPI.update(editingOrder.id, {
        status: editingOrder.status,
        deliveryDate: editingOrder.deliveryDate,
        notes: editingOrder.notes
      });

      setMessage({ type: 'success', text: 'Order updated successfully!' });
      setShowEditModal(false);
      fetchOrders();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error updating order:', error);
      setMessage({ type: 'error', text: 'Failed to update order' });
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await orderAPI.delete(orderId);
        setMessage({ type: 'success', text: 'Order deleted successfully!' });
        fetchOrders();
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        console.error('Error deleting order:', error);
        setMessage({ type: 'error', text: 'Failed to delete order' });
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Orders</h1>
        <p>Manage and track all tailoring orders</p>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="filters-section">
        <input
          type="text"
          name="search"
          placeholder="Search by customer name, dress type, or order ID..."
          value={filters.search}
          onChange={handleFilterChange}
          className="filter-input"
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Delivered">Delivered</option>
        </select>

        <select
          name="tailorId"
          value={filters.tailorId}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Tailors</option>
          {tailors.map(tailor => (
            <option key={tailor.id} value={tailor.id}>
              {tailor.name}
            </option>
          ))}
        </select>
      </div>

      <p className="orders-count">Found {filteredOrders.length} order(s)</p>

      <OrdersTable
        orders={filteredOrders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {showEditModal && editingOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Order #{editingOrder.id}</h3>
              <button 
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="modal-body">
              <div className="form-group">
                <label>Status</label>
                <select
                  value={editingOrder.status}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    status: e.target.value
                  })}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div className="form-group">
                <label>Delivery Date</label>
                <input
                  type="date"
                  value={editingOrder.deliveryDate?.split('T')[0] || ''}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    deliveryDate: e.target.value
                  })}
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={editingOrder.notes || ''}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    notes: e.target.value
                  })}
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
