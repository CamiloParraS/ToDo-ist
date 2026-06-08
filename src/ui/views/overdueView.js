import createTask from "../components/taskRender.js";

const overdueView = {
  render(container, tasks) {
    const section = document.createElement("div");
    section.className = "section overdue-section";

    const header = document.createElement("div");
    header.className = "section-header";
    header.textContent = `Overdue (${tasks.length})`;
    section.appendChild(header);

    if (tasks.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No overdue tasks. Great job!";
      section.appendChild(empty);
    } else {
      tasks.forEach((task) => section.appendChild(createTask(task)));
    }

    container.appendChild(section);
  },
};

export default overdueView;
