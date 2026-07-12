import { describe, expect, it } from "vitest";
import { Ravi, Ravi1 } from "./Just";

describe("Just",()=>{
  it("returns the number by adding 45",()=>{
expect(Ravi(20)).toBe(65);
  })
  it("returns the number as it is",()=>{
expect(Ravi1(20)).toBe(20);
  })
})