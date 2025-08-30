import  { useState } from 'react';
import { Link } from 'react-router-dom';
//import AddProduct from './AddProduct';
import '../Styles/Home.css'

const Home = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  return (
    <div className="navbar">
      <span className='text'>ADMIN-DASHBOARD</span>
      <Link to="/Dashboard" className="nav-button dash">Dashboard</Link>

      <div className="dropdown">
        <button className="nav-button buttonpro" onClick={() => setShowProducts(!showProducts)}>
          Products
        </button>
        {showProducts && (
          <div className="dropdown-content-products">
            <Link to="/AddProducts" className="dropdown-button">AddProducts</Link>
            <Link to="/EditProducts" className="dropdown-button">EditProducts</Link>
          </div>
        )}
      </div>

      <div className="dropdown">
        <button className="nav-button buttonorder" onClick={() => setShowOrders(!showOrders)}>
          Orders
        </button>
        {showOrders && (
          <div className="dropdown-content-orders">
            <Link to="/NewOrderScreen" className="dropdown-button">NewOrder</Link>
            <Link to="/CanceledOrderScreen" className="dropdown-button">CanceledOrder</Link>
          </div>
        )}
      </div>

      <Link to="/RegisteredUsers" className="nav-button1 users">Users</Link>
    </div>
  );
}

export default Home;
