export const PROTECTED_ROUTES = ["/signed-in", "/logout"];
export const PUBLIC_ROUTES = ["/", "/login", "/register"];

export const NAVBAR_PROTECTED_ROUTES = [
  { route: "/signed-in", content: "Own Notes" },
  { route: "/logout", content: "Logout" },
];

export const NAVBAR_PUBLIC_ROUTES = [{ route: "/login", content: "Login" }];
