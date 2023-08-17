import { Component, JSX } from 'solid-js';
import styles from './BalanceHeader.module.scss';
import { useCounter } from '@/providers/Counter';

//  绿,黄,蓝三种颜色,感叹号表示日余额低于警告水平
// green yellow crimson
const BalanceHeader: Component<{ style?: JSX.CSSProperties }> = (props) => {
  // const [configStore] = useLocalConfig();
  const [, { setCounter }, summary] = useCounter();

  Reflect.set(window, 'setCounter', setCounter);

  return (
    <>
      <div
        class={styles.balanceBox}
        style={{ width: true ? '200%' : '100%', ...props.style }}
      >
        <div class={styles.barBox}>
          <div class={styles.cost} style={{ width: summary().costPercent }}>
            <span>
              消{summary().balancePercentNumebr < 93 && '费'} {summary().cost}
            </span>
          </div>
          <div class={styles.box} style={{ width: summary().balancePercent }}>
            <div class={styles.balance}>
              <span>
                余{summary().balancePercentNumebr > 5 && '额'}
                {summary().balance}
              </span>
            </div>
          </div>
        </div>
        <div class={styles.total}>
          <div>总 {summary().total}</div>
          <div>日消 {summary().dayCost}</div>
          <div>日余 {summary().dayBalance}</div>
        </div>
      </div>
    </>
  );
};
export default BalanceHeader;
