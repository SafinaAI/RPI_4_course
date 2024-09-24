import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TaskComponent from "./view/task-component.js";
import TaskBoardComponent from "./view/taskBoard-component.js";
import TasksListComponent from "./view/taskList-component.js";
import { render, RenderPosition } from "./framework/render.js";

const numberOfStatuses = 4;
const numberOfTasks = 4;

const bodyContainer = document.querySelector("body");
const formContainer = document.querySelector(".add-task");
const tasksBoardContainer = document.querySelector(".taskBoard");

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), formContainer);

for (let i = 0; i < numberOfStatuses; i++) {
  const tasksListComponent = new TasksListComponent();
  render(tasksListComponent, tasksBoardContainer);

  const tasksList = document.querySelectorAll(`.tasklist`);

  for (let j = 0; j < numberOfTasks; j++) {
    render(new TaskComponent(), tasksList[i]);
  }
}
