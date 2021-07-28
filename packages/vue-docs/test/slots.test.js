import { parse } from "@vue/compiler-sfc";
import { getSlotsByTemplate } from "../src/ast";
import { slot1, slot2, slot3, slot4, slot5, slot6 } from "./data/slots";

test("test getSlotsByTemplate slot 1", () => {
  const { descriptor } = parse(slot1);
  expect(getSlotsByTemplate(descriptor.template)).toEqual([
    {
      name: "default",
      desc: "这是一个header插槽",
      params: [],
    },
  ]);
});

test("test getSlotsByTemplate slot 2", () => {
  const { descriptor } = parse(slot2);
  expect(getSlotsByTemplate(descriptor.template)).toEqual([
    {
      name: "default",
      desc: "",
      params: [],
    },
  ]);
});

test("test getSlotsByTemplate slot 3", () => {
  const { descriptor } = parse(slot3);
  expect(getSlotsByTemplate(descriptor.template)).toEqual([
    {
      name: "header",
      desc: "",
      params: [],
    },
  ]);
});

test("test getSlotsByTemplate slot 4", () => {
  const { descriptor } = parse(slot4);
  expect(getSlotsByTemplate(descriptor.template)).toEqual([
    {
      name: "header",
      desc: "这是一个header插槽",
      params: ["scope"],
    },
  ]);
});

test("test getSlotsByTemplate slot 5", () => {
  const { descriptor } = parse(slot5);
  expect(getSlotsByTemplate(descriptor.template)).toEqual([
    {
      name: "header",
      desc: "这是一个header插槽",
      params: ["scope"],
    },
    {
      name: "default",
      desc: "这是一个content插槽",
      params: [],
    },
  ]);
});

test("test getSlotsByTemplate slot 6", () => {
  const { descriptor } = parse(slot6);
  expect(getSlotsByTemplate(descriptor.template)).toEqual([
    {
      name: "header",
      desc: "这是一个header插槽",
      params: ["scope"],
    },
    {
      name: "default",
      desc: "这是一个content插槽",
      params: [],
    },
  ]);
});
