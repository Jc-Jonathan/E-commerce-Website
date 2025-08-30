import  { useState } from 'react';
import '../Styles/Addproduct.css';
import { db } from '../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    category: '',
    newPrice: '',
    oldPrice: '',
    size: '',
    tag: '', // ✅ add tag field
  });

  const handleChange = (e: any) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), product);
      alert('Product added successfully!');
      setProduct({
        name: '',
        image: '',
        category: '',
        newPrice: '',
        oldPrice: '',
        size: '',
        tag: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error adding product.');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
        <input type="number" name="newPrice" placeholder="New Price" value={product.newPrice} onChange={handleChange} required />
        <input type="number" name="oldPrice" placeholder="Old Price" value={product.oldPrice} onChange={handleChange} required />
        <input type="text" name="size" placeholder="Size" value={product.size} onChange={handleChange} required />

        {/* ✅ Radio buttons for tag */}
        <div className="radio-group">
          <label><input type="radio" name="tag" value="popular" checked={product.tag === 'popular'} onChange={handleChange} />Popular</label>
          <label><input type="radio" name="tag" value="newcollection" checked={product.tag === 'newcollection'} onChange={handleChange} />NewCollection</label>
          <label><input type="radio" name="tag" value="" checked={product.tag === ''} onChange={handleChange} />RelatedProduct</label>
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
