import { PropertyListResponse } from "../types";
import {REACT_APP_BASE_URL} from '../config'

async function getProperties(status: string): Promise<PropertyListResponse> {
  const result = await fetch(`${REACT_APP_BASE_URL}/property/getPropertiesByStatus/${status}`);
  const data = await result.json();
  if (!result.ok) throw Error(data.message);
  return data;
}

export default getProperties;
