type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

interface IA {
  name: string;
  age: number;
}

type TPartial11 = Partial<IA>;
type TPartial22 = MyPartial<IA>;
