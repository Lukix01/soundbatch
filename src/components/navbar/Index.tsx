import { HomeIcon, ArchiveBoxIcon, UserIcon } from '@heroicons/react/24/solid';
import { NextRouter, useRouter } from 'next/router';
import { Session } from '../../types';
import Button from './Button';

interface Props {
  session?: Session;
}

export default function Navbar({ session }: Props): JSX.Element {
  const router: NextRouter = useRouter();

  return (
    <div className='flex mx-auto space-x-12'>
      <Button name="/" icon={<HomeIcon />} />
      <Button name='library' icon={<ArchiveBoxIcon/>} />
      <Button name={session ? session.username : ''} icon={<UserIcon/>} path={(): Promise<boolean> => router.push(session ? session.username : '/login')} />
    </div>
  );
}
