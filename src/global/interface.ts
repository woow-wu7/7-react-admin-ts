export interface RouteModule {
  path?: string;
  component?: any;
  exact?: boolean;
  strict?: boolean;
  routes?: any;
  render?: any;

  title?: string;
  key?: string;
  icon?: string;
  subs?: RouteModule[];
}
