interface Props {
  children: string;
}

export default function Header({ children }: Props): JSX.Element {
  return (
    <div className="font-bold text-xl">{children}</div>
  );
}
