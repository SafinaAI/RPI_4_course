// import { tasks } from "../mock/task.js";

// export default class TasksModel {
//   #boardtasks = tasks;

//   get tasks() {
//     return this.#boardtasks;
//   }
// }
import { tasks } from "../mock/task.js";
import generateUniqueIdentifier from "../utils.js";
//import { generateUniqueIdentifier } from "../utils.js";

// export default class TasksModel {
//   #boardTasks;
//   #observers = [];

//   constructor() {
//     this.#boardTasks = tasks;
//   }

//   get tasks() {
//     return this.#boardTasks;
//   }

//   getTasksByStatus(status) {
//     return this.#boardTasks.filter((task) => task.status === status);
//   }

//   addTask(title) {
//     const newTask = {
//       title,
//       status: "backlog",
//       id: generateId(),
//     };
//     this.#boardTasks.push(newTask);
//     this._notifyObservers();
//   }

//   deleteTasks(tasks) {
//     tasks.forEach((task) => {
//       this.#deleteTask(task);
//     });
//     this._notifyObservers();
//   }

//   #deleteTask(task) {
//     const index = this.#boardTasks.indexOf(task);
//     this.#boardTasks.splice(index, 1);
//   }

//   addObserver(observer) {
//     this.#observers.push(observer);
//   }

//   removeObserver(observer) {
//     this.#observers = this.#observers.filter((obs) => obs !== observer);
//   }

//   _notifyObservers() {
//     this.#observers.forEach((observer) => observer());
//   }
// }

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
