import Project from "../models/project";
import Todo from "../models/todo";
import debug from "../debug/debug.js";

class applogic {
  constructor() {
    this.projects = [];

    const defaultProject = new Project("root", "root");
    this.addProject(defaultProject);

    this._loaded = this.load();
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

  save() {
    localStorage.setItem("todois-data", JSON.stringify(this._projects));
  }

  load() {
    try {
      const raw = localStorage.getItem("todois-data");
      if (!raw) return false;

      const data = JSON.parse(raw);
      if (!Array.isArray(data) || data.length === 0) return false;

      this._projects = data.map((pData) => {
        const project = new Project(pData._name, pData._id);
        project._tasks = (pData._tasks || []).map((tData) => {
          const todo = new Todo(
            tData._title,
            tData._description,
            tData._dueDate,
            tData._priority,
            tData._project,
          );
          todo.id = tData.id;
          todo.complete = tData.complete;
          return todo;
        });
        return project;
      });

      if (!this.getProject("root")) {
        this.addProject(new Project("root", "root"));
      }

      return true;
    } catch (e) {
      console.warn("Failed to load data from localStorage", e);
      return false;
    }
  }
}

const appLogicInstance = new applogic();
if (!appLogicInstance._loaded) {
  debug(appLogicInstance);
  appLogicInstance.save();
}
export default appLogicInstance;
