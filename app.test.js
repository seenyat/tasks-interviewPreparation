import { test, expect } from "vitest";
import {
  reverseString,
  delay,
  getIntersection,
  sum,
  objFromArr,
  yesOrNo,
  orderedCount,
  strJoin,
  rle,
  flatten,
} from "./app";

test("reverseString", () => {
  expect(reverseString("hello")).toBe("olleh");
});

test("delay", async () => {
  const start = Date.now();
  await delay(1000);
  const end = Date.now();
  expect(end - start).toBeGreaterThanOrEqual(1000);
});

test("getIntersection", async () => {
  const firstArr = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
    Promise.resolve(4),
    Promise.resolve(8),
  ];
  const secondArr = [
    Promise.resolve(3),
    Promise.resolve(4),
    Promise.resolve(2),
    Promise.resolve(6),
    Promise.resolve(7),
  ];
  const result = await getIntersection(firstArr, secondArr);
  expect(result).toEqual([2, 3, 4]);
});

test("sum", async () => {
  const result = await sum([1, 2, 3, 4, 5]);
  expect(result).toBe(15);
});

test("objFromArr", () => {
  const arr = [
    { name: "width", value: 10 },
    { name: "height", value: 20 },
  ];
  expect(objFromArr(arr)).toEqual({ width: 10, height: 20 });
});

test("yesOrNo", () => {
  const yes3 = yesOrNo(3);
  expect(yes3()).toBe("yes");
  expect(yes3()).toBe("yes");
  expect(yes3()).toBe("yes");
  expect(yes3()).toBe("no");
});

test("orderedCount", () => {
  expect(orderedCount("abacabad")).toEqual([
    ["a", 4],
    ["b", 2],
    ["c", 1],
    ["d", 1],
  ]);
});

test("strJoin", () => {
  expect(strJoin(">", "a", "b", "c")).toBe("a>b>c");
});

test("rle", () => {
  expect(rle("AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB")).toBe(
    "A4B3C2XYZD4E3F3A6B28"
  );
});

test("flatten", () => {
  const arr = [
    1,
    "any [complex] string",
    null,
    function () {},
    [1, 2, [3, "4"], 0],
    [],
    { a: 1 },
  ];
  expect(JSON.stringify(flatten(arr))).toEqual(
    JSON.stringify([
      1,
      "any [complex] string",
      null,
      function () {},
      1,
      2,
      3,
      "4",
      0,
      { a: 1 },
    ])
  );
});
