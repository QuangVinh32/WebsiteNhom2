import React, { useEffect, useState } from 'react';
import './Datphong.scss';
import axios from 'axios';
import { BsChatLeftText } from "react-icons/bs";
import RedHeartIcon from 'icon/head';
import { Link } from 'react-router-dom';

enum TrinhTrang {
  trong = 'TRỐNG',
  daDat = 'ĐÃ_ĐẶT',
  dangSuDung = 'ĐANG_SỬ_DỤNG',
}

type Phong = {
  tenPhong: string;
  loaiPhong: string;
  image: string;
  trinhTrang: TrinhTrang;
  donGia: number;
  maPhong: string; // Thêm id vào dữ liệu phòng để có thể xóa
};

export default function Datphong() {
  const [datphongs, setDatPhongs] = useState<Phong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatPhongs();
  }, []);

  async function fetchDatPhongs() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/phong/find-all-phong');
      console.log('API Response:', response.data);

      if (response.data && response.data.length > 0) {
        setDatPhongs(response.data);
      } else {
        console.log('No data available');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  async function handleDelete(maPhong: string) {
    console.log(maPhong);
    if (maPhong) {
      const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa?');
      if (confirmDelete) {
        try {
          await axios.delete(`http://localhost:8080/api/v1/phong/delete-phong/${maPhong}`);
          window.alert('Xóa thành công');
          fetchDatPhongs(); // Cập nhật danh sách phòng sau khi xóa thành công
        } catch (error) {
          console.error('Không thể xóa! Đang có lỗi', error);
          window.alert('Không thể xóa! Đã xảy ra lỗi');
        }
      }
    } else {
      window.alert('ID không tồn tại, bạn không thể xóa');
    }
  }

  const getStatusColor = (trinhTrang: TrinhTrang) => {
    switch (trinhTrang) {
      case TrinhTrang.trong:
        return 'green'; // Color for TRỐNG (empty)
      case TrinhTrang.dangSuDung:
        return 'red'; // Color for ĐANG_SỬ_DỤNG (in use)
      case TrinhTrang.daDat:
        return 'yellow'; // Color for ĐÃ_ĐẶT (booked)
      default:
        return 'black'; // Default color
    }
  };

  return (
    <div className='form-dp-all'>
      <h1 style={{ marginLeft: '950px', marginTop: '30px' }}>Tổng số phòng <b style={{ color: "blue" }}>{datphongs.length}</b></h1>
      <div className='tt'>
        <p>Số phòng trống: <b style={{ color: "blue" }}>{datphongs.filter(phong => phong.trinhTrang === TrinhTrang.trong).length}</b></p>
        <p>Số phòng đang sử dụng: <b style={{ color: "blue" }}>{datphongs.filter(phong => phong.trinhTrang === TrinhTrang.dangSuDung).length}</b></p>
        <p>Số phòng đã đặt: <b style={{ color: "blue" }}>{datphongs.filter(phong => phong.trinhTrang === TrinhTrang.daDat).length}</b></p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : datphongs && datphongs.length > 0 ? (
        <div className='form-dp'>
          {datphongs.map((datphong) => (
            <div className='form' key={datphong.maPhong}>
              <div className='img' style={{ backgroundImage: `url(${datphong.image})` }}></div>
              <div className='flex'>
                <div className='n1'>
                  <div className='tenphong'>
                    <b>Tên Phòng : </b>
                    {datphong.tenPhong}
                  </div>
                  <div className='loaiphong'>
                    <b>Loại Phòng : </b>
                    {datphong.loaiPhong}
                  </div>
                  <div className='trinhtrang' style={{ color: getStatusColor(datphong.trinhTrang) }}>
                    <b style={{ color: "black" }}>Trình trạng : </b>
                    {datphong.trinhTrang}
                  </div>
                  <button className='chittietphong'>
                    <b>Chi tiết phòng</b>
                  </button>
                  <button style={{ marginLeft: "15px" }} className='dichvu'>
                    <b>Dịch Vụ</b>
                  </button>
                </div>
                <div className='n2'>
                  <div className='dongia'>
                    <b>Đơn giá </b>
                    <br />
                    {datphong.donGia}
                  </div>
                  <button className='datphong'>
                    <Link style={{ textDecoration: 'none', color: "white" }} to={`/dp/${datphong.maPhong}`}>Đặt Phòng</Link>
                  </button>
                  <button className='xoa-phong' onClick={() => handleDelete(datphong.maPhong)}>
                    <b>Xóa Phòng</b>
                  </button>
                  <div className='icon-dp'>
                    <div className='icon-1'>
                      <BsChatLeftText />
                      <p style={{ fontSize: "15px" }}>149</p>
                    </div>
                    <div className='icon-2'>
                      <RedHeartIcon />
                      <p style={{ fontSize: "15px" }}>387</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
