import { Task } from "../types/TaskInterfaces";
import APIClient from "./apiClient";

export default new APIClient<Task>("/tasks");
