import { tasks } from "../mock/task.js";
import generateUniqueIdentifier from "../utils.js";

export default class TasksModel {
  #boardtasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }
  getTasksByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }

  set tasks(value) {
    this.#boardtasks = value;
  }

  addTask(title) {
    const newTask = {
      title,
      status: "backlog",
      id: generateUniqueIdentifier(),
    };
    const length = this.#boardtasks.push(newTask);
    console.log(`Iris: ${length}`);
    this._notifyObservers();
    return newTask;
  }
  clearTasks() {
    this.#boardtasks = this.#boardtasks.filter(
      (task) => task.status !== "trash"
    );
    this._notifyObservers();
    return this.#boardtasks;
  }

  //------
  deleteTasks(tasks) {
    tasks.forEach((task) => {
      this.#deleteTask(task);
    });
    this._notifyObservers();
  }

  #deleteTask(task) {
    const index = this.#boardtasks.indexOf(task);
    this.#boardtasks.splice(index, 1);
  }

  updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((task) => task.id === taskId);
    if (task) {
      task.status = newStatus.status_title;
      this._notifyObservers();
    }
  }

  moveTask(taskId, targetTaskId) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    const targetIndex = this.tasks.findIndex(
      (task) => task.id === targetTaskId
    );

    const [movedTask] = this.tasks.splice(taskIndex, 1);

    this.tasks.splice(targetIndex, 0, movedTask);

    this._notifyObservers();
  }

  //-----

  addObserver(observer) {
    this.#observers.push(observer);
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }
  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}
