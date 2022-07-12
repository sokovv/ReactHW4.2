import Result from "./Result";

export default function TrainingTable({training, onEdit, onDelete}) {

    training.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="TrainingTable">
      <div className="tableHead">
        <div>Дата(ДД.ММ.ГГ)</div>
        <div>Пройдено км</div>
        <div>Действие</div>
      </div>
      <ul className="tableBody">
        {training.map((item =>
          <Result key={item.id} item={item} onEdit={onEdit} onDelete={onDelete}/>
        ))}
      </ul>
    </div>
  );
}
