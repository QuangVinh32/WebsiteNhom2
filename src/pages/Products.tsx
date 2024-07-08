import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useShoppingContext } from '../contexts/ShoppingContext'
import { Link } from 'react-router-dom'
import "../pages/Product.scss"

type ProductItem = {
    productId: number
    productName: string
    price: number
    image: string
    soLuongTonKho: number
}

const Products = () => {
    const [products, setProducts] = useState<ProductItem[]>([])

    const { addCartItem } = useShoppingContext()

    useEffect(() => {
        console.log("get products data from api")
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/v1/product/find-all-product')
                console.log("products=> ", res)
                setProducts(res.data)
            } catch (error) {
                console.log("error=> ", error)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <div className='menu'>
                <ul className="navbar-nav-1">
                    <h3>Danh mục sản phẩm</h3>
                    <li className="nav-item-1">
                        <Link className="nav-link" to='/'>Laptop Mới</Link>
                    </li>
                    <li className="nav-item-1">
                        <Link className="nav-link" to='/products'>Laptop Cũ</Link>
                    </li>
                    <li className="nav-item-1">
                        <Link className="nav-link" to='/contact'>PC - Máy tính để bàn</Link>
                    </li>
                    <li className="nav-item-1">
                        <Link className="nav-link" to='/contact'>Màn hình</Link>
                    </li>
                    <li className="nav-item-1">
                        <Link className="nav-link" to='/contact'>Linh kiện máy tính</Link>
                    </li>
                </ul>
                <div className='cover'>
                    <h3>bìa sản phẩm</h3>
                </div>
                <div className="right-address">
                    <div className="js-address-showroom">
                        <div className="cv-carousel">
                            <div className="item">
                                <b>Hà Nội - 125 Trần Đại Nghĩa</b>
                                <a className="phone" href="https://zalo.me/0904583588">Zalo: 0904.583.588</a>
                            </div>
                            <div className="item">
                                <b>Hà Nội - 34 Hồ Tùng Mậu</b>
                                <a className="phone" href="https://zalo.me/0911042665">Zalo: 0911.042.665</a>
                            </div>
                            <div className="item">
                                <b>Hà Nội - Nguyễn Văn Lộc</b>
                                <a className="phone" href="https://zalo.me/0904666488">Zalo: 0904.666.488</a>
                            </div>
                            <div className="item">
                                <b>Hà Nội - 277 Nguyễn Văn Cừ</b>
                                <a className="phone" href="https://zalo.me/0906299288">Zalo: 0906.299.288</a>
                            </div>
                          <div className="item">
                                <b>Hà Nội - 376 Phạm Văn Đồng</b>
                                <a className="phone" href="https://zalo.me/0906299788">Zalo: 0906.299.788</a>
                            </div>
                            <div className="item">
                                <b>TP. HCM - Nguyễn Thiện Thuật</b>
                                <a className="phone" href="https://zalo.me/0902176788">Zalo: 0902.176.788</a>
                            </div>
                            <div className="item">
                                <b>Thái Nguyên - 45 Lương Ngọc Quyến</b>
                                <a className="phone" href="https://zalo.me/0972365228">Zalo: 0972.365.228</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h3>Products</h3>
                {products.map(item => (
                    <div key={item.productId} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <img style={{ width: "100%", height: "100%" }} src={item.image} className="card-img-top" alt={item.productName} />
                            <div className="card-body">
                                <h5 className="card-title">{item.productName}</h5>
                                <h4 className="card-text">
                                    <b style={{ color: "green", fontSize: "30px" }}>$</b>
                                    <b style={{ color: "orange" }}>{item.price} VNĐ</b>
                                </h4>
                                <p className='card-number'>Còn lại {item.soLuongTonKho}</p>
                                <button className="btn btn-sm btn-success" onClick={() => addCartItem(item)}>
                                    <i className="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
