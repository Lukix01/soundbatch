import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import Sound from '../components/library/Sound';
import useSession, { getSession } from '../lib/session';
import { prisma } from '../lib/prisma';

export default function LibraryPage({ sounds, favoriteSounds }: any): JSX.Element {
  const { session, state } = useSession();

  const router: NextRouter = useRouter();

  // @todo - if account was deleted from database, check and validate this cookie
  console.log(favoriteSounds);
  useEffect((): void => {
    if (!session.isLogged && state === 'loaded') {
      router.push('/login');
    }
  }, [ state ]);
  return (
    <div className='flex h-screen'>
      <div className='w-[28rem] m-auto space-y-4'>
        {sounds.map((sound: any): JSX.Element =>
          <Sound key={sound.name} id={sound.id} type={sound.type} name={sound.name} size={sound.size} downloads={sound.downloads} sessionUsername={session.username}/>,
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: (request: any) => Promise<{
  props: {
      sounds: any;
      favoriteSounds: any;
  };
}> = async (request: any): Promise<{
  props: {
      sounds: any;
      favoriteSounds: any;
  };
}> => {
  const session = getSession(request);

  const sounds = await prisma.sound.findMany();
  const favoriteSounds = await prisma.account.findUnique({
    where: {
      username: session.username,
    },
    include: {
      favorites: true,
    },
  });
  return {
    props: {
      sounds,
      favoriteSounds,
    },
  };
};
