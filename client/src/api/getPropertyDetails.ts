import { PropertyDetailsResponse } from "../models/property";
import {REACT_APP_BASE_URL} from '../config'

async function getPropertyDetails(id: string, token: string): Promise<PropertyDetailsResponse> {
  const result = await fetch(`${REACT_APP_BASE_URL}/property/${id}`, {
    headers: {
      "Authorization": token
    }
  });
  const data = await result.json();
  if (!result.ok) throw Error(data.message);
  return data;
}

export default getPropertyDetails;
