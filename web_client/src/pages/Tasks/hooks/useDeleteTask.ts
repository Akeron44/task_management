import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";
import taskService from "../services/taskService";
import error_messages from "../../../constants/error_messages";
import queryKeys from "../../../constants/queryKeys";
import { Task } from "../types/TaskInterfaces";

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  return useMutation<Task, Error, string>({
    mutationFn: async (eventId: string) => {
      const task = await taskService.deleteTask(eventId);

      if (!task) {
        throw new Error(error_messages.TASK_NOT_DELETED);
      }

      return task;
    },
    onSuccess: () => {
      setTimeout(() => {
        if (location.pathname !== `${routes.ROOT}${routes.TASKS}`) {
          navigate(`${routes.ROOT}${routes.TASKS}`);
        }
      }, 2500);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TASKS],
      });
    },
  });
};

export default useDeleteTask;
