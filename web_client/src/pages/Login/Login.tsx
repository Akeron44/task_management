import { Button, Form, Input, Spin } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Login.module.css";
import ErrorComponent from "../../components/Error/ErrorComponent";
import { LoadingOutlined } from "@ant-design/icons";
import { LoginCredentials } from "./types/LoginCredentials";
import { schema } from "./helpers/validateForm";
import useLogin from "./hooks/useLogin";

function Login() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginCredentials>({ resolver: zodResolver(schema) });

  const { mutate, error, isPending } = useLogin();

  const onSubmit = (form: LoginCredentials) => {
    mutate({ email: form.email, password: form.password });
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
        <Form.Item<LoginCredentials>
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item<LoginCredentials>
          label="Password"
          validateStatus={errors.password?.message ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default Login;
