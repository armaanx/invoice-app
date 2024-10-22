import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Home</div>,
    },
    {
      path: "/login",
      element: <div>Login</div>,
    },
    {
      path: "/register",
      element: <div>Register</div>,
    },
    {
      path: "/products",
      element: <div>Add Products</div>,
    },
    {
      path: "/generate",
      element: <div>Generate Invoice</div>,
    },
    {
      path: "*",
      element: <div>Login</div>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
