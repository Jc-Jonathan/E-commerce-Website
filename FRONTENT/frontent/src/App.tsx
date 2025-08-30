import './App.css'
import { Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import CartScreen from './Pages/CartScreen';  
import ShopCategory from './Pages/ShopCategory';
import NotificationScreen from './Pages/NotificationScreen';
import SignInScreen from './Pages/SignInScreen';
import SignUpScreen from './Pages/SignUpScreen';
import Navbar from "../src/Components/Navbar/Navbar"
import Product from './Pages/Product';
import Footer from "../src/Components/Footer/Footer";
import Hero from "../src/Components/Hero/Hero";
import Offers from './Components/Offers/Offers';
import PopularWrapper from './Components/PopularWraper/PopularWraper';
import CollectionWrapper from './Components/NewcollectionWrapper/Collectionwraper';
import ForgetPassword from './Pages/ForgetPassword';
import  { useEffect, useState } from "react";
import { db } from "./FirebaseConfig";
import ProfileScreen from './Pages/ProfileScreen';
import { collection, getDocs } from "firebase/firestore";
import SearchScreen from './Pages/SearchScreen';
function App() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoryList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // helper to find banner for a given category
  const getBannerForCategory = (categoryName: string) => {
    const found = categories.find(
      (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
    );
    return found ? found.bannerUrl : "";
  };

  return (
    <div className="app">
      <div className='navbar'>
        <Navbar/>
      </div>
      <Routes>
         <Route 
             path="/" 
             element={
              <Shop 
                  PopularComponent={PopularWrapper} 
                  CollectionComponent={CollectionWrapper} 
                  HeroComponent={Hero} 
                  OffersComponent={Offers} 
             />
               } 
          />
        <Route 
          path="/Shop" 
          element={
            <Shop 
              PopularComponent={PopularWrapper} 
              CollectionComponent={CollectionWrapper} 
              HeroComponent={Hero} 
              OffersComponent={Offers} 
            />
          } 
        />
        <Route path='/CartScreen' element={<CartScreen/>}/>
        <Route
          path='/mens'
          element={
            <ShopCategory category="men" bannerUrl={getBannerForCategory("men")} />
          }
        />
        <Route
          path='/womens'
          element={
            <ShopCategory category="women" bannerUrl={getBannerForCategory("women")} />
          }
        />
        <Route path='/NotificationScreen' element={<NotificationScreen/>}/>
        <Route path='/SignInScreen' element={<SignInScreen/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/ProfileScreen' element={<ProfileScreen/>}/>
        <Route path='/SignUpScreen' element={<SignUpScreen/>}/>
        <Route path='/SearchScreen' element={<SearchScreen/>}/>
        <Route path='/Product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route> 
      </Routes>
      <div className='footer'>
          <Footer/>
      </div>
    </div>
  )
}

export default App
