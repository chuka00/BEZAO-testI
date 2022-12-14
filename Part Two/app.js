const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
    // To Prevent form from submitting
    event.preventDefault();
    // Create Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add Todo to local storage
    saveLocalTodos(todoInput.value);

    //Create check mark button
    const completedButton = document.createElement('button');
    completedButton.innerText = 'Completed';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
     //Create Delete button
     const trashButton = document.createElement('button');
     trashButton.innerText = 'Delete';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);
     
     //Append to todoList
     todoList.appendChild(todoDiv);

    //  clear todoInput value
    todoInput.value = "";

}

function deleteCheck(e){
    const item = e.target;
    // delete item
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
     // Animation for removal of tasks
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function (){
            todo.remove();
        });
    }

    //Check item
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";  
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}


function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

         // Create Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Create check mark button
    const completedButton = document.createElement('button');
    completedButton.innerText = 'Completed';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
     //Create Delete button
     const trashButton = document.createElement('button');
     trashButton.innerText = 'Delete';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);
     
     //Append to todoList
     todoList.appendChild(todoDiv);

    });
}