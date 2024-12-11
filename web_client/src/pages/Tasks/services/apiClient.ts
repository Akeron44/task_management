import axios from "axios";
import { processAxiosError } from "../../../helpers/apiErrorHelper";
import {
  CreateTask,
  Task,
  EditTask,
  TaskSummary,
} from "../types/TaskInterfaces";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getToken = () => {
    return JSON.parse(localStorage.getItem("token") || "");
  };

  getAllTasks = async () => {
    try {
      const token = this.getToken();
      const response = await axiosInstance.get<Task[]>(this.endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      processAxiosError(error);
    }
  };

  getTasksStatistics = async () => {
    try {
      const token = this.getToken();
      const response = await axiosInstance.get<TaskSummary>(
        `${this.endpoint}/stats`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      processAxiosError(error);
    }
  };
  getMyTasksStatistics = async () => {
    try {
      const token = this.getToken();
      const response = await axiosInstance.get<TaskSummary>(
        `${this.endpoint}/mystats`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      processAxiosError(error);
    }
  };

  getTask = async (id: string) => {
    try {
      const token = this.getToken();
      const response = await axiosInstance.get<Task>(`${this.endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      processAxiosError(error);
    }
  };

  createTask = async (data: CreateTask) => {
    try {
      const token = this.getToken();
      const response = await axiosInstance.post<T>(this.endpoint, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      processAxiosError(error);
    }
  };

  editTask = async (taskId: string, data: EditTask) => {
    try {
      const token = this.getToken();
      const response = await axiosInstance.patch<T>(
        `${this.endpoint}/${taskId}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      processAxiosError(error);
    }
  };

  deleteTask = async (taskId: string) => {
    try {
      const token = this.getToken();
      const response = await axiosInstance.delete<T>(
        `${this.endpoint}/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (error) {
      processAxiosError(error);
    }
  };
}

export default APIClient;
