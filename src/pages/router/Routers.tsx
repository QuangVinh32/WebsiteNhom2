import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from 'components/Login/Login';
import Datphong from 'components/Datphong/Datphong';
import Dichvu from 'components/Dichvu/Dichvu';
import Hoadon from 'components/HoaDon/Hoadon';
import KhachHang from "../../components/User/KhachHang";
import App from "App";
import UIKhachHang from "components/UIKhachHang/UIKhachHang";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<UIKhachHang />} />
      <Route path="/login" element={<Login />} />
      <Route path="/datphong" element={<Datphong />} />
      <Route path="/" element={<KhachHang />} />
      <Route path="/dichvu" element={<Dichvu />} />
      <Route path="/hoadon" element={<Hoadon />} />
      <Route path="/create-khachhang" element={<KhachHang />} />
      <Route path="/update-khachhang/:id" element={<KhachHang />} />
    </Routes>
  );
};  
export default Routers;