# Redux 源码分析
- 2021/09/19 review



#### (1) Redux 暴露的 api ( 共6个 )
- createStore ----------------------- 创建store对象
- combineReducers ------------------- 合并reducer树
- applyMiddleware ------------------- 返回enhance函数
- bindActionCreators ---------------- 包装 actionCreator 函数为对象，或者直接返回一个包装后的函数，具体见下面的一些函数签名
- compose --------------------------- 中间件实现洋葱模型的核心函数
- __DO_NOT_USE__ActionTypes --------- 一个action的type映射表



#### (2) Store 对象的属性 ( 共5个 )
- getState
- dispatch
- subscribe
- replaceReducer
- observable



#### (3) 一些函数签名
```
真实项目中使用是这样
- 真实：const store = createStore(combineReducers(totalReducers), composeWithDevTools(applyMiddleware(thunk, logger)))
- 简化：const store = createStore(combineReducers(totalReducers), applyMiddleware(thunk, logger))
-------


1. createStore
函数重载
- const createStore = (reducer, preloadedState, enhancer) => enhancer(createStore)(reducer,preloadedState)
- const createStore = (reducer, preloadedState) => ({getState, dispatch, subscribe, replaceReducer, observable})


2. applyMiddleware
定义
- const applyMiddleware = (...middlewares) => (createStore) => (...args) => ({...store, dispatch})
返回值
- applyMiddleware 执行返回的是一个 enhancer 函数
- enhance函数作为createStore()的参数


3. createStore 和 applyMiddleware 复杂的关系
- 第一步：真实调用 createStore(combineReducers(totalReducers), applyMiddleware(thunk, logger))
- 第二步：
  - applyMiddleware(thunk, logger) 执行后返回 (createStore) => (...args) => ({...store, dispatch})
  - (createStore) => (...args) => ({...store, dispatch}) 这个函数作为 applyMiddleware() 函数的参数 enhancer 传入
- 第三步：
  - enhancer(createStore)(reducer,preloadedState)
    - a. enhancer 对应 ----------------------------------------- (createStore) => (...args) => ({...store, dispatch})
    - b. (reducer, preloadedState) 对应上面a的 ------------------ (...args)
    - c. 在 a 中的 args 是传入了 createStore(...args) 即是 -------  createStore(reducer, preloadedState)
          - 因为：这样的话createStore()参数中就不存在enhancer函数
          - 所以：那么createStore()就会走自己定义的各种api的流程，即走到下面自己声明的 getState dispatch subscribe replaceReducer observable


4. bindActionCreators
// 函数重载
// - 第一个参数是对象：const bindActionCreators = (actionCreatorsObject, dispatch) => ({ actionCreatorFunctionName: () => dispatch(action) })
// - 第一个参数是函数：const bindActionCreators = (actionCreatorsFn, dispatch) => () => dispatch(actionCreator.apply(this, arguments))
```




##### (4) 其他文章
- [[react] Hooks](https://juejin.im/post/6844904045342113799)
- [[封装01-设计模式] 设计原则 和 工厂模式(简单抽象方法)  适配器模式 装饰器模式](https://juejin.cn/post/6950958974854234119)
- [[封装02-设计模式] 命令模式 享元模式 组合模式 代理模式](https://juejin.cn/post/6950958974854234119)
- [[React 从零实践01-后台] 代码分割](https://juejin.im/post/6879020830253285384)
- [[React 从零实践02-后台] 权限控制](https://juejin.im/post/6881481205657632781)
- [[React 从零实践03-后台] 自定义hooks](https://juejin.im/post/6887132776512880654)
- [[React 从零实践04-后台] docker-compose 部署react+egg+nginx+mysql](https://juejin.im/post/6892390655126241287)
- [[React 从零实践05-后台] Gitlab-CI使用Docker自动化部署](https://juejin.cn/post/6897884843275714567)
- [[源码-webpack01-前置知识] AST抽象语法树](https://juejin.im/post/6844904115265339406)
- [[源码-webpack02-前置知识] Tapable](https://juejin.im/post/6844904115269550087)
- [[源码-webpack03] 手写webpack - compiler简单编译流程](https://juejin.im/post/6844903973002936327)
- [[源码] Redux React-Redux01](https://juejin.im/post/6844904137952329742)
- [[源码] axios ](https://juejin.im/post/6844904147532120072)
- [[源码] koa](https://juejin.cn/post/7008056344540348453)
- [[源码] vuex ](https://juejin.im/post/6844904166293241863)
- [[源码-vue01] data响应式 和 初始化渲染 ](https://juejin.im/post/6844904181094957069)
- [[源码-vue02] computed 响应式 - 初始化，访问，更新过程 ](https://juejin.im/post/6844904184035147790)
- [[源码-vue03] watch 侦听属性 - 初始化和更新 ](https://juejin.im/post/6844904186652409863)
- [[源码-vue04] Vue.set 和 vm.$set](https://juejin.im/post/6844904190918000654)
- [[源码-vue05] Vue.extend](https://juejin.im/post/6844904201944825863)
- [[源码-vue06] Vue.nextTick 和 vm.$nextTick](https://juejin.im/post/6847902219107303438)
- [[源码-react01] ReactDOM.render01](https://juejin.cn/post/6993980489463758855)
- [[源码-react02] 手写hook调度-useState实现](https://juejin.cn/post/6998452866369191972)
- [[部署01] Nginx](https://juejin.im/post/6844904095464030215)
- [[部署02] Docker 部署vue项目](https://juejin.im/post/6844904099024994312)
- [[部署03] gitlab-CI](https://juejin.im/post/6844904103944912904)
- [[数据结构和算法01]  二分查找和排序](https://juejin.cn/post/6907145602400780296/)
- [[深入01] 执行上下文](https://juejin.im/post/6844904046050934792)
- [[深入02] 原型链](https://juejin.im/post/6844904048873701389)
- [[深入03] 继承](https://juejin.im/post/6844904050895372295)
- [[深入04] 事件循环](https://juejin.im/post/6844904051562250254)
- [[深入05]  柯里化 偏函数 函数记忆](https://juejin.im/post/6844904052879261710)
- [[深入06]  隐式转换 和 运算符](https://juejin.im/post/6844904052937981959)
- [[深入07]  浏览器缓存机制（http缓存机制）](https://juejin.im/post/6844904053013479432)
- [[深入08]  前端安全](https://juejin.im/post/6844904053235793927)
- [[深入09]  深浅拷贝](https://juejin.im/post/6844904053764259854)
- [[深入10]  Debounce Throttle](https://juejin.im/post/6844904054330490894)
- [[深入11] 前端路由](https://juejin.im/post/6844904054846390279)
- [[深入12] 前端模块化](https://juejin.im/post/6844904056557682701)
- [[深入13] 观察者模式 发布订阅模式 双向数据绑定](https://juejin.im/post/6844904058604486663)
- [[深入14] canvas](https://juejin.im/post/6844904063029477389)
- [[深入15] webSocket](https://juejin.im/post/6844904066808561677)
- [[深入16] webpack](https://juejin.im/post/6844904070201753608)
- [[深入17] http 和 https](https://juejin.im/post/6844904085750038542)
- [[深入18] CSS-interview](https://juejin.im/post/6844904090644774926)
- [[深入19] 手写Promise](https://juejin.im/post/6844903823429861389)
- [[深入20] 手写函数](https://juejin.im/post/6844904131577004040)
- [[深入21] 数据结构和算法 - 二分查找和排序](https://juejin.cn/post/6907145602400780296/)
- [[深入22] js和v8垃圾回收机制](https://juejin.cn/post/6911192116651622413)
- [[深入23] JS设计模式 - 代理，策略，单例](https://juejin.cn/post/6918744081460002824)
- [[深入24] Fiber](https://juejin.cn/post/6983570939342487565)
- [[深入25] Typescript](https://juejin.cn/post/6999807282343051277)
- [[前端学java01-SpringBoot实战] 环境配置和HelloWorld服务](https://juejin.cn/post/6927306093970325517)
- [[前端学java02-SpringBoot实战] mybatis + mysql 实现歌曲增删改查](https://juejin.cn/post/6929145638898794503)
- [[前端学java03-SpringBoot实战] lombok，日志，部署](https://juejin.cn/post/6930627377101979662)
- [[前端学java04-SpringBoot实战] 静态资源 + 拦截器 + 前后端文件上传](https://juejin.cn/post/6932097247735709709)
- [[前端学java05-SpringBoot实战] 常用注解 + redis实现统计功能](https://juejin.cn/post/6933224825200574478)
- [[前端学java06-SpringBoot实战] 注入 + Swagger2 3.0 + 单元测试JUnit5](https://juejin.cn/post/6934274450514771982)
- [[前端学java07-SpringBoot实战] IOC扫描器 + 事务 + Jackson](https://juejin.cn/post/6935081135114289188)
- [[前端学java08-SpringBoot实战总结1-7] 阶段性总结](https://juejin.cn/post/6960187616050282533)
- [[前端学java09-SpringBoot实战]  多模块配置 + Mybatis-plus + 单多模块打包部署](https://juejin.cn/post/6962752749993721892)
- [[前端学java10-SpringBoot实战] bean赋值转换  + 参数校验 + 全局异常处理](https://juejin.cn/post/6965404539298168839)
- [[前端学java11-SpringSecurity] 配置 + 内存 + 数据库 = 三种方式实现RBAC](https://juejin.cn/post/6968003860522598436)
- [[前端学java12-SpringSecurity] JWT](https://juejin.cn/post/6970598940479586334)
- [[前端学java13-SpringCloud] Eureka + RestTemplate + Zuul + Ribbon](https://juejin.cn/post/6973100621205520392)


