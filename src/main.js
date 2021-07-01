import { babelParse, parse } from "@vue/compiler-sfc";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import hbs from "handlebars";
import path from "path";
import fs from "fs";
const layout = fs.readFileSync(path.join(__dirname, "./layout.hbs"), "utf8");
const Template = hbs.compile(layout);
export function transformMain(code) {
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
export function handleScript(script) {
    const ast = babelParse(script.content, {
        sourceType: "module",
    });
    let props = [];
    let emits = [];
    traverse(ast, {
        enter(path) {
            // props
            if (path.isIdentifier({ name: "props" })) {
                const container = path.container;
                props = getPropsByObject(container.value, script.content);
            }
            // emits
            if (path.isIdentifier({ name: "emits" })) {
                const container = path.container;
                emits = getEmitsByObject(container.value);
            }
        },
    });
    return {
        props,
        emits,
    };
}
// emits ['click', 'change',...]
export function getEmitsByObject(ast) {
    return ast.elements.map((item) => {
        var _a;
        let emit = {
            name: "",
            notes: "",
        };
        if (t.isStringLiteral(item)) {
            emit.name = item.value;
            const notes = ((_a = item.leadingComments) === null || _a === void 0 ? void 0 : _a.map((item) => item.value)) || [];
            emit.notes = notes.join("\n");
        }
        return emit;
    });
}
// props {name: xxx, default: 'xxx', required: true}
export function getPropsByObject(ast, code) {
    if (ast.properties && ast.properties.length) {
        return ast.properties.map((item) => {
            var _a;
            const variables = item;
            let param = {
                name: "",
                type: "",
            };
            // 注释数组
            const notes = (_a = variables.leadingComments) === null || _a === void 0 ? void 0 : _a.map((item) => item.value);
            param.notes = notes && notes.join("\n");
            // 参数名
            param.name = getName(variables.key);
            const str = code.substring(variables.value.start || 0, variables.value.end || 0);
            const paramArr = str.match(/("?)\b(\w+)\1\s*:\s*("?)((?:\w+[-+*%])*?\w+)\b\3/g);
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
function getName(ast) {
    if (t.isIdentifier(ast)) {
        return ast.name;
    }
    return "";
}
// props emits to module
function toModule(props, emits) {
    let json = {};
    if (props && props.length) {
        json.props = {
            h2: "Props",
            table: {
                headers: ["参数", "说明", "类型", "默认值", "必填"],
                rows: props.map((item) => {
                    return [
                        item.name,
                        item.type,
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
                    return [item.name, item.notes, "null"];
                }),
            },
        };
    }
    return json;
}
//# sourceMappingURL=main.js.map