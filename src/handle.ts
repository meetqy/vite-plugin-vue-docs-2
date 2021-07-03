import { Node } from "@babel/traverse";
import * as t from "@babel/types";
import {
  ArrayExpression,
  ObjectExpression,
  ObjectProperty,
} from "@babel/types";
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

    /**
     * 简写方式
     * type: String
     */
    if (t.isIdentifier(variables.value)) {
      param.type = getAstValue(variables.value).toLocaleLowerCase();
    }

    // type: [string, number]
    if (t.isArrayExpression(variables.value)) {
      param.type = handleTypes(variables.value).join(" | ").toLocaleLowerCase();
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

export function getAstValue(ast: Node): string {
  if (t.isIdentifier(ast)) {
    return ast.name;
  }

  if (t.isStringLiteral(ast)) {
    return ast.value;
  }

  return "";
}

/**
 * 处理支持多种类型的参数
 * type: [string, number]
 */
function handleTypes(ast: ArrayExpression): string[] {
  return ast.elements.map((item) => {
    return getAstValue(item as Node);
  });
}
