import {
  createSignal,
  createContext,
  useContext,
  createResource,
  createEffect,
  createMemo
} from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { UserCotextValue, WithChildrenComponent } from '../types';

const UserContext = createContext<UserCotextValue>();

const fetchUser = async (userId?: number) => {
  return await new Promise<{ id: number; userName: string }>(
    (resolve, reject) => {
      setTimeout(() => {
        console.log(userId, 'useId');
        if (userId == null) {
          reject(new Error('no sign in'));
        }
        resolve({ id: 1, userName: 'Jack' });
      }, 1000);
    }
  );
};

export const UserProvider: WithChildrenComponent<{ userId?: number }> = (
  props
) => {
  const navigate = useNavigate();
  const localUserId = localStorage.getItem('userId');
  const [userId, setUserId] = createSignal(
    localUserId ? parseInt(localUserId) : 5
  );
  const [user, { mutate, refetch }] = createResource(userId, fetchUser);

  createEffect(() => {
    if (user.error) {
      navigate('./login', { replace: true });
    }
  });

  createEffect(() => {
    if (props.userId) {
      setUserId(props.userId);
    }
  });

  const contextValue = createMemo(() => ({
    user,
    setUserId,
    mutate,
    refetch
  }));

  return (
    <UserContext.Provider value={contextValue}>
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
