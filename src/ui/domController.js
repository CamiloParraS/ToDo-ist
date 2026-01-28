import Project from "../models/project";
import Todo from "../models/todo";
import applogic from "../logic/applogic";
import createTask from "./taskRender.js";

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

  loadTasks() {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";

    applogic.projects.forEach((project) => {
      if (project.name !== "root" && project.tasks.length > 0) {
        const projectSection = document.createElement("div");
        projectSection.classList.add("section");

        projectSection.innerHTML = `<div class="section-header">${project.name}</div>`;

        project.tasks.forEach((task) => {
          const taskElement = createTask(task);
          projectSection.appendChild(taskElement);
        });

        tasksContainer.appendChild(projectSection);
      }
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
