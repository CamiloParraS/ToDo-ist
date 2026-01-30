import createTask from "../components/taskRender.js";

const todayView = {
  render(container, tasks) {
    const section = document.createElement("div");
    section.className = "section today-section";

    const header = document.createElement("div");
    header.className = "section-header";
    header.textContent = `Today (${tasks.length})`;
    section.appendChild(header);

    if (tasks.length === 0) {
      this.renderEmptyState(
        section,
        "No tasks due today. You're all caught up!",
      );
    } else {
      tasks.forEach((task) => section.appendChild(createTask(task)));
    }

    container.appendChild(section);
  },

  renderEmptyState(container, message) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = message;
    container.appendChild(empty);
  },
};

export default todayView;
