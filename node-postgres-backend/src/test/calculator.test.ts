import { describe, it, expect } from "vitest";
import { add, multiply } from "../utils/calculator.js";

describe("Calculator", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("should multiply two numbers", () => {
    expect(multiply(4, 5)).toBe(20);
  });
});
