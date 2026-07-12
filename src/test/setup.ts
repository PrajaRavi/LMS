import "@testing-library/jest-dom/vitest"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
// !This code will clean the test cases after every successfull test so that for every test all the states will start from scratch
afterEach(() => {
  cleanup();
})