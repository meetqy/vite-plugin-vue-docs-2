// @ts-nocheck

import { exportDefault } from "./utils";

export const slot1 = exportDefault(
  "",
  `<header>
    <!-- 这是一个header插槽 -->
    <slot></slot>
  </header>`
);

export const slot2 = exportDefault(
  "",
  `<header>
    <slot></slot>
  </header>`
);

export const slot3 = exportDefault(
  "",
  `<header>
    <slot name="header"></slot>
  </header>`
);

export const slot4 = exportDefault(
  "",
  `<header>
    <!-- 这是一个header插槽 -->
    <slot name="header" scope="data"></slot>
  </header>`
);

export const slot5 = exportDefault(
  "",
  `<header>
    <!-- 这是一个header插槽 -->
    <slot name="header" scope="data"></slot>
  </header>
<content>
<!-- 这是一个content插槽 -->
<slot></slot>
</content>
`
);

export const slot6 = exportDefault(
  "",
  `<header>
<!-- 这是一个干扰注释 -->
<!--干扰注释-->
    <!-- 这是一个header插槽 -->
    <slot name="header" scope="data"></slot>
  </header>
<content>
<!-- 这是一个content插槽 -->
<slot></slot>

</content>
`
);
