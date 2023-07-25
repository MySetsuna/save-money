import { createStore } from 'solid-js/store';
import { Component, JSX, onMount } from 'solid-js';
import styles from './Sider.module.scss';
import { useLocalConfig } from '../../providers/LocalConfig';
import { MIN_MAIN_SIDER_WIDTH } from '../../constant';

const Sider: Component<{ children: JSX.Element; className?: string }> = (
  props
) => {
  const { setMainSiderWidth, store: configStore } = useLocalConfig();
  const [store, setStore] = createStore({ moving: false, hidden: false });
  // window.setMainSiderWidth = setMainSiderWidth;

  const handleMouseDown: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = (
    event
  ) => {
    event.preventDefault();
    setStore({ moving: true });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', clearEvent);
  };

  const handleMouseMove = (event: MouseEvent) => {
    setMainSiderWidth(event.clientX);
    if (event.clientX < MIN_MAIN_SIDER_WIDTH) {
      setStore({ hidden: true });
    } else if (event.clientX >= MIN_MAIN_SIDER_WIDTH || store.hidden) {
      setStore({ hidden: false });
    }
  };
  const clearEvent = () => {
    setStore({ moving: false });
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', clearEvent);
  };

  onMount(() => {
    setStore({ hidden: configStore.mainSiderWidth < MIN_MAIN_SIDER_WIDTH });
  });

  return (
    <>
      <div
        class={[styles.siderBox, props.className].join(' ')}
        classList={{ [styles.hidden]: store.hidden }}
        style={{ width: `${configStore.mainSiderWidth}px` }}
      >
        {props.children}
        <div class={styles.dragBar} draggable onMouseDown={handleMouseDown}>
          <div
            classList={{
              [styles.dragLine]: true,
              [styles.moving]: store.moving,
            }}
          />
        </div>
      </div>
      {store.hidden && (
        <div class={styles.leftDragBar} draggable onMouseDown={handleMouseDown}>
          <div
            classList={{
              [styles.dragLine]: true,
              [styles.moving]: store.moving,
            }}
          />
        </div>
      )}
    </>
  );
};
export default Sider;
