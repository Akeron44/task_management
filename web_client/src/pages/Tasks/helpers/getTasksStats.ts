import { TaskStats } from "../types/StatsInterface";
import { Task } from "../types/TaskInterfaces";

export const getTasksStats = (tasks: Task[]): TaskStats => {
  return {
    total: tasks.length,
    byStatus: {
      PENDING: tasks.filter((t) => t.status === "PENDING").length,
      IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS").length,
      COMPLETED: tasks.filter((t) => t.status === "COMPLETED").length,
      CANCELLED: tasks.filter((t) => t.status === "CANCELLED").length,
    },
    byPriority: {
      LOW: tasks.filter((t) => t.priority === "LOW").length,
      MEDIUM: tasks.filter((t) => t.priority === "MEDIUM").length,
      HIGH: tasks.filter((t) => t.priority === "HIGH").length,
    },
  };
};
