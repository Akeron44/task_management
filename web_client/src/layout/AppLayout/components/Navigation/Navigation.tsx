import { Input, Button } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useState } from "react";
import TaskModal from "../../../../pages/Tasks/components/TaskModal/TaskModal";

function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/tasks":
        return "Tasks";
      case "/calendar":
        return "Calendar";
      case "/statistics":
        return "Statistics";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className={styles.navigation}>
      <h1 className={styles.pageTitle}>{getPageTitle()}</h1>

      <div className={styles.actions}>
        <div className={styles.searchBar}>
          <Input
            placeholder="Search tasks..."
            prefix={<SearchOutlined />}
            size="large"
          />
        </div>

        <Button className={styles.filterButton}>
          <FilterOutlined />
          Filter
        </Button>

        <Button
          onClick={() => setIsModalOpen(true)}
          className={styles.addButton}
          type="primary"
        >
          <PlusOutlined />
          Add Task
        </Button>
      </div>
      {isModalOpen && (
        <TaskModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Navigation;
