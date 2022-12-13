import { NextRouter, useRouter } from 'next/router';

interface Props {
  name: string;
  icon: JSX.Element;
  href: string;
  focused?: boolean;
}

export default function Button({ name, icon, href, focused }: Props): JSX.Element {
  const router: NextRouter = useRouter();
  return (
    <div
      onClick={(): Promise<boolean> => router.push(href)}
      className={`border py-2 px-6 rounded-lg border-white border-opacity-50 cursor-pointer group hover:bg-white hover:text-black transition ${focused && 'bg-white text-black hover:text-white hover:bg-transparent'}`}
    >
      <div className='flex space-x-1'>
        <div className='ml-2 m-auto hover'>{name}</div>
        <div className='w-4 m-auto group-hover:translate-x-2 transition'>{icon}</div>
      </div>
    </div>
  );
}
