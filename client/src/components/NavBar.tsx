import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export const NavBar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  return (
    <div className="w-full fixed top-0 left-0 mx-auto h-[65px]  bg-[#1F1F20]/90 text-white z-[100] antialiased backdrop-blur-md">
      <div className="flex items-center justify-between mx-auto w-full max-w-7xl h-full px-10">
        <div className="relative">
          <img src="/logo.svg" alt="logo" className="h-14" />
        </div>
        <div className="flex items-center gap-4">
          {isLoginPage ? (
            <Button className="bg-lime-400 hover:text-lime-600 text-zinc-900 px-5">
              Register
            </Button>
          ) : null}
          {isRegisterPage ? (
            <Button className="bg-lime-400 hover:text-lime-600 text-zinc-900 px-5">
              Login
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
