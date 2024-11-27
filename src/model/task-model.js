import Observable from "../framework/observable.js";
import generateUniqueIdentifier from "../utils.js";
//import { tasks } from "../mock/task.js";
import { UpdateType, UserAction } from "../consts.js";

export default class TasksModel extends Observable {
  // #boardtasks = tasks;
  // #observers = [];
  // #tasksApiService = null;
  #boardtasks = [];
  #tasksApiService = null;

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;

    this.#tasksApiService.tasks.then((tasks) => {});
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch (error) {
      // console.log(`No error I hope: ${error}`);
      this.#boardtasks = [];
    }
    this._notify(UpdateType.INIT);
  }
  get tasks() {
    return this.#boardtasks;
  }
  getTasksByStatus(status) {
    return this.#boardtasks.filter((task) => {
      return task.status === status;
    });
  }

  set tasks(value) {
    this.#boardtasks = value;
  }

  // clearTasks() {
  //   this.#boardtasks = this.#boardtasks.filter(
  //     (task) => task.status !== "trash"
  //   );
  //   this._notifyObservers();
  //   return this.#boardtasks;
  // }
  clearTasks() {
    this.#boardtasks = this.#boardtasks.filter(
      (task) => task.status !== "trash"
    );
    this._notify(UpdateType.DELETE_TASK);
    return this.#boardtasks;
  }

  async addTask(title) {
    const newTask = {
      title,
      status: "backlog",
    };
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (error) {
      console.error("Ошибка при добавлении задачи на сервер:", err);
      throw error;
    }
    const length = this.#boardtasks.push(newTask);
    console.log(`Iris: ${length}`);
    this._notifyObservers();
    return newTask;
  }

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((task) => task.id === taskId);
    if (task) {
      task.status = newStatus.status_title;
      try {
        const updateTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updateTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (error) {
        throw error;
      }
    }
  }

  deleteTask(taskId) {
    this.#boardtasks = this.#boardtasks.filter((task) => task.id !== taskId);
    this._notify(UserAction.DELETE_TASK, { id: taskId });
  }

  async clearBasketTasks() {
    const basketTasks = this.#boardtasks.filter(
      (task) => task.status === "trash"
    );

    try {
      await Promise.all(
        basketTasks.map((task) => this.#tasksApiService.deleteTask(task.id))
      );
      this.#boardtasks = this.#boardtasks.filter(
        (task) => task.status !== "trash"
      );
      this._notify(UserAction.DELETE_TASK, { status: "trash" });
    } catch (error) {
      throw error;
    }
  }

  hasBasketTasks() {
    return this.#boardtasks.some((task) => task.status === "trash");
  }
}
