import { Button, Form, Input, Spin } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Login.module.css";
import ErrorComponent from "../../components/Error/ErrorComponent";
import { LoadingOutlined } from "@ant-design/icons";
import { LoginCredentials } from "./types/LoginCredentials";
import { schema } from "./helpers/validateForm";
import useLogin from "./hooks/useLogin";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

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
    <div className={styles.loginContainer}>
      {error && <ErrorComponent message={error.message} />}
      {isPending && <Spin indicator={<LoadingOutlined />} />}
      <h1 className={styles.title}>Welcome Back</h1>
      <p className={styles.subtitle}>Sign in to your account</p>

      <Form
        name="basic"
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Form.Item<LoginCredentials>
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                prefix={<UserOutlined className={styles.inputIcon} />}
                size="large"
                placeholder="Email"
                className={styles.input}
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item<LoginCredentials>
          validateStatus={errors.password?.message ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input.Password
                prefix={<LockOutlined className={styles.inputIcon} />}
                size="large"
                placeholder="Password"
                className={styles.input}
                {...field}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            size="large"
            block
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
