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
import GithubImage from "@/assets/images/github.svg";

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
  }, [accessToken, setUser]);

  const isLoggedIn = !!userInfo;

  return (
    <div className="absolute top-0 inset-x-0 bg-gray-500/10 w-full h-16 px-10 py-3 flex items-center justify-between">
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <p>
            Hello <span data-testid="user-span">{userInfo.username}</span>
          </p>
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
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/glugnoob/django-api-demo"
          className="hover:brightness-90 transition"
          target="_blank"
        >
          <img src={GithubImage} className="size-16" />
        </a>
        <CustomNavlink activeRoute={activeRoute} content="Home" to="/" />
      </div>
    </div>
  );
};

export default Navbar;
