import { ArrowDownTrayIcon, CloudArrowDownIcon, StarIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

interface Props {
  id: number;
  type: string;
  name: string;
  extension: string;
  favorite?: boolean;
  size: string;
  downloads: number;
  sessionUsername: string;
  activeSound: any;
  setActiveSound: (sound: any) => void;
}

export default function Sound({
  id,
  type,
  name,
  extension,
  favorite,
  size,
  downloads,
  sessionUsername,
  activeSound,
  setActiveSound,
}: Props): JSX.Element {
  const [ isFavorite, setIsFavorite ] = useState(favorite);
  const [ sound ] = useState(typeof Audio !== 'undefined' && new Audio('sounds/' + type + '/' + name + extension));

  const router: NextRouter = useRouter();

  async function DownloadSound(): Promise<void> {
    await axios.put('/api/sounds', {
      name,
    });
  }

  async function AddToFavorites(): Promise<void> {
    if (sessionUsername) {
      try {
        await axios.post('/api/favorites', {
          id,
          sessionUsername,
        });
        setIsFavorite(true);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function RemoveFromFavorites(): Promise<void> {
    try {
      await axios.delete('/api/favorites', {
        data: {
          id,
          sessionUsername,
        },
      });
      if (router.pathname !== '/library') {
        router.reload();
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function PlaySound(): void {
    if (activeSound) {
      activeSound.currentTime = 0;
      activeSound.pause();
      setActiveSound(null);
    }

    if (activeSound !== sound) {
      setActiveSound(sound);
    }
  }

  useEffect((): void => {
    if (sound && sound === activeSound) {
      sound.play();
    }
  }, [ activeSound ]);

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
        <a onClick={DownloadSound} href={`/sounds/${type}/${name + extension}`} download className='w-6'>
          <CloudArrowDownIcon className='cursor-pointer hover:text-gray-500' />
        </a>
        <StarIcon onClick={!isFavorite ? AddToFavorites : RemoveFromFavorites} className={`cursor-pointer ${isFavorite && 'text-gray-500'} hover:text-gray-500`} />
        <SpeakerWaveIcon onClick={PlaySound} className='cursor-pointer hover:text-gray-500' />
      </div>
    </div>
  );
}
