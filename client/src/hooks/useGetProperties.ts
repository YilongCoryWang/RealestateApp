import getProperties from "../api/getProperties";
import { useQuery } from "react-query";
import { PropertyListResponse } from "../models/property"

const useGetProperties = (status: string) => {
  return useQuery<PropertyListResponse, Error>(`get-properties-${status}`, async () => {
    return await getProperties(status);
  });
};

export default useGetProperties;