import  { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import "../Styles/RegisteredUsers.css";

const RegisteredUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [updatedUser, setUpdatedUser] = useState<any>({
    name: "",
    surname: "",
    email: "",
    phoneCode: "",
    country: "",
    state: "",
    city: "",
    address: "",
  });

  // Fetch users from Firestore
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch users.");
    }
  };

  // Handle delete
  const handleDelete = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      alert("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  // Prepare user for editing
  const handleEdit = (user: any) => {
    setEditingUser(user.id);
    setUpdatedUser(user);
  };

  // Handle form input changes
  const handleInputChange = (e: any) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Submit updated user
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await updateDoc(doc(db, "users", editingUser), updatedUser);
      alert("User updated successfully.");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="users-container">
      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Phone Code</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.phoneCode}</td>
              <td>{user.country}</td>
              <td>{user.state}</td>
              <td>{user.city}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <form onSubmit={handleUpdate} className="edit-user-form">
          <h3>Edit User</h3>
          <input type="text" name="name" placeholder="Name" value={updatedUser.name} onChange={handleInputChange} required />
          <input type="text" name="surname" placeholder="Surname" value={updatedUser.surname} onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" value={updatedUser.email} onChange={handleInputChange} required />
          <input type="text" name="phoneCode" placeholder="Phone" value={updatedUser.phoneCode} onChange={handleInputChange} required />
          <input type="text" name="country" placeholder="Country" value={updatedUser.country} onChange={handleInputChange} required />
          <input type="text" name="state" placeholder="State" value={updatedUser.state} onChange={handleInputChange} required />
          <input type="text" name="city" placeholder="City" value={updatedUser.city} onChange={handleInputChange} required />
          <input type="text" name="address" placeholder="Address" value={updatedUser.address} onChange={handleInputChange} required />
          <button type="submit">Update User</button>
          <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default RegisteredUsers;
