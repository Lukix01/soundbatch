import { Account } from '@prisma/client';
import { UserIcon } from '@heroicons/react/24/solid';
import { NextRouter, useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { prisma } from '../lib/prisma';
import { Session } from '../types';
import Layout from '../components/Layout';
import Sound from '../components/library/Sound';
import getSession from './api/getSession';

export default function ProfilePage({ favoriteSounds, account, session }: any): JSX.Element {
  const [ _, __, removeCookie ] = useCookies();

  const router: NextRouter = useRouter();

  function CheckFavoriteSound(id: number): true | undefined {
    for (const favoriteSound of favoriteSounds.favorites) {
      if (favoriteSound.soundId === id) {
        return true;
      }
    }
  }

  function Logout(): void {
    removeCookie('session');
    router.reload();
  }

  return (
    <Layout session={session}>
      <div>
        <div className='flex mx-auto w-max'>
          <UserIcon className='w-6 mr-2 text-gray-400' />
          <div className='text-2xl font-bold text-gray-500'>{account.firstName} {account.lastName} <span className='text-gray-400'>({account.username})</span></div>
        </div>
        {router.asPath.slice(1) === session?.username &&
        <input onClick={Logout} type='submit' className='flex mx-auto px-12 py-1 text-sm mt-2 rounded-lg border cursor-pointer hover:bg-white transition' value='Log out'/>
        }
      </div>
      <div className='h-0.5 bg-gray-200 my-6' />
      <div className='mb-1'>Favorite sounds</div>
      <div className='space-y-4 h-full overflow-auto'>
        {account.favorites.map((sound: any): JSX.Element =>
          <Sound
            key={sound.sound.id}
            id={sound.sound.id}
            type={sound.sound.type.name}
            name={sound.sound.name}
            extension={sound.sound.extension}
            favorite={session ? CheckFavoriteSound(sound.sound.id) : false}
            size={sound.sound.size}
            downloads={sound.sound.downloads}
            sessionUsername={session?.username}
          />,
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  let session: Session = await getSession(context);

  session = session || null;

  let favoriteSounds = [];

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

  const account: Account = await prisma.account.findUnique({
    where: {
      username: context.params.profile,
    },
    include: {
      favorites: {
        include: {
          sound: {
            include: {
              type: true,
            },
          },
        },
      },

    },
  });

  return account ? {
    props: {
      favoriteSounds,
      account,
      session,
    },
  } : {
    redirect: {
      destination: '/',
    },
  };
};
