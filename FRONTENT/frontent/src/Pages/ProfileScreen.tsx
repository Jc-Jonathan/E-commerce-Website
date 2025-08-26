import React, { useEffect, useState } from "react";
import { auth, db } from "../FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../Components/PagesStyles/ProfileScreen.css";
import { MdModeEdit } from "react-icons/md";
import { Country, State, City } from "country-state-city";
import { Link } from "react-router-dom"; // 👈 make sure react-router-dom is installed

const ProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [avatar, setAvatar] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [noProfile, setNoProfile] = useState(false); // 👈 track if profile doesn’t exist

  const [formData, setFormData] = useState<any>({
    name: "",
    surname: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    phoneCode: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setFormData(data);
        } else {
          setNoProfile(true); // 👈 mark no profile found
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));

    if (name === "country") {
      const countryObj = Country.getAllCountries().find((c) => c.name === value);
      setFormData((prev: any) => ({
        ...prev,
        country: value,
        phoneCode: countryObj ? countryObj.phonecode : "",
        state: "",
        city: "",
      }));
    }

    if (name === "state") {
      setFormData((prev: any) => ({ ...prev, state: value, city: "" }));
    }
  };

  // save updated profile
  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, formData);
      setUserData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // show no profile message
  if (noProfile) {
    return (
      <div className="profile-container no-profile">
        <h4 className="edittxt">Oops! No profile available.</h4>
        <p className="edittxt">You are not registered yet.</p>
        <Link to="/SignUpScreen" className="signup-link">
          Click here to register now
        </Link>
      </div>
    );
  }

  if (!userData) {
    return <div className="profile-container">Loading profile...</div>;
  }

  const countries = Country.getAllCountries();
  const states = formData.country
    ? State.getStatesOfCountry(countries.find((c) => c.name === formData.country)?.isoCode || "")
    : [];
  const cities = formData.state
    ? City.getCitiesOfState(
        countries.find((c) => c.name === formData.country)?.isoCode || "",
        states.find((s) => s.name === formData.state)?.isoCode || ""
      )
    : [];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar-section">
          <img
            src={avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="avatar"
          />
          <label htmlFor="avatarUpload" className="pencil-icon">
            <MdModeEdit />
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </div>

        {!isEditing ? (
          <div className="user-details">
            <h2>
              {userData.name} {userData.surname}
            </h2>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> +{userData.phoneCode} {userData.phone}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>Country:</strong> {userData.country}</p>
            <p><strong>State:</strong> {userData.state}</p>
            <p><strong>City:</strong> {userData.city}</p>

            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="edit-form">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />

            <select name="country" value={formData.country} onChange={handleChange}>
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.isoCode} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s.isoCode} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            <p><strong>Phone Code:</strong> +{formData.phoneCode}</p>

            <div className="form-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
