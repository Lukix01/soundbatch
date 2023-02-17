export default function Header(props: React.PropsWithChildren): JSX.Element {
  return (
    <div className="font-bold text-xl">{props.children}</div>
  );
}
