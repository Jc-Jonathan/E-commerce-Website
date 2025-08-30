import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig"; // adjust path if needed

// 1. Define the type for your context
interface ShopContextType {
  allProducts: any[];
  newCollection: any[];
  relatedProducts: any[];
  popularProducts: any[];
  notifications: any[];
  cartItems: any[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// 2. Create context with that type (allow null initially)
export const ShopContext = createContext<ShopContextType | null>(null);

// 3. Provider component
const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [newCollection, setNewCollection] = useState<any[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribeProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const products: any[] = [];
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      setAllProducts(products);
      setNewCollection(products.filter((p) => p.tag === "newcollection" || !p.tag));
      setRelatedProducts(products.filter((p) => p.tag === "newcollection" || !p.tag));
      setPopularProducts(products.filter((p) => p.tag === "popular" || !p.tag));
    }, (error) => {
      console.error("Error fetching products:", error);
    });

    const unsubscribeNotifications = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const notifList: any[] = [];
      snapshot.forEach((doc) => {
        notifList.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(notifList);
    }, (error) => {
      console.error("Error fetching notifications:", error);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeNotifications();
    };
  }, []);

  // 🛒 Cart logic
  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const contextValue: ShopContextType = {
    allProducts,
    newCollection,
    relatedProducts,
    popularProducts,
    notifications,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
