import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddOrder from './pages/AddOrder';
import Orders from './pages/Orders';
import Tailors from './pages/Tailors';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-order" element={<AddOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tailors" element={<Tailors />} />
      </Routes>
    </Router>
  );
}

export default App;
