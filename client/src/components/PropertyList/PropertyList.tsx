import useGetProperties from '../../hooks/useGetProperties';
import PropertyCard from "../PropertyCard/PropertyCard";
import { useSelector } from 'react-redux'

const PropertyList = () => {
  const status = useSelector((state:any)=>state.status)
  const { isLoading, isError, data, error } = useGetProperties(status);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>{`Property could not be retrieved: ${error.message}`}</div>;
  }

  if (!data) throw new Error("we should not reach this");

  const { data: properties } = data;

  return (
    <>
      {properties.map((property) => {
        return (
          <PropertyCard key={property.id} property={property} />
        );
      })}
    </>
  );
};

export default PropertyList;
