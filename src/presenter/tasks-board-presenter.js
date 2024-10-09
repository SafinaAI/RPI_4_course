import TasksListComponent from "../view/taskList-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskBoard-component.js";
import CleanUpButtonComponent from "../view/cleanUp-button-component.js";
import { Status, StatusLabel } from "../consts.js";
import { render, RenderPosition } from "../framework/render.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  #tasksBoardComponent = new TaskBoardComponent();

  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    // this.boardTasks = [...this.tasksModel.getTasks()];
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];

    render(this.#tasksBoardComponent, this.#boardContainer);
    for (let status in Status) {
      this.status_title = Status[status];
      this.label = StatusLabel[`${this.status_title}`];
      const tasksListComponent = new TasksListComponent({
        task_status: { status_title: this.status_title, label: this.label },
      });
      console.log(`happier now: ${tasksListComponent.status}`);
      render(tasksListComponent, this.#tasksBoardComponent.element);

      for (let j = 0; j < this.#boardTasks.length; j++) {
        this.#renderTask(
          this.#boardTasks[j],
          tasksListComponent.element,
          this.status_title
        );
      }

      if (this.status_title === "trash") {
        const cleanupComponent = new CleanUpButtonComponent();
        render(cleanupComponent, tasksListComponent.element);
      }
    }
  }

  #renderTask(task, container, status_title) {
    const taskComponent = new TaskComponent({ task: task });
    if (task.status == status_title) {
      render(taskComponent, container);
    }
  }
}
