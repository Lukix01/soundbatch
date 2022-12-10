import Navbar from './navbar/Index';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <div className='flex h-screen'>
      <div className='w-[28rem] space-y-4 m-auto h-3/4 flex flex-col'>
        {children}
        <Navbar />
      </div>
    </div>
  );
}
