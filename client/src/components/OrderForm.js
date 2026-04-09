import React, { useState } from 'react';
import '../styles/Form.css';

function OrderForm({ onSubmit, initialData, tailors, loading }) {
  const [formData, setFormData] = useState(initialData || {
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    dressType: '',
    tailorId: '',
    givenDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Phone is required';
    if (!formData.customerAddress.trim()) newErrors.customerAddress = 'Address is required';
    if (!formData.dressType.trim()) newErrors.dressType = 'Dress type is required';
    if (!formData.tailorId) newErrors.tailorId = 'Tailor is required';
    if (!formData.givenDate) newErrors.givenDate = 'Given date is required';
    if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Customer Name *</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter customer name"
            className={errors.customerName ? 'input-error' : ''}
          />
          {errors.customerName && <span className="error-text">{errors.customerName}</span>}
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className={errors.customerPhone ? 'input-error' : ''}
          />
          {errors.customerPhone && <span className="error-text">{errors.customerPhone}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Address *</label>
        <textarea
          name="customerAddress"
          value={formData.customerAddress}
          onChange={handleChange}
          placeholder="Enter customer address"
          rows="3"
          className={errors.customerAddress ? 'input-error' : ''}
        />
        {errors.customerAddress && <span className="error-text">{errors.customerAddress}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Dress Type *</label>
          <input
            type="text"
            name="dressType"
            value={formData.dressType}
            onChange={handleChange}
            placeholder="e.g., Shirt, Pants, Saree"
            className={errors.dressType ? 'input-error' : ''}
          />
          {errors.dressType && <span className="error-text">{errors.dressType}</span>}
        </div>
        <div className="form-group">
          <label>Tailor *</label>
          <select
            name="tailorId"
            value={formData.tailorId}
            onChange={handleChange}
            className={errors.tailorId ? 'input-error' : ''}
          >
            <option value="">Select a tailor</option>
            {tailors && tailors.map(tailor => (
              <option key={tailor.id} value={tailor.id}>
                {tailor.name}
              </option>
            ))}
          </select>
          {errors.tailorId && <span className="error-text">{errors.tailorId}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Given Date *</label>
          <input
            type="date"
            name="givenDate"
            value={formData.givenDate}
            onChange={handleChange}
            className={errors.givenDate ? 'input-error' : ''}
          />
          {errors.givenDate && <span className="error-text">{errors.givenDate}</span>}
        </div>
        <div className="form-group">
          <label>Delivery Date *</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className={errors.deliveryDate ? 'input-error' : ''}
          />
          {errors.deliveryDate && <span className="error-text">{errors.deliveryDate}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter any additional notes"
          rows="3"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Submitting...' : 'Create Order'}
      </button>
    </form>
  );
}

export default OrderForm;
