export const formItems = [
  { label: "Title", help: "title", type: "text" },
  { label: "Description", help: "description", type: "text" },
  {
    label: "Status",
    help: "status",
    type: "text",
    options: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
  },
  {
    label: "Priority",
    help: "priority",
    type: "text",
    options: ["LOW", "MEDIUM", "HIGH"],
  },
  { label: "Due Date", help: "date", type: "date" },
];
