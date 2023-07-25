import {
  createSignal,
  createContext,
  useContext,
  JSXElement,
  Component,
  Accessor,
  mergeProps,
  onMount
} from 'solid-js';

const LocalConfigContext = createContext<{
  mainSiderWidth: Accessor<number>;
  setMainSiderWidth: (value: number) => void;
}>();

export const LocalConfigProvider: Component<{
  children: JSXElement;
}> = (props) => {
  const localMainSiderWidthd = localStorage.getItem('mainSiderWidth');
  const merged = mergeProps(
    { mainSiderWidth: parseInt(localMainSiderWidthd as string) },
    props
  );
  const [mainSiderWidth, setMainSiderWidth] = createSignal(500);

  onMount(() => {
    setMainSiderWidth(merged.mainSiderWidth ? merged.mainSiderWidth : 500);
  });

  return (
    <LocalConfigContext.Provider
      value={{
        mainSiderWidth,
        setMainSiderWidth: (value: number) => {
          setMainSiderWidth(value);
          localStorage.setItem('mainSiderWidth', `${value}`);
        }
      }}
    >
      {props.children}
    </LocalConfigContext.Provider>
  );
};

export function useLocalConfig() {
  const context = useContext(LocalConfigContext);
  if (context) {
    return context;
  }
  throw new Error('use LocalConfig inside LocalConfigProvider');
}
