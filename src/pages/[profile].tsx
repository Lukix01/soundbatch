import { prisma } from '../lib/prisma';
import { Session } from '../types';
import Layout from '../components/Layout';
import getSession from './api/getSession';

export default function ProfilePage({ account, session }: any): JSX.Element {
  return (
    <Layout session={session}>
      <div className='h-full'>
        <div className='text-center'>
          <div className='text-xl'>{account.firstName} {account.lastName}</div>
          <div className='text-lg'>{account.username}</div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: (context: any) => Promise<{
  props: {
      account: any;
      session: Session;
  };
  redirect?: undefined;
} | {
  redirect: {
      destination: string;
  };
  props?: undefined;
}> = async (context: any): Promise<{
  props: {
      account: any;
      session: Session;
  };
  redirect?: undefined;
} | {
  redirect: {
      destination: string;
  };
  props?: undefined;
}> => {
  const account = await prisma.account.findUnique({
    where: {
      username: context.params.profile,
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
