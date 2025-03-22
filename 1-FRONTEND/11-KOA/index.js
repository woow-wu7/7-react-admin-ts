const Koa = require("koa");

const app = new Koa({ proxy: true });

// logger
app.use(async (ctx, next) => {
  await next(); // -------------------------------------- 1. 先执行下一个中间件
  const rt = ctx.response.get("X-Response-Time"); // ---- 5. 获取 上一个中间件传递的数据 responseTime
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now(); // -------------------------- 2. 打印 start
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`); // ------------- 4. 打印 responseTime = now - start
});

// response
app.use(async (ctx) => {
  ctx.body = "Hello World"; // -------------------------- 3. 响应
});

app.listen(3000);

// 1
// 执行顺序: 12345
