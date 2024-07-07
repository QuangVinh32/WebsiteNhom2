import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useShoppingContext } from '../contexts/ShoppingContext'
import { Link } from 'react-router-dom'

type ProductItem = {
    productId: number
    productName: string
    price: number
    image: string
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
        <div className="row">
            <h3>Products</h3>
            <div>
            <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to='/'>Laptop Mới</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/products'>Laptop Cũ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/contact'>PC - Máy tính để bàn</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/contact'>Màn hình</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/contact'>Link kiện máy tính</Link>
                        </li>
                    </ul>

            </div>
            {products.map(item => {
                return (
                    <div key={item.productId} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <img style={{width:"100%",height:"100%"}} src={item.image} className="card-img-top" alt={item.productName} />
                            <div className="card-body">
                                <h5 className="card-title">{item.productName}</h5>
                                <h4  className="card-text"><b style={{color:"green",fontSize:"30px"}}>$</b><b style={{color:"orange"}}>{item.price} VNĐ </b></h4>
                                <p className='card-number'>2000</p>
                                <a href="#" className="btn btn-sm btn-success" onClick={() => addCartItem(item)}><i className="fas fa-shopping-cart"></i>Add to Cart</a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Products