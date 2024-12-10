export interface TaskModalProps {
  taskId?: number;
  closeModal: () => void;
  isModalOpen: boolean;
}

export interface Person {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  organizer?: Person;
  place: string;
  date: Date;
  image: string;
  peopleGoing: Person[];
  myEvent?: boolean;
}

export interface CreateTask {
  name: string;
  description: string;
  place: string;
  date: Date;
  image: string;
}

export interface DefaultValues {
  name?: string;
  place?: string;
  description?: string;
  date?: Date;
}

export interface EditTask {
  name?: string;
  description?: string;
  place?: string;
  date?: Date;
}
