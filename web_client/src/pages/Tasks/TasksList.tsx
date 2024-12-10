import { Spin } from "antd";
import styles from "./TasksList.module.css";
import { Task } from "./types/TaskInterfaces";
import { LoadingOutlined } from "@ant-design/icons";
import error_messages from "../../constants/error_messages";
import useTasks from "./hooks/useTasks";
import ErrorComponent from "../../components/Error/ErrorComponent";
import EmptyComponent from "../../components/Empty/EmptyComponent";
import TaskCard from "./components/TaskCard/TaskCard";

function TasksList() {
  const { data, error, isLoading } = useTasks();

  const user = JSON.parse(localStorage.getItem("user")!);

  const tasks = data?.filter((task: Task) => task.organizer?.id !== user.id);

  if (tasks?.length === 0) {
    return <EmptyComponent message={error_messages.NO_TASKS} />;
  }

  return (
    <ul className={styles["tasks_list"]}>
      {isLoading && <Spin indicator={<LoadingOutlined spin />} size="large" />}
      {error?.message && <ErrorComponent message={error.message} />}
      {tasks?.map((task: Task) => (
        <li className={styles["event"]} key={task.id + task.place}>
          <TaskCard
            id={task.id}
            name={task.name}
            place={task.place}
            date={task.date}
            description={task.description}
            image="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            peopleGoing={task.peopleGoing || []}
          />
        </li>
      ))}
    </ul>
  );
}

export default TasksList;
