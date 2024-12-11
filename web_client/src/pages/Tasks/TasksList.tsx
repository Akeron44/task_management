import TaskCard from "./components/TaskCard/TaskCard";
import styles from "./TasksList.module.css";
import useTasks from "./hooks/useTasks";
import EmptyComponent from "../../components/Empty/EmptyComponent";

import { Task } from "./types/TaskInterfaces";
import useGetMyTasksStats from "./hooks/useGetMyTasksStats";

function TasksList() {
  const { data: stats } = useGetMyTasksStats();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data } = useTasks();

  const tasks = data?.filter((task: Task) => task.userId === user.id);

  return (
    <div>
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total Tasks</div>
          <div className={styles.statValue}>{stats?.total}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>In Progress</div>
          <div className={styles.statValue}>{stats?.byStatus.IN_PROGRESS}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Completed</div>
          <div className={styles.statValue}>{stats?.byStatus.COMPLETED}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Pending</div>
          <div className={styles.statValue}>{stats?.byStatus.PENDING}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Low Priority</div>
          <div className={styles.statValue}>{stats?.byPriority.LOW}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Medium Priority</div>
          <div className={styles.statValue}>{stats?.byPriority.MEDIUM}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>High Priority</div>
          <div className={styles.statValue}>{stats?.byPriority.HIGH}</div>
        </div>
      </div>

      <div className={styles.taskList}>
        {tasks?.length! > 0 ? (
          tasks?.map((task) => (
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
