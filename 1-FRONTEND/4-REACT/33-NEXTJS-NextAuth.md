### NextAuth

- [NextAuth guides]([https://authjs.dev/guides/debugging])
- [NextAuth 官网](https://authjs.dev/getting-started/authentication/credentials)
- [NextJs 官网](https://nextjs.org/docs/getting-started/installation)

### Credential

- [官网-credential-link](https://authjs.dev/getting-started/authentication/credentials)
- [tutorial-1](https://qufei1993.github.io/nextjs-learn-cn/chapter15)
- [tutorial-2](https://juejin.cn/post/7155514465591984136)

### specific process

```install zod 1111111111111
1
install zod
- 官网: https://zod.dev/
- 作用: 用于提交前的验证，提升效率
```

```auth.config.ts
// auth.config.ts

// 1
// TIPS: This file just a part of the 'auth.js' as a config object.
// - This file is used by 'middleware.js'.
// - This file is also used by 'auth.js'.

export const authConfig = {
  pages: {
    signIn: "/login",
    // Rewriting the login page, using customized the login page to replace the default NextAuth login page.
  },
  callbacks: {},
};
```

```middleware.ts 2222222222
// middleware.ts

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
```

```auth.js 3333333333
// auth.js

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// 1
// Credentials provider
// -- It supports users to login with username and password.

// 2
// zod
// It helps us to easily and safely verify user's informations.

// 3
// question: How and when is the 'authorize' function called?
// - The 'authorize' will run When we call the 'signIn' function which was returned by 'NextAuth' function.
// - 'singnIn' ----trigger----> 'authorize'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig, // This config option object comes from the 'auth.config.js' file.
  debug: true, // Turn on debug logging function. We will get more details through console log.
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log("email", email);
          console.log("password", password);

          // Right now, we can emit a request through 'getUser' function to backend to get user informations.
          const user = await getUser(email, password)
          return user;
        }
      },
    }),
  ],
});
```

```login.js 44444444444
// login.js

export default function LoginForm() {
  const router = useRouter()
  const [result, dispatch] = useFormState(authenticate, undefined) // ------------------- authenticate
  return (
    <form action={dispatch} >
      <div>
          <div>
            <label>邮箱</label>
            <div className="relative"><input/></div>
          </div>
          <div className="mt-4">
            <label>密码</label>
            <div className="relative"><input/></div>
          </div>
        </div>
        <LoginButton />
      </div>
    </form>
  )
}

// TIPS
// - The following code runs in node environment.
// - I just copy it to this file from node environment for a tutorial.
export async function authenticate( // -------------------------------------------------- authenticate
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    await signIn('credentials', { // ---------------- The 'signIn' fuction is declared in 'auth.js' file.
        email,
        password,
        redirect: false
      })
    ...
    ...
  } catch (error) {...}
}
```
