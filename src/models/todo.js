export default class Todo {
  constructor(
    title,
    description,
    dueDate = "No date",
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

  toggleStatus() {
    this.complete = !this.complete;
  }
}
