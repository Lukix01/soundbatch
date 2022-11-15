import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import Sound from '../components/library/Sound';
import useSession from '../lib/session';
import { prisma } from '../lib/prisma';

export default function LibraryPage({ sounds }: any): JSX.Element {
  const { session, state } = useSession();

  const router: NextRouter = useRouter();

  useEffect((): void => {
    if (!session.isLogged && state === 'loaded') {
      router.push('/login');
    }
  }, [ state ]);

  return (
    <div className='flex h-screen'>
      <div className='w-96 m-auto space-y-4'>
        {sounds.map((sound: any): JSX.Element =>
          <Sound key={sound.name}type={sound.type} name={sound.name} size={sound.size} downloads={sound.downloads} />,
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: () => Promise<{ props: {
      sounds: any;
  };
}> = async (): Promise<{props: {
  sounds: any;
  };
}> => {
  const sounds = await prisma.sound.findMany();
  return {
    props: {
      sounds,
    },
  };
};
