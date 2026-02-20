import appLogicInstance from "../../logic/applogic";
import createTaskForm from "./taskForm";

export default function createKebabMenu(task, taskDiv) {
  const kebabMenu = document.createElement("div");
  kebabMenu.className = "kebab-menu";

  const menuButton = document.createElement("button");
  menuButton.className = "menu-button";
  menuButton.innerHTML = "⋮";
  menuButton.setAttribute("aria-label", "Task options");

  const dropdown = document.createElement("div");
  dropdown.className = "menu-dropdown";
  dropdown.style.display = "none";

  // Edit option
  const editOption = document.createElement("div");
  editOption.className = "menu-option";
  editOption.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
    <span>Edit</span>
  `;

  // Delete option
  const deleteOption = document.createElement("div");
  deleteOption.className = "menu-option";
  deleteOption.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
    <span>Delete</span>
  `;

  dropdown.append(editOption, deleteOption);
  kebabMenu.append(menuButton, dropdown);

  // --- Toggle dropdown open/close ---
  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.style.display === "block";
    document.querySelectorAll(".menu-dropdown").forEach((d) => {
      d.style.display = "none";
    });
    dropdown.style.display = isOpen ? "none" : "block";
  });

  // Close when clicking anywhere else on the page
  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });

  // --- Delete ---
  deleteOption.addEventListener("click", (e) => {
    e.stopPropagation();
    appLogicInstance.deleteTask(task.project, task.id);
    taskDiv.remove();
    dropdown.style.display = "none";
  });

  // --- Edit ---
  editOption.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display = "none";

    const form = createTaskForm(
      (updatedData) => {
        console.log(updatedData);
        task.title = updatedData.title;
        task.description = updatedData.description;
        task.dueDate = updatedData.dueDate;
        task.priority = Number(updatedData.priority);

        import("./taskRender.js").then(({ default: createTask }) => {
          taskDiv.replaceWith(createTask(task));
        });
      },
      () => {
        form.replaceWith(taskDiv);
      },
    );

    // Pre-fill form with current task values
    form.querySelector(".task-form-title").value = task.title;
    form.querySelector(".task-form-description").value = task.description || "";
    form.querySelector(".task-form-date").value = task.dueDate || "";
    form.querySelector(".task-form-priority").value = String(task.priority);
    form.querySelector(".task-form-project").value = task.project;

    taskDiv.replaceWith(form);
  });

  return kebabMenu;
}
