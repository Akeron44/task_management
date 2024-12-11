import { Button, DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./TaskModal.module.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ErrorComponent from "../../../../components/Error/ErrorComponent";
import { LoadingOutlined } from "@ant-design/icons";
import {
  CreateTask,
  DefaultValues,
  TaskModalProps,
} from "../../types/TaskInterfaces";
import { formItems } from "../../constants/formFieldConfig";
import { getNonMatchingProperties } from "../../helpers/getNonMatchingHelper";
import useCreateTask from "../../hooks/useCreateTask";
import { schema } from "../../helpers/validateForm";
import useTask from "../../hooks/useTask";
import useEditTask from "../../hooks/useEditTask";
import Notification from "../../../../components/Notification/Notification";
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
    ? useTask(taskId?.toString()!)
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

  const onSubmit = async (form: FieldValues) => {
    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate,
    };

    if (taskId) {
      const result = getNonMatchingProperties(defaultValues, form);
      editMutate({ taskId: taskId!.toString(), task: result });
    } else {
      createMutate(payload);
    }
  };

  const errorMessage =
    createError?.message || editError?.message || eventError?.message;

  const isLoading = isEditLoading || isCreateLoading || isEventLoading;
  const isSuccess = isCreateSuccess || isEditSuccess;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal open={isModalOpen} footer={null} onCancel={closeModal}>
        {isLoading && (
          <Spin indicator={<LoadingOutlined spin />} size="small" />
        )}
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
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className={styles["form"]}
          onFinish={handleSubmit(onSubmit)}
          autoComplete="off"
        >
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
                  defaultValues[item.help as keyof DefaultValues] || ""
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
          <Form.Item label={null}>
            <Button
              type="primary"
              danger
              htmlType="submit"
              className={styles.button}
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["button"]}
            >
              {!taskId ? "Create Task" : "Save Changes"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TaskModal;
