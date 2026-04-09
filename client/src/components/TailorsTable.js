import React from 'react';
import '../styles/Table.css';

function TailorsTable({ tailors, onDelete, loading }) {
  if (!tailors || tailors.length === 0) {
    return <p className="no-data">No tailors found</p>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tailors.map(tailor => (
            <tr key={tailor.id}>
              <td>#{tailor.id}</td>
              <td>{tailor.name}</td>
              <td>{tailor.phone}</td>
              <td>
                <button 
                  className="btn btn-small btn-delete"
                  onClick={() => onDelete(tailor.id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TailorsTable;
