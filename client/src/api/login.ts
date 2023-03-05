import { REACT_APP_BASE_URL } from "../config";
import { UserParams } from "../types";

async function login(values: UserParams): Promise<string> {
  const result = await fetch(`${REACT_APP_BASE_URL}/user/login`, {
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

export default login;
