import Project from "../models/project";
import Todo from "../models/todo";
import debug from "../debug/debug.js";

class applogic {
  constructor() {
    this.projects = [];

    const defaultProject = new Project("root", "root");
    this.addProject(defaultProject);
  }

  set projects(projects) {
    this._projects = projects;
  }

  get projects() {
    return this._projects;
  }

  getProject(projectId) {
    return this._projects.find((_project) => _project.id === projectId);
  }

  addProject(newProject) {
    if (this.projects.find((_project) => _project.id === newProject.id)) return;
    this.projects.push(newProject);
  }

  createProject(projectName) {
    const newProject = new Project(projectName);
    this.addProject(newProject);
    return newProject;
  }

  deleteProject(projectId) {
    this._projects = this._projects.filter((p) => p.id !== projectId);
  }

  addTask(projectId, taskData) {
    const project = this.getProject(projectId);
    if (!project) return;

    const newTask = new Todo(
      taskData.title,
      taskData.description,
      taskData.dueDate,
      Number(taskData.priority),
    );

    if (project.tasks.some((task) => task.id === newTask.id)) return;
    newTask.project = projectId;
    project.tasks.push(newTask);
  }

  deleteTask(projectId, taskId) {
    const project = this.getProject(projectId);
    if (!project) return;

    project.deleteTask(taskId);
  }

  getTask(projectId, taskId) {
    const project = this.getProject(projectId);
    if (!project) return null;

    return project.getTask(taskId);
  }
}

const appLogicInstance = new applogic();
debug(appLogicInstance);
export default appLogicInstance;
