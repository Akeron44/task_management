import { useMutation, useQueryClient } from "@tanstack/react-query";
import error_messages from "../../../constants/error_messages";
import { Task, EditTask } from "../types/TaskInterfaces";
import taskService from "../services/taskService";
import queryKeys from "../../../constants/queryKeys";

interface EditEventInterface {
  eventId: number;
  event: EditTask;
}

const useEditTask = (closeModal: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, EditEventInterface>({
    mutationFn: async ({ eventId, event }: EditEventInterface) => {
      const eventData = await taskService.editTask(eventId, event);

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
    },
  });
};

export default useEditTask;
