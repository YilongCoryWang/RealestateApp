import { useParams } from "react-router-dom";
import { Image } from "antd";
import { PropertyParams } from "../types";
import useGetPropertyDetails from "../hooks/useGetPropertyDetails";
import { REACT_APP_BASE_URL } from "../config";

const PropertyDettails = () => {
  const { id } = useParams() as PropertyParams;
  const token = localStorage.getItem("token");
  const { isError, error, isLoading, data } = useGetPropertyDetails(
    id,
    token || ""
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>{`Property could not be retrieved: ${error.message}`}</div>;
  }

  if (!data) throw new Error("No error but no data received");
  const { data: propertyDetails } = data;

  return (
    <div style={{ margin: "2rem 7rem" }}>
      <Image
        width={800}
        preview={false}
        src={`${REACT_APP_BASE_URL}/${propertyDetails.image}`}
        alt={propertyDetails.image}
      />
      <h3>Property Details</h3>
      <div>address: {propertyDetails.address}</div>
      <div>city: {propertyDetails.city}</div>
      <div>postcode: {propertyDetails.postcode}</div>
      <div>area: {propertyDetails.area}</div>
      <div>bedroom: {propertyDetails.bedroom}</div>
      <div>carpark: {propertyDetails.carpark}</div>
    </div>
  );
};

export default PropertyDettails;
