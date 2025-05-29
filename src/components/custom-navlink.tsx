import { NavLink } from "react-router-dom";

interface Props {
  activeRoute: string;
  to: string;
  content: string;
  className?: string;
}

const CustomNavlink = ({ activeRoute, to, content, className }: Props) => {
  const isActiveRoute = activeRoute === to;

  return (
    <NavLink
      to={to}
      className={`text-white inline-flex p-2 rounded-lg hover:cursor-pointer hover:brightness-150 transition font-medium items-center justify-center  ${
        isActiveRoute ? "bg-orange-500/50" : "bg-orange-500/40"
      } ${className && className}`}
    >
      <span>{content}</span>
    </NavLink>
  );
};

export default CustomNavlink;
