// import { useLocalConfig } from '@/providers/LocalConfig';
// import { useUser } from '@/providers/User';
// import { createEffect } from 'solid-js';
//  绿,黄,蓝三种颜色,感叹号表示日余额低于警告水平
const BalanceHeader = () => {
  // const userStore = useUser();
  // const localConfigStore = useLocalConfig();

  return (
    <>
      <div
        style={{
          display: 'flex',
          'flex-wrap': 'nowrap',
          width: 'auto',
          height: '100%',
          flex: 'auto',
        }}
      >
        <div
          class="cost"
          style={{ width: `${66}%`, 'background-color': '#ffc0cb1f' }}
        >
          <div>{Number(0.66 * 156).toFixed(0)}</div>
          <div>{66}%</div>
        </div>
        <div
          class="balance"
          style={{ width: `${34}%`, 'background-color': 'pink' }}
        >
          <div>{Number(0.34 * 156).toFixed(0)}</div>
          <div>{34}%</div>
        </div>
      </div>
    </>
  );
};
export default BalanceHeader;
