import React from "react";
import { findByText, findByTitle, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FileUpload from "../components/admin/FileUpload";

test("Login component renders without crashing", async () => {
  const { findByText } = render(
    <Router>
      <FileUpload />
    </Router>
  );

  // Assert that the protected component is rendered
  await findByText("CSV File Upload");
});
