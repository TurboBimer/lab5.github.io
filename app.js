const { useState, useEffect } = React;

const classNames = {
    TODO_ITEM: "todo-container",
    TODO_CHECKBOX: "todo-checkbox",
    TODO_TEXT: "todo-text",
    TODO_DELETE: "todo-delete",
}

const TodoEl = ({todo, onDeleteTodo, onCheckboxValueChange}) => {
    return (
        <li className={classNames.TODO_ITEM}>
            <input onClick={() => {onCheckboxValueChange(todo.id)}}
                   className={classNames.TODO_CHECKBOX}
                   type="checkbox"
                   defaultChecked={todo?.checked || undefined}
            />
            <label className={classNames.TODO_TEXT}>
                <span>{todo.value}</span>
            </label>
            <button
                className={classNames.TODO_DELETE}
                onClick={() => {onDeleteTodo(todo.id)}}>delete</button>
        </li>
    )
}

function App() {

    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos') || "[]"));

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    function addTodo() {
        const value = prompt('Enter task to do');
        const todo = { id: Date.now(), value, checked: false };
        setTodos([...todos, todo]);
    }

    function toggleTodo(key) {
        setTodos(todos.map(item => item.id === key ? {...item, checked: !item.checked} : item));
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function deleteTodo(key) {
        setTodos(todos.filter(item => item.id !== Number(key)));
    }

    return (
        <div className="container center">
            <h1 className="center title">My TODO App</h1>
            <div className="flow-right controls">
                <span>Item count: <span id="item-count">{todos.length}</span></span>
                <span>Unchecked count:
                    <span id="unchecked-count">
                        {todos.filter((item) => !item?.checked).length}
                    </span>
                </span>
            </div>
            <button className="button center" onClick={addTodo}>New TODO</button>
            <ul id="todo-list" className="todo-list">
                {todos.map(todo => <TodoEl
                    key={todo.id}
                    todo={todo}
                    onCheckboxValueChange={toggleTodo}
                    onDeleteTodo={deleteTodo}/>)}
            </ul>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);