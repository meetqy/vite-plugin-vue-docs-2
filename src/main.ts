import { babelParse, parse, SFCScriptBlock } from "@vue/compiler-sfc";
import traverse, { Node, NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import {
  ArrayExpression,
  ObjectExpression,
  ObjectProperty,
} from "@babel/types";
import hbs from "handlebars";
import path from "path";
import fs from "fs";

const layout = fs.readFileSync(path.join(__dirname, "./layout.hbs"), "utf8");

const Template = hbs.compile(layout);

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
        props = getPropsByObject(
          container.value as ObjectExpression,
          script.content
        );
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

// props {name: xxx, default: 'xxx', required: true}
export function getPropsByObject(ast: ObjectExpression, code: string): Prop[] {
  if (ast.properties && ast.properties.length) {
    return ast.properties.map((item) => {
      const variables = item as ObjectProperty;

      let param: Prop = {
        name: "",
        type: "",
      };

      // 注释数组
      const notes = variables.leadingComments?.map((item) => item.value);
      param.notes = notes && notes.join("\n");

      // 参数名
      param.name = getName(variables.key);

      const str = code.substring(
        variables.value.start || 0,
        variables.value.end || 0
      );

      const paramArr = str.match(
        /("?)\b(\w+)\1\s*:\s*("?)((?:\w+[-+*%])*?\w+)\b\3/g
      );

      if (paramArr && paramArr.length) {
        paramArr.map((item) => {
          const v = item.replace(/\s/g, "").split(":");
          switch (v[0]) {
            case "type":
              param.type = v[1];
              break;

            case "required":
              param.required = v[1] === "true";
              break;

            case "default":
              param.default = v[1];
              break;
          }
        });
      }

      return param;
    });
  }

  return [];
}

function getName(ast: Node): string {
  if (t.isIdentifier(ast)) {
    return ast.name;
  }

  return "";
}

// props emits to module
function toModule(props: Prop[], emits: Emit[]): {} {
  let json: { [key: string]: any } = {};
  if (props && props.length) {
    json.props = {
      h2: "Props",
      table: {
        headers: ["参数", "说明", "类型", "默认值", "必填"],
        rows: props.map((item) => {
          return [
            item.name as string,
            item.type as string,
            item.notes || "",
            item.default || "null",
            item.required ? "true" : "false",
          ];
        }),
      },
    };
  }

  if (emits && emits.length) {
    json.emits = {
      h2: "Emits",
      table: {
        headers: ["事件", "说明", "回调参数"],
        rows: emits.map((item) => {
          return [item.name as string, item.notes as string, "null"];
        }),
      },
    };
  }

  return json;
}

// 参数
interface Prop {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  notes?: string;
}

// 事件
interface Emit {
  name: string;
  notes?: string;
}
