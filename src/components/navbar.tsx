import { tokenApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import type { UserType } from "@/types/api-types";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

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

  useEffect(() => {
    const initUser = async () => {
      if (!accessToken) return;
      const user = await getUserInfo(accessToken);
      setUser(user);
    };

    initUser();
  }, [accessToken]);

  return (
    <div className="absolute top-0 inset-x-0 bg-gray-500/10 w-full h-16 px-10 py-3 flex items-center">
      <NavLink
        to="/"
        className="text-white bg-orange-400/20 inline-flex p-2 rounded-lg hover:cursor-pointer hover:bg-orange-400/30 transition font-medium mr-4"
      >
        Home
      </NavLink>
      {userInfo ? (
        <div className="flex items-center gap-4">
          <p>Hello {userInfo.username}</p>
          <NavLink
            to="/signed-in"
            className="text-white bg-orange-400/20 inline-flex p-2 rounded-lg hover:cursor-pointer hover:bg-orange-400/30 transition font-medium"
          >
            Own Notes
          </NavLink>
          <NavLink
            to="/logout"
            className="text-white bg-orange-400/20 inline-flex p-2 rounded-lg hover:cursor-pointer hover:bg-orange-400/30 transition font-medium"
          >
            Logout
          </NavLink>
        </div>
      ) : (
        <NavLink
          to="/login"
          className="text-white bg-orange-400/20 inline-flex p-2 rounded-lg hover:cursor-pointer hover:bg-orange-400/30 transition font-medium"
        >
          Login
        </NavLink>
      )}
    </div>
  );
};

export default Navbar;
