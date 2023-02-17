interface Element {
  value: string;
}

interface Props {
  elements: Element[];
}

export default function List({ elements }: Props): JSX.Element {
  return (
    <ul className="list-disc">
      {elements.map((element: any): JSX.Element => (
        <li className="ml-6">{element.value}</li>
      ))}
    </ul>
  );
}
