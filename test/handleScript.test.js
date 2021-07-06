import { parse } from "@vue/compiler-sfc";
import { handleScript } from "../src/main";
import {
  props1,
  props2,
  props3,
  props4,
  props5,
  emits1,
  emits2,
  normal1,
  default1,
} from "./data/handleScript";

test("test handleScript props 1", () => {
  const { descriptor } = parse(props1);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [
      {
        name: "name",
        type: "string",
        notes: " 测试获取组件名称",
      },
    ],
    emits: [],
  });
});

test("test handleScript props 2", () => {
  const { descriptor } = parse(props2);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [
      {
        name: "name",
        type: "string",
        notes: " 测试获取组件名称",
        default: "组件名称",
      },
    ],
    emits: [],
  });
});

test("test handleScript props 3", () => {
  const { descriptor } = parse(props3);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [
      {
        name: "name",
        type: "string",
        notes: " 测试获取组件名称",
        default: "组件名称",
        required: true,
      },
    ],
    emits: [],
  });
});

test("test handleScript props 4", () => {
  const { descriptor } = parse(props4);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [
      {
        name: "name",
        type: "string",
        notes: "",
        default: "组件名称",
        required: true,
      },
    ],
    emits: [],
  });
});

test("test handleScript props 5", () => {
  const { descriptor } = parse(props5);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [
      {
        name: "name",
        type: "string | number",
        notes: "",
        default: "组件名称",
        required: true,
      },
    ],
    emits: [],
  });
});

test("test handleScript emits 1", () => {
  const { descriptor } = parse(emits1);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [{ name: "click", notes: "" }],
  });
});

test("test handleScript emits 2", () => {
  const { descriptor } = parse(emits2);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [{ name: "click", notes: " 这是事件注释" }],
  });
});

test("test handleScript normal 1", () => {
  const { descriptor } = parse(normal1);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [{ name: "name", notes: " 这是props注释", type: "string | number" }],
    emits: [{ name: "click", notes: " 这是事件注释" }],
  });
});

test("test handleScript default 1", () => {
  const { descriptor } = parse(default1);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [{ name: "name", notes: " 这是props注释", type: "string | number" }],
    emits: [{ name: "click", notes: " 这是事件注释" }],
  });
});
