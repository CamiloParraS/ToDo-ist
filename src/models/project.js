import { toDate, isToday, isThisWeek, subDays } from "date-fns";

export default class Project {
  constructor(name) {
    this._id = crypto.randomUUID();

    this.name = name;
    this._tasks = [];
  }

  // NAME
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  // ID
  get id() {
    return this._id;
  }

  // TASKS
  get tasks() {
    return this._tasks;
  }
  set tasks(tasks) {
    this._tasks = tasks;
  }

  addTask(newTask) {
    if (this._tasks.some((task) => task.id === newTask.id)) return;
    newTask.project = this.name;
    this._tasks.push(newTask);
  }

  deleteTask(id) {
    this._tasks = this._tasks.filter((task) => task.id !== id);
  }

  getTask(id) {
    return this._tasks.find((task) => task.id === id);
  }
}
