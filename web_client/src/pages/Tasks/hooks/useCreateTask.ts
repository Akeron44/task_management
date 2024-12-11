import { useMutation, useQueryClient } from "@tanstack/react-query";
import eventsService from "../services/taskService";
import { CreateTask, Task } from "../types/TaskInterfaces";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";
import queryKeys from "../../../constants/queryKeys";
import error_messages from "../../../constants/error_messages";

const useCreateTask = (closeModal: () => void) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<Task, Error, CreateTask>({
    mutationFn: async (eventData: CreateTask) => {
      const event = await eventsService.createTask(eventData);

      if (!event) {
        throw new Error(error_messages.TASK_NOT_CREATED);
      }

      return event;
    },
    onSuccess: () => {
      setTimeout(() => {
        closeModal();
        navigate(`${routes.ROOT}${routes.TASKS}`);
      }, 2500);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TASKS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TASKS_STATISTICS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TASKS_MY_STATISTICS],
      });
    },
  });
};

export default useCreateTask;
