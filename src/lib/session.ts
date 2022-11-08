import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function useSession(): { session: { isLogged: boolean; username: string; firstName: string; lastName: string }} {
  const [ cookies, setCookie ] = useCookies([ 'session' ]);
  const [ session, setSession ] = useState({ isLogged: false, username: '', firstName: '', lastName: '' });

  useEffect((): void => {
    try {
      setSession({ isLogged: cookies.session && true, username: cookies.session.username,
        firstName: cookies.session.firstName,
        lastName: cookies.session.lastName,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return { session };
}
