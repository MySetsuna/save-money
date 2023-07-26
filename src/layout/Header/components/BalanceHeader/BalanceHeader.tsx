import { useLocalConfig } from '@/providers/LocalConfig';
import { useUser } from '@/providers/User';
import { createEffect } from 'solid-js';

const BalanceHeader = () => {
  const userStore = useUser();
  const localConfigStore = useLocalConfig();
  createEffect(() => {
    console.log(
      userStore().user().userName,
      'userStore',
      localConfigStore().header,
      'localConfigStore'
    );
  });

  return <>BalanceHeader</>;
};
export default BalanceHeader;
