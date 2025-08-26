import React, { useEffect, useState } from 'react';
import '../Styles/EditProduct.css';
import { db } from '../FirebaseConfig';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const EditProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: '',
    newPrice: '',
    oldPrice: '',
    size: '',
    tag: '' // ✅ Include tag in form
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const startEditing = (product: any) => {
    setEditingProduct(product.id);
    setFormData(product);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'products', editingProduct as string), formData);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="edit-products-container">
      <h2>Products List</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Size</th>
            <th>New Price</th>
            <th>Old Price</th>
            <th>Product Type</th> {/* ✅ New Column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><img src={product.image} alt={product.name} className="product-image" /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.size}</td>
              <td>{product.newPrice}</td>
              <td>{product.oldPrice}</td>
              <td>{product.tag === 'popular' ? 'Popular' : product.tag === 'newcollection' ? 'New Collection' : 'Related Product'}</td> {/* ✅ Display actual tag */}
              <td>
                <button className='editbutton' onClick={() => startEditing(product)}>Edit</button>
                <button className='deletebutton' onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <div className="edit-form">
          <h3>Edit Product</h3>
          <form onSubmit={handleUpdate}>
            <input className='edit' type="text" name="name" value={formData.name} onChange={handleChange} required />
            <input className='edit' type="text" name="image" value={formData.image} onChange={handleChange} required />
            <input className='edit' type="text" name="category" value={formData.category} onChange={handleChange} required />
            <input className='edit' type="text" name="size" value={formData.size} onChange={handleChange} required />
            <input className='edit' type="number" name="newPrice" value={formData.newPrice} onChange={handleChange} required />
            <input className='edit' type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} required />
            
            {/* ✅ Edit tag */}
            <div className="radio-group">
              <label><input type="radio" name="tag" value="popular" checked={formData.tag === 'popular'} onChange={handleChange} />Popular</label>
              <label><input type="radio" name="tag" value="newcollection" checked={formData.tag === 'newcollection'} onChange={handleChange} />New Collection</label>
              <label><input type="radio" name="tag" value="" checked={formData.tag === ''} onChange={handleChange} />Related Product</label>
            </div>

            <button type="submit">Update Product</button>
            <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProducts;
