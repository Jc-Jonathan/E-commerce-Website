import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import ShopContextProvider from './Context/ShopContext.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
   <ShopContextProvider>
          <App />
   </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>
)
