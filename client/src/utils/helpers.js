export const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return '#FFD700'; // Yellow
    case 'In Progress':
      return '#00A8FF'; // Blue
    case 'Completed':
      return '#00C851'; // Green
    case 'Delivered':
      return '#808080'; // Gray
    default:
      return '#000000';
  }
};

export const getStatusBgColor = (status) => {
  switch (status) {
    case 'Pending':
      return '#FFFACD';
    case 'In Progress':
      return '#E0F4FF';
    case 'Completed':
      return '#E8F5E9';
    case 'Delivered':
      return '#F5F5F5';
    default:
      return '#FFFFFF';
  }
};

export const isOverdue = (deliveryDate) => {
  return new Date(deliveryDate) < new Date();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const calculateDaysLeft = (deliveryDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const delivery = new Date(deliveryDate);
  delivery.setHours(0, 0, 0, 0);
  const diffTime = delivery - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
