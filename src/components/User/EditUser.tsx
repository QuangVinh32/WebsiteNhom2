// Import các thư viện và module cần thiết
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./edit.scss"
// Khai báo kiểu dữ liệu cho người dùng
type User = {
    id: string,
    firstName: string,
    lastName: string,
    address: string,
    age: number,
    department: string
}

// Component Trang Chỉnh Sửa
function EditUser() {
    // Lấy thông tin `userID` từ tham số đường dẫn
    const { userID } = useParams();
    const navigate = useNavigate();

    // Khai báo state để lưu trữ thông tin người dùng
    const [user, setUser] = useState<User>({
        id: '',
        firstName: '',
        lastName: '',
        address: '',
        age: 0,
        department: ''
    });

    // Sử dụng useEffect để gọi API và lấy thông tin người dùng
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Gọi API để lấy thông tin người dùng dựa trên `userID`
                const response = await axios.get(`http://localhost:3000/users/${userID}`);
                setUser(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng", error);
            }
        };

        // Gọi hàm fetchUser khi component được mount
        fetchUser();
    }, [userID]);

    // Hàm xử lý khi người dùng submit biểu mẫu chỉnh sửa
    const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Gọi API để cập nhật thông tin người dùng
            await axios.put(`http://localhost:3000/users/${userID}`, user);
            window.alert("Cập nhật thành công");
            navigate('/');
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin người dùng", error);
            window.alert("Đã có lỗi xảy ra. Vui lòng kiểm tra lại.");
        }
    };

    // Hàm xử lý khi có thay đổi trên các trường input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // Cập nhật giá trị của trường trong state
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    return (
        <div>
            <h1>Edit User</h1>
            {/* Biểu mẫu chỉnh sửa */}
            <form onSubmit={handleUpdateUser}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={user.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={user.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="department">Department</label>
                    <input
                        type="text"
                        name="department"
                        id="department"
                        value={user.department}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button type="submit">Update</button>
                    <Link to="/">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export default EditUser;
