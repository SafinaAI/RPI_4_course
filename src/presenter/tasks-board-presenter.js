import TasksListComponent from "../view/taskList-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskBoard-component.js";
import CleanUpButtonComponent from "../view/cleanUp-button-component.js";
import { Status, StatusLabel } from "../consts.js";
import { render, RenderPosition } from "../framework/render.js";

export default class TasksBoardPresenter {
  tasksBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
    this.boardTasks = [...this.tasksModel.getTasks()];
  }

  // init() {
  //   this.boardTasks = [...this.tasksModel.getTasks()];

  //   render(this.tasksBoardComponent, this.boardContainer);
  //   for (let i = 0; i < 4; i++) {
  //     const tasksListComponent = new TasksListComponent();
  //     render(tasksListComponent, this.tasksBoardComponent.getElement());

  //     for (let j = 0; j < this.boardTasks; j++) {
  //       const taskComponent = new TaskComponent({ task: this.boardTasks[j] });
  //       render(taskComponent, tasksListComponent.getElement());
  //     }
  //   }
  // }

  init() {
    this.boardTasks = [...this.tasksModel.getTasks()];

    render(this.tasksBoardComponent, this.boardContainer);
    for (let status in Status) {
      this.status_title = Status[status];
      this.label = StatusLabel[`${this.status_title}`];
      // console.log(`${this.status_title} label ${this.label}`);
      const tasksListComponent = new TasksListComponent({
        task_status: { status_title: this.status_title, label: this.label },
      });
      console.log(`happier now: ${tasksListComponent.status}`);
      render(tasksListComponent, this.tasksBoardComponent.element);

      for (let j = 0; j < this.boardTasks.length; j++) {
        const taskComponent = new TaskComponent({ task: this.boardTasks[j] });
        if (this.boardTasks[j].status == this.status_title) {
          render(taskComponent, tasksListComponent.element);
        }
      }
      if (this.status_title === "trash") {
        const cleanupComponent = new CleanUpButtonComponent();
        render(cleanupComponent, tasksListComponent.element);
      }
    }
  }
}
