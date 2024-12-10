import { Button } from "antd";
import styles from "./Navigation.module.css";
import { useState } from "react";
import TaskModal from "../../../../pages/Tasks/components/TaskModal/TaskModal";

function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={styles["navigation_layout"]}>
      <input
        className={styles["input"]}
        placeholder="Search tasks..."
        name="searchTasks"
        id="searchTasks"
      />
      <Button
        onClick={() => setIsModalOpen(true)}
        className={styles["button"]}
        type="primary"
      >
        Create Task
      </Button>
      {isModalOpen && (
        <TaskModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}

export default Navigation;
