export default function createProjectForm(onCreate, onCancel) {
  const formDiv = document.createElement("div");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "project-form-title";
  titleInput.placeholder = "Task title...";

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "task-form-buttons";

  const createBtn = document.createElement("button");
  createBtn.className = "task-form-create-btn";
  createBtn.textContent = "Create Project";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "task-form-cancel-btn";
  cancelBtn.textContent = "Cancel";

  buttonsRow.append(createBtn, cancelBtn);

  // --- assemble ---
  formDiv.append(titleInput, buttonsRow);

  // --- events ---
  const handleCreate = () => {
    const projectData = {
      name: titleInput.value.trim(),
    };
    onCreate(projectData);
  };

  createBtn.addEventListener("click", handleCreate);

  cancelBtn.addEventListener("click", onCancel);

  return formDiv;
}
