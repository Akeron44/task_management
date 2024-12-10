import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import routes from "../../constants/routes";
import styles from "./AppLayout.module.css";
import { useEffect } from "react";
import LeftNavigation from "./components/LeftNavigation/LeftNavigation";
import Navigation from "./components/Navigation/Navigation";

function AppLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={routes.LOG_IN} replace />;
  }

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === routes.ROOT) {
      navigate(`${routes.ROOT}/${routes.TASKS}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <section className={styles["layout"]}>
      <div className={styles["navigation_layout"]}>
        <LeftNavigation />
        <Navigation />
      </div>
      <Outlet />
    </section>
  );
}

export default AppLayout;
