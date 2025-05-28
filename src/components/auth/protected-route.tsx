import { authApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshUser = useAuthStore((state) => state.loginAuth);
  const [authenticated, setAuthenticated] = useState<undefined | boolean>(
    undefined
  );

  useEffect(() => {
    authenticate();
  }, []);

  const refreshToken = async () => {
    try {
      const res = await authApi.post("refresh/");

      const token = res.data.access;

      refreshUser(token);
      setAuthenticated(true);
    } catch (error) {
      console.error(error);
      setAuthenticated(false);
    }
  };

  const authenticate = async () => {
    if (!accessToken) {
      refreshToken();
      return;
    }
    //Check if the token has expired
    const decoded = jwtDecode(accessToken);

    if (!decoded.exp) {
      refreshToken();
      return;
    }

    const isExpired = decoded.exp * 1000 < Date.now();

    //If has expired refresh the token
    if (isExpired) {
      refreshToken();
      return;
    }
    setAuthenticated(true);
  };

  if (authenticated === undefined) return <p>Loading...</p>;
  if (!authenticated) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
