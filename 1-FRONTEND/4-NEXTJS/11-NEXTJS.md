# NEXTjs

```
路由详解
https://juejin.cn/post/7345071662029537295


1
[]
动态路由 Dynamic Route
Link https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
// Route	                   Example URL	     params
// app/blog/[slug]/page.js	 /blog/a	         { slug: 'a' }
// app/blog/[slug]/page.js	 /blog/b	         { slug: 'b' }
// app/blog/[slug]/page.js	 /blog/c	         { slug: 'c' }


2
@
并联路由 Parallel Routes
传递 slot
default.js : file to render as a fallback for unmatched slots during the initial load or full-page reload.
Link https://nextjs.org/docs/app/building-your-application/routing/parallel-routes


3
(.) 来匹配相同级别上的段
(..) 匹配分段上一级
(..)(..) 匹配分段上两级
(...) 匹配分段根(app)目录
路由拦截 Intercepting Routes
Link https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
```

##### (1) Authorization middleware

- official website: https://nextjs.org/docs/app/building-your-application/authentication
- tutorial: https://qufei1993.github.io/nextjs-learn-cn/chapter15
