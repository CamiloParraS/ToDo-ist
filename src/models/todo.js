import { parseTodoDate, formatTodoDate } from "../utils/DateUtils.js";

export default class Todo {
  constructor(
    title,
    description,
    dueDate = null,
    priority = 1,
    project = "inbox",
  ) {
    this.id = crypto.randomUUID();
    this.complete = false;

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }

  // TITLE
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value.length > 0 ? value : "Untitled Task";
  }

  // PROJECT
  get project() {
    return this._project;
  }
  set project(value) {
    this._project = value;
  }

  // PRIORITY
  get priority() {
    return this._priority;
  }
  set priority(value) {
    if (typeof value !== "number" || value < 1 || value > 3) {
      this._priority = 1;
      return;
    }
    this._priority = value;
  }

  // DUE DATE
  get dueFormatedDate() {
    return formatTodoDate(this._dueDate);
  }
  get dueDate() {
    return this._dueDate;
  }
  set dueDate(value) {
    this._dueDate = parseTodoDate(value);
  }

  // STATUS
  get status() {
    return this.complete;
  }
  toggleStatus() {
    this.complete = !this.complete;
  }

  // ALL
  getTaskInfo() {
    return (
      this.name,
      this.description,
      this.dueDate,
      this.priority,
      this.complete,
      this.project
    );
  }
}
