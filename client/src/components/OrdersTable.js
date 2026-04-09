import React from 'react';
import { getStatusColor, getStatusBgColor, isOverdue, formatDate, calculateDaysLeft } from '../utils/helpers';
import '../styles/Table.css';

function OrdersTable({ orders, onEdit, onDelete, loading }) {
  if (!orders || orders.length === 0) {
    return <p className="no-data">No orders found</p>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Dress Type</th>
            <th>Tailor</th>
            <th>Delivery Date</th>
            <th>Days Left</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            const daysLeft = calculateDaysLeft(order.deliveryDate);
            const overdue = isOverdue(order.deliveryDate) && order.status !== 'Delivered';
            
            return (
              <tr key={order.id} className={overdue ? 'row-overdue' : ''}>
                <td>#{order.id}</td>
                <td>{order.Customer?.name || 'Unknown'}</td>
                <td>{order.Customer?.phone || '-'}</td>
                <td>{order.dressType}</td>
                <td>{order.Tailor?.name || 'Unknown'}</td>
                <td>
                  <span className={overdue ? 'overdue-date' : ''}>
                    {formatDate(order.deliveryDate)}
                  </span>
                </td>
                <td>
                  <span className={overdue ? 'overdue-badge' : ''}>
                    {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days`}
                  </span>
                </td>
                <td>
                  <span 
                    className="status-badge"
                    style={{
                      backgroundColor: getStatusBgColor(order.status),
                      color: getStatusColor(order.status),
                      border: `2px solid ${getStatusColor(order.status)}`
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-small btn-edit"
                    onClick={() => onEdit(order)}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-small btn-delete"
                    onClick={() => onDelete(order.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
