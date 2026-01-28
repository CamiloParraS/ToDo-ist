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
            <div class="task-meta">
                <span class="task-time">${task.description}</span>
            </div>
            <div class="task-meta">
                <span class="task-time">${task.dueFormatedDate}</span>
                <span class="">${task.project}</span>
            </div>
        </div>
  `;

  const checkbox = taskDiv.querySelector(".task-checkbox");

  checkbox.addEventListener("click", () => {
    task.toggleStatus();
    console.log(task);
  });
  return taskDiv;
}
