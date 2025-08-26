import React, { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';
import { db } from '../FirebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [categoryData, setCategoryData] = useState({
    categoryName: '',
    bannerUrl: ''
  });

  const [notificationData, setNotificationData] = useState({
    title: '',
    message: ''
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingNotification, setEditingNotification] = useState<string | null>(null);

  // Fetch categories and notifications on load
  useEffect(() => {
    fetchCategories();
    fetchNotifications();
  }, []);

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const categoryList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCategories(categoryList);
  };

  const fetchNotifications = async () => {
    const querySnapshot = await getDocs(collection(db, 'notifications'));
    const notificationList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setNotifications(notificationList);
  };

  // Handle category input changes
  const handleCategoryChange = (e: any) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  // Handle notification input changes
  const handleNotificationChange = (e: any) => {
    setNotificationData({ ...notificationData, [e.target.name]: e.target.value });
  };

  // Submit category and banner to Firestore
  const handleCategorySubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'categories'), categoryData);
      alert('Category and Banner added successfully!');
      setCategoryData({ categoryName: '', bannerUrl: '' });
      fetchCategories();
    } catch (error) {
      console.error(error);
      alert('Failed to add category.');
    }
  };

  // Submit notification to Firestore
  const handleNotificationSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'notifications'), notificationData);
      alert('Notification added successfully!');
      setNotificationData({ title: '', message: '' });
      fetchNotifications();
    } catch (error) {
      console.error(error);
      alert('Failed to add notification.');
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notifications', id));
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Edit category
  const handleCategoryEdit = async (e: any) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'categories', editingCategory as string), categoryData);
      alert('Category updated successfully!');
      setEditingCategory(null);
      setCategoryData({ categoryName: '', bannerUrl: '' });
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // Edit notification
  const handleNotificationEdit = async (e: any) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'notifications', editingNotification as string), notificationData);
      alert('Notification updated successfully!');
      setEditingNotification(null);
      setNotificationData({ title: '', message: '' });
      fetchNotifications();
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  return (
    <div className="add-container">
      <h2>Add Category and Notification</h2>

      {/* Category Form */}
      <form onSubmit={editingCategory ? handleCategoryEdit : handleCategorySubmit} className="add-form">
        <h3>Category Details</h3>
        <input
          type="text"
          name="categoryName"
          placeholder="Category Name"
          value={categoryData.categoryName}
          onChange={handleCategoryChange}
          required
        />
        <input
          type="text"
          name="bannerUrl"
          placeholder="Banner Image URL"
          value={categoryData.bannerUrl}
          onChange={handleCategoryChange}
          required
        />
        <button type="submit">{editingCategory ? 'Update Category' : 'Upload Banner'}</button>
      </form>

      {/* Display all categories */}
      <h3>Available Categories</h3>
      <div className="banner-list">
        {categories.map((category) => (
          <div key={category.id} className="banner-item">
            <img src={category.bannerUrl} alt={category.categoryName} className="banner-image" />
            <p>{category.categoryName}</p>
            <button onClick={() => {
              setEditingCategory(category.id);
              setCategoryData({ categoryName: category.categoryName, bannerUrl: category.bannerUrl });
            }}>Edit</button>
            <button onClick={() => deleteCategory(category.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Notification Form */}
      <form onSubmit={editingNotification ? handleNotificationEdit : handleNotificationSubmit} className="add-form">
        <h3>Notification Details</h3>
        <input
          type="text"
          name="title"
          placeholder="Notification Title"
          value={notificationData.title}
          onChange={handleNotificationChange}
          required
        />
        <textarea
          name="message"
          placeholder="Notification Message"
          value={notificationData.message}
          onChange={handleNotificationChange}
          required
        />
        <button type="submit">{editingNotification ? 'Update Notification' : 'Add Notification'}</button>
      </form>

      {/* Display all notifications */}
      <h3>Available Notifications</h3>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <h4>{notification.title}</h4>
            <p className='text1'>{notification.message}</p>
            <button onClick={() => {
              setEditingNotification(notification.id);
              setNotificationData({ title: notification.title, message: notification.message });
            }}>Edit</button>
            <button onClick={() => deleteNotification(notification.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
