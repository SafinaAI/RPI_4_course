// import TasksListComponent from "../view/taskList-component.js";
// import TaskComponent from "../view/task-component.js";
// import TaskBoardComponent from "../view/taskBoard-component.js";
// import CleanUpButtonComponent from "../view/cleanUp-button-component.js";
// import { Status, StatusLabel } from "../consts.js";
// import { render, RenderPosition } from "../framework/render.js";

// export default class TasksBoardPresenter {
//   #boardContainer = null;
//   #tasksModel = null;

//   #tasksBoardComponent = new TaskBoardComponent();

//   #boardTasks = [];

//   constructor({ boardContainer, tasksModel }) {
//     this.#boardContainer = boardContainer;
//     this.#tasksModel = tasksModel;
//     // this.boardTasks = [...this.tasksModel.getTasks()];
//   }

//   init() {
//     this.#boardTasks = [...this.#tasksModel.tasks];

//     render(this.#tasksBoardComponent, this.#boardContainer);
//     for (let status in Status) {
//       this.status_title = Status[status];
//       this.label = StatusLabel[`${this.status_title}`];
//       const tasksListComponent = new TasksListComponent({
//         task_status: { status_title: this.status_title, label: this.label },
//       });
//       console.log(`happier now: ${tasksListComponent.status}`);
//       render(tasksListComponent, this.#tasksBoardComponent.element);

//       for (let j = 0; j < this.#boardTasks.length; j++) {
//         this.#renderTask(
//           this.#boardTasks[j],
//           tasksListComponent.element,
//           this.status_title
//         );
//       }

//       if (this.status_title === "trash") {
//         const cleanupComponent = new CleanUpButtonComponent();
//         render(cleanupComponent, tasksListComponent.element);
//       }
//       if (tasksInCurrentStatus.length === 0) {
//         render(new DragAndDropTaskComponent(), TaskComponent.element);
//       } else {
//         Object.values(tasksInCurrentStatus).forEach((taskInCurrentStatus) => {
//           this.#renderTask(taskInCurrentStatus, TaskComponent.element);
//         });
//       }
//     }
//   }

//   #renderTask(task, container, status_title) {
//     const taskComponent = new TaskComponent({ task: task });
//     if (task.status == status_title) {
//       render(taskComponent, container);
//     }
//   }
//   makeClearButton() {
//     const trashContainer = document.querySelector(`.${Status.TRASH}`);
//     render(new CleanUpButtonComponent(), trashContainer);
//   }
// }

//____________________________________________________________________________
//____________________________________________________________________________
//____________________________________________________________________________

import TasksListComponent from "../view/taskList-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskBoard-component.js";
import { render, RenderPosition } from "../framework/render.js";
import { Status, StatusLabel } from "../consts.js";
import CleanUpButtonComponent from "../view/cleanUp-button-component.js";
import EmptyTaskComponent from "../view/emptyTask-component.js";
import TaskPresenter from "./task-presenter.js";

export default class TasksBoardPresenter {
  #tasksBoardComponent = new TaskBoardComponent();
  //taskListComponent = new TasksListComponent();
  #boardContainer = null;
  #tasksModel = null;
  #boardTasks = [];

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
      console.log(`${this.status_title} label ${this.label}`);
      const tasksListComponent = new TasksListComponent({
        task_status: { status_title: this.status_title, label: this.label },
      });
      console.log(`happier now: ${tasksListComponent.status}`);
      render(tasksListComponent, this.#tasksBoardComponent.element);
      const tasksForStatus = this.#tasksModel.getTasksByStatus(
        this.status_title
      );
      console.log(`happier baby: ${tasksForStatus.length} ${status}`);
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
        console.log("Why not");
        this.#renderResetButton(tasksListComponent.element);
      }
    }
  }
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
  #clearBoard() {
    //console.log(`remember: {this.#tasksBoardComponent.element}`)
    this.#tasksBoardComponent.element.innerHTML = "";
  }
}
