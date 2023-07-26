import { children } from 'solid-js';
import { WithChildrenComponent } from '../../types';
import styles from './MainContent.module.scss';
const MainContent: WithChildrenComponent = (props) => {
  const childContent = children(() => props.children);
  return (
    <>
      <div class={styles.content}>{childContent()}</div>
    </>
  );
};
export default MainContent;
