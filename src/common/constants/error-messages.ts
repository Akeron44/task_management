export const error_messages = {
  // General error messages
  INVALID_CREDENTAILS: "Invalid credentials provided.",
  UNAUTHORIZED: "Unauthorized access.",

  // User-related error messages
  EMAIL_IN_USE: "Email is already in use.",
  INVALID_EMAIL: "Invalid email address.",
  MIN_CHARACTERS: (field: string, min: number) =>
    `${field} must be at least ${min} characters long.`,
  MAX_CHARACTERS: (field: string, max: number) =>
    `${field} must not exceed ${max} characters.`,
  MIN_NUMBER: (field: string, min: number) =>
    `${field} must be at least ${min}.`,
  MAX_NUMBER: (field: string, max: number) =>
    `${field} must not exceed ${max}.`,

  // Task-related error messages
  TASK_NOT_FOUND: (id: string) => `Task with ID ${id} not found.`,
  TASK_ALREADY_DELETED: (id: string) =>
    `Task with ID ${id} is already deleted.`,

  // Password error messages
  PASSWORD_COMPLEXITY:
    "Password must contain at least one uppercase letter, one number, and one special character.",
};
