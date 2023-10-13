type Callback = () => void;

export const debounce = (callback: Callback, delay: number): Callback => {
  let timeoutId: number;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};
