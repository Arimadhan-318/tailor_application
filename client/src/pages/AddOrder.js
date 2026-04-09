import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import { orderAPI, tailorAPI, customerAPI } from '../services/api';
import '../styles/AddOrder.css';

function AddOrder() {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchTailors();
  }, []);

  const fetchTailors = async () => {
    try {
      const response = await tailorAPI.getAll();
      setTailors(response.data.data);
    } catch (error) {
      console.error('Error fetching tailors:', error);
      setMessage({ type: 'error', text: 'Failed to load tailors' });
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setMessage(null);

      // Create or find customer
      let customerId;
      try {
        const customerResponse = await customerAPI.create({
          name: formData.customerName,
          phone: formData.customerPhone,
          address: formData.customerAddress
        });
        customerId = customerResponse.data.data.id;
      } catch (error) {
        console.error('Error creating customer:', error);
        setMessage({ type: 'error', text: 'Failed to create customer' });
        setLoading(false);
        return;
      }

      // Create order
      const orderData = {
        customerId,
        dressType: formData.dressType,
        tailorId: formData.tailorId,
        givenDate: formData.givenDate,
        deliveryDate: formData.deliveryDate,
        notes: formData.notes
      };

      await orderAPI.create(orderData);
      setMessage({ 
        type: 'success', 
        text: 'Order created successfully!' 
      });

      // Reset form
      setTimeout(() => {
        setMessage(null);
      }, 3000);

    } catch (error) {
      console.error('Error creating order:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to create order' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Create New Order</h1>
        <p>Add a new tailoring order to the system</p>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="form-card">
        <OrderForm 
          onSubmit={handleSubmit}
          tailors={tailors}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default AddOrder;
