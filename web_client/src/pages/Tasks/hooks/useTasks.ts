import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../constants/queryKeys";
import { Task } from "../types/TaskInterfaces";
import taskService from "../services/taskService";

const useEvents = () => {
  return useQuery<Task[] | undefined, Error>({
    queryKey: [queryKeys.TASKS],
    queryFn: taskService.getAllTasks,
    staleTime: 1000,
  });
};

export default useEvents;
