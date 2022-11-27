import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sound from '../components/library/Sound';
import useSession, { getSession } from '../lib/session';
import { prisma } from '../lib/prisma';
import Search from '../components/library/Search';

export default function LibraryPage({ sounds, favoriteSounds }: any): JSX.Element {
  const { session, state } = useSession();
  const [ query, setQuery ] = useState<string>('');
  const [ filteredSounds, setFilteredSounds ] = useState([]);
  const router: NextRouter = useRouter();

  // @todo - if account was deleted from database, check and validate this cookie
  useEffect((): void => {
    if (!session.isLogged && state === 'loaded') {
      router.push('/login');
    }
  }, [ state ]);

  useEffect((): void => {
    setFilteredSounds(sounds.filter((sound: any) =>
      sound.name.toLowerCase().includes(query.toLowerCase()),
    ));
  }, [ query ]);

  return (
    <div className='flex h-screen'>
      <div className='w-[28rem] m-auto space-y-4'>
        <Search onchange={(event): void => setQuery(event.target.value)}/>
        {filteredSounds.map((sound: any): JSX.Element =>
          <Sound
            key={sound.name}
            id={sound.id}
            type={sound.type}
            name={sound.name}
            size={sound.size}
            downloads={sound.downloads}
            sessionUsername={session.username}
          />,
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
} | {
  props: {
      sounds: any;
      favoriteSounds?: undefined;
  };
}> = async (request: any): Promise<{
  props: {
      sounds: any;
      favoriteSounds: any;
  };
} | {
  props: {
      sounds: any;
      favoriteSounds?: undefined;
  };
}> => {
  const session = getSession(request);
  let favoriteSounds;

  const sounds = await prisma.sound.findMany({
    include: {
      accounts: true,
    },
  });
  if (session) {
    favoriteSounds = await prisma.account.findUnique({
      where: {
        username: session.username,
      },
      select: {
        favorites: true,
      },
    });
  }

  return session ? {
    props: {
      sounds,
      favoriteSounds,
    },
  } : {
    props: { sounds },
  };
};
