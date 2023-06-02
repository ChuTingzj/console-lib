export function debounce(fn: () => void, delay = 500) {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args); // 改变this指向为调用debounce所指的对象
    }, delay);
  };
}
export default debounce;