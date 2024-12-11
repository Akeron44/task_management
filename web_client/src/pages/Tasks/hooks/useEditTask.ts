import { useMutation, useQueryClient } from "@tanstack/react-query";
import error_messages from "../../../constants/error_messages";
import { Task, EditTask } from "../types/TaskInterfaces";
import taskService from "../services/taskService";
import queryKeys from "../../../constants/queryKeys";

interface EditTaskInterface {
  taskId: string;
  task: EditTask;
}

const useEditTask = (closeModal: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, EditTaskInterface>({
    mutationFn: async ({ taskId, task }: EditTaskInterface) => {
      const eventData = await taskService.editTask(taskId, task);

      if (!eventData) {
        throw new Error(error_messages.TASK_NOT_CREATED);
      }

      return eventData;
    },
    onSuccess: () => {
      setTimeout(() => {
        closeModal();
      }, 2500);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TASK_DETAIL],
      });
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

export default useEditTask;
