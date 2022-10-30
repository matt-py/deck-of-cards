import Card from "./Card";

export default function CardDisplay({ cards }) {
  return (
    <div>
      {cards.map(value => <Card value={value} key={"card-" + value}/>)}
    </div>
  );
}
