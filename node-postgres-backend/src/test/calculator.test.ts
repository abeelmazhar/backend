import { describe, it, expect } from "vitest";
import { calculateDiscount } from "../services/price.service.js";

describe("calculateDiscount", () => {
  it("should calculate 10% discount", () => {
    expect(calculateDiscount(1000, 10)).toBe(900);
  });

  it("should calculate 50% discount", () => {
    expect(calculateDiscount(1000, 50)).toBe(500);
  });

  it("should return original price for 0% discount", () => {
    expect(calculateDiscount(1000, 0)).toBe(1000);
  });

  it("should reject discount above 100%", () => {
    expect(() => calculateDiscount(1000, 101)).toThrow("Invalid discount");
  });
});
