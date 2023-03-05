import { REACT_APP_BASE_URL } from "../config";
import { UserParams } from "../types";

async function signup(values: UserParams): Promise<string> {
  const result = await fetch(`${REACT_APP_BASE_URL}/user/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values),
  });
  const data = await result.json();
  if (!result.ok) throw Error(data.message);
  return data;
}

export default signup;
