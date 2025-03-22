### Zustand

### Links

```123
1.
official website
- https://docs.pmnd.rs/zustand/integrations/persisting-store-data


2.
middleware
- devtool: https://juejin.cn/post/7310474225810030644
- persist: https://juejin.cn/post/7134633741774749710
- immer: https://docs.pmnd.rs/zustand/integrations/immer-middleware
  - with-immer: https://docs.pmnd.rs/zustand/guides/updating-state#with-immer
  - immer-middleware: https://docs.pmnd.rs/zustand/integrations/immer-middleware#my-subscriptions-aren


2.
tutorial
- https://juejin.cn/post/7232726594208759867
- https://juejin.cn/post/7134633741774749710#heading-0
```

### Usage

- [source-code-link](https://github.com/woow-wu7/5-nextjs-auth-tutorial)

```3
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State<T> = {
  loginData: ILoginData<T>;
  harborList: IHarborItem<T>[];
  selectedHarbor: IHarborItem<T>;
};

type Actions = {
  setLoginData: (newLoginData: State<string>["loginData"]) => void;

  setPassword: (newLoginData: string) => void; // common
  setPassword2: (newLoginData: string) => void; // immer

  setHarborList: (newHarborList: State<string>["harborList"]) => void;
  setSelectedHarbor: (newHarbor: State<string>["selectedHarbor"]) => void;
};

interface ILoginData<T> {
  user: {
    data: {
      email: T;
      password: T;
    };
  };
}
interface IHarborItem<T> {
  name: T;
  url: T;
  productName: T;
  status: T;
  username: T;
  password: T;
  type: T;
}

const defaultState = {
  loginData: {
    user: {
      data: {
        email: "",
        password: "",
      },
    },
  },
  harborList: [],
  selectedHarbor: {
    name: "",
    url: "",
    productName: "",
    status: "",
    username: "",
    password: "",
    type: "",
  },
};

export const useHarborStore = create<State<string> & Actions>()(
  immer(
    persist(
      devtools(
        (set) => ({
          ...defaultState,

          setLoginData: (newLoginData) => set({ loginData: newLoginData }),

          // 1
          // foolish => common
          setPassword: (newPassword) =>
            set((state) => {
              return {
                ...state,
                loginData: {
                  ...state.loginData,
                  user: {
                    data: {
                      email: state.loginData.user.data.email,
                      password: newPassword,
                    },
                  },
                },
              };
            }),

          // 2
          // smart => immer
          setPassword2: (newPassword) => {
            set((state) => {
              // TIPS: Using immer, you don't need return anything.
              state.loginData.user.data.password = newPassword;
            });
          },

          setHarborList: (newHarborList) => set({ harborList: newHarborList }),
          setSelectedHarbor: (newHarbor) => set({ selectedHarbor: newHarbor }),
        }),
        {
          name: "harborStore",
        }
      ),
      {
        name: "harborStore",
        getStorage: () => localStorage,
      }
    )
  )
);
```
