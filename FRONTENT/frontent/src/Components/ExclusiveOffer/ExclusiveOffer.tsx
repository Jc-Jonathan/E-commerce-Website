import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "..//../FirebaseConfig";
import "../ExclusiveOffer/ExclusiveOffer.css";

interface Product {
  id: string;
  name: string;
  image: string;
  newPrice: number;
  oldPrice?: number;
  tag?: string;
}

const ExclusiveOffer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExclusiveProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("tag", "==", "exclusive"));
        const querySnapshot = await getDocs(q);

        const productsData: Product[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Product, "id">), // spread everything except id
          id: doc.id, // then safely add Firestore's id
        }));

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching exclusive products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExclusiveProducts();
  }, []);

  return (
    <div className="exclusive-offer-container">
      <h2 className="exclusive-title">✨ Exclusive Offers Just for You ✨</h2>

      {loading ? (
        <p className="loading-text">Loading exclusive deals...</p>
      ) : products.length === 0 ? (
        <p className="no-offers">No exclusive offers available at the moment.</p>
      ) : (
        <div className="exclusive-grid">
          {products.map((product) => (
            <div key={product.id} className="exclusive-card">
              <img src={product.image} alt={product.name} className="exclusive-img" />
              <div className="exclusive-details">
                <h3 className="exclusive-name">{product.name}</h3>
                <div className="exclusive-price">
                  <span className="new-price">${product.newPrice}</span>
                  {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
                </div>
                <button className="buy-btn">Grab Deal</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExclusiveOffer;
