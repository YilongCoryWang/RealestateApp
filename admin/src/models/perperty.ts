export type Property = {
  id: string;
  address: string;
  city: string;
  price: string;
  status: string;
};

export type PropertyDetails = {
  id: string;
  address: string;
  area: string;
  bathroom: string;
  bedroom: string;
  carpark: string;
  city: string;
  description: string;
  image: string;
  postcode: string;
  price: string;
  state: string;
  status: string;
};

export type PropertyListResponse = {
  status: string;
  message: string;
  data: Property[];
};

export type PropertyDetailsResponse = {
  status: string;
  message: string;
  data: PropertyDetails;
};

export type AddProperty = {
  address: string;
  area: string;
  bathroom: string;
  bedroom: string;
  carpark: string;
  city: string;
  description: string;
  image: string;
  postcode: string;
  price: string;
  state: string;
  status: string;
};