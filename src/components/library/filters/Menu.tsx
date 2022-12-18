import { Type } from '@prisma/client';
import Filter from './Filter';

interface Props {
  soundTypes: Type[];
}

export default function FilterMenu({ soundTypes }: Props): JSX.Element {
  return (
    <div>
      <div className='grid grid-cols-3 gap-2'>
        {soundTypes.map((type: any): JSX.Element => (
          <Filter key={type.id} name={type.name}/>
        ))}
      </div>
    </div>
  );
}

