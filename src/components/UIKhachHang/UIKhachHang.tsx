import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UIKhachHang.scss';

enum Giotinh {
  NAM = 'NAM',
  NU = 'NỮ',
}
type Khachhang = {
  maKH: string;
  name: string;
  gioiTinh: Giotinh;
  soDienThoai: string;
  soCCCD: string;
};

function UIKhachHang() {
  const [khachhangs, setKhachhangs] = useState<Array<Khachhang>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  async function fetchKhachhangs(page: number = 1, search: string = '') {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/khachhang/find-all-khachhang?page=${page}&size=4&search=${search}`
      );
      setKhachhangs(response.data.content);
      setCurrentPage(response.data.pageable.pageNumber + 1);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  async function handleDelete(id: string) {
    if (id) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/khachhang/delete-khachhang/${id}`);
        window.alert('Xóa thành công');
        fetchKhachhangs(currentPage, searchQuery);
      } catch (error) {
        console.log('Không thể xóa! Đang có lỗi', error);
      }
    } else {
      window.alert('ID không tồn tại, bạn không thể xóa');
    }
  }

  useEffect(() => {
    fetchKhachhangs();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetchKhachhangs(1, searchQuery);
    } else {
      setSearchQuery('');
      fetchKhachhangs(1); // Fetch the data for the initial state
    }
  };

  return (
    <div className='form-UI'>
      <h1 className="h1">Danh sách khách hàng</h1>
      <div className="top-table">
        <p className="btn-create-user">
          <Link to="create-khachhang" className="btn-create-user-link">
            Create User
          </Link>
        </p>
        <div className="search-container">
          <input
            className="search-name"
            type="text"
            placeholder="Search Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        <button className="search-button" onClick={handleSearch}>Search
        </button>
        </div>
      </div>
      <div className="table-container">
        <table style={{ width: '100%', height: '50px' }}>
          <thead>
            <tr>
              <th>Mã Khách Hàng</th>
              <th>Tên Khách Hàng</th>
              <th>Giới Tính</th>
              <th>Số Điện Thoại</th>
              <th>Số CCCD</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
<tbody>
  {khachhangs && khachhangs.map((khachhang) => (
    <tr key={khachhang.maKH}>
      <td>{khachhang.maKH}</td>
      <td>{khachhang.name}</td>
      <td>{khachhang.gioiTinh}</td>
      <td>{khachhang.soDienThoai}</td>
      <td>{khachhang.soCCCD}</td>
      <td>
        <Link to={`update-khachhang/${khachhang.maKH}`} className="users-edit">
          Edit User
        </Link>
      </td>
      <td>
        <button className="users-delete" onClick={() => handleDelete(khachhang.maKH)}>
          Delete User
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
        <div className='form-UI-2'>
        <div className='page'>
          <button disabled={currentPage === 1} onClick={() => fetchKhachhangs(currentPage - 1, searchQuery)}>
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, page) => (
            <button
              style={{ marginLeft: '3px', backgroundColor: currentPage === page + 1 ? 'green' : '' }}
              key={page}
              onClick={() => fetchKhachhangs(page + 1, searchQuery)}
              disabled={currentPage === page + 1}
            >
              {page + 1}
            </button>
          ))}
          <button
            style={{ marginLeft: '3px' }}
            disabled={currentPage === totalPages}
            onClick={() => fetchKhachhangs(currentPage + 1, searchQuery)}
          >
            Next
          </button>
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default UIKhachHang;
