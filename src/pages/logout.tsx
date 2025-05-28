import { authApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

const Logout = () => {
  const logoutUser = useAuthStore((state) => state.logoutAuth);

  useEffect(() => {
    const logout = async () => {
      try {
        await authApi.get("logout/");
        logoutUser();
      } catch (error) {
        console.error(error);
      }
    };
    logout();
  }, []);

  return null;
};

export default Logout;
