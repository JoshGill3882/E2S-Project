import React from "react";
import { act, render } from "@testing-library/react";
import PrivateRoute from "../components/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

// Mock the useAuthState hook
jest.mock("react-firebase-hooks/auth", () => ({
  useAuthState: jest.fn(),
}));

test("PrivateRoute allows access to the protected component when a user is logged in", async () => {
  // Create a mocked "logged-in" user
  const user = {
    uid: "123",
    email: "test@example.com",
  };

  // Mock the useAuthState hook to return the mocked user
  useAuthState.mockImplementation(() => [user, false]);

  // Create a mocked protected component
  const ProtectedComponent = () => <div>Protected component</div>;

  // Render the PrivateRoute component with the mocked protected component
  const { findByText } = render(
    <Router>
      <PrivateRoute component={ProtectedComponent} />
    </Router>
  );

  // Assert that the protected component is rendered
  await findByText("Protected component");
});

test("PrivateRoute redirects to the login page when no user is logged in", async () => {
  // Create a mocked "logged-out" user
  const user = null;

  // Mock the useAuthState hook to return the mocked user
  useAuthState.mockImplementation(() => [user, false]);

  // Create a mocked protected component
  const ProtectedComponent = () => <div>Protected component</div>;

  // Render the PrivateRoute component with the mocked history object
  const { findByText } = render(
    <Router>
      <Switch>
        <Route path="/login" component={() => <div>Login page</div>} />
        <PrivateRoute component={ProtectedComponent} />
      </Switch>
    </Router>
  );

  // Wait for the Redirect component to update the location
  await findByText("Login page");
});
