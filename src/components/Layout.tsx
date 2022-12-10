import { Session } from '../types';
import Navbar from './navbar/Index';

interface Props {
  children: React.ReactNode;
  session?: Session;
}

export default function Layout({ children, session }: Props): JSX.Element {
  return (
    <div className='flex h-screen'>
      <div className='w-[28rem] space-y-4 m-auto h-3/4 flex flex-col'>
        {children}
        <Navbar session={session} />
      </div>
    </div>
  );
}
