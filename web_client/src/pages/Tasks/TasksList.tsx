import TaskCard from "./components/TaskCard/TaskCard";
import styles from "./TasksList.module.css";
import useTasks from "./hooks/useTasks";
import EmptyComponent from "../../components/Empty/EmptyComponent";
import { Task } from "./types/TaskInterfaces";
import Statistic from "./components/Statistic/Statistic";
import { useMemo } from "react";
import { getTasksStats } from "./helpers/getTasksStats";
import { getFilteredAndSortedTasks } from "./helpers/taskFilters";
import { useTaskFilters } from "../../store/useTaskFilters";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ErrorComponent from "../../components/Error/ErrorComponent";

function TasksList() {
  const { filters, sortConfig } = useTaskFilters();
  const { data, error, isLoading } = useTasks();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const tasks = data?.filter((task: Task) => task.userId === user.id);

  const filteredAndSortedTasks = useMemo(() => {
    return getFilteredAndSortedTasks(tasks, filters, sortConfig);
  }, [tasks, filters, sortConfig]);

  const stats = useMemo(() => {
    return getTasksStats(filteredAndSortedTasks);
  }, [filteredAndSortedTasks]);

  if (isLoading) {
    return <Spin indicator={<LoadingOutlined spin />} size="large" />;
  }

  return (
    <div>
      <Statistic stats={stats} />
      {error && <ErrorComponent message={error.message} />}
      <div className={styles.taskList}>
        {filteredAndSortedTasks && filteredAndSortedTasks?.length > 0 ? (
          filteredAndSortedTasks?.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
              myTask={true}
              id={task.id}
              dueDate={task.dueDate}
              createdAt={task.createdAt}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <EmptyComponent message="No tasks found" />
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksList;
