import { createStore } from 'solid-js/store';
import { children } from 'solid-js';
import styles from './Sider.module.scss';
import { useLocalConfig } from '../../providers/LocalConfig';
import { MIN_MAIN_SIDER_WIDTH } from '../../constant';
import { WithChildrenComponent } from '../../types';

const Sider: WithChildrenComponent<{ className?: string }> = (props) => {
  const childContent = children(() => props.children);
  const [configStore, setConfigStore] = useLocalConfig();
  const [store, setStore] = createStore({
    moving: false,
    hidden: configStore.mainSiderWidth < MIN_MAIN_SIDER_WIDTH,
  });

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    setStore({ moving: true });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', clearEvent);
    document.body.style.cursor = 'w-resize';
  };

  const handleMouseMove = (event: MouseEvent) => {
    setConfigStore({ mainSiderWidth: event.clientX });
    if (event.clientX < MIN_MAIN_SIDER_WIDTH) {
      setStore({ hidden: true });
    } else if (event.clientX >= MIN_MAIN_SIDER_WIDTH || store.hidden) {
      setStore({ hidden: false });
    }
  };

  const handleTouchStart = (event: TouchEvent) => {
    console.log(event);

    setStore({ moving: true });
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', clearEvent);
    document.body.style.cursor = 'w-resize';
  };
  const handleTouchMove = (event: TouchEvent) => {
    console.log(event, 'event');

    setConfigStore({ mainSiderWidth: event.changedTouches[0].clientX });
    if (event.changedTouches[0].clientX < MIN_MAIN_SIDER_WIDTH) {
      setStore({ hidden: true });
    } else if (
      event.changedTouches[0].clientX >= MIN_MAIN_SIDER_WIDTH ||
      store.hidden
    ) {
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

  return (
    <div class={styles.sider}>
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
