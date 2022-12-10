import { ArchiveBoxIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import Button from './Button';

export default function Sidebar(): JSX.Element {
  return (
    <div className='flex mx-auto space-x-12'>
      <Button name='library' icon={<ArchiveBoxIcon/>} />
      <Button name='profile' icon={<UserIcon/>} />
      <Button name='settings' icon={<Cog6ToothIcon/>} />
    </div>
  );
}
