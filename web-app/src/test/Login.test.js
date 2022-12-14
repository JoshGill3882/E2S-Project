import React from "react";
import { findByText, findByTitle, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../components/Login";

test("Login component renders without crashing", async () => {
  const { findAllByText } = render(
    <Router>
      <Login />
    </Router>
  );

  // Assert that the protected component is rendered
  await findAllByText("Login");
});
