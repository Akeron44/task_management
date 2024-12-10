import APIClient from "../../Login/services/authApiClient";

export interface SignupCredentials {
  name: string;
  age: number;
  email: string;
  password: string;
}

export default new APIClient<SignupCredentials>("auth/signup");
