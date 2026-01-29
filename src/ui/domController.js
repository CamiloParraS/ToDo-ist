import applogic from "../logic/applogic";
import allTasksView from "./allTasks.js";
import todayView from "./todayView.js";
import upcomingView from "./upcomingView.js";
import { filters } from "../utils/DateUtils.js";

const domController = {
  loadMainContent() {
    this.loadProjects();
    const allTasks = applogic.projects.flatMap((project) => project.tasks);
    this.setActiveView("all", "All Tasks");
    this.loadTasks(allTasks, allTasksView);
  },

  loadProjects() {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.replaceChildren();

    applogic.projects.forEach((project) => {
      if (project.name !== "root") {
        this.createProject(project.name);
      }
    });
  },

  loadTasks(tasks, view = allTasksView) {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.replaceChildren();
    view.render(tasksContainer, tasks);
  },

  bindEvents() {
    const handleNavClick = (filterKey, title, viewElement) => {
      const allTasks = applogic.projects.flatMap((p) => p.tasks);
      const filteredTasks =
        filterKey === "all" ? allTasks : filters[filterKey](allTasks);
      this.setActiveView(filterKey, title);
      this.loadTasks(filteredTasks, viewElement);
    };

    document
      .getElementById("today-btn")
      .addEventListener("click", () =>
        handleNavClick("today", "Today", todayView),
      );

    document
      .getElementById("upcoming-btn")
      .addEventListener("click", () =>
        handleNavClick("upcoming", "Upcoming Tasks", upcomingView),
      );

    document
      .getElementById("all-btn")
      .addEventListener("click", () =>
        handleNavClick("all", "All Tasks", allTasksView),
      );
  },

  createProject(name) {
    const projectsContainer = document.getElementById("projects-container");

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-item");

    const hashSpan = document.createElement("span");
    hashSpan.classList.add("project-hash");
    hashSpan.textContent = "#";

    projectDiv.appendChild(hashSpan);
    // Use append to add text safely alongside elements
    projectDiv.append(` ${name}`);

    projectsContainer.appendChild(projectDiv);
  },

  setActiveView(viewName, headerText) {
    document.querySelectorAll(".menu-item").forEach((item) => {
      item.classList.remove("active");
    });

    const activeBtn = document.getElementById(`${viewName}-btn`);
    if (activeBtn) activeBtn.classList.add("active");

    const header = document.querySelector(".main-header h1");
    if (header) header.textContent = headerText;
  },
};

export default domController;
