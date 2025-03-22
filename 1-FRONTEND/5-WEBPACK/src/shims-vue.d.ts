/* eslint-disable */

// 1
declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
// 这两种写法都可以
// ReturnType<typeof defineComponent> 返回 ReturnType 的返回值类型
// 2
// declare module "*.vue" {
//   import type { DefineComponent } from "vue";
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }

declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
