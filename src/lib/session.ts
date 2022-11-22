import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function useSession(): {
  session: {
    isLogged: boolean;
    username: string;
    firstName: string;
    lastName: string;
  };
  state: string;
  } {
  const [ cookies ] = useCookies([ 'session' ]);
  const [ session, setSession ] = useState({ isLogged: false, username: '', firstName: '', lastName: '' });
  const [ state, setState ] = useState('loading');

  useEffect((): void => {
    if (cookies.session) {
      setSession({ isLogged: cookies.session && true, username: cookies.session.username,
        firstName: cookies.session.firstName,
        lastName: cookies.session.lastName,
      });
    }

    setState('loaded');
  }, []);

  return { session, state };
}

type Session = {
  isLogged: boolean;
  username: string;
  firstName: string;
  lastName: string;
};

export function getSession(request: any): Session {
  const cookie = request.req.cookies.session;
  let session;

  if (cookie) {
    session = JSON.parse(cookie);
  }

  return session;
}
