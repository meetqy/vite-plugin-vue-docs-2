import { Node } from "@babel/traverse";
import * as t from "@babel/types";
import {
  ArrayExpression,
  ObjectExpression,
  ObjectProperty,
} from "@babel/types";
import { toLine } from "./utils";
import { Emit, Prop } from "./type";

export function getPropsByObject(ast: ObjectExpression): Prop[] {
  if (ast.properties && ast.properties.length) {
    return ast.properties.map((item) => {
      const variables = item as ObjectProperty;

      return handleProp(variables);
    });
  }

  return [];
}

// 处理props
export function handleProp(variables: Node): Prop {
  const param: Prop = {
    name: "",
    type: "",
  };

  // 注释
  const notes = variables.leadingComments?.map((item) => item.value);
  param.notes = (notes && notes.join("\n")) || "";

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
        let value: string = "";

        // type: string
        if (t.isIdentifier(obj.value) || t.isStringLiteral(obj.value)) {
          value = getAstValue(obj.value);
        }

        // type: [string, number]
        if (t.isArrayExpression(obj.value)) {
          value = obj.value.elements
            .map((type) => getAstValue(type))
            .filter((str) => str)
            .join(" | ")
            .toLocaleLowerCase();
        }

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

// 处理emits ['click', 'change',...]
export function getEmitsByObject(ast: ArrayExpression): Emit[] {
  return ast.elements.map((item) => {
    let emit: Emit = {
      name: "",
      notes: "",
    };

    /**
     * emits: [
     *    // 点击事件
     *    'click'
     * ]
     */
    const name = getAstValue(item);
    if (name && item) {
      emit.name = name;
      const notes = item.leadingComments?.map((item) => item.value) || [];
      emit.notes = notes.join("\n");
    }

    return emit;
  });
}

export function getAstValue(ast: Node | null): string {
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
