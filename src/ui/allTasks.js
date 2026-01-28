import {
  isToday,
  isBefore,
  isAfter,
  startOfDay,
  endOfDay,
  parseISO,
  compareAsc,
} from "date-fns";
import createTask from "./taskRender.js";
import { categorizeTask } from "../utils/DateUtils.js";

const allTasksView = {
  render(container, tasks) {
    const section = document.createElement("div");

    if (tasks.length === 0) {
      section.innerHTML = `<div>No tasks found</div>`;
      container.appendChild(section);
      return;
    }

    const sortByDate = (a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      const dateA =
        typeof a.dueDate === "string" ? parseISO(a.dueDate) : a.dueDate;
      const dateB =
        typeof b.dueDate === "string" ? parseISO(b.dueDate) : b.dueDate;
      return compareAsc(dateA, dateB);
    };

    const categories = {
      overdue: tasks
        .filter((t) => categorizeTask(t) === "overdue")
        .sort(sortByDate),
      today: tasks.filter((t) => categorizeTask(t) === "today"),
      upcoming: tasks
        .filter((t) => categorizeTask(t) === "upcoming")
        .sort(sortByDate),
      nodate: tasks.filter((t) => categorizeTask(t) === "nodate"),
    };

    this.renderCategorySection(section, "Overdue", categories.overdue);
    this.renderCategorySection(section, "Today", categories.today);
    this.renderCategorySection(section, "Upcoming", categories.upcoming);

    if (categories.nodate.length > 0) {
      this.renderCategorySection(section, "No Date", categories.nodate);
    }

    container.appendChild(section);
  },

  renderCategorySection(container, title, tasks) {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = `section`;

    const catHeader = document.createElement("div");
    catHeader.innerHTML = `
      <span class="section-header">${title} (${tasks.length})</span>
    `;
    categoryDiv.appendChild(catHeader);

    if (tasks.length === 0) {
      categoryDiv.innerHTML += `<div>No ${title.toLowerCase()} tasks</div>`;
    } else {
      tasks.forEach((task) => {
        categoryDiv.appendChild(createTask(task));
      });
    }

    container.appendChild(categoryDiv);
  },
};

export default allTasksView;
