import { ArrowDownTrayIcon, CloudArrowDownIcon, StarIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

interface Props {
  id: number;
  type: string;
  name: string;
  favorite?: boolean;
  size: string;
  downloads: number;
  sessionUsername: string;
}

export default function Sound({ id, type, name, favorite, size, downloads, sessionUsername }: Props): JSX.Element {
  // @todo - show favorite
  async function AddToFavorites(): Promise<void> {
    try {
      const response = await axios.post('/api/favorites', {
        id,
        sessionUsername,
        name,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white px-6 py-4 rounded-xl border flex">
      <div>
        <div className="text-slate-900 text-lg w-max">{name}</div>
        <div className="flex space-x-1 text-sm text-gray-400 -mt-1 w-max">
          <div>{type}</div>
          <div className="w-0.5 h-0.5 rounded-full bg-gray-400 m-auto" />
          <div>{size}</div>
          <div className="w-0.5 h-0.5 rounded-full bg-gray-400 m-auto" />
          <div className='flex'>
            <ArrowDownTrayIcon className='w-4 mr-1'/>
            <div>{downloads}</div>
          </div>
        </div>
      </div>
      <div className='flex w-full h-6 my-auto text-gray-400 justify-end space-x-2'>
        <CloudArrowDownIcon className='cursor-pointer hover:text-gray-500' />
        <StarIcon onClick={AddToFavorites} className={`cursor-pointer ${favorite && 'text-gray-500'} hover:text-gray-500`} />
        <SpeakerWaveIcon className='cursor-pointer hover:text-gray-500' />
      </div>
    </div>
  );
}
