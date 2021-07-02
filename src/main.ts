import { babelParse, parse, SFCScriptBlock } from "@vue/compiler-sfc";
import traverse, { Node, NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import {
  ArrayExpression,
  ObjectExpression,
  ObjectProperty,
} from "@babel/types";
import Template from "./layout";
import { Prop, getPropsByObject } from "./handle";

// 事件
interface Emit {
  name: string;
  notes?: string;
}

export function transformMain(code: string): string | null {
  const { descriptor, errors } = parse(code);

  if (errors.length) {
    console.error(errors);
    return null;
  }

  if (descriptor.script) {
    const { props = [], emits = [] } = handleScript(descriptor.script);
    const result = toModule(props, emits);
    return Template(result);
  }

  return null;
}

export function handleScript(
  script: SFCScriptBlock
): Partial<{ props: Prop[]; emits: Emit[] }> {
  const ast = babelParse(script.content, {
    sourceType: "module",
  });

  let props: Prop[] = [];
  let emits: Emit[] = [];

  traverse(ast, {
    enter(path: NodePath) {
      // props
      if (path.isIdentifier({ name: "props" })) {
        const container = path.container as ObjectProperty;
        props = getPropsByObject(container.value as ObjectExpression);
      }

      // emits
      if (path.isIdentifier({ name: "emits" })) {
        const container = path.container as ObjectProperty;
        emits = getEmitsByObject(container.value as ArrayExpression);
      }
    },
  });

  return {
    props,
    emits,
  };
}

// emits ['click', 'change',...]
export function getEmitsByObject(ast: ArrayExpression): Emit[] {
  return ast.elements.map((item) => {
    let emit: Emit = {
      name: "",
      notes: "",
    };
    if (t.isStringLiteral(item)) {
      emit.name = item.value;
      const notes = item.leadingComments?.map((item) => item.value) || [];
      emit.notes = notes.join("\n");
    }

    return emit;
  });
}

// props emits to module
function toModule(props: Prop[], emits: Emit[]): {} {
  let json: { [key: string]: any } = {};
  if (props && props.length) {
    json.props = {
      h3: "Props",
      table: {
        headers: ["参数", "说明", "类型", "默认值", "必填"],
        rows: props.map((item) => {
          return [
            item.name as string,
            item.notes || "",
            item.type as string,
            item.default || "-",
            item.required ? "true" : "false",
          ];
        }),
      },
    };
  }

  if (emits && emits.length) {
    json.emits = {
      h3: "Emits",
      table: {
        headers: ["事件", "说明", "回调参数"],
        rows: emits.map((item) => {
          return [item.name as string, item.notes as string, "-"];
        }),
      },
    };
  }

  return json;
}
