import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./KhachHang.scss";

enum Giotinh {
  Nam = 'NAM',
  Nu = 'NỮ',
}

type UserDetail = {
  maKH: string;
  name: string;
  gioiTinh: Giotinh;
  soDienThoai: string;
  soCCCD: string;
};

// Hàm hook chính của thành phần React
export default function KhachHang() {
  
  // Các trạng thái khởi tạo
  const [maKH, setMaKH] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gioiTinh, setGioiTinh] = useState<Giotinh>(Giotinh.Nam);
  const [soDienThoai, setSoDienThoai] = useState<string>("");
  const [soCCCD, setSoCCCD] = useState<string>("");
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [error, setError] = useState<string>("");
  

  // Hàm điều hướng trong React Router
  const navigate = useNavigate();
  const params = useParams();

  // Hàm fetch chi tiết người dùng từ máy chủ
  async function fetchUserDetail() {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/khachhang/find-by-id/${params.id}`);
      setUserDetail(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết người dùng:", error);
      // Xử lý lỗi theo nhu cầu
    }
  }

  // Hàm xử lý khi biểu mẫu được gửi đi
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // Kiểm tra thông tin trước khi gửi
      if (!name.trim() || !gioiTinh || !soDienThoai.trim() || !soCCCD.trim()) {
        setError("Vui lòng điền đầy đủ thông tin!");
      } else {
        if (!params.id) {
          // Thêm (Add)
          await axios.post("http://localhost:8080/api/v1/khachhang/create-khachhang", {
            maKH: maKH.trim(),
            name: name.trim(),
            gioiTinh: gioiTinh,
            soDienThoai: soDienThoai.trim(),
            soCCCD: soCCCD.trim(),
          });
          window.alert("Thêm mới thành công");
        } else {
          // Sửa (Edit)
          await axios.put(`http://localhost:8080/api/v1/khachhang/update-khachhang/${params.id}`, {
            name: name.trim(),
            gioiTinh: gioiTinh,
            soDienThoai: soDienThoai.trim(),
            soCCCD: soCCCD.trim(),
          });
          window.alert("Cập nhật thành công");
        }

        // Điều hướng về trang chủ sau khi thành công
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi khi gửi biểu mẫu:", error);
    }
  }

  // Hàm xử lý sự kiện thay đổi của trường 'maKH'
  function onChangeMaKH(event: React.ChangeEvent<HTMLInputElement>) {
    setMaKH(event.target.value);
    setError("");
  }

  // Hàm xử lý sự kiện thay đổi của trường 'name'
  function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    setError("");
  }

  // Hàm xử lý sự kiện thay đổi của trường 'gioiTinh'
  function onChangeGioiTinh(event: React.ChangeEvent<HTMLSelectElement>) {
    setGioiTinh(event.target.value as Giotinh);
    setError("");
  }

  // Hàm xử lý sự kiện thay đổi của trường 'soDienThoai'
  function onChangeSoDienThoai(event: React.ChangeEvent<HTMLInputElement>) {
    setSoDienThoai(event.target.value);
    setError("");
  }

  // Hàm xử lý sự kiện thay đổi của trường 'soCCCD'
  function onChangeSoCCCD(event: React.ChangeEvent<HTMLInputElement>) {
    setSoCCCD(event.target.value);
    setError("");
  }

  // Hiệu ứng để fetch chi tiết người dùng khi thành phần được mount hoặc params.id thay đổi
  useEffect(() => {
    if (params.id) {
      fetchUserDetail();
      console.log(params.id)
    }
  }, [params.id]);

  // Hiệu ứng để cập nhật lại các trường nếu userDetail thay đổi
  useEffect(() => {
    if (userDetail) {
      setMaKH(userDetail.maKH); 
      setName(userDetail.name);
      setGioiTinh(userDetail.gioiTinh);
      setSoDienThoai(userDetail.soDienThoai);
      setSoCCCD(userDetail.soCCCD);
      console.log(userDetail)
    }
  }, [userDetail]);

  // Render giao diện
  return (
    <div>
      <div className="user-form">
        <form className="form-user" method="post" onSubmit={handleSubmit}>
          {params.id ? null : (
            <div className="user-form-wrapper">
              <label htmlFor="maKH">Mã khách hàng</label>
              <input type="text" name="maKH" id="maKH" placeholder="Mã của bạn" onChange={onChangeMaKH} value={maKH} />
            </div>
          )}
          <div className="user-form-wrapper">
            <label htmlFor="name">Tên khách hàng</label>
            <input type="text" name="name" id="name" placeholder="Tên của bạn" onChange={onChangeName} value={name} />
          </div>
          <div className="user-form-wrapper">
            <label htmlFor="gioiTinh">Giới Tính</label>
            <select name="gioiTinh" id="gioiTinh" onChange={onChangeGioiTinh} value={gioiTinh || ""}>
              <option value={Giotinh.Nam}>Nam</option>
              <option value={Giotinh.Nu}>Nữ</option>
            </select>
          </div>
          <div className="user-form-wrapper">
            <label htmlFor="soDienThoai">Số điện thoại</label>
            <input type="text" name="soDienThoai" id="soDienThoai" placeholder="Số điện thoại của bạn" onChange={onChangeSoDienThoai} value={soDienThoai} />
          </div>
          <div className="user-form-wrapper">
            <label htmlFor="soCCCD">Số CCCD</label>
            <input type="text" name="soCCCD" id="soCCCD" placeholder="Số CCCD của bạn" onChange={onChangeSoCCCD} value={soCCCD} />
          </div>
          <p style={{ color: "red" }}>{error}</p>
          <p style={{ textAlign: "center", margin: "40px 0 50px 0" }}>
            <button className="btn">{params.id ? "Chỉnh sửa thông tin" : "Tạo mới khách hàng"}</button>
          </p>
        </form>
      </div>
    </div>
  );
}
