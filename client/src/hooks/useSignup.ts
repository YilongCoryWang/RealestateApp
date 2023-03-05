import signup from "../api/signup";
import { useMutation } from "react-query";

const useSignup = () => {
  return useMutation<string, Error>(async (values: any) => {
    return await signup(values);
  });
};

export default useSignup;