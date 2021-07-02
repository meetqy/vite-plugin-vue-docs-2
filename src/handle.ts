import traverse, { Node, NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import { ObjectExpression, ObjectProperty } from "@babel/types";
import { toLine } from "./utils";

// 参数
export interface Prop {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  notes?: string;
}

// 处理prop
export function handleProp(variables: Node): Prop {
  const param: Prop = {
    name: "",
    type: "",
  };

  // 注释
  const notes = variables.leadingComments?.map((item) => item.value);
  param.notes = notes && notes.join("\n");

  if (t.isObjectProperty(variables)) {
    // 参数名
    param.name = toLine(getAstValue(variables.key));

    /**
     * 参数 对象写法
     * {
     *     type: String,
     *     default: 'xxx'
     *     required: 'xxx'
     * }
     */
    if (t.isObjectExpression(variables.value)) {
      variables.value.properties.map((item) => {
        const obj = item as ObjectProperty;
        const name = getAstValue(obj.key);
        const value = getAstValue(obj.value);
        switch (name) {
          case "type":
            param.type = value.toLocaleLowerCase();
            break;

          case "required":
            param.required = !value;
            break;

          case "default":
            param.default = value;
            break;
        }
      });
    }
    return param;
  }

  return param;
}

export function getPropsByObject(ast: ObjectExpression): Prop[] {
  if (ast.properties && ast.properties.length) {
    return ast.properties.map((item) => {
      const variables = item as ObjectProperty;

      return handleProp(variables);
    });
  }

  return [];
}

function getAstValue(ast: Node): string {
  if (t.isIdentifier(ast)) {
    return ast.name;
  }

  if (t.isStringLiteral(ast)) {
    return ast.value;
  }

  return "";
}
