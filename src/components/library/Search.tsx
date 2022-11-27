import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface Props {
  onchange: (event: any) => void;
}

export default function Search({ onchange }: Props): JSX.Element {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className='w-5 absolute left-3 top-1/2 -translate-y-1/2'/>
      <input onChange={onchange} placeholder="Search for sounds.." className="w-full px-9 py-3 border rounded-lg outline-none focus:ring-2 ring-gray-500 ring-offset-2" />
    </div>
  );
}
