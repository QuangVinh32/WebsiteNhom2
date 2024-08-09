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
import Category from "./Category";
import { useProductContext } from "../contexts/ProductContext";

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
  value: number;
  extra?: {
    title: string;
    children: {
      label: string;
      value: string;
    }[];
  }[];
};

const menuItems: MenuItem[] = [
  {
    label: "Laptop Mới",
    path: "/",
    value: 1,
    extra: [
      {
        title: "Laptop mới chính hãng",
        children: [
          {
            label: "Laptop Asus Mới",
            value: "ASUS",
          },
          {
            label: "Laptop Dell Mới",
            value: "DELL",
          },
          {
            label: "Laptop HP Mới",
            value: "HP",
          },
          {
            label: "Laptop Lenovo Mới",
            value: "LENOVO",
          },
          {
            label: "Laptop Acer Mới",
            value: "ACER",
          },
          {
            label: "Laptop Macbook Mới",
            value: "MACBOOK",
          },
        ],
      },
    ],
  },
  {
    label: "Laptop Cũ",
    path: "/a",
    value: 2,
    extra: [
      {
        title: "Laptop Cũ Gía rẽ",
        children: [
          {
            label: "Laptop Asus Cũ",
            value: "ASUS",
          },
          {
            label: "Laptop Dell Cũ",
            value: "DELL",
          },
          {
            label: "Laptop HP Cũ",
            value: "HP",
          },
          {
            label: "Laptop Lenovo Cũ",
            value: "LENOVO",
          },
          {
            label: "Laptop Acer Cũ",
            value: "ACER",
          },
          {
            label: "Laptop Macbook Cũ",
            value: "MACBOOK",
          },
        ],
      },
    ],
  },
  {
    label: "PC - Máy tính để bàn",
    path: "/b",
    value: 3,
    extra: [
      {
        title: "Computer",
        children: [
          {
            label: "PC - Gamming",
            value: "GAMMING",
          },
          {
            label: "PC - Văn phòng",
            value: "OFFICE",
          },
        ],
      },
    ],
  },
  {
    label: "Màn hình",
    path: "/asdf",
    value: 4,
  },
  {
    label: "Linh kiện máy tính",
    path: "gg/",
    value: 5,
  },
  {
    label: "Phụ kiện máy tính",
    path: "/d",
    value: 6,
    extra: [
      // {
      //   title: "Bàm phím",
      //   children: ["Bàn phím cơ", "Bàn phím văn phòng", "Bàn phím mỏng nhẹ"],
      // },
      // {
      //   title: "Chuột",
      //   children: ["Chuột dây", "Chuột không dây", "Chuột gamming"],
      // },
      // {
      //   title: "Tai nghe",
      //   children: [
      //     "Tai nghe dây",
      //     "Airport",
      //     "Tai nghe không dây",
      //     "Tai nghe gamming",
      //   ],
      // },
      // {
      //   title: "Ghế",
      //   children: ["Ghế lưới", "Ghế gamming", "Ghế văn phòng"],
      // },
      // {
      //   title: "Balo",
      //   children: ["Balo size 1", "Balo size 2", "Balo size 3"],
      // },
    ],
  },
];

//////////////////////////////////////
type Address = {
  nameAddress: string;
  linkAddress: string;
  namelinkAddress: string;
};

type MenuData = {
  type: number; //categoryId
  data: MenuItem["extra"];
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
  const { searchText } = useProductContext();
  console.log(searchText);
  const images = [
    "https://laptopaz.vn/media/banner/09_May33453011ecf2c5926c42fcb06ff9e9c0.jpg",
    "https://laptopaz.vn/media/banner/05_May284f164ebfaa8da49883f70a482b8df8.jpg",
    "https://laptopaz.vn/media/banner/22_Marf1a391c8c48fca0c805c17e2c743086c.jpg",
    "https://laptopaz.vn/media/banner/27_Julb770209ae06e9aaf422768eac1a097e8.jpg",
    "https://laptopaz.vn/media/banner/08_Aug498a918f2d049d7a97d8abd74b5705df.png",
    "https://laptopaz.vn/media/banner/18_Mare95ffd274c039d51bb5b9fa0e7e5dbef.jpg",
    "https://laptop88.vn/media/banner/09_Juleade1b3c2cae70f8f7f08d65531f5552.jpg",
  ];

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [filterList, setFilterList] = useState<any>({
    priceDesc: false,
    priceAsc: false,
  });
  const { addCartItem } = useShoppingContext();
  // set time
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // page
  const [totalPages, setTotalPages] = useState(0); // totalPages state
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // Hover danh mục
  const [showExtraMenu, setShowExtraMenu] = useState(false);
  const [menuData, setMenuData] = useState<MenuData>({} as MenuData);
  const productsPerPage = 8;

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
      setProducts(data.content);
      setTotalPages(data.totalPages);
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

  const handleMenuHover = async (data: any, type: number) => {
    setShowExtraMenu(true);
    setMenuData({
      data: data,
      type: type,
    });
  };

  const handleChildMenuClick = (value: string) => {
    setFilterList({
      ...filterList,
      categoryId: menuData.type,
      typeNsx: value,
    });
  };
  // search product local
  const filteredProductSearch = products.filter((item) => {
    return item.productName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div>
      <div className="menu">
        <ul className="navbar-nav-1">
          <h3>Danh mục sản phẩm</h3>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className="nav-item-1"
              onMouseOver={() => handleMenuHover(item.extra, item.value)}
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
            onMouseOver={() => setShowExtraMenu(true)}
            onMouseLeave={() => setShowExtraMenu(false)}
          >
            {menuData?.data?.map((item) => (
              <div className="form-menu-extra" key={item.title}>
                <h5>{item.title}</h5>
                <ul>
                  {item.children.map((e) => (
                    <li
                      key={e.value}
                      className={`${
                        filterList.typeNsx === e.value ? "active" : ""
                      }`}
                      onClick={() => handleChildMenuClick(e.value)}
                    >
                      {e.label}
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
            <div className="cv-carousel">
              {address.map((item, index) => (
                <div className="item" key={index}>
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
            <span style={{ fontSize: "40px" }}>Sản phẩm</span> -{" "}
            <span style={{ color: "red" }}>Tất cả</span> - Laptop - PC - Điện
            thoại - Màn hình - Linh kiện máy tính
          </b>
        </h3>
        <h5>Sắp xếp theo tiêu chí</h5>
        <div className="button-sort">
          <button
            className={`button-sort-2 ${filterList.priceDesc ? "active" : ""}`}
            onClick={() => setFilterList({ priceDesc: true, priceAsc: false })}
          >
            <i className="fas fa-sort-amount-down-alt"></i> Giá Cao - Thấp
          </button>
          <button
            style={{ marginLeft: "15px" }}
            onClick={() => setFilterList({ priceDesc: false, priceAsc: true })}
            className={`button-sort-2 ${filterList.priceAsc ? "active" : ""}`}
          >
            <i className="fas fa-sort-amount-up"></i> Giá Thấp - Cao
          </button>
          <button style={{ marginLeft: "15px" }} className="button-sort-2">
            <i className="fas fa-fire"></i> Khuyến Mãi Hot
          </button>
          <button style={{ marginLeft: "15px" }} className="button-sort-2">
            <i className="fas fa-chart-line"></i> Bán chạy
          </button>
          <button style={{ marginLeft: "15px" }} className="button-sort-2">
            <i className="fas fa-star"></i> Đánh giá
          </button>
        </div>

        {/* Form sản phẩm */}
        {filteredProductSearch.map((item) => (
          <div key={item.productId} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/product/${item.productId}`}
              >
                <img
                  style={{
                    width: "90%",
                    height: "90%",
                    marginLeft: "14px",
                  }}
                  src={item.image}
                  className="card-img-top"
                  alt={item.productName}
                />
                <div className="card-body">
                  <h5 className="card-title truncate-multiline">
                    {item.productName}
                  </h5>
                </div>
              </Link>
              <div className="card-body">
                <h5 className="card-text">
                  <b style={{ fontSize: "20px" }}>$</b>
                  <b style={{ color: "red", fontStyle: "italic" }}>
                    {formatCurrency(item.price)}
                  </b>
                </h5>
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
