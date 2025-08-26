import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import "../Components/PagesStyles/CartScreen.css";

const CartScreen = () => {
  const shopCtx = useContext(ShopContext);

  if (!shopCtx) return null;

  const { cartItems, removeFromCart, updateQuantity } = shopCtx;

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.newPrice * item.quantity,
    0
  );

  const handleOrder = (item: any) => {
    alert(`✅ Ordered ${item.quantity} x ${item.name} (Size: ${item.size}) for ₹${item.newPrice * item.quantity}`);
    // Here you could integrate API call / Firebase order collection
  };

  const handleOrderAll = () => {
    if (cartItems.length === 0) return;
    alert(`✅ Ordered all ${totalQuantity} items for a total of ₹${totalAmount}`);
    // API / Firebase order logic for all items
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Size</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Total (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.name} className="cart-img" /></td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.newPrice}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>{item.newPrice * item.quantity}</td>
                  <td>
                    <button className="delete-btn" onClick={() => removeFromCart(item.id)}>Delete</button>
                    <button className="order-btn" onClick={() => handleOrder(item)}>Order</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>Total Items: {totalQuantity}</p>
            <p>Total Amount: ₹{totalAmount}</p>
            <button className="order-all-btn" onClick={handleOrderAll}>
              Order All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
