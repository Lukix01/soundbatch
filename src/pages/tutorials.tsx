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
        <iframe
          width='768'
          height='438'
          allowFullScreen
          src={selectedTutorial === 'Creating samples' ? 'https://www.youtube.com/embed/TOqfrLptxWU?autoplay=1' : 'https://www.youtube.com/embed/vaPtlPteQVg?autoplay=1'}
          className='border-8'
        />
      </div>
    </div>
  );
}
