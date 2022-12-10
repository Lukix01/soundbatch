import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  name: string;
  icon: JSX.Element;
  path?: () => void;
}

export default function Button({ name, icon, path }: Props): JSX.Element {
  const [ active, setActive ] = useState(false);
  const router: NextRouter = useRouter();

  useEffect((): void => {
    if (router.asPath.slice(1) === name) {
      setActive(true);
    }
  }, []);

  return (
    <div
      onClick={path ? path : (): Promise<boolean> => router.push('/' + name)}
      className={`w-6 hover:text-gray-500 ${active ? 'text-gray-500' : 'text-gray-400'} cursor-pointer`}
    >
      {icon}
    </div>
  );
}

