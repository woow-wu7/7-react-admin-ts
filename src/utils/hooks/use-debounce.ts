import { useRef } from "react";

interface UseDebounce {
  (fn: Ifn, delay?: number, immediate?: boolean): Closure;
}

interface Ifn {
  (...rest: any[]): any;
}

interface Closure {
  (e: any, ...rest: any[]): any;
}

/**
 * @desc debounce 防抖函数
 * @param {function} fn 需要执行的函数
 * @param {number} delay 延时执行的时间段
 * @param {boolean} immediate 是否立即执行
 */
export const useDebounce: UseDebounce = (
  fn: any,
  delay = 1000,
  immediate = false
) => {
  const refTimer = useRef(0); // 相当于class中的实例属性

  return (e, ...rest) => {
    if (immediate && !refTimer.current) {
      fn.call(rest);
      refTimer.current = 1; // 除了第一次进入，后面都不会在进入该函数
      return; // 第一次不往下执行
    }
    if (refTimer.current) {
      window.clearTimeout(refTimer.current);
    }

    refTimer.current = window.setTimeout(() => {
      fn.call(rest);
    }, delay);

    // useDebounce.cancel = function() {
    //   if(refTimer.current) {
    //     window.clearTimeout(refTimer.current)
    //   }
    // }
  };
};

// -------------------- 变量 timer 版本 --------------------
// 问题：当 UseDebounce 组件中有其他 state 更新时，useDebounce是新的函数重新执行了，timer又会被重新赋值为初始值，造成错乱，不能达到debounce效果
// 如何验证：useDebounce在UseDebounce组件有其他state更新时重新执行了：在useDebounce中 console.log() 打印即可
// 如何解决：使用 useRef 固定数据，类似class中的实例变量
// export const useDebounce: UseDebounce = (fn: any, delay = 1000, immediate = false) => {
//   let timer = 0;
//   return (e, ...rest) => {
//     if (immediate && !timer) {
//       fn.call(rest);
//       timer = 1;
//       return;
//     }
//     if (timer) {
//       window.clearTimeout(timer);
//     }
//     timer = window.setTimeout(() => {
//       fn.call(rest);
//     }, delay);
//   };
// };
