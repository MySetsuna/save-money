import { useLocalConfig } from '@/providers/LocalConfig';
import { useUser } from '@/providers/User';
import { onMount } from 'solid-js';
import styles from './BalanceHeader.module.scss';
//  绿,黄,蓝三种颜色,感叹号表示日余额低于警告水平
// green yellow crimson
const BalanceHeader = () => {
  const [userStore] = useUser();
  const [configStore] = useLocalConfig();
  let bBox: HTMLDivElement | undefined;
  onMount(() => {
    console.log(userStore().userName, 'in', configStore.siderResizerColor);
    // bBox?.style.setProperty('--bar-color', 'red');
  });
  return (
    <>
      <div
        ref={bBox}
        class={styles.balanceBox}
        style={{
          display: 'flex',
          'flex-wrap': 'nowrap',
          width: 'auto',
          height: '100%',
          flex: 'auto',
        }}
      >
        <div class={styles.cost} style={{ width: `${66}%` }}>
          <div>{Number(0.66 * 156).toFixed(0)}</div>
          <div>{66}%</div>
        </div>
        <div class={styles.box} style={{ width: `${34}%` }}>
          <div class={styles.balance}>
            <div>{Number(0.34 * 156).toFixed(0)}</div>
            <div>{34}%</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BalanceHeader;
