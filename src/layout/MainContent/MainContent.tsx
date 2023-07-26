import { children } from 'solid-js';
import { WithChildrenComponent } from '../../types';
const MainContent: WithChildrenComponent = (props) => {
  const childContent = children(() => props.children);
  return <>{childContent()}</>;
};
export default MainContent;
