import {
  HomeOutlined,
  CheckSquareOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./LeftNavigation.module.css";

function LeftNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "/tasks", icon: <CheckSquareOutlined />, label: "My Tasks" },
    { key: "/statistics", icon: <BarChartOutlined />, label: "Statistics" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <nav className={styles.leftNav}>
      <div className={styles.logo}>
        <span className={styles.logoText}>TaskMaster</span>
      </div>

      <div className={styles.menu}>
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`${styles.menuItem} ${
              location.pathname === item.key ? styles.active : ""
            }`}
            onClick={() => navigate(item.key)}
          >
            <span className={styles.menuIcon}>{item.icon}</span>
            <span className={styles.menuText}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.userSection}>
        <div className={styles.userAvatar}>
          <UserOutlined />
        </div>
        <span className={styles.userName}>John Doe</span>
        <div className={styles.menuItem} onClick={handleLogout}>
          <LogoutOutlined className={styles.menuIcon} />
          <span className={styles.menuText}>Logout</span>
        </div>
      </div>
    </nav>
  );
}

export default LeftNavigation;
