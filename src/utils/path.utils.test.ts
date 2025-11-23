import { getByPath } from "./path.utils";

describe("getByPath", () => {
  const testCases = [
    { input: { a: { b: { c: 42 } } }, path: "a.b.c", expected: 42 },
    { input: { a: { b: [{ c: "x" }, { c: "y" }] } }, path: "a.b.1.c", expected: "y" },
    { input: { a: { b: { c: 42 } } }, path: "a.b.x", expected: undefined },
    { input: { a: 1 }, path: "", expected: { a: 1 } },
    { input: {}, path: "a.b.c", expected: undefined },
    { input: null, path: "a.b", expected: undefined },
    { input: undefined, path: "a.b", expected: undefined },
    { input: { a: 1 }, path: "a.b", expected: undefined },
    { input: { a: [1, 2] }, path: "a.5", expected: undefined },
  ];

  testCases.forEach(({ input, path, expected }, index) => {
    it(`test case #${index + 1}"`, () => {
      const result = getByPath(input, path);
      expect(result).toEqual(expected);
    });
  });
});
