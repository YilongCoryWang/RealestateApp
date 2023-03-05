import login from "../api/login";
import { useMutation } from "react-query";

const useLogin = () => {
  return useMutation<string, Error>(async (values: any) => {
    return await login(values);
  });
};

export default useLogin;