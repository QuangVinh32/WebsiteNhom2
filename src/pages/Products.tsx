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
                <ul className="navbar-nav">
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
                <div className='address'>
                    <h3>Dia chi</h3>
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
