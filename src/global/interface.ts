export interface RouteModule {
  path?: string;
  component?: any;
  exact?: boolean;
  strict?: boolean;
  routes?: any;
  render?: any;

  // 用于router 和 menu 的结合
  title?: string;
  key?: string;
  icon?: string;
  subs?: RouteModule[];
}
