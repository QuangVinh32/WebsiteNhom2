import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import productService from "../services/productService";

enum ProductStatus {
  AVAILABLE = "name1",
  UNAVAILABLE = "name2",
}

type ProductFormProps = {
  mode: "create" | "update";
};

export type CreateProduct = {
  productCode: string;
  productName: string;
  descriptionProduct: string;
  price: number;
  discount: number;
  image: string;
  status: ProductStatus;
  soLuongTonKho: number;
  nsxId: number | undefined;
  categoryId: number | undefined;
};

const ProductForm: React.FC<ProductFormProps> = ({ mode }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<CreateProduct>({
    productCode: "",
    productName: "",
    descriptionProduct: "",
    price: 0,
    discount: 0,
    image: "",
    status: ProductStatus.AVAILABLE,
    soLuongTonKho: 0,
    nsxId: 0,
    categoryId: 0,
  });
  console.log(productData);
  const [error, setError] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    if (mode === "update" && productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/product/find-by-id/v1/${productId}`
          );
          setProductData(response.data);
          setError("");
        } catch (error) {
          console.error("Error fetching product:", error);
          setError("Failed to load product data.");
        }
      };

      fetchProduct();
    }
  }, [mode, productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentTime = new Date().toISOString();
    const finalProductData = { ...productData };

    if (mode === "create") {
      const createProductData = {
        ...finalProductData,
        createdTime: currentTime,
        nsxId: productData.nsxId ? productData.nsxId : undefined,
        categoryId: productData.categoryId ? productData.categoryId : undefined,
      };

      try {
        console.log("Sending create request with data:", createProductData);
        await productService.create(createProductData);
        setAlertMessage("Product created successfully!");
        setTimeout(() => navigate("/admin/products"), 2000); // Redirect after 2 seconds
      } catch (error) {
        console.error("Error saving product:", error);
        setError("Failed to save product data.");
      }
    } else if (mode === "update" && productId) {
      // For update, do not include createdTime and handle nsxId and categoryId as integers
      const updateProductData = {
        ...finalProductData,
        nsxId: productData.nsxId ? productData.nsxId : undefined,
        categoryId: productData.categoryId ? productData.categoryId : undefined,
      };

      try {
        console.log("Sending update request with data:", updateProductData);
        await productService.update(parseInt(productId), updateProductData);
        setAlertMessage("Product updated successfully!");
        setTimeout(() => navigate("/admin/products"), 2000); // Redirect after 2 seconds
      } catch (error) {
        console.error("Error saving product:", error);
        setError("Failed to save product data.");
      }
    }
  };

  return (
    <div className="container product-form">
      <h3 className="text-center my-4">
        {mode === "create" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
      </h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {alertMessage && (
        <div className="alert alert-success">{alertMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productCode" className="form-label">
            Product Code
          </label>
          <input
            type="text"
            className="form-control"
            id="productCode"
            name="productCode"
            value={productData.productCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descriptionProduct" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="descriptionProduct"
            name="descriptionProduct"
            value={productData.descriptionProduct}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discount" className="form-label">
            Discount
          </label>
          <input
            type="number"
            className="form-control"
            id="discount"
            name="discount"
            value={productData.discount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={productData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={productData.status}
            onChange={handleChange}
            required
          >
            {Object.values(ProductStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="nsxId" className="form-label">
            NSX ID
          </label>
          <input
            type="number"
            className="form-control"
            id="nsxId"
            name="nsxId"
            value={productData.nsxId || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Category ID
          </label>
          <input
            type="number"
            className="form-control"
            id="categoryId"
            name="categoryId"
            value={productData.categoryId || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="soLuongTonKho" className="form-label">
            Stock Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="soLuongTonKho"
            name="soLuongTonKho"
            value={productData.soLuongTonKho}
            onChange={handleChange}
            required
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="button-form-prduct"
        >
          <button type="submit" className="btn btn-primary">
            {mode === "create" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
