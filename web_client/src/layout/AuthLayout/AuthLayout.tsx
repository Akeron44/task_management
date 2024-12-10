import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import { Button } from "antd";
import { useEffect } from "react";
import routes from "../../constants/routes";

function AuthLayout() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to={routes.ROOT} replace />;
  }

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === routes.ROOT) {
      navigate(routes.LOG_IN, { replace: true });
    }
  }, [location.pathname, navigate]);

  function handleAuthRoutes() {
    if (location.pathname === routes.LOG_IN) {
      return navigate(routes.SIGN_UP);
    }

    return navigate(routes.LOG_IN);
  }

  return (
    <section className={styles["section_layout"]}>
      <Button type="primary" onClick={() => handleAuthRoutes()}>
        {location.pathname === routes.LOG_IN ? "Sign up" : "Log in"}
      </Button>
      <Outlet />
    </section>
  );
}

export default AuthLayout;
