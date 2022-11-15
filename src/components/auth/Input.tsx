interface Props {
  name: string;
  type?: string;
  value?: any;
  onchange?: any;
}

export default function Input({ name, type, value, onchange }: Props): JSX.Element {
  return (
    <div>
      <div className="text-slate-900 mb-1">{name}</div>
      <input required value={value} onChange={onchange} type={type} className="w-full py-1.5 border border-gray-300 focus:ring-2 ring-gray-500 ring-offset-2 px-3 rounded-lg outline-none"></input>
    </div>
  );
}
