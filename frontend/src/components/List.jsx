import { useState } from "react";
import Button from "./Button";

function List({ item, onDelete, onEdit, onClick }) {
  const [isClick, setIsClick] = useState(item.isDone);

  return (
    <div className="list">
      <li
        className="list-item"
        onClick={() => {
          onClick(item.id, !isClick)
          setIsClick(!isClick);
        }}
        style={{ textDecoration: isClick && "line-through" }}
      >
        {item.text}
      </li>
      <div className="flex ">
        <button
          onClick={() => {
            onDelete(item.id);
          }}
        >
          <img src="/delete.svg" alt="delete button" />
        </button>
        <button
          onClick={() => {
            onEdit(item.id);
          }}
        >
          <img src="/edit.svg" alt="edit button" />
        </button>
      </div>
    </div>
  );
}

export default List;
