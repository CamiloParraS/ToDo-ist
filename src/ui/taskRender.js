export default function createTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const checkbox = document.createElement("div");
  checkbox.className = "task-checkbox";
  checkbox.id = "task-checkbox";

  const taskContent = document.createElement("div");
  taskContent.className = "task-content";

  const taskTitle = document.createElement("div");
  taskTitle.className = "task-title";
  taskTitle.textContent = `${task.title} `;

  const priorityLabel = document.createElement("span");
  priorityLabel.className = "priority-label";
  priorityLabel.textContent = task.priority;
  taskTitle.appendChild(priorityLabel);

  const taskDescription = document.createElement("div");
  taskDescription.className = "task-description";
  const descSpan = document.createElement("span");
  descSpan.textContent = task.description;
  taskDescription.appendChild(descSpan);

  const taskMeta = document.createElement("div");
  taskMeta.className = "task-meta";

  const taskDate = document.createElement("span");
  taskDate.className = "task-date";
  taskDate.textContent = task.dueFormatedDate;

  const taskProject = document.createElement("span");
  taskProject.className = "task-project";
  taskProject.textContent = task.project;

  taskMeta.append(taskDate, taskProject);

  taskContent.append(taskTitle, taskDescription, taskMeta);

  taskDiv.append(checkbox, taskContent);

  checkbox.addEventListener("click", () => {
    task.toggleStatus();
    taskDiv.classList.toggle("completed", task.completed);
    checkbox.classList.toggle("completed", task.completed);
    console.log(task);
  });

  return taskDiv;
}
