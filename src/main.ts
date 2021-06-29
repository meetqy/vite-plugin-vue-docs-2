import { babelParse, parse, SFCScriptBlock } from "@vue/compiler-sfc";
import traverse, { NodePath, Node } from "@babel/traverse";
import { ObjectProperty, ObjectExpression } from "@babel/types";
import * as t from "@babel/types";

export function transformMain(code: string) {
  const { descriptor, errors } = parse(code);

  if (errors.length) {
    console.error(errors);
    return null;
  }

  if (descriptor.script) {
    handleScript(descriptor.script);
  }

  return { descriptor, errors };
}

export function handleScript(
  script: SFCScriptBlock
): Partial<{ props: string; emits: string }> {
  const ast = babelParse(script.content, {
    sourceType: "module",
  });

  traverse(ast, {
    enter(path: NodePath) {
      if (path.isIdentifier({ name: "props" })) {
        const container = path.container as ObjectProperty;
        const params = getPropsByObject(
          container.value as ObjectExpression,
          script.content
        );
        console.log(params);
      }
    },
  });

  return {
    props: "123",
    emits: "123",
  };
}

// 处理 {name: xxx, default: 'xxx', required: true}
export function getPropsByObject(
  ast: ObjectExpression,
  code: string
): Parameter[] {
  if (ast.properties && ast.properties.length) {
    const params: Parameter[] = ast.properties.map((item) => {
      const variables = item as ObjectProperty;

      let param: Parameter = {
        name: "",
        type: "",
      };

      // 注释数组
      const notes = variables.leadingComments?.map((item) => item.value);
      param.notes = notes && notes.join("\n");

      // 参数名
      const name = getName(variables.key);
      param.name = name;

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
              param.required = v[1] === "true" ? true : false;
              break;

            case "default":
              param.default = v[1];
              break;
          }
        });
      }

      return param;
    });

    return params;
  }

  return [];
}

function getName(ast: Node): string {
  if (t.isIdentifier(ast)) {
    return ast.name;
  }

  return "";
}

// 组件参数
interface Parameter {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  notes?: string;
}
