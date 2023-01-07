interface Props {
  name: string;
  setActiveFilters: any;
  activeFilters: string[];
}

export default function Filter({ name, setActiveFilters, activeFilters }: Props): JSX.Element {
  function SelectFilter(): void {
    if (!activeFilters.includes(name)) {
      setActiveFilters([ ...activeFilters, name ]);
    } else {
      setActiveFilters(activeFilters.filter(filter => filter !== name));
    }
  }

  return (
    <div onClick={SelectFilter} className={`py-1 px-6 w-full flex rounded-full border hover:bg-white transition cursor-pointer ${activeFilters.includes(name) && 'bg-white'}`}>
      <div className='m-auto'>{name}</div>
    </div>
  );
}
