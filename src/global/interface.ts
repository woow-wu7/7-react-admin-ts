export interface IRouteModule {
  path?: string;
  component?: any;
  exact?: boolean;
  strict?: boolean;
  routes?: IRouteModule[];
  render?: any;
  // 用于router 和 menu 的结合
  title?: string;
  key?: string;
  icon?: string;
  subs?: IRouteModule[];
  meta: IMeta
}

export interface IMeta {
  needLoginAuth: boolean;
  rolesAuth?: string[];
}
