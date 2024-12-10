import axios from "axios";
import error_messages from "../constants/error_messages";

export function processAxiosError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const errorMessage =
      error.response?.data?.message || error_messages.UNKOWN_ERROR_OCCURED;
    const statusCode = error.response?.status || 500;
    throw new Error(error_messages.ACTION_FAILED(statusCode, errorMessage));
  } else {
    throw new Error(error_messages.UNKOWN_ERROR_OCCURED);
  }
}
