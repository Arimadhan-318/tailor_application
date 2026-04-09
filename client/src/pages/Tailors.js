import React, { useEffect, useState } from 'react';
import TailorForm from '../components/TailorForm';
import TailorsTable from '../components/TailorsTable';
import { tailorAPI } from '../services/api';
import '../styles/Tailors.css';

function Tailors() {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchTailors();
  }, []);

  const fetchTailors = async () => {
    try {
      setLoading(true);
      const response = await tailorAPI.getAll();
      setTailors(response.data.data);
    } catch (error) {
      console.error('Error fetching tailors:', error);
      setMessage({ type: 'error', text: 'Failed to load tailors' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTailor = async (formData) => {
    try {
      await tailorAPI.create(formData);
      setMessage({ type: 'success', text: 'Tailor added successfully!' });
      fetchTailors();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error adding tailor:', error);
      setMessage({ type: 'error', text: 'Failed to add tailor' });
    }
  };

  const handleDeleteTailor = async (tailorId) => {
    if (window.confirm('Are you sure you want to delete this tailor?')) {
      try {
        await tailorAPI.delete(tailorId);
        setMessage({ type: 'success', text: 'Tailor deleted successfully!' });
        fetchTailors();
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        console.error('Error deleting tailor:', error);
        setMessage({ type: 'error', text: 'Failed to delete tailor' });
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Manage Tailors</h1>
        <p>Add and manage tailor profiles</p>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="form-card">
        <h3>Add New Tailor</h3>
        <TailorForm onSubmit={handleAddTailor} loading={loading} />
      </div>

      <div className="tailors-section">
        <h3>All Tailors ({tailors.length})</h3>
        {loading ? (
          <p>Loading tailors...</p>
        ) : (
          <TailorsTable
            tailors={tailors}
            onDelete={handleDeleteTailor}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

export default Tailors;
