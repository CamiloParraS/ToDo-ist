import Project from "../models/project";
import Todo from "../models/todo";
import applogic from "../logic/applogic";
import createTask from "./taskRender.js";
import allTasksView from "./allTasks.js";

const domController = {
  loadMainContent() {
    this.loadProjects();
    this.loadTasks();
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

  loadTasks(view = allTasksView) {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";
    const everything = applogic.projects.flatMap((project) => project.tasks);

    view.render(tasksContainer, everything);
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
