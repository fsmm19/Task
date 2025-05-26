let tasks = [];

const addTask = () => {
    const textInput = document.getElementById('task-input');
    const text = textInput.value.trim();

    if (text) {
        const task = {
            text: text,
            completed: false,
        };

        tasks.push(task);
        updateTaskList();
    }
    textInput.value = '';
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, taskIndex) => {
        const listItem = document.createElement('li');
        const checkClass = task.completed
            ? 'fa-regular fa-circle-check completed'
            : 'fa-regular fa-circle';

        listItem.setAttribute('class', 'todo__list-item');
        listItem.setAttribute('data-task-index', `${taskIndex}`);
        listItem.innerHTML = `
            <i class="${checkClass} todo__item-check"></i>
            <p class="todo__item-text ${
                task.completed ? 'completed' : ''
            }" contenteditable="false">${task.text}</p>
            <i class="fa-solid fa-xmark todo__item-delete"></i>
        `;
        taskList.append(listItem);
    });

    Array.from(document.getElementsByClassName('todo__item-check')).forEach(
        (icon) => {
            icon.addEventListener('click', checkTask);
        }
    );

    Array.from(document.getElementsByClassName('todo__item-delete')).forEach(
        (icon) => {
            icon.addEventListener('click', deleteTask);
        }
    );

    Array.from(document.getElementsByClassName('todo__item-text')).forEach(
        (task) => {
            task.addEventListener('click', (event) => {
                if (
                    event.target === event.currentTarget &&
                    !task.classList.contains('completed')
                ) {
                    task.setAttribute('contenteditable', 'true');
                    task.focus();
                }
            });

            task.addEventListener('blur', (event) => {
                task.setAttribute('contenteditable', 'false');
                editTask(event);
            });

            task.addEventListener('keydown', (event) => {
                if (event.code === 'Enter') {
                    event.preventDefault();
                    task.blur();
                }
            });
        }
    );
};

const checkTask = (event) => {
    const taskIndex =
        event.target.parentElement.getAttribute('data-task-index');
    const task = tasks[taskIndex];

    task.completed = !task.completed;
    updateTaskList();
};

const deleteTask = (event) => {
    const taskIndex =
        event.target.parentElement.getAttribute('data-task-index');

    tasks.splice(taskIndex, 1);
    updateTaskList();
};

const editTask = (event) => {
    const taskIndex =
        event.target.parentElement.getAttribute('data-task-index');
    const newText = event.target.textContent.trim();

    if (newText) {
        tasks[taskIndex].text = newText;
    } else {
        event.target.textContent = tasks[taskIndex].text;
    }
};

document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        addTask();
    }
});
