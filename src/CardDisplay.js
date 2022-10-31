import Card from "./Card";

export default function CardDisplay({ cards }) {
  return (
    <div className="card-display">
      {cards.map(value => <Card value={value} key={"card-" + value}/>)}
    </div>
  );
}
