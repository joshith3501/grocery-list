
const tasks = [];



let submitElement = document.querySelector('.grocery-submit');
let allTasks = document.querySelectorAll('.task');
let editTask = document.querySelectorAll('.edit-button');
// let checkTask = document.querySelectorAll('.check-button');
let deleteTask = document.querySelectorAll('.delete-button');


updateList();




function flashMessage(message, type) {
    let flashElement = document.querySelector('.flash-message');
    if(type === 'danger') {
        flashElement.innerHTML = `${message}`;
        flashElement.classList.add('danger');
        setTimeout(() => {flashElement.classList.remove('danger');flashElement.innerHTML= '';}, 1000);
    }if(type === 'success') {
        flashElement.innerHTML = `${message}`;
        flashElement.classList.add('success');
        setTimeout(() => {flashElement.classList.remove('success');flashElement.innerHTML= '';}, 1000);
    }
}


function addingTask() {
    const taskInput = document.querySelector('.grocery-input');
    const name = taskInput.value;

    if(name){
        tasks.push(name);
        flashMessage('Task added successfully', 'success');
    }
    else 
    {
        flashMessage('Please enter a task', 'danger');
    }   

    taskInput.value = '';
    updateList();
}

function editingTask(task, index) {
    
    const input = document.querySelector('.grocery-input');
    const editElement = document.querySelector('.grocery-edit');
    
    input.value = tasks[index];
    submitElement.removeEventListener('click', addingTask);
    editElement.innerHTML = 'Edit';

    function handleEditClick() {
        if (input.value.trim() !== '') {
        tasks[index] = input.value;
        updateList();
        editElement.innerHTML = 'Submit';
        editElement.removeEventListener('click', handleEditClick); 
        submitElement.addEventListener('click', addingTask); 
        } else {
        flashMessage('Please enter a task', 'danger');
        }
    }

    editElement.addEventListener('click', handleEditClick);

}

function updateList() {
    let str = '';
    tasks.forEach(function(task) {
        str += `<div class="task">
            <div class='task-description'>${task}</div>
            <div class='task-actions'>
                <i class="fa-solid fa-pen-to-square edit-button"></i>
                <i class="fa-solid fa-trash delete-button"></i>
            </div>
            </div>`;
    })
    let htmlElement = document.querySelector('.task-container');
    htmlElement.innerHTML = str;
    allTasks = document.querySelectorAll('.task');  
    editTask = document.querySelectorAll('.edit-button');
    // checkTask = document.querySelectorAll('.check-button');
    deleteTask = document.querySelectorAll('.delete-button');


    console.log(tasks);
    
    deleteTask.forEach((task, index) => {
        task.addEventListener('click', () => {
            tasks.splice(index, 1);
            updateList();
        });
    });

    // checkTask.forEach(function(task, index) { 
    //     task.addEventListener('click', () => {
    //         allTasks[index].classList.add('checked');
    //     });
    // });

    editTask.forEach(function(task, index) {
        task.removeEventListener('click', editingTask);
        task.addEventListener('click',() => {
            editingTask(task, index);
        });
    });
}

submitElement.addEventListener('click', addingTask);


