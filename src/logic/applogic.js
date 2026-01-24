import Project from "../models/project";
import Todo from "../models/todo";

export default class applogic {
  constructor() {
    this.projects = [];

    const defaultProject = new Project("Inbox");
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

  deleteProject(projectId) {
    this._projects = this._projects.filter((p) => p.id !== projectId);
  }
}
