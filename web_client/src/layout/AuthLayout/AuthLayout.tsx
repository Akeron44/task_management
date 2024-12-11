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
    <div className={styles.authContainer}>
      <div className={styles.authContent}>
        <Button
          type="link"
          onClick={() => handleAuthRoutes()}
          className={styles.switchButton}
        >
          {location.pathname === routes.LOG_IN ? "Create account" : "Log in"}
        </Button>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
