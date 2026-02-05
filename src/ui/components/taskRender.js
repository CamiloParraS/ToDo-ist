import appLogicInstance from "../../logic/applogic";

export default function createTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const checkboxContainer = document.createElement("label");
  checkboxContainer.className = "task-checkbox-container";

  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.checked = task.completed;

  const checkmark = document.createElement("div");
  checkmark.className = "checkmark";

  checkboxContainer.append(checkboxInput, checkmark);

  const taskContent = document.createElement("div");
  taskContent.className = "task-content";

  const taskTitle = document.createElement("div");
  taskTitle.className = "task-title";
  taskTitle.textContent = `${task.title} `;

  const priorityLabel = document.createElement("span");
  const priorities = [
    { value: "1", label: "High" },
    { value: "2", label: "Medium" },
    { value: "3", label: "Low" },
  ];
  const priorityValue = priorities.find(
    (p) => p.value === String(task.priority),
  );
  priorityLabel.className = `priority-label priority-${task.priority}`;
  priorityLabel.textContent = priorityValue.label;

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

  taskProject.textContent = appLogicInstance.getProject(task.project).name;

  taskMeta.append(taskDate, priorityLabel, taskProject);

  taskContent.append(taskTitle, taskDescription, taskMeta);

  taskDiv.append(checkboxContainer, taskContent);

  if (task.completed) {
    taskDiv.classList.add("completed");
  }

  checkboxInput.addEventListener("change", () => {
    task.toggleComplete();
    taskDiv.classList.toggle("completed", task.completed);
    checkboxInput.checked = task.completed;
    console.log(task);
  });

  return taskDiv;
}
