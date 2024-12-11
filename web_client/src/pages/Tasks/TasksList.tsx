import TaskCard from "./components/TaskCard/TaskCard";
import styles from "./TasksList.module.css";
import useTasks from "./hooks/useTasks";
import EmptyComponent from "../../components/Empty/EmptyComponent";

function TasksList() {
  const stats = [
    { title: "Total Tasks", value: "12" },
    { title: "In Progress", value: "5" },
    { title: "Completed", value: "4" },
    { title: "Pending", value: "3" },
  ];

  const { data } = useTasks();

  return (
    <div>
      <div className={styles.statsSection}>
        {stats.map((stat) => (
          <div key={stat.title} className={styles.statCard}>
            <div className={styles.statTitle}>{stat.title}</div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.taskList}>
        {data?.length! > 0 ? (
          data?.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
              myTask={true}
              id={task.id}
              updatedAt={task.updatedAt}
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
