import { useState } from "react";

function Input({todo, setTodo}){

  function handleChange(e) {
    const {value} = e.target;
    setTodo(prev => {
      return {...prev, text: value}
    })
  }

    return <input
          type="text"
          className="input"
          onChange={handleChange}
          value={todo.text}
        />
}

export default Input;