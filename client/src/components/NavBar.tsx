import { useLocation, Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import api from "@/api/api";
import { logout } from "@/redux/auth/authSlice";
import clsx from "clsx";

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const handleClick = async () => {
    await api.post("/auth/logout");
    dispatch(logout());
    console.log("clicked");
  };
  return (
    <div className="w-full fixed top-0 left-0 mx-auto h-[65px]  bg-[#1F1F20]/90 text-white z-[100] antialiased backdrop-blur-md">
      <div className="flex items-center justify-between mx-auto w-full max-w-7xl h-full px-10">
        <div className="relative">
          <img src="/logo.svg" alt="logo" className="h-14" />
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button
              onClick={handleClick}
              className="bg-lime-400 hover:text-lime-600 text-zinc-900 px-5"
            >
              LogOut
            </Button>
          ) : null}
          {isLoginPage ? (
            <Link
              to={"/register"}
              className={clsx(
                buttonVariants({ variant: "ghost" }),
                "bg-lime-400 hover:text-lime-600 text-zinc-900 px-5"
              )}
            >
              Register
            </Link>
          ) : null}
          {isRegisterPage ? (
            <Link
              to={"/login"}
              className={clsx(
                buttonVariants({ variant: "ghost" }),
                "bg-lime-400 hover:text-lime-600 text-zinc-900 px-5"
              )}
            >
              Login
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};
