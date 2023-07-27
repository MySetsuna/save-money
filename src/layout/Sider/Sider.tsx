import { createStore } from 'solid-js/store';
import { children, mergeProps, onMount } from 'solid-js';
import styles from './Sider.module.scss';
import { useLocalConfig } from '../../providers/LocalConfig';
import { MIN_MAIN_SIDER_WIDTH } from '../../constant';
import { WithChildrenComponent } from '../../types';

const Sider: WithChildrenComponent<{
  className?: string;
  minSiderWidth?: number;
}> = (props) => {
  let sider: HTMLDivElement | undefined;
  const childContent = children(() => props.children);
  const [configStore, setConfigStore] = useLocalConfig();

  const merged = mergeProps({ minSiderWidth: MIN_MAIN_SIDER_WIDTH }, props);
  const [store, setStore] = createStore({
    moving: false,
    hidden: false,
    offsetX: 0,
    startX: 0,
  });

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    setStore({ moving: true, startX: event.clientX });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', clearEvent);
    document.body.style.cursor = 'w-resize';
  };

  const handleMouseMove = (event: MouseEvent) => {
    const mainSiderWidth = event.clientX - store.offsetX;
    if (store.startX === event.clientX) return;
    setConfigStore({ mainSiderWidth });
    if (mainSiderWidth < merged.minSiderWidth) {
      setStore({ hidden: true });
    } else if (mainSiderWidth >= merged.minSiderWidth || store.hidden) {
      setStore({ hidden: false });
    }
  };

  const handleTouchStart = () => {
    setStore({ moving: true });
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', clearEvent);
    document.body.style.cursor = 'w-resize';
  };

  const handleTouchMove = (event: TouchEvent) => {
    const mainSiderWidth = event.changedTouches[0].clientX - store.offsetX;
    setConfigStore({ mainSiderWidth });
    if (mainSiderWidth < merged.minSiderWidth) {
      setStore({ hidden: true });
    } else if (mainSiderWidth >= merged.minSiderWidth || store.hidden) {
      setStore({ hidden: false });
    }
  };

  const clearEvent = () => {
    setStore({ moving: false });
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', clearEvent);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', clearEvent);
    document.body.style.cursor = 'default';
  };

  onMount(() => {
    setStore({
      offsetX: sider?.offsetLeft,
      hidden: configStore.mainSiderWidth < merged.minSiderWidth,
    });
  });

  return (
    <div class={styles.sider} ref={sider}>
      <div
        class={[styles.siderBox, props.className].join(' ')}
        style={{
          width: store.hidden ? '3px' : `${configStore.mainSiderWidth}px`,
        }}
      >
        <div classList={{ [styles.hidden]: store.hidden }}>
          {childContent()}
        </div>
      </div>
      <div
        class={styles.dragBar}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          style={{ 'background-color': `${configStore.siderResizerColor}` }}
          classList={{
            [styles.dragLine]: true,
            [styles.moving]: store.moving,
          }}
        />
      </div>
    </div>
  );
};
export default Sider;
