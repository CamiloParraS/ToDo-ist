import appLogicInstance from "../../logic/applogic";
import createTaskForm from "./taskForm";
import showConfirmDialog from "./confirmDialog";

let currentOpenDropdown = null;

function closeAllDropdowns() {
  document.querySelectorAll(".menu-dropdown.visible").forEach((d) => {
    d.classList.remove("visible");
  });
  if (currentOpenDropdown) {
    const btn = currentOpenDropdown
      .closest(".kebab-menu")
      ?.querySelector(".menu-button");
    if (btn) btn.setAttribute("aria-expanded", "false");
    currentOpenDropdown = null;
  }
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".kebab-menu")) {
    closeAllDropdowns();
  }
});

export default function createKebabMenu(task, taskDiv) {
  const kebabMenu = document.createElement("div");
  kebabMenu.className = "kebab-menu";

  const dropdownId = `menu-dropdown-${task.id}`;

  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "menu-button";
  menuButton.innerHTML = "⋮";
  menuButton.setAttribute("aria-label", "Task options");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-haspopup", "menu");
  menuButton.setAttribute("aria-controls", dropdownId);

  const dropdown = document.createElement("div");
  dropdown.className = "menu-dropdown";
  dropdown.id = dropdownId;
  dropdown.setAttribute("role", "menu");

  const editOption = document.createElement("div");
  editOption.className = "menu-option";
  editOption.setAttribute("role", "menuitem");
  editOption.setAttribute("tabindex", "-1");
  editOption.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
    <span>Edit</span>
  `;

  const deleteOption = document.createElement("div");
  deleteOption.className = "menu-option";
  deleteOption.setAttribute("role", "menuitem");
  deleteOption.setAttribute("tabindex", "-1");
  deleteOption.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
    <span>Delete</span>
  `;

  dropdown.append(editOption, deleteOption);
  kebabMenu.append(menuButton, dropdown);

  function openDropdown() {
    dropdown.classList.add("visible");
    menuButton.setAttribute("aria-expanded", "true");
    currentOpenDropdown = dropdown;
    editOption.setAttribute("tabindex", "0");
    editOption.focus();
  }

  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains("visible")) {
      closeAllDropdowns();
    } else {
      closeAllDropdowns();
      openDropdown();
    }
  });

  kebabMenu.addEventListener("keydown", (e) => {
    if (!dropdown.classList.contains("visible")) return;

    const items = Array.from(dropdown.querySelectorAll('[role="menuitem"]'));
    const current = document.activeElement;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (current && items.includes(current)) {
        current.click();
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      closeAllDropdowns();
      menuButton.focus();
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const delta = e.key === "ArrowDown" ? 1 : -1;
      const idx = items.indexOf(current);
      const nextIdx =
        idx < 0
          ? delta > 0
            ? 0
            : items.length - 1
          : (idx + delta + items.length) % items.length;
      items.forEach((it) => it.setAttribute("tabindex", "-1"));
      items[nextIdx].setAttribute("tabindex", "0");
      items[nextIdx].focus();
    }
  });

  kebabMenu.addEventListener("focusout", (e) => {
    if (!dropdown.classList.contains("visible")) return;
    if (!kebabMenu.contains(e.relatedTarget)) {
      closeAllDropdowns();
    }
  });

  deleteOption.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    showConfirmDialog(
      `Delete "${task.title}"? This cannot be undone.`,
      () => {
        appLogicInstance.deleteTask(task.project, task.id);
        taskDiv.remove();
      },
    );
  });

  editOption.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllDropdowns();

    const form = createTaskForm(
      (updatedData) => {
        const oldProjectId = task.project;
        const newProjectId = updatedData.projectId;

        if (oldProjectId !== newProjectId) {
          const oldProject = appLogicInstance.getProject(oldProjectId);
          if (oldProject) oldProject.deleteTask(task.id);
          const newProject = appLogicInstance.getProject(newProjectId);
          if (newProject) newProject.tasks.push(task);
        }

        task.title = updatedData.title;
        task.description = updatedData.description;
        task.dueDate = updatedData.dueDate;
        task.priority = Number(updatedData.priority);
        task.project = newProjectId;

        import("./taskRender.js").then(({ default: createTask }) => {
          form.replaceWith(createTask(task));
        });
      },
      () => {
        form.replaceWith(taskDiv);
      },
      "edit",
    );

    form.querySelector(".task-form-title").value = task.title;
    form.querySelector(".task-form-description").value = task.description || "";
    form.querySelector(".task-form-date").value = task.dueDate || "";
    form.querySelector(".task-form-priority").value = String(task.priority);
    form.querySelector(".task-form-project").value = task.project;

    taskDiv.replaceWith(form);
  });

  return kebabMenu;
}
