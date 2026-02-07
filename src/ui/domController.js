import applogic from "../logic/applogic";
import allTasksView from "./views/allTasks.js";
import todayView from "./views/todayView.js";
import upcomingView from "./views/upcomingView.js";
import createTaskForm from "./components/taskForm.js";
import createProjectForm from "./components/projectModal.js";
import { filters } from "../utils/DateUtils.js";

const domController = {
  activeForms: new Map(),

  loadMainContent() {
    this.loadProjects();
    const allTasks = applogic.projects.flatMap((project) => project.tasks);
    this.handleNavClick("all", "All Tasks", allTasksView);
  },

  currentView: {
    filterKey: "all",
    viewElement: allTasksView,
    isProject: false,
    title: "all",
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
    this.isFormOpen = false;

    this.currentView.filterKey = filterKey;
    this.currentView.viewElement = viewElement;
    this.currentView.isProject = isProject;
    this.currentView.title = title;

    this.refreshCurrentView();
  },

  refreshCurrentView() {
    const { filterKey, viewElement, isProject, title } = this.currentView;
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

  renderForm(formId, containerId, formCreator, onSaveLogic) {
    if (this.activeForms.has(formId)) return;

    const container = document.getElementById(containerId);

    const form = formCreator(
      (data) => {
        onSaveLogic(data);
        this.closeForm(formId);
      },
      () => {
        this.closeForm(formId);
      },
    );
    this.activeForms.set(formId, form);

    containerId === "tasks-container"
      ? container.prepend(form)
      : container.append(form);

    const input = form.querySelector("input, textarea");
    if (input) input.focus();
  },

  closeForm(formId) {
    const form = this.activeForms.get(formId);
    if (!form) return;

    form.remove();
    this.activeForms.delete(formId);
  },

  showAddTaskForm() {
    this.renderForm(
      "task-form",
      "tasks-container",
      createTaskForm,
      (taskData) => {
        applogic.addTask(taskData.projectId, taskData);
        this.refreshCurrentView();
      },
    );
  },

  showProjectForm() {
    this.renderForm(
      "project-form",
      "newProjectSection",
      createProjectForm,
      (projectData) => {
        applogic.createProject(projectData.name);
        this.loadProjects();
      },
    );
  },

  bindEvents() {
    const navButtons = [
      { id: "today-btn", filterKey: "today", title: "Today", view: todayView },
      {
        id: "upcoming-btn",
        filterKey: "upcoming",
        title: "Upcoming Tasks",
        view: upcomingView,
      },
      {
        id: "all-btn",
        filterKey: "all",
        title: "All Tasks",
        view: allTasksView,
      },
      {
        id: "root-btn",
        filterKey: "root",
        title: "root",
        view: allTasksView,
        isProject: true,
      },
    ];

    navButtons.forEach(({ id, filterKey, title, view, isProject = false }) => {
      document
        .getElementById(id)
        .addEventListener("click", () =>
          this.handleNavClick(filterKey, title, view, isProject),
        );
    });

    // Special actions
    document
      .getElementById("addTask-btn")
      .addEventListener("click", () => this.showAddTaskForm());

    document
      .getElementById("addProject-btn")
      .addEventListener("click", () => this.showProjectForm());
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
