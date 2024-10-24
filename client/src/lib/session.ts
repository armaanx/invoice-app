import api from "@/api/api";
import { logout } from "@/redux/auth/authSlice";
import store from "@/redux/store";

export const checkSession = async () => {
  try {
    await api.get("/check-session"); // Endpoint to check session status
  } catch (error) {
    // If the session is expired, log out the user
    console.log(error);
    store.dispatch(logout());
  }
};
