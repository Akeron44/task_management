import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ScheduleOutlined,
  LogoutOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../../../../constants/routes";
import styles from "./LeftNavigation.module.css";
import { clearLocalStorage } from "../../../../helpers/localStorageHelper";

type MenuItem = Required<MenuProps>["items"][number];

function LeftNavigation() {
  const items: MenuItem[] = [
    {
      key: "1",
      icon: <TableOutlined />,
      label: "All tasks",
      onClick: () => navigate(`${routes.ROOT}${routes.TASKS}`),
    },
    {
      key: "2",
      icon: <ScheduleOutlined />,
      label: "My tasks",
      onClick: () => navigate(`${routes.ROOT}/${routes.MY_TASKS}`),
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: "Log out",
      onClick: () => handleLogout(),
    },
  ];

  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearLocalStorage();
    navigate(routes.ROOT);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className={styles["navigation"]} style={{ width: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={[]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
}

export default LeftNavigation;
