import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/ProductDetail.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency, getUserInfo } from "../helpers/common";

type ProductItem = {
  productId: number;
  productCode: string;
  productName: string;
  descriptionProduct: string;
  price: number;
  image: string;
  soLuongTonKho: number;
  reviews: Review[];
};

type Review = {
  content: string;
  rate: number;
  users: {
    fullName: string;
    image: string;
  };
  createdAt: string; // Ensure you have createdAt or similar field
};

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [error, setError] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const user = getUserInfo();
  console.log(user);

  const averageRating = product?.reviews?.length
    ? (
        product.reviews.reduce((sum, review) => sum + review.rate, 0) /
        product.reviews.length
      ).toFixed(1)
    : "0";

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < rating ? "text-warning" : "text-muted"}`}
      ></i>
    ));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const productRes = await axios.get(
            `http://localhost:8080/api/v1/product/find-by-id/${productId}`
          );
          setProduct(productRes.data);
          setError("");
        } catch (error) {
          console.error("Error fetching product:", error);
          setError("Product not found or an error occurred.");
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    try {
      const userId = 1; // Replace with logic to get the actual userId

      await axios.post(`http://localhost:8080/api/v1/reviews/create-reviews`, {
        content,
        rate: rating,
        productId: parseInt(productId),
        userId,
      });

      // Fetch product again to refresh the reviews
      const productRes = await axios.get(
        `http://localhost:8080/api/v1/product/find-by-id/${productId}`
      );
      setProduct(productRes.data);
      setRating(0);
      setContent("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container product-detail">
      <h3 className="text-center my-4">Chi tiết sản phẩm</h3>
      {product ? (
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                style={{ width: "100%" }}
                src={product.image || "default_image_url_here"}
                className="img-fluid rounded-start"
                alt={product.productName || "Product Image"}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {product.productName || "No Name"}
                </h5>
                <p className="card-text">
                  <i className="fas fa-barcode"></i>
                  <strong>Product Code:</strong>{" "}
                  {product.productCode || "No Code"}
                </p>
                <p className="card-text">
                  <i className="fas fa-info-circle"></i>
                  <strong>Description:</strong>{" "}
                  {product.descriptionProduct || "No Description"}
                </p>
                <p className="card-text">
                  <i className="fas fa-tag"></i>
                  <strong>Price:</strong>{" "}
                  <b style={{ color: "red" }}>
                    {formatCurrency(product.price)}
                  </b>
                </p>
                <p className="card-text">
                  <i className="fas fa-boxes"></i>
                  <strong>Stock:</strong> {product.soLuongTonKho}
                </p>
              </div>
            </div>
          </div>

          {/* Sale */}
          <div className="sale">
            <h5>Thông tin khuyến mãi</h5>
            <span>
              <a href="https://laptop88.vn/mua-laptop-tang-ngay-voucher-300.000d-cho-phu-kien.html">
                TẶNG VOUCHER MUA PHỤ KIỆN BẤT KỲ trị giá
              </a>
              <span className="gia-kmai"> 300.000 đ </span>
            </span>
            <span>
              <FontAwesomeIcon icon={faGift} /> - Giảm tiền trực tiếp khi mua
              các loại phụ kiện: balo, chuột, bàn phím, tai nghe,... - Chỉ áp
              dụng khi mua cùng laptop. Không quy đổi thành tiền mặt - KHÔNG ÁP
              DỤNG khi thanh toán qua thẻ Visa, Master, JCB, Amex.
            </span>
          </div>

          {/* Reviews */}
          <div className="reviews mt-4">
            <h5>Đánh giá sản phẩm</h5>
            <p className="average-rating">
              <i className="fas fa-star"></i> Trung bình đánh giá:{" "}
              {averageRating}
            </p>
            {product.reviews?.map((review, index) => (
              <div key={index} className="review">
                <div className="profile">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={review.users?.image || "default_user_image_url_here"}
                    alt={review.users?.fullName || "User"}
                  />
                  <div
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                    className="name-user"
                  >
                    {review.users?.fullName || "Anonymous"}
                  </div>
                </div>
                <div className="rating">{renderStars(review.rate)}</div>
                <p>{review.content || "No content"}</p>
                <p className="time">{review.createdAt || "Unknown time"}</p>
                <div style={{ color: "orangered" }} className="feedback">
                  Phản hồi
                </div>
              </div>
            ))}
          </div>

          {/* Review Form */}
          <div className="review-form mt-4">
            <h5>Thêm đánh giá</h5>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Đánh giá
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                  min="1"
                  max="5"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Nội dung
                </label>
                <textarea
                  className="form-control"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Gửi đánh giá
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
