export default function createTaskForm(onSubmit, onCancel) {
  const formDiv = document.createElement("div");
  formDiv.className = "task-form";

  const formHeader = document.createElement("div");
  formHeader.className = "task-form-header";
  formHeader.textContent = "New Task";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "task-form-title";
  titleInput.placeholder = "Task title...";

  // --- buttons row ---
  const buttonsRow = document.createElement("div");
  buttonsRow.className = "task-form-buttons";

  const createBtn = document.createElement("button");
  createBtn.className = "task-form-create-btn";
  createBtn.textContent = "Create Task";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "task-form-cancel-btn";
  cancelBtn.textContent = "Cancel";

  buttonsRow.append(createBtn, cancelBtn);

  // --- assemble ---
  formDiv.append(formHeader, titleInput, buttonsRow);

  // --- events ---

  const handleCreate = () => {
    const taskData = {
      title: titleInput.value.trim(),
    };
    onSubmit(taskData);
  };

  createBtn.addEventListener("click", handleCreate);

  cancelBtn.addEventListener("click", onCancel);

  return formDiv;
}
