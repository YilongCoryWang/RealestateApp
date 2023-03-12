import '@testing-library/jest-dom'
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

const setups = async () => {
  const mockSubmit = jest.fn();
  const getQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          retryDelay: 0,
        },
      },
    });

  const { getByText, getByLabelText, ...utils } = await render(
    <QueryClientProvider client={getQueryClient()}>
      <MemoryRouter>
        <Login submitHandler={mockSubmit}/>
      </MemoryRouter>
    </QueryClientProvider>
  );
  const buttonLogin = screen.getByRole("button");
  const inputUsername = screen.getByLabelText("Username");
  const inputPassword = screen.getByLabelText("Password");
  return {
    buttonLogin,
    inputUsername,
    inputPassword,
    mockSubmit,
    ...utils,
  };
};

describe("<Login />", () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });

  it("Username, passoword input and login button should be in document", async () => {
    const { buttonLogin, inputUsername, inputPassword } = await setups();

    expect(buttonLogin).toBeInTheDocument()
    expect(inputUsername).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()
  });
  it("Username, passoword inputs can be changed and submit event is triggered after clicking login button", async () => {
    const { buttonLogin, inputUsername, inputPassword, mockSubmit } = await setups();

    fireEvent.change(inputUsername, {target: {value: "abc"}})
    fireEvent.change(inputPassword, {target: {value: "abc"}})
    fireEvent.click(buttonLogin)

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled()
    });
  });
});
