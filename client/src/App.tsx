import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./components/SignUp";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import AddProductsPage from "./components/AddProductsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <SignUpPage />,
        },
        {
          path: "/products",
          element: <AddProductsPage />,
        },
        {
          path: "/generate",
          element: <div>Generate Invoice</div>,
        },
        {
          path: "/",
          element: <div>Home</div>,
        },
        {
          path: "*",
          element: <div>Login</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
