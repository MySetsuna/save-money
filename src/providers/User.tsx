import {
  createSignal,
  createContext,
  useContext,
  createResource,
  createEffect
} from 'solid-js';
import { UserCotextValue, WithChildrenComponent } from '../types';

const UserContext = createContext<UserCotextValue>();

const fetchUser = async (userId?: number) => {
  return await new Promise<{ id: number; userName: string }>(
    (resolve, reject) => {
      setTimeout(() => {
        resolve({ id: 5, userName: 'JACK' });
        const ticket = localStorage.getItem(`USER_TICKET_KEY_${userId}`);
        if (!ticket) {
          reject(new Error('no sign in'));
        }
        const userInfoStr = localStorage.getItem(`USER_INFO_KEY_${userId}`);
        const userInfo = JSON.parse(userInfoStr ?? 'null');
        if (userInfo) {
          resolve(userInfo);
        }
        reject(new Error('no sign in'));
      }, 1000);
    }
  );
};

export const UserProvider: WithChildrenComponent<{ userId?: number }> = (
  props
) => {
  const localUserId = localStorage.getItem('userId');
  const [userId, setUserId] = createSignal(
    localUserId ? parseInt(localUserId) : 5
  );
  const [user, { mutate, refetch }] = createResource(userId, fetchUser, {
    initialValue: { id: -1, userName: 'User' },
  });

  createEffect(() => {
    if (props.userId) {
      setUserId(props.userId);
    }
  });

  const contextValue = [user, { setUserId, mutate, refetch }];

  return (
    <UserContext.Provider value={contextValue as UserCotextValue}>
      {user.error}
      {props.children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext<UserCotextValue | undefined>(UserContext);
  if (context) {
    return context;
  }
  throw new Error('use useUser inside UserProvider');
}
