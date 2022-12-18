import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Button from '../components/home/Button';

export default function HomePage(): JSX.Element {
  return (
    <div className='flex h-screen'>
      <div className='m-auto z-10 text-white flex flex-col'>
        <div className='text-5xl text-center font-bold'>SoundBatch</div>
        <div className='text-white text-xl text-opacity-50 mt-1'>Free to use library with samples to make good music</div>
        <div className='mt-6 flex mx-auto space-x-4'>
          <Button name='Get started' icon={<ArrowRightIcon/>} href='library' focused/>
          <Button name='Creating samples' icon={<ArrowRightIcon/>} href='tutorial'/>
        </div>
      </div>
      <div className='bg-black absolute w-screen h-screen'/>
      <Image src='/background.jpeg' layout='fill' className='brightness-50 blur-sm'/>
    </div>
  );
}
