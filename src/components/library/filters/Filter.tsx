interface Props {
  name: string;
}

export default function Filter({ name }: Props): JSX.Element {
  return (
    <div className="py-1 px-6 w-full flex rounded-full border hover:bg-white transition cursor-pointer">
      <div className="m-auto">{name}</div>
    </div>
  );
}
