import { Account } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { Session } from '../types';
import Layout from '../components/Layout';
import Sound from '../components/library/Sound';
import getSession from './api/getSession';

export default function ProfilePage({ account, session }: any): JSX.Element {
  return (
    <Layout session={session}>
      <div className='h-full'>
        <div className='text-center'>
          <div className='text-xl'>{account.firstName} {account.lastName}</div>
          <div className='text-lg'>{account.username}</div>
        </div>
        <div className='mt-4 space-y-4'>
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
