document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('add-task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task.text, task.completed));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Create a new task element
    const createTaskElement = (taskText, isCompleted) => {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const completeButton = document.createElement('button');
        completeButton.className = 'complete-btn';
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completeButton.setAttribute('aria-label', 'Complete Task');
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.setAttribute('aria-label', 'Delete Task');
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        if (isCompleted) {
            li.classList.add('completed');
        }

        taskActions.appendChild(completeButton);
        taskActions.appendChild(deleteButton);
        li.appendChild(taskActions);
        taskList.appendChild(li);
    };

    // Handle form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTaskText = taskInput.value.trim();
        if (newTaskText !== '') {
            createTaskElement(newTaskText, false);
            saveTasks();
            taskInput.value = '';
        }
    });

    loadTasks();
});