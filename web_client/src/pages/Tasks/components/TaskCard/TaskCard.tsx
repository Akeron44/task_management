import {
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import styles from "./TaskCard.module.css";
import { Task } from "../../types/TaskInterfaces";
import { useState } from "react";
import TaskModal from "../TaskModal/TaskModal";
import useDeleteTask from "../../hooks/useDeleteTask";
import error_messages from "../../../../constants/error_messages";

function TaskCard({
  id,
  title,
  description,
  status,
  updatedAt,
  priority,
}: Task) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const { mutate: mutateDelete } = useDeleteTask();

  function handleDeleteEvent(taskId: string) {
    Modal.confirm({
      title: "Are you sure?",
      content: error_messages.ARE_YOU_SURE_DELETE,
      onOk: () => mutateDelete(taskId),
    });
  }

  return (
    <div className={styles.taskCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span
          className={`${styles.priority.toLocaleLowerCase()} ${
            priority && styles[priority.toLocaleLowerCase()]
          }`}
        >
          {priority}
        </span>
      </div>

      <div className={styles.status}>
        <span
          className={`${styles.statusDot} ${
            status && styles[status.toLocaleLowerCase()]
          }`}
        />
        <span className={styles.statusText}>
          {status && status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.footer}>
        <div className={styles.dueDate}>
          <CalendarOutlined className={styles.dateIcon} />
          {updatedAt && formatDate(updatedAt.toString())}
        </div>

        <div className={styles.actions}>
          <Button
            type="text"
            icon={<EditOutlined />}
            className={styles.actionButton}
            onClick={() => setIsModalOpen(true)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className={styles.actionButton}
            onClick={() => handleDeleteEvent(id)}
            danger
          />
        </div>
      </div>
      {isModalOpen && (
        <TaskModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          taskId={id}
        />
      )}
    </div>
  );
}

export default TaskCard;
