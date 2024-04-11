import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "../store";
export default function AuthRequired() {
  const isLoggedIn = useLogin();
  if (!isLoggedIn) {
    return <Navigate to="login" />;
  }
  return <Outlet />;
}
