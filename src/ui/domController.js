import applogic from "../logic/applogic";
import allTasksView from "./views/allTasks.js";
import todayView from "./views/todayView.js";
import upcomingView from "./views/upcomingView.js";
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
      if (project.id !== "root") {
        this.createProject(project);
      }
    });
  },

  loadTasks(tasks, view = allTasksView) {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.replaceChildren();
    view.render(tasksContainer, tasks);
  },

  handleNavClick(filterKey, title, viewElement, isProject = false) {
    const allTasks = applogic.projects.flatMap((p) => p.tasks);

    if (isProject) {
      const project = applogic.projects.find((p) => p.id === filterKey);
      const tasks = project ? project.tasks : [];

      this.setActiveView(filterKey, title);
      this.loadTasks(tasks, viewElement);
    } else {
      const filteredTasks =
        filterKey === "all" ? allTasks : filters[filterKey](allTasks);
      this.setActiveView(filterKey, title);
      this.loadTasks(filteredTasks, viewElement);
    }
  },

  bindEvents() {
    document
      .getElementById("today-btn")
      .addEventListener("click", () =>
        this.handleNavClick("today", "Today", todayView),
      );

    document
      .getElementById("upcoming-btn")
      .addEventListener("click", () =>
        this.handleNavClick("upcoming", "Upcoming Tasks", upcomingView),
      );

    document
      .getElementById("all-btn")
      .addEventListener("click", () =>
        this.handleNavClick("all", "All Tasks", allTasksView),
      );
  },

  createProject(project) {
    const projectsContainer = document.getElementById("projects-container");

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("menu-item", "project-item");

    const hashSpan = document.createElement("span");
    hashSpan.classList.add("project-hash");
    hashSpan.textContent = "#";

    projectDiv.addEventListener("click", () => {
      this.handleNavClick(project.id, project.name, allTasksView, true);
    });

    projectDiv.id = `${project.id}-btn`;

    projectDiv.appendChild(hashSpan);
    projectDiv.append(` ${project.name}`);

    projectsContainer.appendChild(projectDiv);
  },

  setActiveView(viewID, headerText) {
    document.querySelectorAll(".menu-item").forEach((item) => {
      item.classList.remove("active");
    });

    const activeBtn = document.getElementById(`${viewID}-btn`);

    if (activeBtn) activeBtn.classList.add("active");

    const header = document.querySelector(".main-header h1");
    if (header) header.textContent = headerText;
  },
};

export default domController;
