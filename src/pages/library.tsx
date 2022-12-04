import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Type } from '@prisma/client';
import Sound from '../components/library/Sound';
import useSession, { getSession } from '../lib/session';
import { prisma } from '../lib/prisma';
import Search from '../components/library/Search';
import Filter from '../components/library/Filter';
import FilterMenu from '../components/library/filters/Menu';

export default function LibraryPage({ soundTypes, sounds, favoriteSounds }: any): JSX.Element {
  const { session, state } = useSession();
  const [ filteredSounds, setFilteredSounds ] = useState([]);

  const [ query, setQuery ] = useState<string>('');
  const [ filterMenu, setFilterMenu ] = useState<boolean>(false);

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
      <div className='w-[28rem] m-auto space-y-4 h-2/3'>
        <div className='flex w-full space-x-2'>
          <Search onchange={(event): void => setQuery(event.target.value)}/>
          <Filter filterMenu={filterMenu} setFilterMenu={setFilterMenu} />
        </div>
        {filterMenu && (
          <FilterMenu soundTypes={soundTypes} />
        )}
        <div className='space-y-4 h-full overflow-auto'>
          {filteredSounds.map((sound: any): JSX.Element =>
            <Sound
              key={sound.name}
              id={sound.id}
              type={sound.type.name}
              name={sound.name}
              extension={sound.extension}
              size={sound.size}
              downloads={sound.downloads}
              sessionUsername={session.username}
            />,
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: (request: any) => Promise<{
  props: {
      soundTypes: Type[];
      sounds: any;
      favoriteSounds: any;
  };
} | {
  props: {
      soundTypes: Type[];
      sounds: any;
      favoriteSounds?: undefined;
  };
}> = async (request: any): Promise<{
  props: {
      soundTypes: Type[];
      sounds: any;
      favoriteSounds: any;
  };
} | {
  props: {
      soundTypes: Type[];
      sounds: any;
      favoriteSounds?: undefined;
  };
}> => {
  const session = getSession(request);
  let favoriteSounds;

  const soundTypes = await prisma.type.findMany();

  const sounds = await prisma.sound.findMany({
    include: {
      accounts: true,
      type: true,
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
      soundTypes,
      sounds,
      favoriteSounds,
    },
  } : {
    props: { soundTypes, sounds },
  };
};
