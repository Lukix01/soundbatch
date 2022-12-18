import { Account } from '@prisma/client';
import { UserIcon } from '@heroicons/react/24/solid';
import { prisma } from '../lib/prisma';
import { Session } from '../types';
import Layout from '../components/Layout';
import Sound from '../components/library/Sound';
import getSession from './api/getSession';

export default function ProfilePage({ account, session }: any): JSX.Element {
  return (
    <Layout session={session}>
      <div>
        <div className='flex mx-auto w-max'>
          <UserIcon className='w-6 mr-2 text-gray-400' />
          <div className='text-2xl font-bold text-gray-500'>{account.firstName} {account.lastName}</div>
        </div>
        <div className='mx-auto w-max text-gray-400'>{account.username}</div>
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
            size={sound.sound.size}
            downloads={sound.sound.downloads}
            sessionUsername={session.username}
          />,
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
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

  let session: Session = await getSession(context);

  session = session || null;

  return account ? {
    props: {
      account,
      session,
    },
  } : {
    redirect: {
      destination: '/',
    },
  };
};
