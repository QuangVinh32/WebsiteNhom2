import React, { useEffect, useState } from "react";
import axios from "axios";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { Link } from "react-router-dom";
import "../pages/Product.scss";
import { formatCurrency } from "../helpers/common";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
import { EffectCube, Pagination } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

type ProductItem = {
  productId: number;
  productName: string;
  price: number;
  image: string;
  soLuongTonKho: number;
};

type MenuItem = {
  label: string;
  path: string;
  extra?: {
    title: string;
    children: string[];
  }[];
};

const menuItems: MenuItem[] = [
  {
    label: "Laptop Mới",
    path: "/",
    extra: [
      {
        title: "Laptop mới chính hãng",
        children: [
          "Laptop Asus",
          "Laptop Dell",
          "Laptop HP",
          "Laptop Lenovo",
          "Laptop Macbook",
          "Laptop Acer",
        ],
      },
      {
        title: "Chọn laptop theo nhu cầu",
        children: ["Laptop Asus", "Laptop Dell", "Laptop Macbook"],
      },
    ],
  },
  {
    label: "Laptop Cũ",
    path: "/",
    extra: [
      {
        title: "Laptop Cũ Gía rẽ",
        children: [
          "Laptop Asus cũ",
          "Laptop Dell cũ",
          "Laptop HP cũ",
          "Laptop Lenovo cũ",
          "Laptop Macbook cũ",
          "Laptop Acer cũ",
        ],
      },
      {
        title: "Chọn laptop theo nhu cầu",
        children: [
          "Laptop Gamming",
          "Laptop văn phòng",
          "Laptop đồ họa",
          "Laptop mỏng nhẹ",
        ],
      },
    ],
  },
  {
    label: "PC - Máy tính để bàn",
    path: "/",
    extra: [
      {
        title: "Computer",
        children: ["PC - Gamming", "PC - Phổ thông", "PC - Văn phòng"],
      },
      {
        title: "Chọn laptop theo nhu cầu",
        children: ["PC - Gamming"],
      },
    ],
  },
  {
    label: "Màn hình",
    path: "/",
  },
  {
    label: "Linh kiện máy tính",
    path: "/",
  },
];

//////////////////////////////////////
type Address = {
  nameAddress: string;
  linkAddress: string;
  namelinkAddress: string;
};

const address: Address[] = [
  {
    nameAddress: "Hà Nội - 125 Trần Đại Nghĩa",
    linkAddress: "https://zalo.me/0904583588",
    namelinkAddress: "Zalo: 0904.583.588",
  },
  {
    nameAddress: "Hà Nội - 125 Trần Đại Nghĩa",
    linkAddress: "https://zalo.me/0904583588",
    namelinkAddress: "Zalo: 0904.583.588",
  },
  {
    nameAddress: "Hà Nội - 125 Trần Đại Nghĩa",
    linkAddress: "https://zalo.me/0904583588",
    namelinkAddress: "Zalo: 0904.583.588",
  },
  {
    nameAddress: "Hà Nội - 125 Trần Đại Nghĩa",
    linkAddress: "https://zalo.me/0904583588",
    namelinkAddress: "Zalo: 0904.583.588",
  },
  {
    nameAddress: "Hà Nội - 125 Trần Đại Nghĩa",
    linkAddress: "https://zalo.me/0904583588",
    namelinkAddress: "Zalo: 0904.583.588",
  },
  {
    nameAddress: "Hà Nội - 125 Trần Đại Nghĩa",
    linkAddress: "https://zalo.me/0904583588",
    namelinkAddress: "Zalo: 0904.583.588",
  },
  {
    nameAddress: "Hà Nội - 125 Trần Đại Nghĩa",
    linkAddress: "https://zalo.me/0904583588",
    namelinkAddress: "Zalo: 0904.583.588",
  },
];

const Products = () => {
  const images = [
    "https://laptopaz.vn/media/banner/09_May33453011ecf2c5926c42fcb06ff9e9c0.jpg",
    "https://laptopaz.vn/media/banner/05_May284f164ebfaa8da49883f70a482b8df8.jpg",
    "https://laptopaz.vn/media/banner/22_Marf1a391c8c48fca0c805c17e2c743086c.jpg",
    "https://laptopaz.vn/media/banner/27_Julb770209ae06e9aaf422768eac1a097e8.jpg",
    "https://laptopaz.vn/media/banner/08_Aug498a918f2d049d7a97d8abd74b5705df.png",
    "https://laptopaz.vn/media/banner/18_Mare95ffd274c039d51bb5b9fa0e7e5dbef.jpg",
  ];

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [filterList, setFilterList] = useState<any>({
    priceDesc: false,
    priceAsc: false,
    type: "",
  });
  const { addCartItem } = useShoppingContext();
  // set time
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // page
  const [totalPages, setTotalPages] = useState(0); // totalPages state
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const productsPerPage = 4;

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/find-all-product`,
        {
          params: {
            page: currentPage,
            size: productsPerPage,
            ...filterList,
          },
        }
      );
      setProducts(data.content); // Assuming your API response has a 'content' field for products
      setTotalPages(data.totalPages); // Assuming your API response has a 'totalPages' field
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, productsPerPage, filterList]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // chuyển ảnh sau 4s nếu thích chậm nhanh thì chỉnh ở đây
    return () => clearInterval(interval);
  }, []);
  // Set page bìa

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevIndex = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1) % images.length);
  };
  // Hover danh mục
  const [showExtraMenu, setShowExtraMenu] = useState(false);
  const [menuData, setMenuData] = useState<MenuItem["extra"]>([]);

  const handleMenuHover = (data: any) => {
    setShowExtraMenu(true);
    setMenuData(data);
  };
  // icon trong li

  return (
    <div>
      <div className="menu">
        <ul className="navbar-nav-1">
          <h3>Danh mục sản phẩm</h3>
          {menuItems.map((item) => (
            <li
              key={item.path} // Thêm key để tránh cảnh báo trong React
              className="nav-item-1"
              onMouseOver={() => handleMenuHover(item.extra)}
              onMouseLeave={() => setShowExtraMenu(false)}
            >
              <Link className="nav-link-1" to={item.path}>
                {item.label}
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ marginLeft: "5px" }}
                />
              </Link>
            </li>
          ))}
        </ul>
        {showExtraMenu && (
          <div
            className="menu-extra"
            onMouseOver={() => handleMenuHover(menuData)}
          >
            {menuData?.map((item) => (
              <div className="form-menu-extra">
                <h5 style={{ color: "orangered" }}>{item.title}</h5>
                <ul>
                  {item.children.map((e) => (
                    <li
                      style={{ fontSize: "14px", fontStyle: "italic" }}
                      onClick={() => setFilterList({ ...filterList, type: e })}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div
          className="cover"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        >
          <button onClick={prevIndex}>Prev</button>
          <button onClick={nextImage}>Next</button>
        </div>
        <div className="right-address">
          <div className="js-address-showroom">
            <div style={{ backgroundClip: "red" }} className="cv-carousel">
              {address.map((item) => (
                <div className="item">
                  <b>{item.nameAddress}</b>
                  <a className="phone" href={item.linkAddress}>
                    {item.namelinkAddress}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h3>
          <b style={{ fontStyle: "oblique" }}>
            <span style={{ fontSize: "40px" }}> Sản phẩm</span> -{" "}
            <span style={{ color: "red" }}>Tất cả</span> - Laptop - PC - Điện
            thoại - Màn hình - Link kiện máy tính
          </b>
        </h3>
        <h5>Sắp xếp theo tiêu chí</h5>
        <div className="button-sort">
          <button
            className={`button-sort-2 ${filterList.priceDesc ? "active" : ""}`}
            onClick={() => setFilterList({ priceDesc: true, priceAsc: false })}
          >
            Giá Cao - Thấp
          </button>
          <button
            style={{ marginLeft: "15px" }}
            onClick={() => setFilterList({ priceDesc: false, priceAsc: true })}
            className={`button-sort-2 ${filterList.priceAsc ? "active" : ""}`}
          >
            Giá Thấp - Cao
          </button>
          <button style={{ marginLeft: "15px" }} className="button-sort-2">
            Khuyến Mãi Hot
          </button>
          <button style={{ marginLeft: "15px" }} className="button-sort-2">
            Bán chạy
          </button>
          <button style={{ marginLeft: "15px" }} className="button-sort-2">
            Đánh giá
          </button>
        </div>

        {/* Form sản phẩm */}
        {products.map((item) => (
          <div key={item.productId} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/product/${item.productId}`} // Sử dụng đúng `productId`
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={item.image}
                  className="card-img-top"
                  alt={item.productName}
                />
                <div className="card-body">
                  <h5 style={{}} className="card-title truncate-multiline">
                    {item.productName}
                  </h5>
                </div>
              </Link>
              <div className="card-body">
                <h4 className="card-text">
                  <b style={{ fontSize: "30px" }}>$ </b>
                  <b style={{ color: "red", fontStyle: "italic" }}>
                    {formatCurrency(item.price)}
                    {""}
                  </b>
                </h4>
                <p className="card-number">
                  Số lượng còn lại{" "}
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {item.soLuongTonKho}
                  </span>
                </p>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => addCartItem(item)}
                >
                  <i className="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Phân trang */}
        <div className="pagination-container">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, number) => (
              <li key={number} className="page-item">
                <button
                  className="page-link"
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Products;
