import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import AdminSidebar from "./pagesAdmin/AdminSidebar";
import ProductList from "./pagesAdmin/AdminSidebar";
import ProductForm from "./pagesAdmin/ProductForm";

function App() {
  return (
    <>
      <Header />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/admin/manager" element={<AdminSidebar />} />
          {/* Thêm tuyến đường mới */}
          <Route path="/admin/products" element={<ProductList />} />
          <Route
            path="/admin/products/create"
            element={<ProductForm mode="create" />}
          />
          <Route
            path="/admin/products/:productId"
            element={<ProductForm mode="update" />}
          />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
