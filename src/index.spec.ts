import * as index from "./index.ts";

test("Index test", () => {
  expect(index.generateMP()).toEqual("Hello World");
});
