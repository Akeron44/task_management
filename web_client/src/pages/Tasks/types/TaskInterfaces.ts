export interface TaskModalProps {
  taskId?: string;
  closeModal: () => void;
  isModalOpen: boolean;
  isEventLoading?: boolean;
  taskData?: Task;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  myTask?: boolean;
  userId?: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt?: Date;
  updatedAt?: Date;
  dueDate?: Date;
}

export interface CreateTask {
  title: string;
  description: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  dueDate: Date;
}

export interface DefaultValues {
  title?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  description?: string;
  dueDate?: Date;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

export interface EditTask {
  title?: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  dueDate?: Date;
}
