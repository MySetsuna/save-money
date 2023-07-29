import { useLocalConfig } from '@/providers/LocalConfig';
import { A } from '@solidjs/router';
import { createMemo } from 'solid-js';
import styels from './FloatingActionButton.module.scss';

const FloatingActionButton = () => {
  const [configStore] = useLocalConfig();
  const isDefaultPostion = createMemo(
    () =>
      configStore.fabY === undefined ||
      configStore.fabX === undefined ||
      0 > configStore.fabX ||
      0 > configStore.fabY
  );
  return (
    <A href="/add">
      <div
        class={styels.fabBox}
        onClick={() => {
          console.log('tianjia');
        }}
        classList={{
          [styels.defaultPostion]: isDefaultPostion(),
        }}
        style={
          isDefaultPostion()
            ? {}
            : { left: `${configStore.fabX}px`, top: `${configStore.fabY}px` }
        }
      >
        <div class={styels.fab}>
          <div class="block" />
          <div class="block" />
          <div class="block" />
          <div class="block" />
        </div>
        <div class="ring" />
      </div>
    </A>
  );
};
export default FloatingActionButton;
