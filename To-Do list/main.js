
    const input = document.querySelector('input');
    const addBtn = document.querySelector('.task > button');
    const remTaskList = document.querySelector('.Remtask');
    const completedTaskList = document.querySelector('.comptask');

    addBtn.addEventListener('click', addTask);

    function addTask(e) {
        const newTask = input.value.trim();
        if (newTask !== '') {
            const newLi = document.createElement('li');
            const checkBtn = document.createElement('button');
            const delBtn = document.createElement('button');
            const timestamp = document.createElement('span');

            checkBtn.innerHTML = '<i class="fa fa-check"></i>';
            delBtn.innerHTML = '<i class="fa fa-trash"></i>';

            const timestampText = getFormattedTimestamp();
            newLi.textContent = newTask;
            timestamp.textContent = ` (Added on ${timestampText})`;
            timestamp.classList.add('timestamp');
            newLi.appendChild(checkBtn);
            newLi.appendChild(delBtn);
            newLi.appendChild(timestamp);

            remTaskList.appendChild(newLi);
            input.value = '';

            save();
        }
    }

    document.addEventListener('click', function (e) {
        if (e.target.tagName === 'I' && e.target.classList.contains('fa-check')) {
            const taskItem = e.target.parentNode.parentNode;
            const checkBtn = e.target.parentNode;
            const timestamp = document.createElement('span');
            const timestampText = getFormattedTimestamp();
            timestamp.textContent = `   (Completed on ${timestampText})`;
            timestamp.classList.add('timestamp');
            taskItem.removeChild(checkBtn);
            taskItem.appendChild(timestamp);
            completedTaskList.appendChild(taskItem);
        } else if (e.target.tagName === 'I' && e.target.classList.contains('fa-trash')) {
            const taskItem = e.target.parentNode.parentNode;
            const timestamp = document.createElement('span');
            const timestampText = getFormattedTimestamp();
            timestamp.textContent = ` (Removed on ${timestampText})`;
            timestamp.classList.add('timestamp');
            taskItem.parentNode.removeChild(taskItem);
        }

        save();
    });

    function save() {
        const tasks = {
            Remtask: remTaskList.innerHTML,
            comptask: completedTaskList.innerHTML
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            remTaskList.innerHTML = savedTasks.Remtask;
            completedTaskList.innerHTML = savedTasks.comptask;
        }
    }

    function getFormattedTimestamp() {
        const now = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return now.toLocaleDateString(undefined, options);
    }

    loadTasks();

