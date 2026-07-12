import { render, screen } from "@testing-library/react";
import { describe, expect, it, test, vi } from "vitest";

import Signin from "./Signin";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

async function SignInSubmitHandler(){
    try {
      console.log("hello i am ravi prajapati")
    } catch (error) {
      
    }
  }
describe("signinpage", () => {
  it("renders the signin page", () => {
    const { container } = render(
      <MemoryRouter>
        <Signin SubmitHandler={SignInSubmitHandler}/>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("parent-para")).toHaveTextContent(
      "Don't have an account?Sign Up",
    );
    expect(screen.getByTestId("parent-para")).toBeInTheDocument();
    expect(screen.getByRole("heading",{name:/Welcome to ClassLMS/i})).toBeInTheDocument();
    expect(container.querySelector("#mail")).toBeInTheDocument();
    expect(container.querySelector("#lock")).toBeInTheDocument();
    expect(screen.getByRole("heading",{name:/Welcome to ClassLMS/i})).toHaveTextContent("Welcome to ClassLMS");

    expect(
      screen.getByRole("heading", {
        name: /Welcome to ClassLMS/i,
      }),
    ).toBeInTheDocument();

    expect(container.querySelector("#para")).toBeInTheDocument();
    expect(container.querySelector("#para")).toHaveTextContent(
      "login to your account and start your learning journey with interactive courses and engaging content.",
    );

    expect(container.querySelector("#learning")).toBeInTheDocument();

    expect(container.querySelector("#learning")).toHaveTextContent(
      "Start learning today.",
    );

    expect(container.querySelector("#emailLabel")).toBeInTheDocument();

    expect(container.querySelector("#emailLabel")).toHaveTextContent("Email");

    expect(container.querySelector("#passlabel")).toBeInTheDocument();

    expect(container.querySelector("#passlabel")).toHaveTextContent("Password");

  });
});

test("signin page user event test", async () => {

/**\
 * 

// 1.set up the user session
  const user = userEvent.setup();

  //2.render the component
  render(
    <MemoryRouter>
      <Signin />
    </MemoryRouter>,
  );

  // 3.find the input feild
  let emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  let passInput = await screen.findByTestId("passInput");

  // now testing these inputs by typing something inside them virtually

  // 4.virtually type something
  // first clear the input
  await user.clear(emailInput)
  await user.clear(passInput)
  // then write in the input
  await user.type(passInput, "RaviPraj");
  await user.type(emailInput, "RaviPraj");

  // 5.Assert that input value updated correctly or not
  expect(emailInput).toHaveValue("RaviPraj")
  expect(passInput).toHaveValue("RaviPraj")
  */


  //!Now we will virtually fill up a form and submit it 
  // 1.set up the user session
  const user = userEvent.setup();
  const mockSubmit=vi.fn();

  //2.render the component
  render(
    <MemoryRouter>
      <Signin SubmitHandler={mockSubmit} />
    </MemoryRouter>,
  );

  // 3.find the input feild
  let emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });
  let submitbtn=screen.getByTestId("submit");


  let passInput = await screen.findByTestId("passInput");

  // now testing these inputs by typing something inside them virtually

  // 4.virtually type something
  // first clear the input
  await user.clear(emailInput)
  await user.clear(passInput)
  // then write in the input
  await user.type(passInput, "RaviPraj");
  await user.type(emailInput, "RaviPraj@gmail.com");
  await user.click(submitbtn)

  // 5.Assert that submit function is called exactly one
  let data=expect(mockSubmit).toHaveBeenCalledTimes(1);
  console.log(data)

  

});