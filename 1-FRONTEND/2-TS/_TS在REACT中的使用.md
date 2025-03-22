# REACT 中使用 TS


```
1
React.BaseSyntheticEvent
----
const a = (e: React.BaseSyntheticEvent) => {
    const html = e?.target?.innerHTML;
    // 这里需要使用到 innerHtml 属性，所以不能是 React.MouseEvent<HTMLDivElement>
    // React.BaseSyntheticEvent 是react合成事件
    // synthetic 是合成的的意思，adj
  };


2. 泛型函数的两种写法
- function a<T>(params: T) { .... }
- const a = <T>(params: T) => { .... }


3. ref
3.1
const inputWrapRef: React.MutableRefObject<HTMLLIElement> = useRef<HTMLLIElement>();
3.2
interface InputComponentProps {
  inputRef: React.MutableRefObject<Input>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputWrapRef: React.MutableRefObject<HTMLLIElement>;
}
3.3
const inputValueRef = useRef<string>()
注意：这里ref如果是绑定的input的值，则应该是string类型



4. event
4.1 const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
4.2 const onClick = (e: React.MouseEvent<HTMLInputElement>) => {}
4.3 其他事件（e: React.xxEvent <ReactNode>）
4.4
interface TagComponentProps {
  onClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
```