import getProperties from "../api/getProperties";
import { useQuery } from "react-query";
import { PropertyListResponse } from "../models/property"

const useGetProperties = (status: string) => {
  return useQuery<PropertyListResponse, Error>(`get-properties-${status}`, async () => {
    return await getProperties(status);
  }, {cacheTime: 5 * 60 * 1000, staleTime: 1 * 60 * 1000});//cacheTime:when offline, fetch and use cache when fails; staleTime: no fetch when offline
};

export default useGetProperties;