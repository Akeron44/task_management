import { createBrowserRouter } from "react-router-dom";
import routes from "../constants/routes";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import ErrorComponent from "../components/Error/ErrorComponent";
import Login from "../pages/Login/Login";
import error_messages from "../constants/error_messages";
import Signup from "../pages/Signup/Signup";
import AppLayout from "../layout/AppLayout/AppLayout";
import TasksList from "../pages/Tasks/TasksList";

const router = createBrowserRouter([
  {
    path: routes.ROOT,
    element: <AppLayout />,
    errorElement: (
      <ErrorComponent message={error_messages.UNKOWN_ERROR_OCCURED} />
    ),
    children: [
      {
        path: routes.TASKS,
        element: <TasksList />,
      },
      // { path: `${routes.TASKS}/${routes.TASK_ID}`, element: <EventDetail /> },
      // { path: routes.MY_TASKS, element: <MyEvents /> },
      // {
      //   path: `${routes.MY_TASKS}/${routes.TASK_ID}`,
      //   element: <EventDetail />,
      // },
    ],
  },
  {
    path: routes.ROOT,
    element: <AuthLayout />,
    errorElement: (
      <ErrorComponent message={error_messages.UNKOWN_ERROR_OCCURED} />
    ),
    children: [
      { path: routes.LOG_IN, element: <Login /> },
      {
        path: routes.SIGN_UP,
        element: <Signup />,
      },
    ],
  },
]);

export default router;