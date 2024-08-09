import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

type CategoryFormProps = {
  mode: "create" | "update";
};

const CategoryForm: React.FC<CategoryFormProps> = ({ mode }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    description: "",
    categoryName: "",
  });
  const [error, setError] = useState<string>("");
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  useEffect(() => {
    if (mode === "update" && categoryId) {
      console.log("Fetching category data...");
      const fetchCategory = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/categories/find-by-id/${categoryId}`
          );
          console.log("Fetched Category Data:", response.data); // Check data
          setCategoryData({
            description: response.data.description || "",
            categoryName: response.data.categoryName || "",
          });
          setError("");
        } catch (error) {
          console.error("Error fetching category:", error);
          setError("Failed to load category data.");
        }
      };

      fetchCategory();
    }
  }, [mode, categoryId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        await axios.post(
          "http://localhost:8080/api/v1/categories/create-category",
          categoryData
        );
        setAlert({
          type: "success",
          message: "Category created successfully.",
        });
      } else if (mode === "update" && categoryId) {
        await axios.put(
          `http://localhost:8080/api/v1/categories/update-category/${categoryId}`,
          categoryData
        );
        setAlert({
          type: "success",
          message: "Category updated successfully.",
        });
      }
      setTimeout(() => navigate("/admin/categories"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error saving category:", error);
      setAlert({ type: "danger", message: "Failed to save category data." });
    }
  };

  return (
    <div className="container category-form">
      <h3 className="text-center my-4">
        {mode === "create" ? "Add New Category" : "Edit Category"}
      </h3>
      {alert && (
        <div className={`alert alert-${alert.type}`}>{alert.message}</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            name="categoryName"
            value={categoryData.categoryName}
            onChange={handleChange}
            required
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="button-form-prduct"
        >
          <button type="submit" className="btn btn-primary">
            {mode === "create" ? "Add Category" : "Update Category"}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate("/admin/categories")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
