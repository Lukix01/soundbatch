import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Type } from '@prisma/client';
import { prisma } from '../lib/prisma';
import Sound from '../components/library/Sound';
import Search from '../components/library/Search';
import Filter from '../components/library/Filter';
import FilterMenu from '../components/library/filters/Menu';
import Layout from '../components/Layout';
import getSession from './api/getSession';

export default function LibraryPage({ session, soundTypes, sounds, favoriteSounds }: any): JSX.Element {
  const [ filteredSounds, setFilteredSounds ] = useState([]);
  const [ query, setQuery ] = useState<string>('');
  const [ filterMenu, setFilterMenu ] = useState<boolean>(false);

  const router: NextRouter = useRouter();

  useEffect((): void => {
    if (!session) {
      router.push('/login');
    }
  }, []);

  useEffect((): void => {
    setFilteredSounds(sounds.filter((sound: any) =>
      sound.name.toLowerCase().includes(query.toLowerCase()),
    ));
  }, [ query ]);

  return (
    <Layout>
      <div className='flex w-full space-x-2'>
        <Search onchange={(event): void => setQuery(event.target.value)}/>
        <Filter filterMenu={filterMenu} setFilterMenu={setFilterMenu} />
      </div>
      {filterMenu && (
        <FilterMenu soundTypes={soundTypes} />
      )}
      <div className='space-y-4 h-full overflow-auto'>
        {session && filteredSounds.map((sound: any): JSX.Element =>
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
    </Layout>
  );
}

export const getServerSideProps: (request: any) => Promise<{
  props: {
      session: any;
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
      session: any;
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
  const session = await getSession(request);
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
      session,
      soundTypes,
      sounds,
      favoriteSounds,
    },
  } : {
    props: { soundTypes, sounds },
  };
};
