import TasksListComponent from "../view/taskList-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskBoard-component.js";
import { render, RenderPosition } from "../framework/render.js";
import { Status, StatusLabel } from "../consts.js";
import CleanUpButtonComponent from "../view/cleanUp-button-component.js";
import EmptyTaskComponent from "../view/emptyTask-component.js";
import TaskPresenter from "./task-presenter.js";
import DragAndDropTaskComponent from "../view/Drag-and-drop-task-component.js";

export default class TasksBoardPresenter {
  #tasksBoardComponent = new TaskBoardComponent();
  //taskListComponent = new TasksListComponent();
  #boardContainer = null;
  #tasksModel = null;
  #boardTasks = [];
  #cleanupComponent = null;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    render(this.#tasksBoardComponent, this.#boardContainer);
    this.#renderBoard();
  }
  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    const taskPresenter = new TaskPresenter({ taskListContainer: container });
    taskPresenter.init(task);
    //render(taskComponent,container);
  }
  #renderBoard() {
    for (let status in Status) {
      this.status_title = Status[status];
      this.label = StatusLabel[`${this.status_title}`];

      const tasksListComponent = new TasksListComponent({
        task_status: { status_title: this.status_title, label: this.label },
        onTaskDrop: this.#handleTaskDrop.bind(this),
      });

      render(tasksListComponent, this.#tasksBoardComponent.element);
      const tasksForStatus = this.#tasksModel.getTasksByStatus(
        this.status_title
      );

      if (tasksForStatus.length == 0) {
        const emptyTaskComponent = new EmptyTaskComponent();
        render(emptyTaskComponent, tasksListComponent.element);
      } else {
        for (let j = 0; j < tasksForStatus.length; j++) {
          //const taskComponent = new TaskComponent({task:this.boardTasks[j]});
          //if (this.#boardTasks[j].status==this.status_title) {
          this.#renderTask(tasksForStatus[j], tasksListComponent.element);
          //render(taskComponent, tasksListComponent.element);
          //}
        }
      }
      if (this.status_title == "trash") {
        this.#renderResetButton(tasksListComponent.element);
      }
    }
  }

  #handleTaskDrop(taskId, newStatus) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus);
  }

  // async #handleTaskDrop(taskId, newStatus) {
  //   try {
  //     await this.#tasksModel.updateTaskStatus(taskId, newStatus);
  //   } catch (error) {
  //     console.error("Error when uploading the status of the task", error);
  //   }
  // }

  #renderResetButton(container) {
    console.log("Clear board container");
    const cleanupComponent = new CleanUpButtonComponent({
      onClick: this.#clearAllTasks.bind(this),
    });
    render(cleanupComponent, container);
  }

  #clearAllTasks() {
    console.log("Clear board");

    this.#tasksModel.tasks = this.#tasksModel.clearTasks();
    // this.#clearBoard();
  }

  createTask() {
    const taskTitle = document.querySelector("#add-task").value.trim();
    if (!taskTitle) {
      return;
    }
    const newTask = this.#tasksModel.addTask(taskTitle);

    document.querySelector("#add-task").value = "";
  }
  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }
  // #handleModelEvent(event, payload) {
  //   switch (event) {
  //     case UserAction.ADD_TASK:
  //     case UserAction.UPDATE_TASK:
  //     case UserAction.DELETE_TASK:
  //       this.#clearBoard();
  //       this.#renderBoard();
  //       if (this.#cleanupComponent) {
  //         this.#cleanupComponent.toggleDisabled(
  //           !this.#tasksModel.hasBasketTasks()
  //         );
  //       }
  //       break;
  //   }
  // }

  // async #handleClearBasketClick() {
  //   try {
  //     await this.#tasksModel.clearBasketTasks();
  //   } catch (error) {
  //     console.error("Error when cleaning the basket");
  //   }
  // }
  #clearBoard() {
    //console.log(`remember: {this.#tasksBoardComponent.element}`)
    this.#tasksBoardComponent.element.innerHTML = "";
  }
}
