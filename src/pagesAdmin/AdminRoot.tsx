import AdminSidebar from "./AdminSizebar";
import { Outlet } from "react-router-dom";
import "../pagesAdmin/AdminRoot.scss";

const AdminRoot: React.FC = () => {
  return (
    <div className="admin-root">
      <div className="admin-root-1">
        <div className="menu-admin">
          <AdminSidebar />
        </div>
        <div className="menu-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminRoot;
