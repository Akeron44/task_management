const error_messages = {
  TASK_NOT_CREATED:
    "Your task could not be created. An unknown error occurred.",

  TASK_NOT_DELETED:
    "Your task could not be deleted. An unknown error occurred.",

  TASK_ID_MISSING: "task id is missing.",

  NO_TASKS: "No new tasks.",

  WRONG_DATE: "You can not create an task in the past",

  AUTHENTICATION_FAILED: "Authentication failed.",

  UNKOWN_ERROR_OCCURED: "Something went wrong. An unknown error occurred.",

  UNAUTHORIZED: "You are not authorized to perform this action.",

  PASSWORD_LOWERCASE: "Password must have at least one lowercase letter",
  PASSWORD_UPPERCASE: "Password must have at least one uppercase letter",
  PASSWORD_NUMBER: "Password must have at least one number",
  PASSWORD_SYMBOL: "Password must have at least one symbol",

  HAS_TO_BE: (entity: string) =>
    `This field has to be an ${entity.toLowerCase()}`,

  MIN_CHARACTERS: (entity: string, characters: number) =>
    `${entity.toUpperCase()} needs to be at least ${characters} characters long.`,

  MAX_CHARACTERS: (entity: string, characters: number) =>
    `${entity.toUpperCase()} can't to be more than ${characters} characters long.`,

  ENTITY_REQUIRED: (entity: string) => `${entity.toUpperCase()} is required.`,

  ENTITY_MIN_LENGTH: (entity: string, min: number) =>
    `${entity.toUpperCase()} should be at minimum length of ${min}.`,

  ENTITY_MAX_LENGTH: (entity: string, max: number) =>
    `${entity.toUpperCase()} can't exceed ${max} characters.`,

  ENTITY_MIN: (entity: string, min: number) =>
    `${entity.toUpperCase()} can't be lower than ${min}.`,

  ENTITY_MAX: (entity: string, max: number) =>
    `${entity.toUpperCase()} can't be more than ${max}.`,

  ACTION_FAILED: (status: number, errorMessage: string) =>
    `This action failed with status ${status}: ${errorMessage}`,
};

export default error_messages;
