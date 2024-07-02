import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import "./Sizebar.scss";

export default function Sizebar() {
  return (
    <div style={{ overflow: "auto" }} className="cross">
      <div className="sidebar">
        <h1 style={{ color: "rgb(255,147,0)", marginLeft: "50px" }}>
          Danh mục sản phẩm
        
        </h1>
        <ul className="ul-size">
          <li>
            <Link className="c1" to="/home">
              Laptop Mới
            </Link>
            <span>
              <FontAwesomeIcon style={{color:"white"}} icon={faCaretRight} />
            </span>
          </li>
          <li>
            <Link className="c2" to="/about-us">
              Laptop cũ
            </Link>
            <span>
              <FontAwesomeIcon style={{color:"white"}} icon={faCaretRight} />
            </span>
          </li>
          <li>
            <Link className="c3" to="/contact">
              Linh kiện PC-Máy tính
            </Link>
            <span>
              <FontAwesomeIcon style={{color:"white"}} icon={faCaretRight} />
            </span>
          </li>
          <li>
            <Link className="c4" to="/blog">
              PC-máy để bàn
            </Link>
            <span>
              <FontAwesomeIcon style={{color:"white"}} icon={faCaretRight} />
            </span>
          </li>
          <li>
            <Link className="c5" to="/blog">
              Màn hình máy tính
            </Link>
            <span>
              <FontAwesomeIcon style={{color:"white"}} icon={faCaretRight} />
            </span>
          </li>
          <li>
            <Link className="c6" to="/blog">
              Bảo hành - Hậu mãi
            </Link>
            <span>
              <FontAwesomeIcon style={{color:"white"}} icon={faCaretRight} />
            </span>
          </li>
          <li>
            <Link className="c7" to="/blog">
              Phụ kiện máy tính
            </Link>
            <span>
              <FontAwesomeIcon style={{color:"white"}} icon={faCaretRight} />
            </span>
          </li>
          <li>
            <Link className="c8" to="/blog">
              Combo 3
            </Link>
          </li>
          <li>
            <Link className="c9" to="/blog">
              Combo 4
            </Link>
          </li>
          <li>
            <Link className="c10" to="/blog">
              Combo 5
            </Link>
          </li>
          <li>
            <Link className="c11" to="/blog">
              Combo 6
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
