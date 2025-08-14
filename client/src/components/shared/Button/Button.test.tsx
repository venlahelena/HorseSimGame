import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Button from "./Button";

test("renders Button with text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});