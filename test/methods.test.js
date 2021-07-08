import { parse } from "@vue/compiler-sfc";
import { handleScript } from "../src/main";
import {
  methods1,
  methods2,
  methods3,
  methods4,
  methods5,
  methods6,
  methods7,
} from "./data/methods";

test("test handleScript methods 1", () => {
  const { descriptor } = parse(methods1);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [],
    methods: [
      {
        name: "say",
        desc: "这是一个描述",
        params: [
          {
            default: "",
            name: "p1",
            notes: "参数说明",
            type: "string",
          },
          {
            default: "",
            name: "options",
            notes: "可选参数",
            type: "object",
          },
        ],
        return: "{name: number, version: string}",
      },
    ],
  });
});

test("test handleScript methods 2", () => {
  const { descriptor } = parse(methods2);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [],
    methods: [
      {
        name: "say",
        desc: "这是一个描述",
        params: [
          {
            default: "",
            name: "options",
            notes: "可选参数",
            type: "object",
          },
        ],
        return: "{name: number, version: string}",
      },
    ],
  });
});

test("test handleScript methods 3", () => {
  const { descriptor } = parse(methods3);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [],
    methods: [
      {
        name: "say",
        desc: "这是一个描述",
        params: [
          {
            default: "",
            name: "options",
            notes: "可选参数",
            type: "object",
          },
        ],
        return: "",
      },
    ],
  });
});

test("test handleScript methods 4", () => {
  const { descriptor } = parse(methods4);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [],
    methods: [
      {
        name: "say",
        desc: "这是一个描述",
        params: [],
        return: "",
      },
    ],
  });
});

test("test handleScript methods 5", () => {
  const { descriptor } = parse(methods5);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [],
    methods: [
      {
        name: "say",
        desc: "",
        params: [],
        return: "",
      },
    ],
  });
});

test("test handleScript methods 6", () => {
  const { descriptor } = parse(methods6);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [],
    methods: [],
  });
});

test("test handleScript methods 7", () => {
  const { descriptor } = parse(methods7);
  expect(handleScript(descriptor.script)).toEqual({
    name: "hello-world",
    props: [],
    emits: [],
    methods: [],
  });
});
