import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/image0.jpg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";   // ✅ added search icon
import { ShopContext } from "../../Context/ShopContext";
import "./Navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [isOpen, setIsOpen] = useState(false);
  const [clickedOpen, setClickedOpen] = useState(false);
  const shopCtx = useContext(ShopContext);

  const notificationCount = shopCtx?.notifications.length || 0;
  const cartCount =
    shopCtx?.cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleMenuClick = (item: string) => {
    setMenu(item);
    setIsOpen(false);
    setClickedOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <img className="logo" src={logo} alt="logo not available" />
        <p className="para1">URBAN SNEAKER ROYALTY</p>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div
        className="hamburger-wrapper"
        onMouseEnter={() => {
          if (!clickedOpen) setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (!clickedOpen) setIsOpen(false);
        }}
        onClick={() => {
          setClickedOpen(!clickedOpen);
          setIsOpen(!clickedOpen ? true : false);
        }}
      >
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li onClick={() => handleMenuClick("shop")}>
            <Link className="editli" to="/Shop">
              Shop
            </Link>
            {menu === "shop" && <hr />}
          </li>
          <li onClick={() => handleMenuClick("mens")}>
            <Link className="editli" to="/mens">
              Men
            </Link>
            {menu === "mens" && <hr />}
          </li>
          <li onClick={() => handleMenuClick("womens")}>
            <Link className="editli" to="/womens">
              Women
            </Link>
            {menu === "womens" && <hr />}
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="nav-login-cart">
        <Link to="/SearchScreen">
          <button className="search">
            <FiSearch />
          </button>
        </Link>
        <Link to="/NotificationScreen">
          <button className="notification">
            <IoMdNotificationsOutline  />
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </button>
        </Link>
        <Link to="/ProfileScreen">
          <button className="profile">
            <IoPersonOutline/>
          </button>
        </Link>
        <Link to="/SignInScreen">
          <button className="login">
            <FiLogIn  />
          </button>
        </Link>
        <Link to="/CartScreen">
          <button className="cart">
            <HiOutlineShoppingBag/>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
