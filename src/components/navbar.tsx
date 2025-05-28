import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="absolute top-0 inset-x-0 bg-gray-500/10 w-full h-12 px-10">
      <NavLink
        to="/login"
        className="text-white bg-orange-400/20 inline-flex p-2 rounded-lg hover:cursor-pointer hover:bg-orange-400/30 transition mt-1 font-medium"
      >
        Login
      </NavLink>
    </div>
  );
};

export default Navbar;
