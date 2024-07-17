import React, { useState } from "react";

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

const Category = () => {
  const [showExtraMenu, setShowExtraMenu] = useState(false);
  const [menuData, setMenuData] = useState<MenuItem["extra"]>([]);

  const handleMenuHover = (data: any) => {
    setShowExtraMenu(true);
    setMenuData(data);
  };

  return (
    <div>
      {showExtraMenu && (
        <div className="menu-extra">
          {menuData?.map((item) => (
            <div>
              <h5 style={{ color: "orangered" }}>{item.title}</h5>
              <ul>
                {item.children.map((e) => (
                  <li style={{ fontSize: "14px", fontStyle: "italic" }}>{e}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
