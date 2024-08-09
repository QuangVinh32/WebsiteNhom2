import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../helpers/common";

interface PermissionLayoutProps {
  children?: ReactNode;
  isLogin?: boolean;
}

const AuthLayout = ({ children, isLogin }: PermissionLayoutProps) => {
  const { pathname } = useLocation();
  console.log(pathname);

  const user = getUserInfo();
  const role = user?.role;

  // nếu ko có role là admin
  if (role !== "ADMIN" && !isLogin) {
    return <Navigate to="/products" replace />;
    // thì điều hướng về trang products
  }
  // nếu tồn tại user (đã login) và đang ở trang login thì điều hướng về admin
  if (user && isLogin) {
    return <Navigate to="/admin/products" replace />;
  }

  return <>{children}</>;
};

export default AuthLayout;
