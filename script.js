const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskButton");
const list = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");
const themeBtn = document.getElementById("toggleTheme");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* LOAD TASKS */
window.addEventListener("load", renderTasks);

/* ADD TASK */
button.addEventListener("click", addTask);

/* ENTER KEY */
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

/* DARK MODE */
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "Light Mode";
    } else {
        themeBtn.textContent = "Dark Mode";
    }
});

/* ADD TASK FUNCTION */
function addTask() {
    const text = input.value.trim();
    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    input.value = "";
    renderTasks();
}

/* RENDER */
function renderTasks() {
    list.innerHTML = "";

    emptyMsg.style.display = tasks.length === 0 ? "block" : "none";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

        delBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);

        list.appendChild(li);
    });
}

/* SAVE */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}