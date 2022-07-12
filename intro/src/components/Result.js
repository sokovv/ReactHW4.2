import 'material-icons/iconfont/material-icons.css';

export default function Result({ item, onEdit, onDelete }) {
    return (
      <li className="tableItem">
        <div>{item.date.toLocaleDateString()}</div>
        <div>{+item.passed.toFixed(2)}</div>
        <div>
          <i className="material-icons" onClick={onEdit(item.id)}>edit</i>
          <i className="material-icons" onClick={onDelete(item.id)}>delete</i>
        </div>
      </li>
    );
  }