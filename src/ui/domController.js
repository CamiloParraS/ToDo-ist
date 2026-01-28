import Project from "../models/project";
import Todo from "../models/todo";
import applogic from "../logic/applogic";
import createTask from "./taskRender.js";
import allTasksView from "./allTasks.js";
import todayView from "./todayView.js";
import { filters } from "../utils/DateUtils.js";

const domController = {
  loadMainContent() {
    this.loadProjects();
    const everything = applogic.projects.flatMap((project) => project.tasks);
    this.loadTasks(everything, allTasksView);
  },

  loadProjects() {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";
    applogic.projects.forEach((project) => {
      if (project.name !== "root") {
        this.createProject(project.name);
      }
    });
  },

  loadTasks(tasks, view = allTasksView) {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";
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
  },

  createProject(name) {
    const userProjects = document.getElementById("projects-container");
    userProjects.innerHTML += `
      <div class="project-item">
        <span class="project-hash">#</span>
          ${name}
        </div>
    `;
  },
};

export default domController;
