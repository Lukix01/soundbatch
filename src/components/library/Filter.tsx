interface Props {
  filterMenu: boolean;
  setFilterMenu: (filterMenu: boolean) => void;
}

export default function Filter({ filterMenu, setFilterMenu }: Props): JSX.Element {
  return (
    <div onClick={(): void => setFilterMenu(!filterMenu)} className="bg-white py-3 px-8 rounded-lg border cursor-pointer ">
      <div>Filter</div>
    </div>
  );
}
