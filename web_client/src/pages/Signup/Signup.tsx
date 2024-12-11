import { Button, Form, Input, Spin } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Signup.module.css";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  IdcardOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { schema } from "./helpers/validateForm";
import useSignup from "./hooks/useSignup";
import { SignupAuthentication } from "./types/SignupAuthenticator";
import { SignupCredentials } from "./services/signupService";
import ErrorComponent from "../../components/Error/ErrorComponent";

const formItems = [
  { label: "Name", help: "name", type: "text", icon: <UserOutlined /> },
  { label: "Age", help: "age", type: "number", icon: <IdcardOutlined /> },
  { label: "Email", help: "email", type: "text", icon: <MailOutlined /> },
  {
    label: "Password",
    help: "password",
    type: "password",
    icon: <LockOutlined />,
  },
];

function Signup() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignupCredentials>({ resolver: zodResolver(schema) });

  const { mutate, error, isPending } = useSignup();

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

  const onSubmit = (form: SignupCredentials) => {
    mutate({
      name: form.name,
      email: form.email,
      password: form.password,
      age: form.age,
    });
  };

  return (
    <div className={styles.loginContainer}>
      {error && <ErrorComponent message={error.message} />}
      {isPending && <Spin indicator={<LoadingOutlined />} />}
      <h1 className={styles.title}>Welcome</h1>
      <p className={styles.subtitle}>Create your account</p>

      <Form
        name="basic"
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {formItems.map((item) => (
          <Form.Item<SignupAuthentication>
            key={item.help}
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
                  className={styles.input}
                  size="large"
                  placeholder={item.label}
                  prefix={item.icon}
                />
              )}
            />
          </Form.Item>
        ))}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            size="large"
            block
          >
            Create account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signup;
