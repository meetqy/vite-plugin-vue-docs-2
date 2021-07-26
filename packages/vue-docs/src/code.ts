import { Route } from "./route";
import { Config } from "./index";

interface NavRoute {
  title: string;
  data: {
    path: string;
    name: string;
  }[];
}

export function createNavRoute(
  routes: Route[],
  config: Config
): NavRoute[] | [] {
  const nav = [];

  const { base } = config;

  if (config.showUse) {
    nav.push({
      data: [
        { path: config.base, name: "使用说明" },
        {
          path: base + "/changelog",
          name: "更新日志",
        },
      ],
      title: "使用指南",
    });
  }

  // 组件路由
  nav.push({
    data: routes.map((item) => {
      return {
        ...item,
        path: base + item.path,
      };
    }),
    title: "组件",
  });

  return nav;
}
