import { useState } from 'react';
import TutorialButton from '../components/tutorials/TutorialButton';

export default function TutorialsPage(): JSX.Element {
  const [ selectedTutorial, setSelectedTutorial ] = useState('Creating samples');

  return (
    <div className='flex h-screen'>
      <div className='z-10 m-auto'>
        <div className='flex mx-auto w-max space-x-4 mb-4'>
          <TutorialButton name='Creating samples' selectedTutorial={selectedTutorial} setSelectedTutorial={setSelectedTutorial} />
          <TutorialButton name='Making beat' selectedTutorial={selectedTutorial} setSelectedTutorial={setSelectedTutorial} />
        </div>
        <video key={selectedTutorial} controls width={800} className='border-8' >
          <source src={selectedTutorial === 'Creating samples' ? '/tutorials/creating_samples_tutorial.mov' : '/tutorials/making_beat_tutorial.mov'} />
        </video>
      </div>
    </div>
  );
}
