import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AddProductsPage from "./components/AddProductsPage";
import InvoicePage from "./components/InvoicePage";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import SignUpPage from "./components/SignUp";
import { Toaster } from "./components/ui/toaster";
import { useAppDispatch } from "./hooks/reduxHooks";
import { checkSession } from "./lib/session";
import { logout } from "./redux/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await checkSession();
      } catch (error) {
        console.log(error);
        dispatch(logout());
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: (
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <PrivateRoute>
              <AddProductsPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/invoice",
          element: (
            <PrivateRoute>
              <InvoicePage />
            </PrivateRoute>
          ),
        },
        {
          path: "/",
          element: <Navigate to="/products" replace />,
        },
        {
          path: "*",
          element: <Navigate to="/login" replace />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
