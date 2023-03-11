export const isAsyncFunction = (fn: any) => fn[Symbol.toStringTag] === 'AsyncFunction';
