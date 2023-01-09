export default function SamplesTutorialPage(): JSX.Element {
  return (
    <div className='flex h-screen'>
      <div className='z-10 m-auto '>
        <video controls width={1000} >
          <source src='/creating_samples_tutorial.mov' />
        </video>
      </div>
    </div>
  );
}
