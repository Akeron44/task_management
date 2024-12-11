export const formItems = [
  { label: "Title", name: "title", help: "title", type: "text" },
  {
    label: "Description",
    name: "description",
    help: "description",
    type: "text",
  },
  {
    label: "Status",
    help: "status",
    name: "status",
    type: "text",
    options: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
  },
  {
    label: "Priority",
    help: "priority",
    type: "text",
    name: "priority",
    options: ["LOW", "MEDIUM", "HIGH"],
  },
  { label: "Deadline", help: "date", name: "dueDate", type: "date" },
];
