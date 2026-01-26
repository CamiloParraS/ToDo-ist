import { format, parse, isValid, parseISO } from "date-fns";

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
  get dueDate() {
    if (!this._dueDate || !isValid(this._dueDate)) return "";

    const now = new Date();
    const isSameDay =
      this._dueDate.getDate() === now.getDate() &&
      this._dueDate.getMonth() === now.getMonth() &&
      this._dueDate.getFullYear() === now.getFullYear();

    if (isSameDay) {
      return format(this._dueDate, "h:mm a");
    } else {
      return format(this._dueDate, "dd/MM/yyyy h:mm a");
    }
  }
  set dueDate(value) {
    if (!value) {
      this._dueDate = null;
      return;
    }

    if (value instanceof Date && isValid(value)) {
      this._dueDate = value;
      return;
    }

    if (typeof value === "string") {
      let parsed = parseISO(value);

      const formats = ["h:mm a", "dd/MM/yyyy", "dd/MM/yyyy h:mm a"];

      for (let fmt of formats) {
        if (isValid(parsed)) break;
        parsed = parse(value, fmt, new Date());
      }

      this._dueDate = isValid(parsed) ? parsed : null;
      return;
    }

    this._dueDate = null;
  }

  toggleStatus() {
    this.complete = !this.complete;
  }
}
