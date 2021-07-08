import { parse } from "@vue/compiler-sfc";
import { handleScript } from "../src/main";
import { emits1, emits2 } from "./data/handleScript";

test("test handleScript emits 1", () => {
  const { descriptor } = parse(emits1);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [{ name: "click", notes: "" }],
    methods: [],
  });
});

test("test handleScript emits 2", () => {
  const { descriptor } = parse(emits2);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [{ name: "click", notes: " 这是事件注释" }],
    methods: [],
  });
});
