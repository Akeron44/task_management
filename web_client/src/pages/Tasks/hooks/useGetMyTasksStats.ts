import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../constants/queryKeys";
import { TaskSummary } from "../types/TaskInterfaces";
import taskService from "../services/taskService";

const useGetTasksStats = () => {
  return useQuery<TaskSummary | undefined, Error>({
    queryKey: [queryKeys.TASKS_STATISTICS],
    queryFn: taskService.getMyTasksStatistics,
    staleTime: 1000,
  });
};

export default useGetTasksStats;
