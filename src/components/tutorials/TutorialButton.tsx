interface Props {
  name: string;
  selectedTutorial: string;
  setSelectedTutorial: (name: string) => void;
}

export default function TutorialButton({ name, selectedTutorial, setSelectedTutorial }: Props): JSX.Element {
  return (
    <div
      onClick={(): void => setSelectedTutorial(name)}
      className={`${selectedTutorial === name ? 'text-2xl' : 'text-lg text-gray-400'} my-auto cursor-pointer hover:text-black transition-all`}>{name}</div>
  );
}
