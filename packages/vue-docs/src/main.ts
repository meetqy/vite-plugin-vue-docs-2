import { babelParse, parse, SFCScriptBlock } from "@vue/compiler-sfc";
import traverse, { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import { ArrayExpression, ObjectExpression } from "@babel/types";
import {
  getPropsByObject,
  getAstValue,
  getEmitsByArray,
  getEmitsByObject,
  getMethodsByObject,
  getSlotsByTemplate,
} from "./ast";
import { toLine } from "./utils";
import { Component, Emit, Method, Prop, RenderData } from "./type";

// 返回code信息
export function vueToJsonData(
  code: string
): { content: RenderData; component: Component } | null {
  const { descriptor, errors } = parse(code);

  const componentData: Component = {
    name: "",
  };

  if (errors.length) {
    console.error(errors);
    return null;
  }

  if (descriptor.script) {
    const { name, emits, methods, props } = handleScript(descriptor.script);
    componentData.name = name;
    componentData.emits = emits;
    componentData.methods = methods;
    componentData.props = props;
  }

  // 获取slot
  if (descriptor.template) {
    componentData.slots = getSlotsByTemplate(descriptor.template);
  }

  if (componentData) {
    const result = componentToLayoutData(componentData);
    return {
      content: result,
      component: componentData,
    };
  }

  return null;
}

export function handleScript(script: SFCScriptBlock): Component {
  const ast = babelParse(script.content, {
    sourceType: "module",
    plugins: script.lang === "ts" ? ["typescript"] : [],
  });

  let component: Component = {
    name: "",
    props: [],
    emits: [],
    methods: [],
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
  let methods: Method[] = [];
  let componentName = "";

  ast.properties.map((vueParams) => {
    // data() {}
    // if (t.isObjectMethod(vueParams)) {
    // }

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
          if (t.isArrayExpression(vueParams.value)) {
            emits = getEmitsByArray(vueParams.value as ArrayExpression);
          } else if (t.isObjectExpression(vueParams.value)) {
            emits = getEmitsByObject(vueParams.value as ObjectExpression);
          } else emits = [];

          break;
        }

        case "methods": {
          methods = getMethodsByObject(vueParams.value as ObjectExpression);
          break;
        }
      }
    }
  });

  return {
    name: componentName,
    props,
    emits,
    methods,
  };
}

// 将component 转换为 模板可用数据
// 如果是 undefined null "" 的转换，都在此方法中
function componentToLayoutData(component: Component): RenderData {
  const { props, emits, name, methods, slots } = component;
  const json: RenderData = {
    name,
  };

  if (slots && slots.length) {
    json.slots = {
      h3: "Slots",
      table: {
        headers: ["名称", "说明", "返回参数"],
        rows: slots.map((item) => {
          return [
            item.name as string,
            item.desc || "-",
            item.params?.length ? item.params.join(",") : "-",
          ];
        }),
      },
    };
  }

  if (props && props.length) {
    json.props = {
      h3: "Props",
      table: {
        headers: ["参数", "说明", "类型", "默认值", "必填"],
        rows: props.map((item) => {
          return [
            item.name as string,
            item.notes || "-",
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

  if (methods && methods.length) {
    json.methods = {
      h3: "Methods",
      table: {
        headers: ["方法名", "说明", "参数: 说明", "返回值"],
        rows: methods.map((method) => {
          return [
            method.name,
            method.desc || "-",
            method.params?.length
              ? method.params.map((item) => {
                  return `${item.name}: ${item.notes}`;
                })
              : "-",
            method.return || "-",
          ];
        }),
      },
    };
  }

  return json;
}
