// T[K]
// - 索引访问 操作符

interface IGame {
  lol: string;
  dnf: number;
  cs: boolean;
}

type TG1 = IGame["lol"]; // type TG1 = string
type TG2 = IGame["lol" | "dnf"]; // type TG2 = string | number

type TG4 = IGame[keyof IGame]; // type TG4 = string | number | boolean
// 1. 相当于 IGame["lol" | "dnf" | "cs"]
// 2. type TG4 = string | number | boolean

type TG3 = IGame["lol" | "cs" | "other"]; // type TG3 = any
// 注意：如果 [] 中的 key 不存在 T 中，则返回的是 any；因为ts也不知道该key最终是什么类型，所以是any；且也会报错；
