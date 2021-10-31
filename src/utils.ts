export const debounce = (callback: (...args: any) => void, wait: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return function (...args: any) {
    clearTimeout(timeoutId as NodeJS.Timeout);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};
