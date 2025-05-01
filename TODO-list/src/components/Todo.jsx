import { use } from 'react';
import './Todo.css'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Todo() {
    const [Todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    function add() {
        const newTodo = { text: inputValue, completed: false };
        setTodos(Todos.concat(newTodo));
        setInputValue('');
    }

    function toggleCompleted(index) {
        const newTodos = Todos.slice();
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    function clearCompleted() {
        const activeTodos = Todos.filter(todo => !todo.completed);
        setTodos(activeTodos);
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    useEffect(()=> {
        const todo = localStorage.getItem('todo-list');
        if (todo) {
             setTodos(JSON.parse(todo));
        }
    }, []);

    useEffect(() => {
        if (Todos.length > 0) {
            localStorage.setItem('todo-list', JSON.stringify(Todos));
        }
    }, [Todos]);

    return (
        <div className="todo-container">
            <h1>Todo App</h1>
            <div className="todo-input">
                <input 
                    type="text" 
                    placeholder="Add a new todo" 
                    value={inputValue} 
                    onChange={handleInputChange} 
                />
                <button onClick={add}>Add</button>
                <button onClick={clearCompleted}>Clear Completed</button>
            </div>
            <ul>
                {Todos.map((todo, index) => (
                    <li key={index}>
                        <input 
                            type="checkbox" 
                            checked={todo.completed} 
                            onChange={() => toggleCompleted(index)} 
                        />
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

