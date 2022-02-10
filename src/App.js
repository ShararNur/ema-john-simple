import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { Routes, Route } from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/review" element={<Review />} />
        <Route path="/inventory" element={<PrivateRoute redirectTo="/login"><Inventory /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/shipment" element={<PrivateRoute redirectTo="/login"><Shipment /></PrivateRoute>} />
        <Route path="/product/:productKey" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
