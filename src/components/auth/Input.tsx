interface Props {
  name: string;
  type?: string;
}

export default function Input({ name, type }: Props): JSX.Element {
  return (
    <div>
      <div className="text-slate-900 mb-1">{name}</div>
      <input type={type} className="w-full py-1.5 border border-gray-300 focus:ring-2 ring-gray-500 ring-offset-2 px-3 rounded-lg outline-none"></input>
    </div>
  );
}
