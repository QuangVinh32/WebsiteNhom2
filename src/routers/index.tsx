import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout";
import ProductDetail from "../pages/ProductDetail";
import AdminRoot from "../pagesAdmin/AdminRoot";
import AdminCategory from "../pagesAdmin/AdminCategory";
import AdminProduct from "../pagesAdmin/AdminProduct";
import ProductForm from "../pagesAdmin/ProductForm";
import CategoryForm from "../pagesAdmin/CategoryForm";
import Login from "../pages/Login";
import Register from "../pages/Resgiter";
import AdminOrder from "../pagesAdmin/AdminOrder";
import AdminUser from "../pagesAdmin/AdminUser";
import AuthLayout from "../layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <AuthLayout isLogin>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "products",
        element: <Products />,
      },

      {
        path: "/product/:productId",
        element: <ProductDetail />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "admin",
        element: (
          <AuthLayout>
            <AdminRoot />
          </AuthLayout>
        ),
        children: [
          {
            index: true,
            element: <AdminProduct />,
          },
          {
            path: "categories",
            element: <AdminCategory />,
          },
          {
            path: "users",
            element: <AdminUser />,
          },
          {
            path: "orders",
            element: <AdminOrder />,
          },

          {
            path: "categories/create",
            element: <CategoryForm mode="create" />,
          },
          {
            path: "categories/:categoryId",
            element: <CategoryForm mode="update" />,
          },
          {
            path: "products",
            element: <AdminProduct />,
          },
          {
            path: "products/create",
            element: <ProductForm mode="create" />,
          },
          {
            path: "products/:productId",
            element: <ProductForm mode="update" />,
          },
        ],
      },
    ],
  },
]);

export default router;
