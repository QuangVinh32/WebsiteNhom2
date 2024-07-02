import React, { ReactNode, useEffect } from "react";
import Sizebar from "components/Sizebar/Sizebar";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import Routers from "pages/router/Routers";
import "./layout-root.scss"
import images from "images";

  const LayoutRoot = () => {
    return (
      <div className="root">
        <div className="header">
          <Header />    
        </div>
        <div 
        // style={{ backgroundImage: `url(${images.gai})` }} 
        className="size-cont">
          <div className="sizebar">
            <Sizebar />
          </div>
          <Routers />
        </div>
        <Footer />
      </div>
    );
  };
  
  export default LayoutRoot;