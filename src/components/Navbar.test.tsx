import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar"
import { MemoryRouter } from "react-router";
import { CounterContext } from "../context/counterContext";
import { beforeEach, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { localUser } from "../utils/Dotenv";


const renderNavbar = (user: any) => {
  render(
    <MemoryRouter>
      <CounterContext.Provider
        value={{
          user,
          setuser: vi.fn(),
          sidebartext:"noth",
          setsidebartext:()=>{}
        }}
      >
        <Navbar />
      </CounterContext.Provider>
    </MemoryRouter>
  );
};
test("renders navbar", () => {
  renderNavbar(undefined);

  expect(
    screen.getByText("ClassLMS")
  ).toBeInTheDocument();
});
test("shows navigation links", () => {
  renderNavbar(undefined);

  expect(screen.getByText("Home")).toBeInTheDocument();

  expect(
    screen.getByText("Courses")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Contact")
  ).toBeInTheDocument();

  expect(
    screen.getByText("About")
  ).toBeInTheDocument();
});
test("shows Get Started button", () => {
  renderNavbar(undefined);

  expect(
    screen.getByText("Get Started")
  ).toBeInTheDocument();
});
test("shows admin link for admin", () => {
  renderNavbar({
    isadmin: true,
  });

  expect(
    screen.getByText("Admin")
  ).toBeInTheDocument();
});
test("does not show admin link for normal user", () => {
  renderNavbar({
    isadmin: false,
  });

  expect(
    screen.queryByText("Admin")
  ).not.toBeInTheDocument();
});

beforeEach(() => {
  Storage.prototype.getItem = vi.fn(() => "token");// it is nothing but getting the token data from a virtual localstorage
  // it is equal to 
  /**
   
   function fakeGetItem() {
     return "token";
   }
    
  */
});
test("shows profile image when logged in", () => {
  renderNavbar({
    name: "Ravi",
    
  });

  expect(
    screen.getByRole("button")
  ).toBeInTheDocument();
});

beforeEach(() => {
  Storage.prototype.getItem = vi.fn(() => null);
});

test("does not show profile image when logged out", () => {
  renderNavbar(undefined);

  expect(
    screen.queryByAltText("")
  ).not.toBeInTheDocument();
});

test("opens profile modal", async () => {
  Storage.prototype.getItem = vi.fn(() => "token");
  Storage.prototype.getItem = vi.fn(() => localUser);

  renderNavbar({
    name: "Ravi",
    email: "abc@gmail.com",
    phone: "9999999999",
  });

  await userEvent.click(
    screen.getByTestId("ProfileBtn")
    );
    
    expect(
      screen.getByText("Update Profile")
      ).toBeInTheDocument();
      
      expect(
        screen.getByText("Logout")
        ).toBeInTheDocument();
        });

    test("logout removes token", async () => {
  Storage.prototype.getItem = vi.fn(() => "token");
  Storage.prototype.removeItem = vi.fn();

  const setuser = vi.fn();

  render(
    <MemoryRouter>
      <CounterContext.Provider
        value={{
          user: {
            name: "Ravi",
            _id: "",
            email: "ravi@gmail.com",
            phone: "1234",
            isadmin: "false",
          },
          setuser,
          sidebartext: "",
          setsidebartext: () => {},
        }}
      >
        <Navbar />
      </CounterContext.Provider>
    </MemoryRouter>
  );

  const profileButton = screen.getByTestId("ProfileBtn");
  await userEvent.click(profileButton);

  const logoutButton = screen.getByText("Logout");
  await userEvent.click(logoutButton);

  expect(localStorage.removeItem).toHaveBeenCalledWith(localUser);
  expect(setuser).toHaveBeenCalledWith(undefined);
});
    
test("opens mobile menu", async () => {
  renderNavbar(undefined);

  const buttons =
    screen.getAllByRole("button");

  await userEvent.click(
    buttons[buttons.length - 1]
  );

  expect(
    screen.getByText("Menu")
  ).toBeInTheDocument();
});
