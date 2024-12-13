import styles from "./DashboardTasks.module.css";
import TaskCard from "../TaskCard/TaskCard";
import useTasks from "../../hooks/useTasks";
import EmptyComponent from "../../../../components/Empty/EmptyComponent";
import { Task } from "../../types/TaskInterfaces";
import ErrorComponent from "../../../../components/Error/ErrorComponent";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useTaskFilters } from "../../../../store/useTaskFilters";
import { useMemo } from "react";
import { getFilteredAndSortedTasks } from "../../helpers/taskFilters";
import { getTasksStats } from "../../helpers/getTasksStats";
import Statistic from "../Statistic/Statistic";

function DashboardTasks() {
  const { filters, sortConfig } = useTaskFilters();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data, error, isLoading } = useTasks();

  const tasks = data?.filter((task: Task) => task.userId !== user.id);

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
      {error && <ErrorComponent message={error.message} />}
      <Statistic stats={stats} />

      <div className={styles.taskList}>
        {filteredAndSortedTasks && filteredAndSortedTasks.length > 0 ? (
          filteredAndSortedTasks?.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
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

export default DashboardTasks;
