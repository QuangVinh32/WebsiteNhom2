import React, { useEffect, useState } from "react";
import "./Header.scss"
import { Link } from "react-router-dom";
import images from "images";
import { VscAccount } from "react-icons/vsc";


export default function Header(){
    const [token,setToken] = useState<String | null>()
    useEffect(function(){
        const userToken = localStorage.getItem("userToken")
        setToken(userToken)
  
      },[])
    return(
        <div className="header">
           <div className="header_item">
            <Link to="/" className="header_link">
                {/* <img src={require("images/academy-02-01-01-01.png")} alt="" /> */}
                {/* <img style={{color:"red"}} src={images.logoVti} alt="" width={300} /> */}
            </Link>
           </div>
           <nav className="navbar">
              <ul className="nav-links">
                 <li><Link to="sanpham">Góp ý<br />khiếu nại</Link>
                 </li>
                 <li><Link to="/">Liên hệ<br />trực tuyến</Link></li>
                 <li><Link to="dichvu">Bảo trì</Link></li>
                 <li><Link to="hoadon">Tư vấn<br />mua hàng</Link></li>
              </ul>
            </nav>
            <div className="bet-wen">
           <div className="header_item">
            <ul>
                <li>
                    <input className="seach" style={{padding:"20px"}} type="search" placeholder="Tìm kiếm" />
                </li>
                {
                    !token && <li>
                    <Link to="login" className="header_item_link">Đăng Nhập</Link>
                </li>
                }
                {
                    token && <li>
                    <Link to="login" className="header_item_link">Đăng xuất</Link>
                </li>
                }
                <li>
                    <button className="header_item_btn"><b style={{fontSize:"20px" , color:"white"}}>Đăng ký</b></button>
                </li>
                <li>
                    
                    <img className="header_item_avata" src={images.avatar} alt="" width={90}/>
            
                </li>     
            </ul>
           </div>
           </div>
        </div>
    )
}