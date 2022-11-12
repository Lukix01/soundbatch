import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import useSession from '../lib/session';

export default function Home(): JSX.Element {
  const { session, state } = useSession();
  const router: NextRouter = useRouter();

  useEffect((): void => {
    if (!session.isLogged && state === 'loaded') {
      router.push('/login');
    }
  }, [ state ]);

  return (
    <div>
      <h1 className="text-4xl text-center">Hello {session.username}</h1>
    </div>
  );
}
