import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import PropertyDetails from "../PropertyDetails";

const setups = async () => {
  const getQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          retryDelay: 0,
        },
      },
    });

  const propertyId = 1;
  const { ...utils } = await render(
    <QueryClientProvider client={getQueryClient()}>
      <MemoryRouter initialEntries={[`/property/${propertyId}`]}>
        <Routes>
          <Route path="property/:id" element={<PropertyDetails />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
  const image = await waitFor(() => screen.findByRole("img"));
  return {
    image,
    ...utils,
  };
};

describe("<PropertyDetails />", () => {
  it("Username, passoword input and login button should be in document", async () => {
    const { image } = await setups();

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "http://192.168.56.101:3001/1stStreetMelbourneVIC3058.jpg");
    expect(image).toHaveAttribute("alt", "1stStreetMelbourneVIC3058.jpg");
    screen.getByText('address: 1st Some Street');
    screen.getByText('city: Melbourne');
    screen.getByText('postcode: 3058');
    screen.getByText('area: 500');
    screen.getByText('bedroom: 4');
    screen.getByText('carpark: 2');
  });
});
