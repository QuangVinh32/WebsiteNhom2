import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductProvider from "../contexts/ProductContext";

const MainLayout = () => {
  return (
    <ProductProvider>
      <Header />
      <div className="container mt-5">
        <Outlet />
      </div>
      <Footer />
    </ProductProvider>
  );
};

export default MainLayout;
