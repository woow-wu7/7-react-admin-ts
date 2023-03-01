"use strict";

/**
 * Module dependencies.
 */

const debug = require("debug")("koa:application");
const onFinished = require("on-finished");
const response = require("./response");

const compose = require("koa-compose");
// koa-compose
// 仓库地址：https://github.com/Cool-Primavera/compose/blob/master/index.js
// 本项目已经将koa-compose拷贝到koa-compose.js中

const context = require("./context");
const request = require("./request");
const statuses = require("statuses");
const Emitter = require("events");
const util = require("util");
const Stream = require("stream");
const http = require("http");
const only = require("only");
const { HttpError } = require("http-errors");

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */

// 1
// 使用案例
// const Koa = require("./lib/application.js");
// const app = new Koa();
// app.use(async (ctx, next) => { console.log(1); await next(); console.log(2); });
// app.use(async (ctx, next) => { console.log(3); await next(); console.log(4); });
// app.use(async (ctx, next) => { console.log(5); ctx.body = "测试中间执行顺序"; });
// app.listen(1000, () => 'app run 1000')

// 2
// KOA 整个入口文件
// - 整个顺序: app.listen() ---> callback() ---> handleRequest() ---> 中间件fn(ctx).then(handleResponse).catch(onerror)
// - fnMiddleware = compose(this.middleware) = function (context, next) =>  dispatch(0)
// ====== 三个中间价
// app.use(async (ctx, next) => {
//   console.log(1);
//   await next();
//   console.log(2);
// });
// app.use(async (ctx, next) => {
//   console.log(3);
//   await next();
//   console.log(4);
// });
// app.use(async (ctx, next) => {
//   console.log(5);
//   ctx.body = "测试中间执行顺序";
// });
// ===== 洋葱模型
// fnMiddleware() => Promise.resolve(
//   // fn1()
//   console.log(1)
//   await Promise.resolve( // ------ next()
//     // fn2()
//     console.log(3)
//     await Promise.resolve( // ---- next()
//       // fn3()
//       console.log(5)
//       return Promise.resolve()
//     )
//     console.log(4)
//   )
//   console.log(2)
// )
// .then(handleResponse)
// .catch(onerror)
// 13542

module.exports = class Application extends Emitter {
  /**
   * Initialize a new `Application`.
   *
   * @api public
   */

  /**
   *
   * @param {object} [options] Application options
   * @param {string} [options.env='development'] Environment
   * @param {string[]} [options.keys] Signed cookie keys
   * @param {boolean} [options.proxy] Trust proxy headers
   * @param {number} [options.subdomainOffset] Subdomain offset
   * @param {string} [options.proxyIpHeader] Proxy IP header, defaults to X-Forwarded-For
   * @param {number} [options.maxIpsCount] Max IPs read from proxy IP header, default to 0 (means infinity)
   *
   */

  constructor(options) {
    super();
    options = options || {};
    this.proxy = options.proxy || false;
    this.subdomainOffset = options.subdomainOffset || 2;
    this.proxyIpHeader = options.proxyIpHeader || "X-Forwarded-For";
    this.maxIpsCount = options.maxIpsCount || 0;
    this.env = options.env || process.env.NODE_ENV || "development";
    if (options.keys) this.keys = options.keys;
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    // util.inspect.custom support for node 6+
    /* istanbul ignore else */
    if (util.inspect.custom) {
      this[util.inspect.custom] = this.inspect;
    }
  }

  /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   *
   * @param {Mixed} ...
   * @return {Server}
   * @api public
   */

  // ----------------------------------------------------------------------------------------------- listen
  // app.listen(3000)
  // app.listen(1000, () => 'app run 1000')
  listen(...args) {
    debug("listen");

    const server = http.createServer(this.callback());
    // 1 this.callback()
    // - 调用后，返回的是下面这样的 函数
    // const handleRequest = (req, res) => {
    //   const ctx = this.createContext(req, res); // 创建context对象，包含request，response，req，res等属性
    //   return this.handleRequest(ctx, compose(this.middleware));
    // };

    // 2
    // compose(this.middleware)
    // - 调用后，返回的函数最终形态
    // 6. 最终形态如下
    //   const [fn1, fn2, fn3] = this.middleware()
    //   const fnMiddleware = function(context, next) {
    //     return Promise.resolve(fn1(context, function next1() {
    //       return Promise.resolve(fn2(context, function next2() { // 每个中间件，如果存在next就return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))，不存在就 return Promise.resolve()
    //         return Promise.resolve(fn3(context, function next3() { // 最后一个中间件没有next函数了，因为已经是最后一个
    //           return Promise.resolve()
    //         }))
    //       }))
    //     }))
    //   }

    // 3
    // http.createServer是 ( node原生api )
    // http.createServer([options][, requestListener])
    // http.createServer
    // 使用如下
    // const http = require('node:http');
    // const server = http.createServer((req, res) => {
    //   res.writeHead(200, { 'Content-Type': 'application/json' });
    //   res.end(JSON.stringify({
    //     data: 'Hello World!'
    //   }));
    // });
    // server.listen(8000);

    return server.listen(...args);
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, ["subdomainOffset", "proxy", "env"]);
  }

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    return this.toJSON();
  }

  /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Function} fn
   * @return {Application} self
   * @api public
   */
  // ----------------------------------------------------------------------------------------------- use
  // use -> app.use
  // 1
  /*
    const Koa = require('koa');
    const app = new Koa();
    app.use(async ctx => { ctx.body = 'Hello World' });
    app.listen(3000);
  */
  use(fn) {
    if (typeof fn !== "function")
      throw new TypeError("middleware must be a function!"); // 中间价必须是函数
    debug("use %s", fn._name || fn.name || "-");
    this.middleware.push(fn); // push -> fn
    return this; // this是use方法调用时所在的对象，通过app.use()调用，即this指向实例app -> 返回this，链式调用
  }

  /**
   * Return a request handler callback
   * for node's native http server.
   *
   * @return {Function}
   * @api public
   */

  // ----------------------------------------------------------------------------------------------- callback
  // listen(...args) {
  //   debug('listen')
  //   const server = http.createServer(this.callback()) ----- callback
  //   return server.listen(...args)
  // }
  callback() {
    // middleware 是 app.use(fn) 中 push 的 fn，即 middleware(fn1, fn2, fn3)
    const fn = compose(this.middleware);

    if (!this.listenerCount("error")) this.on("error", this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res); // 创建context对象，包含request，response，req，res等属性
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }

  /**
   * Handle request in callback.
   *
   * @api private
   */

  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = (err) => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }

  /**
   * Initialize a new context.
   *
   * @api private
   */
  // ----------------------------------------------------------------------------------------------- createContext
  // 创建context对象，包含request，response，req，res等属性
  createContext(req, res) {
    const context = Object.create(this.context);
    const request = (context.request = Object.create(this.request));
    const response = (context.response = Object.create(this.response));
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
  }

  /**
   * Default error handler.
   *
   * @param {Error} err
   * @api private
   */

  onerror(err) {
    // When dealing with cross-globals a normal `instanceof` check doesn't work properly.
    // See https://github.com/koajs/koa/issues/1466
    // We can probably remove it once jest fixes https://github.com/facebook/jest/issues/2549.
    const isNativeError =
      Object.prototype.toString.call(err) === "[object Error]" ||
      err instanceof Error;
    if (!isNativeError)
      throw new TypeError(util.format("non-error thrown: %j", err));

    if (err.status === 404 || err.expose) return;
    if (this.silent) return;

    const msg = err.stack || err.toString();
    console.error(`\n${msg.replace(/^/gm, "  ")}\n`);
  }

  /**
   * Help TS users comply to CommonJS, ESM, bundler mismatch.
   * @see https://github.com/koajs/koa/issues/1513
   */

  static get default() {
    return Application;
  }
};

/**
 * Response helper.
 */

function respond(ctx) {
  // allow bypassing koa
  if (ctx.respond === false) return;

  if (!ctx.writable) return;

  const res = ctx.res;
  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if (ctx.method === "HEAD") {
    if (!res.headersSent && !ctx.response.has("Content-Length")) {
      const { length } = ctx.response;
      if (Number.isInteger(length)) ctx.length = length;
    }
    return res.end();
  }

  // status body
  if (body == null) {
    if (ctx.response._explicitNullBody) {
      ctx.response.remove("Content-Type");
      ctx.response.remove("Transfer-Encoding");
      ctx.length = 0;
      return res.end();
    }
    if (ctx.req.httpVersionMajor >= 2) {
      body = String(code);
    } else {
      body = ctx.message || String(code);
    }
    if (!res.headersSent) {
      ctx.type = "text";
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if (typeof body === "string") return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}

/**
 * Make HttpError available to consumers of the library so that consumers don't
 * have a direct dependency upon `http-errors`
 */

module.exports.HttpError = HttpError;
