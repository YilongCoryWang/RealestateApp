import { useQuery } from "react-query";
import { PropertyDetailsResponse } from "../types"
import getPropertyDetails from '../api/getPropertyDetails'

const useGetPropertyDetails = (id: string, token: string) => {
  return useQuery<PropertyDetailsResponse, Error>("get-property-details", async () => {
    return await getPropertyDetails(id, token);
  });
};

export default useGetPropertyDetails;