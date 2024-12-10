import { Alert } from "antd";
import styles from "./Notification.module.css";

interface Props {
  message: string;
  type: "success" | "info" | "warning" | "error" | undefined;
  size?: "big" | "small";
}

function Notification({ message, type, size }: Props) {
  return (
    <Alert
      className={
        size === "small"
          ? styles["notification_small"]
          : styles["notification_big"]
      }
      showIcon
      message={message}
      type={type}
    />
  );
}

export default Notification;
