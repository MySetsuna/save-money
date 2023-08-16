import styels from './AddButton.module.scss';

const AddButton = () => {
  return (
    <div
      class={styels.fabBox}
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
