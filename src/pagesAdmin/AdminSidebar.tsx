import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pagesAdmin/AdminSidebar.scss";
type Product = {
  productId: number;
  productCode: string;
  productName: string;
  descriptionProduct: string;
  price: number;
  image: string;
  soLuongTonKho: number;
};

const AdminSidebar: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceAsc, setPriceAsc] = useState(false);
  const [priceDesc, setPriceDesc] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/product/find-all-product/?page=${currentPage}&size=5&search=${searchTerm}&priceAsc=${priceAsc}&priceDesc=${priceDesc}`
        );
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        setError("");
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm, priceAsc, priceDesc]);

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${productId}`
      );
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product.");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPriceAsc(value === "asc");
    setPriceDesc(value === "desc");
    setCurrentPage(1); // Reset to first page on sort
  };

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container product-list">
      <h3 className="text-center my-4">Quản lý sản phẩm</h3>
      <Link to="/admin/products/create" className="btn btn-primary mb-3">
        Thêm sản phẩm mới
      </Link>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mb-3">
        <select className="form-select" onChange={handleSortChange}>
          <option value="desc">Sort by price: High to Low</option>
          <option value="asc">Sort by price: Low to High</option>
        </select>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>
                <img
                  src={product.image}
                  alt={product.productName}
                  className="img-fluid rounded"
                />
              </td>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.soLuongTonKho}</td>
              <td>
                <Link
                  to={`/admin/products/${product.productId}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.productId)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
  );
};

export default AdminSidebar;