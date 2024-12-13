import { Form, Select } from "antd";
import styles from "../../TaskModal.module.css";
import { Controller } from "react-hook-form";
import { InputProps } from "../../types/InputInterface";
import { FORMINPUT } from "../../../../constants/formFieldConfig";

const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

function StatusSelect({ control, errors }: InputProps) {
  return (
    <div className={styles.formItemsContainer}>
      <Controller
        name={FORMINPUT.STATUS.name}
        control={control}
        render={({ field }) => (
          <Form.Item
            label={FORMINPUT.STATUS.label}
            validateStatus={errors.status ? "error" : ""}
            help={errors?.status?.message}
          >
            <Select {...field} value={field.value ? String(field.value) : ""}>
              {statuses.map((option: string) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
      ></Controller>
    </div>
  );
}

export default StatusSelect;
