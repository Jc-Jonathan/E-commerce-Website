import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import "..//Components/PagesStyles/SignUpScreen.css";

const SignUpScreen = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    country: "",
    countryCode: "",
    state: "",
    city: "",
    address: "",
    phoneCode: "",
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryIso = e.target.value;
    const selectedCountry = countries.find((c) => c.isoCode === countryIso);

    setFormData({
      ...formData,
      country: countryIso,
      countryCode: selectedCountry?.isoCode || "",
      phoneCode: selectedCountry?.phonecode || "",
      state: "",
      city: "",
    });

    setStates(State.getStatesOfCountry(countryIso));
    setCities([]);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateIso = e.target.value;
    setFormData({ ...formData, state: stateIso, city: "" });
    setCities(City.getCitiesOfState(formData.country, stateIso));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Firebase Auth Signup
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Get the current users to calculate numeric ID
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const nextId = snapshot.size + 1; // next integer ID

      // Save user details in Firestore with integer ID
      await setDoc(doc(db, "users", nextId.toString()), {
        id: nextId,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        address: formData.address,
        phoneCode: formData.phoneCode,
      });

      alert("✅ Successfully signed up!");
      navigate("/SignInScreen"); // redirect back to login
    } catch (error: any) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {/* First Name */}
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        {/* Surname */}
        <div className="form-group">
          <label>Surname</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        {/* Country */}
        <div className="form-group">
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="form-group">
          <label>State</label>
          <select name="state" value={formData.state} onChange={handleStateChange} required>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="form-group">
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Select City</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Code */}
        <div className="form-group">
          <label>Phone Code</label>
          <input type="text" value={formData.phoneCode} readOnly />
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        {/* Repeat Password */}
        <div className="form-group">
          <label>Repeat Password</label>
          <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required />
        </div>

        {/* Submit */}
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpScreen;
