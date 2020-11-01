// route对象
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

// router对象中的 meta
export interface IMeta {
  needLoginAuth: boolean;
  rolesAuth?: string[];
}


// store => app => loginMessage
export interface ILoginMessage {
  token: string;
  roles: string;
}


export interface ITableProps {
  columns: any,
}