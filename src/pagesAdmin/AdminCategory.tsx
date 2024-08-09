import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "reactstrap";

type Category = {
  categoryId: number;
  categoryName: string;
  description: string;
};

const AdminCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [sortDesc, setSortDesc] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/categories/find-all-category?page=${currentPage}&size=5&search=${searchTerm}&idAsc=${sortAsc}&idDesc=${sortDesc}`
        );
        setCategories(response.data.content);
        setTotalPages(response.data.totalPages);
        setAlert(null); // Clear alert
      } catch (error) {
        console.error("Error fetching categories:", error);
        setAlert({ type: "danger", message: "Failed to load categories." });
        setTimeout(() => navigate("/admin/products"), 2000); // Redirect after 2 seconds
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [currentPage, searchTerm, sortAsc, sortDesc, navigate]);

  const handleDelete = async (categoryId: number) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/categories/delete-category/${categoryId}`
      );
      setCategories(
        categories.filter((category) => category.categoryId !== categoryId)
      );
      setAlert({ type: "success", message: "Category deleted successfully." });

      // Hide alert after 2 seconds
      setTimeout(() => setAlert(null), 2000);
    } catch (error) {
      console.error("Error deleting category:", error);
      setAlert({ type: "danger", message: "Failed to delete category." });

      // Hide alert after 2 seconds
      setTimeout(() => setAlert(null), 2000);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortAsc(value === "idAsc");
    setSortDesc(value === "idDesc");
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

  return (
    <div className="container category-list">
      <h3 className="text-center my-4">Category Management</h3>
      <Link to="/admin/categories/create" className="btn btn-primary mb-3">
        Add New Category
      </Link>

      {alert && (
        <div className={`alert alert-${alert.type}`}>{alert.message}</div>
      )}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search categories"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mb-3">
        <select className="form-select" onChange={handleSortChange}>
          <option value="idDesc">Sort by ID: Descending</option>
          <option value="idAsc">Sort by ID: Ascending</option>
        </select>
      </div>

      {categories.length === 0 && (
        <div className="alert alert-info">No categories found.</div>
      )}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th style={{ width: "123px", display: "flex" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryId}>
              <td>{category.categoryId}</td>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
              <td>
                <Link
                  to={`/admin/categories/${category.categoryId}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  <Spinner size="sm">Loading...</Spinner>
                  <span> </span>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(category.categoryId)}
                  className="btn btn-danger btn-sm"
                >
                  <Spinner color="light" size="sm" type="grow">
                    Loading...
                  </Spinner>
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

export default AdminCategory;
