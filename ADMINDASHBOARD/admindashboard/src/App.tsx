import './App.css'
import { Routes, Route} from 'react-router-dom';
import Home from './Pages/Home'
import AddProducts from './Pages/AddProduct'
import CanceledOrderScreen from "./Pages/CanceledOrderScreen"
import Dashboard from './Pages/Dashboard'
import EditProducts from './Pages/EditProducts'
import NewOrderScreen from './Pages/NewOrderScreen'
import RegisteredUsers from './Pages/RegisteredUsers'
function App() {
  return (
      <div className='Mainboard'>
        <div className='SideDisplay'>
        <Home/>
        </div>
        <div className='Disaplay'>
           <Routes>
            <Route path='AddProducts' element={<AddProducts/>}/>
            <Route path='CanceledOrderScreen' element={<CanceledOrderScreen/>}/>
            <Route path='Dashboard' element={<Dashboard/>}/>
            <Route path='EditProducts' element={<EditProducts/>}/>
            <Route path='NewOrderScreen' element={<NewOrderScreen/>}/>
            <Route path='RegisteredUsers' element={<RegisteredUsers/>}/>
           </Routes>
        </div>
      </div>
    
  )
}

export default App
