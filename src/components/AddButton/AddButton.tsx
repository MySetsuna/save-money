import { Component, JSX } from 'solid-js';
import styels from './AddButton.module.scss';

const AddButton: Component<{ class?: string; style?: JSX.CSSProperties }> = (
  props
) => {
  return (
    <div
      class={[styels.fabBox, props.class].join(' ')}
      style={props.style}
      onClick={() => {
        console.log('tianjia');
      }}
    >
      <div class={styels.fab}>
        <div class="block" />
        <div class="block" />
        <div class="block" />
        <div class="block" />
      </div>
      <div class="ring" />
    </div>
  );
};
export default AddButton;
