import { parse } from "@vue/compiler-sfc";
import { handleScript } from "../src/main";
import { props1, props2, props3, props4, props5 } from "./data/props";

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
    methods: [],
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
    methods: [],
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
    methods: [],
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
    methods: [],
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
    methods: [],
  });
});
