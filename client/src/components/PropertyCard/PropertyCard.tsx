import { Link } from "react-router-dom";
import { PropertyCardProps } from "../../models/property";
import { Card, Image } from "antd";
import { REACT_APP_BASE_URL } from '../../config'

const PropertyCard = (props: PropertyCardProps) => {
  const { property } = props;
  let link = `/property/${property.id}`;
  const isLogin = !!localStorage.getItem("token")
  if (!isLogin) {
    link = "/login";
  }

  return (
    <Link to={link} className="my-10">
      <Card
        title={`Address: ${property.address}-${property.city} - Price: ${property.price}(AUD)`}
        size="small"
      >
        <Image
          width={400}
          preview={false}
          src={`${REACT_APP_BASE_URL}/${property.image}`}
          alt={property.image}
        />
      </Card>
    </Link>
  );
};

export default PropertyCard;
