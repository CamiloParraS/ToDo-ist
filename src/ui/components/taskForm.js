import appLogicInstance from "../../logic/applogic";

export default function createTaskForm(onSubmit, onCancel) {
  const formDiv = document.createElement("div");
  formDiv.className = "task-form";

  // New Form Header
  const formHeader = document.createElement("div");
  formHeader.className = "task-form-header";
  formHeader.textContent = "New Task";

  // Title Input
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "task-form-title";
  titleInput.placeholder = "Task title...";

  // Description Input
  const descInput = document.createElement("textarea");
  descInput.className = "task-form-description";
  descInput.placeholder = "Description (optional)...";
  descInput.rows = 2;

  // --- Option Row ---
  const optionsRow = document.createElement("div");
  optionsRow.className = "task-form-options";

  const selectRow = document.createElement("div");
  selectRow.className = "og-form-options";

  // Date
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "task-form-date";

  // Priority
  const prioritySelect = document.createElement("select");
  prioritySelect.className = "task-form-priority";
  [
    { value: "3", label: "Low" },
    { value: "2", label: "Medium" },
    { value: "1", label: "High" },
  ].forEach(({ value, label }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    if (value === "3") option.selected = true;
    prioritySelect.appendChild(option);
  });

  // project
  const projectSelect = document.createElement("select");
  projectSelect.className = "task-form-project";
  appLogicInstance.projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.name;
    projectSelect.appendChild(option);
  });

  selectRow.append(dateInput, prioritySelect, projectSelect);

  // --- buttons row ---
  const buttonsRow = document.createElement("div");
  buttonsRow.className = "task-form-buttons";

  // Creaate Task
  const createBtn = document.createElement("button");
  createBtn.className = "task-form-create-btn";
  createBtn.textContent = "Create Task";

  // Cancel whatever you were doing
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "task-form-cancel-btn";
  cancelBtn.textContent = "Cancel";

  buttonsRow.append(createBtn, cancelBtn);
  optionsRow.append(selectRow, buttonsRow);

  // --- assemble ---
  formDiv.append(formHeader, titleInput, descInput, optionsRow);

  // --- events ---

  const handleCreate = () => {
    const taskData = {
      projectId: projectSelect.value,
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      dueDate: dateInput.value,
      priority: prioritySelect.value,
    };
    onSubmit(taskData);
  };

  createBtn.addEventListener("click", handleCreate);

  cancelBtn.addEventListener("click", onCancel);

  return formDiv;
}
