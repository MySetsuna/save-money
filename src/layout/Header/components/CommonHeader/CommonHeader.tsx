import { children } from 'solid-js';
import styles from './CommonHeader.module.scss';
import { WithChildrenComponent } from '../../../../types';

const CommonHeader: WithChildrenComponent = (props) => {
  const childrenContent = children(() => props.children);

  return (
    <nav class={styles.nav}>
      <div class={styles.navContent}>{childrenContent()}</div>
    </nav>
  );
};
export default CommonHeader;
