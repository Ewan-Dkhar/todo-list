import { useState, useEffect, use } from "react";
import Button from "./Button";
import Input from "./Input";
import List from "./List";
import { v4 as uuidv4 } from "uuid";
import { addItem, deleteItem, getItems, editItem } from "../services";

function ToDolist() {
  const [items, setItems] = useState([]);
  const [todo, setTodo] = useState({text: '', id : uuidv4(), isDone: false});

  useEffect(() => {
        const loadItems = async () => {
            const result = await getItems();
            setItems(result);
        }

        loadItems()
    }, []);

  const handleAdd = async () => {
    setItems((prevItems) => {
        return [...prevItems, todo];
    });
    await addItem(todo);
    setTodo({text: '', id : uuidv4(), isDone: false});
  };

  const handleEdit = (id) => {
    let [item] = items.filter(element => {
      return id === element.id;
    })
    setTodo(item);
    handleDelete(id);
  }

  const editIsDone = (id, isDone) => {
    editItem(id, isDone);
  }

  const handleDelete = async (id) => {
    setItems((prevItems) => {
        return prevItems.filter((item, index) => {
            return id !== item.id;
        });
    });
    await deleteItem(id);
  };

  return (
    <div className="todo-box">
      <h1>To-do list</h1>
      <div className="input-box">
        <Input todo={todo} setTodo={setTodo} />
        <Button action="Add" onClick={handleAdd} />
      </div>
      <ul className="lists">
        {items.map((item) => (
          <List key={item.id} item={item} onDelete={handleDelete} onEdit={handleEdit} onClick={editIsDone} />
        ))}
      </ul>
    </div>
  );
}

export default ToDolist;
