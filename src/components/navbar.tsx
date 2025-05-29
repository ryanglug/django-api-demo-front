import {
  NAVBAR_PROTECTED_ROUTES,
  NAVBAR_PUBLIC_ROUTES,
} from "@/constants/link-constants";
import { tokenApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import type { UserType } from "@/types/api-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomNavlink from "./custom-navlink";

const getUserInfo = async (accessToken: string) => {
  try {
    const res = await tokenApi(accessToken).get("");

    const user = res.data;
    return user as UserType;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get user info");
  }
};

const Navbar = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const userInfo = useAuthStore((state) => state.userInfo);
  const activeRoute = useLocation().pathname;

  useEffect(() => {
    const initUser = async () => {
      if (!accessToken) return;
      const user = await getUserInfo(accessToken);
      setUser(user);
    };

    initUser();
  }, [accessToken]);

  const isLoggedIn = !!userInfo;

  return (
    <div className="absolute top-0 inset-x-0 bg-gray-500/10 w-full h-16 px-10 py-3 flex items-center">
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <p>Hello {userInfo.username}</p>
          {NAVBAR_PROTECTED_ROUTES.map((route) => (
            <CustomNavlink
              key={`navbar-route-${route.content}`}
              activeRoute={activeRoute}
              content={route.content}
              to={route.route}
            />
          ))}
        </div>
      ) : (
        <>
          {NAVBAR_PUBLIC_ROUTES.map((route) => (
            <CustomNavlink
              key={`navbar-route-${route.content}`}
              activeRoute={activeRoute}
              content={route.content}
              to={route.route}
            />
          ))}
        </>
      )}
      <CustomNavlink
        activeRoute={activeRoute}
        content="Home"
        to="/"
        className="ml-auto"
      />
    </div>
  );
};

export default Navbar;
