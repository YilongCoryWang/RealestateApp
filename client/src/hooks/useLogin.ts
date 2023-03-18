import login from "../api/login";
import { useMutation } from "react-query";
import { LoginResponse } from "../models/property";

const useLogin = () => {
  return useMutation<LoginResponse, Error>(async (values: any) => {
    return await login(values);
  });
};

export default useLogin;
