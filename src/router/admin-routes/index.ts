import { IRouteModule } from '@/global/interface'
import AdminHome from '@/pages/admin-system/home'
import UiAntdForm from '@/pages/admin-system/ui-antd-form'
import UiAntdTable from '@/pages/admin-system/ui-antd-table'
import UiVant from '@/pages/admin-system/ui-vant'
import ReactHooks from '@/pages/admin-system/react-hooks'
import JsEs5 from '@/pages/admin-system/js-es5'
import JsEs6 from '@/pages/admin-system/js-es6'
import JsEs6Detail from '@/pages/admin-system/js-es6-detail'
import JsEs5Detail from '@/pages/admin-system/js-es5-detail'
import Material from '@/pages/admin-system/material-bigscreen'
import ServerEgg from '@/pages/admin-system/server-egg'

const adminRoutes: IRouteModule[] = [
  {
    title: '首页',
    icon: 'anticon-home--line',
    key: '/admin-home',
    path: '/admin-home',
    component: AdminHome,
    meta: {
      needLoginAuth: true,
      rolesAuth: ['user', 'admin']
    },
  },
  {
    title: 'UI',
    icon: 'anticon-uikit',
    key: '/admin-ui',
    path: '/admin-ui',
    meta: {
      needLoginAuth: true,
      rolesAuth: ['user', 'admin']
    },
    subs: [{ // subs用于注册路由，并且用于menu树形菜单
      title: 'Antd',
      icon: 'anticon-ant-design',
      key: '/admin-ui/antd',
      path: '/admin-ui/antd',
      meta: {
        needLoginAuth: true,
        rolesAuth: ['admin']
      },
      subs: [
        {
          title: 'Table',
          icon: 'anticon-custom-form',
          key: '/admin-ui/antd/table',
          path: '/admin-ui/antd/table',
          component: UiAntdTable,
          meta: {
            needLoginAuth: true,
            rolesAuth: ['admin']
          },
        },
        {
          title: 'Form表单',
          icon: 'anticon-zidingyibiaodan',
          key: '/admin-ui/antd/form',
          path: '/admin-ui/antd/form',
          component: UiAntdForm,
          meta: {
            needLoginAuth: true,
            rolesAuth: ['admin']
          },
        }]
    }, {
      title: 'Vant',
      icon: 'anticon-relevant-outlined',
      key: '/admin-ui/vant',
      path: '/admin-ui/vant',
      component: UiVant,
      meta: {
        needLoginAuth: true,
        rolesAuth: ['user', 'admin']
      },
    }]
  },
  {
    title: 'React',
    icon: 'anticon-react1',
    key: '/admin-react',
    path: '/admin-react',
    meta: {
      needLoginAuth: true,
      rolesAuth: ['user', 'admin']
    },
    subs: [
      {
        title: 'Hooks',
        icon: 'anticon-zuixinyouhui',
        key: '/admin-react/hooks',
        path: '/admin-react/hooks',
        component: ReactHooks,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['user', 'admin']
        },
      }
    ]
  },
  {
    title: 'JS',
    icon: 'anticon-js',
    key: '/admin-js',
    path: '/admin-js',
    meta: {
      needLoginAuth: true,
      rolesAuth: ['admin']
    },
    subs: [
      {
        title: 'ES6',
        icon: 'anticon-6',
        key: '/admin-js/es6',
        path: '/admin-js/es6',
        component: JsEs6,
        exact: true, // 注意；存在动态路由时，需要设置 exact 精确匹配
        meta: {
          needLoginAuth: true,
          rolesAuth: ['admin']
        },
      },
      {
        title: 'ES6详情',
        key: '/admin-js/es6/:id',
        path: '/admin-js/es6/:id',
        component: JsEs6Detail,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['admin']
        },
      },
      {
        title: 'ES5',
        icon: 'anticon-js',
        key: '/admin-js/es5',
        path: '/admin-js/es5',
        component: JsEs5,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['admin']
        },
      }, {
        title: 'ES5详情',
        icon: 'anticon-js',
        key: '/admin-js/es5/:id',
        path: '/admin-js/es5/:id',
        component: JsEs5Detail,
        meta: {
          needLoginAuth: true,
          rolesAuth: ['admin']
        },
      }
    ]
  },
  {
    title: '资料',
    icon: 'anticon-relevant-outlined',
    key: '/admin-material',
    path: '/admin-material',
    meta: {
      needLoginAuth: true,
      rolesAuth: ['user', 'admin']
    },
    subs: [{
      title: '大屏',
      icon: 'anticon-icon-test',
      key: '/admin-material/bigscreen',
      path: '/admin-material/bigscreen',
      component: Material,
      meta: {
        needLoginAuth: true,
        rolesAuth: ['user', 'admin']
      }
    }, {
      title: '服务端egg',
      icon: 'anticon-icon-test',
      key: '/admin-material/serverse-egg',
      path: '/admin-material/serverse-egg',
      component: ServerEgg,
      meta: {
        needLoginAuth: true,
        rolesAuth: ['user', 'admin']
      }
    },
    ]
  }]

export default adminRoutes