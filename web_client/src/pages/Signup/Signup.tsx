import { Button, Form, Input, Spin } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../Login/Login.module.css";
import ErrorComponent from "../../components/Error/ErrorComponent";
import { LoadingOutlined } from "@ant-design/icons";
import { schema } from "./helpers/validateForm";
import useSignup from "./hooks/useSignup";
import { SignupAuthentication } from "./types/SignupAuthenticator";
import { formItems } from "./constants/formFieldConfig";

function Signup() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignupAuthentication>({ resolver: zodResolver(schema) });

  const { mutate, error, isPending } = useSignup();

  const onSubmit = (form: SignupAuthentication) => {
    mutate({
      name: form.name,
      age: form.age,
      email: form.email,
      password: form.password,
    });
  };

  const handleChange =
    (
      field: {
        onChange: (value: string | number) => void;
      },
      itemType: string
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (itemType === "number") {
        field.onChange(e.target.valueAsNumber);
      } else {
        field.onChange(e.target.value);
      }
    };

  return (
    <section className={styles["authentication_layout"]}>
      {error && <ErrorComponent message={error.message} />}
      {isPending && <Spin indicator={<LoadingOutlined spin />} />}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className={styles["form"]}
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {formItems.map((item) => (
          <Form.Item<SignupAuthentication>
            label={item.label}
            validateStatus={
              errors[item.help as keyof SignupAuthentication] ? "error" : ""
            }
            help={errors[item.help as keyof SignupAuthentication]?.message}
          >
            <Controller
              name={item.help as keyof SignupAuthentication}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type={item.type}
                  onChange={handleChange(field, item.type)}
                />
              )}
            />
          </Form.Item>
        ))}
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default Signup;
