import React from "react";
import { findByText, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateAccount from "../components/admin/CreateAccount";

test("Login component renders without crashing", async () => {
  const { findByText } = render(
    <Router>
      <CreateAccount />
    </Router>
  );

  // Assert that the protected component is rendered
  await findByText("Create Account");
});
