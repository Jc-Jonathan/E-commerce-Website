import "../UpdateScreen/UpdateScreen.css";
import { useState } from "react";
import { db } from "..//../FirebaseConfig";
import { collection, query, where, getDocs, doc, setDoc, getDocs as getAllDocs } from "firebase/firestore";

const UpdateScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage({ text: "Please enter a valid email.", type: "error" });
      clearMessage();
      return;
    }

    try {
      const subscribersRef = collection(db, "subscribers");

      // ✅ Check if email already exists
      const q = query(subscribersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setMessage({ text: "This email is already subscribed.", type: "error" });
        clearMessage();
        return;
      }

      // ✅ Get all docs to find the highest numeric ID
      const allDocs = await getAllDocs(subscribersRef);
      let maxId = 0;
      allDocs.forEach((docSnap) => {
        const id = parseInt(docSnap.id);
        if (!isNaN(id) && id > maxId) {
          maxId = id;
        }
      });

      const newId = (maxId + 1).toString(); // next number as string

      // ✅ Use setDoc with numeric ID
      await setDoc(doc(subscribersRef, newId), { email });

      setMessage({ text: "You have successfully subscribed!", type: "success" });
      setEmail(""); // clear input after success
      clearMessage();
    } catch (error) {
      console.error("Error adding email:", error);
      setMessage({ text: "Something went wrong. Try again.", type: "error" });
      clearMessage();
    }
  };

  // ✅ Function to clear message after 3 seconds
  const clearMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div className="update-container">
      <h2 className="update-title">Stay Updated!</h2>
      <p className="update-text">
        Subscribe to get the latest news and product updates straight to your inbox.
      </p>
      <form className="update-form" onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Enter your email"
          className="update-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="update-btn">
          Subscribe
        </button>
      </form>

      {/* ✅ Success/Error message */}
      {message && (
        <p className={`update-message ${message.type}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default UpdateScreen;
