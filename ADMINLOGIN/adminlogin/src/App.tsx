import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setMessage(`Login successful. Welcome ${user.email}`);
      setSuccess(true);

       // Show popup and wait for user to click OK
        setTimeout(() => {
           alert('You have successfully logged in!');
            window.location.href = 'http://localhost:5173/Dashboard'; // Replace with your dashboard app URL
         }, 500);


    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setMessage('User not found.');
      } else if (error.code === 'auth/wrong-password') {
        setMessage('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('Invalid email format.');
      } else {
        setMessage('Login failed. Please try again.');
      }
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <p className="login-title">Admin Login</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {loading && <div className="loading-spinner"></div>}
    </div>
  );
}

export default App;
