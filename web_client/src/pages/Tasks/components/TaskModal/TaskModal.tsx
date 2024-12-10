import { Button, DatePicker, Form, Input, Modal, Spin } from "antd";
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
    data: eventData,
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
    if (eventData && taskId) {
      setDefaultValues({
        name: eventData.name,
        place: eventData.place,
        description: eventData.description,
        date: eventData.date ? new Date(eventData.date) : undefined,
      });

      setValue("name", eventData.name);
      setValue("place", eventData.place);
      setValue("description", eventData.description);
      setValue("date", dayjs(eventData.date).toDate());
    }
  }, [eventData, taskId, setValue]);

  const onSubmit = async (form: FieldValues) => {
    const payload = {
      name: form.name,
      description: form.description,
      place: form.place,
      date: form.date,
      image:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    };

    if (taskId) {
      const result = getNonMatchingProperties(defaultValues, form);
      editMutate({ eventId: taskId!, event: result });
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
                render={({ field }) =>
                  item.type === "date" ? (
                    <DatePicker
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) =>
                        field.onChange(date ? date.toDate() : null)
                      }
                    />
                  ) : (
                    <Input
                      {...field}
                      value={field.value ? String(field.value) : ""}
                      type={item.type}
                    />
                  )
                }
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
              {!taskId ? "Create" : "Save Changes"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TaskModal;
