import Project from "../models/project";
import Todo from "../models/todo";

class applogic {
  constructor() {
    this.projects = [];

    const defaultProject = new Project("root");
    const test = new Project("daesdad");
    test.addTask(
      new Todo(
        "Configure webpack.config.js for development",
        "description1",
        "9:00 AM",
      ),
    );
    test.addTask(
      new Todo("Setup entry and output paths", "description2", "10:30 AM"),
    );
    this.addProject(test);
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

const appLogicInstance = new applogic();
export default appLogicInstance;
