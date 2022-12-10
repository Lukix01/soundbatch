import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  name: string;
  icon: JSX.Element;
}

export default function Button({ name, icon }: Props): JSX.Element {
  const [ active, setActive ] = useState(false);
  const router: NextRouter = useRouter();

  useEffect((): void => {
    if (router.pathname.slice(1) === name) {
      setActive(true);
    }
  }, []);

  return (
    <div onClick={(): Promise<boolean> => router.push(name)} className={`w-6 hover:text-gray-500 ${active ? 'text-gray-500' : 'text-gray-400'} cursor-pointer`}>
      {icon}
    </div>
  );
}

