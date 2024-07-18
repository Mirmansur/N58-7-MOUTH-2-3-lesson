import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const isLogin = localStorage.getItem("email");
  return isLogin ? <Outlet /> : <Navigate replace to={"/"} />;
};

export default Auth;
