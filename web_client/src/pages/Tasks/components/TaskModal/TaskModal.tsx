import { Button, DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import styles from "./TaskModal.module.css";
import ErrorComponent from "../../../../components/Error/ErrorComponent";
import Notification from "../../../../components/Notification/Notification";
import {
  CreateTask,
  DefaultValues,
  TaskModalProps,
} from "../../types/TaskInterfaces";
import { formItems } from "../../constants/formFieldConfig";
import { getNonMatchingProperties } from "../../helpers/getNonMatchingHelper";
import { schema } from "../../helpers/validateForm";
import useCreateTask from "../../hooks/useCreateTask";
import useTask from "../../hooks/useTask";
import useEditTask from "../../hooks/useEditTask";
import error_messages from "../../../../constants/error_messages";

function TaskModal({ taskId, closeModal, isModalOpen }: TaskModalProps) {
  const [defaultValues, setDefaultValues] = useState<DefaultValues>({});

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CreateTask>({ resolver: zodResolver(schema) });

  const {
    data: taskData,
    error: eventError,
    isLoading: isEventLoading,
  } = taskId
    ? useTask(taskId.toString())
    : { data: null, error: null, isLoading: null };

  const {
    mutate: createMutate,
    isSuccess: isCreateSuccess,
    error: createError,
    isPending: isCreateLoading,
  } = useCreateTask(closeModal);

  const {
    mutate: editMutate,
    error: editError,
    isSuccess: isEditSuccess,
    isPending: isEditLoading,
  } = useEditTask(closeModal);

  useEffect(() => {
    if (taskData && taskId) {
      setDefaultValues({
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        status: taskData.status,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
      });
      setValue("title", taskData.title);
      setValue("description", taskData.description);
      setValue("status", taskData.status);
      setValue("priority", taskData.priority);
      setValue("dueDate", dayjs(taskData.dueDate).toDate());
    }
  }, [taskData, taskId, setValue]);

  const handleFormSubmit = async (form: FieldValues) => {
    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      dueDate: form.date,
    };

    if (taskId) {
      const changedFields = getNonMatchingProperties(defaultValues, form);
      editMutate({ taskId: taskId.toString(), task: changedFields });
    } else {
      console.log(payload);
      createMutate(payload);
    }
  };

  const errorMessage =
    createError?.message || editError?.message || eventError?.message;
  const isLoading = isEditLoading || isCreateLoading || isEventLoading;
  const isSuccess = isCreateSuccess || isEditSuccess;

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      onCancel={closeModal}
      className={styles.modalContent}
      closeIcon={<CloseOutlined className={styles.closeButton} />}
      width={500}
      centered
      destroyOnClose
      maskClosable={false}
      title={
        <div className={styles.header}>
          <h3 className={styles.title}>
            {!taskId ? "Create New Task" : "Edit Task"}
          </h3>
        </div>
      }
    >
      {isLoading && <Spin indicator={<LoadingOutlined spin />} size="small" />}

      {isSuccess && (
        <Notification
          size="small"
          type="success"
          message={
            isCreateSuccess
              ? error_messages.TASK_CREATED_SUCCESS
              : error_messages.TASK_SAVED_SUCCESS
          }
        />
      )}

      {errorMessage && <ErrorComponent message={errorMessage} />}

      <Form
        name="task-form"
        layout="vertical"
        className={styles.form}
        onFinish={handleSubmit(handleFormSubmit)}
        autoComplete="off"
      >
        <div className={styles.formItemsContainer}>
          {formItems.map((item) => (
            <Form.Item<CreateTask>
              key={item.help}
              label={item.label as keyof CreateTask}
              validateStatus={
                errors[item.help as keyof CreateTask]?.message ? "error" : ""
              }
              help={errors[item.help as keyof CreateTask]?.message}
            >
              <Controller
                name={item.help as keyof CreateTask}
                control={control}
                defaultValue={
                  defaultValues[item.name as keyof DefaultValues] || ""
                }
                render={({ field }) => {
                  if (item.help === "date") {
                    return (
                      <DatePicker
                        {...field}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          field.onChange(date ? date.toDate() : null)
                        }
                      />
                    );
                  }

                  if (item.help === "status" || item.help === "priority") {
                    return (
                      <Select
                        {...field}
                        value={field.value ? String(field.value) : ""}
                      >
                        {item.options?.map((option: string) => (
                          <Select.Option key={option} value={option}>
                            {option}
                          </Select.Option>
                        ))}
                      </Select>
                    );
                  }
                  return (
                    <Input
                      {...field}
                      value={field.value ? String(field.value) : ""}
                      type={item.type}
                    />
                  );
                }}
              />
            </Form.Item>
          ))}
        </div>

        <Form.Item label={null} className={styles.buttonGroup}>
          <Button
            type="primary"
            danger
            onClick={closeModal}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className={`${styles.button} ${styles.submitButton}`}
          >
            {!taskId ? "Create Task" : "Save Changes"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TaskModal;
{
  /* {formItems.map((item) => (
  <Form.Item<CreateTask>
  key={item.help}
  label={item.label as keyof CreateTask}
  className={styles.formGroup}
  validateStatus={
    errors[item.help as keyof CreateTask]?.message ? "error" : ""
    }
    help={errors[item.help as keyof CreateTask]?.message}
    >
    <Controller
    name={item.help as keyof CreateTask}
    control={control}
    defaultValue={
      defaultValues[item.help as keyof DefaultValues] || ""
      }
      render={({ field }) => renderFormField({ field, item })}
      />
      </Form.Item>
      ))} */
}

// const renderFormField = ({ field, item }: { field: any; item: any }) => {
//   if (item.help === "date") {
//     return (
//       <DatePicker
//         {...field}
//         value={field.value ? dayjs(field.value) : null}
//         onChange={(date) => {
//           field.onChange(date ? date.toDate() : null);
//         }}
//         className={styles.input}
//       />
//     );
//   }

//   if (item.help === "status" || item.help === "priority") {
//     return (
//       <Select
//         {...field}
//         value={field.value ? String(field.value) : ""}
//         className={styles.input}
//       >
//         {item.options?.map((option: string) => (
//           <Select.Option key={option} value={option}>
//             {option}
//           </Select.Option>
//         ))}
//       </Select>
//     );
//   }

//   return (
//     <Input
//       {...field}
//       value={field.value ? String(field.value) : ""}
//       type={item.type}
//       className={styles.input}
//     />
//   );
// };
