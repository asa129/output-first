import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../editor/page";

test("Page", () => {
  render(<Page />);
  expect(screen.getByTestId("title")).toBeDefined();
});
