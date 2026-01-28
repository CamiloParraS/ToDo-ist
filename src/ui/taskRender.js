export default function createTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  taskDiv.innerHTML = `
        <div class="task-checkbox" id="task-checkbox"></div>
        <div class="task-content">
            <div class="task-title">
              ${task.title}
              <span class="priority-label">${task.priority}</span>
            </div>
            <div class="task-description">
                <span>${task.description}</span>
            </div>
            <div class="task-meta">
                <span class="task-date">${task.dueFormatedDate}</span>
                <span class="task-project">${task.project}</span>
            </div>
        </div>
  `;

  const checkbox = taskDiv.querySelector(".task-checkbox");

  checkbox.addEventListener("click", () => {
    task.toggleStatus();
    const isCompleted = taskDiv.classList.toggle("completed", task.completed);
    checkbox.classList.toggle("completed", task.completed);
    console.log(task);
  });
  return taskDiv;
}
