import { useEffect, useState } from "react";
const useLocalStorage = <TState>(newState: TState, key: string) => {
  // the function inside the useState will only be called the first time the useLocalStorage hook is called
  // to initialize a value for state
  const [state, setState] = useState<TState>(() => {
    const stateString = window.localStorage.getItem(key);
    return stateString ? (JSON.parse(stateString) as TState) : newState;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};

export default useLocalStorage;
