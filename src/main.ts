import { babelParse, parse, SFCScriptBlock } from "@vue/compiler-sfc";
import traverse, { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import { ArrayExpression, ObjectExpression } from "@babel/types";
import Template from "./layout";
import { Prop, getPropsByObject, getAstValue } from "./handle";
import { toLine } from "./utils";

// 事件
interface Emit {
  name: string;
  notes?: string;
}

// 组件信息
export interface Component {
  name: string;
  emits: Emit[];
  props: Prop[];
}

export function transformMain(code: string): string | null {
  const { descriptor, errors } = parse(code);

  if (errors.length) {
    console.error(errors);
    return null;
  }

  if (descriptor.script) {
    const componentData = handleScript(descriptor.script);
    const result = componentToLayoutData(componentData);
    return Template(result);
  }

  return null;
}

export function handleScript(script: SFCScriptBlock): Component {
  const ast = babelParse(script.content, {
    sourceType: "module",
  });

  let component: Component = {
    name: "",
    props: [],
    emits: [],
  };

  traverse(ast, {
    enter(path: NodePath) {
      // export default defineComponent({})
      if (path.isCallExpression()) {
        path.node.arguments.map((item) => {
          if (t.isObjectExpression(item)) {
            component = handleExportDefault(item);
          }
        });
      }
      // export default {}
      else if (path.isExportDefaultDeclaration()) {
        const declaration = path.node.declaration;
        if (t.isObjectExpression(declaration)) {
          component = handleExportDefault(declaration);
        }
      }
    },
  });

  return component;
}

/**
 * 解析
 * export default {} 和
 * export default defineComponent({}) 中的 json 对象
 * @param ast: ObjectExpression
 */
function handleExportDefault(ast: ObjectExpression): Component {
  let props: Prop[] = [];
  let emits: Emit[] = [];
  let componentName: string = "";

  ast.properties.map((vueParams) => {
    // data() {}
    if (t.isObjectMethod(vueParams)) {
    }

    // name, props, emits, methods
    if (t.isObjectProperty(vueParams)) {
      const name = getAstValue(vueParams.key);
      switch (name) {
        // 组件名称
        case "name": {
          componentName = toLine(
            getAstValue(vueParams.value)
          ).toLocaleLowerCase();
          break;
        }

        case "props": {
          props = getPropsByObject(vueParams.value as ObjectExpression);
          break;
        }

        case "emits": {
          emits = getEmitsByObject(vueParams.value as ArrayExpression);
          break;
        }

        case "methods": {
          break;
        }
      }
    }
  });

  return {
    name: componentName,
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

// 将component 转换为 模板可用数据
function componentToLayoutData(component: Component): {} {
  const { props, emits, name } = component;
  let json: { [key: string]: any } = {
    name,
  };
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
