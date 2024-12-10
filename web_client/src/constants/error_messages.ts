const error_messages = {
  TASK_CREATED_SUCCESS: "Your event was successfully created.",

  TASK_SAVED_SUCCESS: "Your event was successfully saved.",

  TASK_NOT_CREATED:
    "Your task could not be created. An unknown error occurred.",

  EVENT_DELETED_SUCCESS: "Your event was successfully deleted.",

  EVENT_NOT_DELETED:
    "Your event could not be deleted. An unknown error occurred.",

  EVENT_ID_MISSING: "Event id is missing.",

  NO_TASKS: "No new tasks.",

  WRONG_DATE: "You can not create an event in the past",

  ARE_YOU_SURE_DELETE:
    "Are you sure you want to delete this event? This action is irreversable.",

  AUTHENTICATION_FAILED: "Authentication failed.",

  UNKOWN_ERROR_OCCURED: "Something went wrong. An unknown error occurred.",

  UNAUTHORIZED: "You are not authorized to perform this action.",

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
