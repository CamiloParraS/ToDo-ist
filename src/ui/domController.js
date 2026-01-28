import applogic from "../logic/applogic";
import allTasksView from "./allTasks.js";
import todayView from "./todayView.js";
import upcomingView from "./upcomingView.js";
import { filters } from "../utils/DateUtils.js";

const domController = {
  loadMainContent() {
    this.loadProjects();
    const everything = applogic.projects.flatMap((project) => project.tasks);
    this.loadTasks(everything, allTasksView);
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
    const handleNavClick = (filterName, viewObj) => {
      const allTasks = applogic.projects.flatMap((p) => p.tasks);
      const filteredTasks = filters[filterName](allTasks);
      this.loadTasks(filteredTasks, viewObj);
    };

    document.getElementById("today-btn").addEventListener("click", () => {
      handleNavClick("today", todayView);
    });

    document.getElementById("all-btn").addEventListener("click", () => {
      handleNavClick("all", allTasksView);
    });

    document.getElementById("upcoming-btn").addEventListener("click", () => {
      handleNavClick("upcoming", upcomingView);
    });
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
};

export default domController;
