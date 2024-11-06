import React from 'react';
import './App.css';
import Header from "./component/Header";
import Main from "./component/Main";
import ProductDetail from './component/ProductDetail';
import { Route, Routes, useLocation } from 'react-router-dom';
import Bottom from "./component/Bottom";
import Checkout from "./component/Checkout";
import Login from "./component/Login";
import Register from "./component/Register";

function App() {
    const location = useLocation();

    const hideHeaderAndBottomPages = ['/login', '/register'];
    const hideHeaderAndBottom = hideHeaderAndBottomPages.includes(location.pathname);

    return (
        <div className="App">
            {!hideHeaderAndBottom && <Header />}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/product/:name" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            {!hideHeaderAndBottom && <Bottom />}
        </div>
    );
}

export default App;
