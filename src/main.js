import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TaskComponent from "./view/task-component.js";
import TaskBoardComponent from "./view/taskBoard-component.js";
import TasksListComponent from "./view/taskList-component.js";
import TasksModel from "./model/task-model.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector("body");
const formContainer = document.querySelector(".add-task");
const tasksBoardContainer = document.querySelector(".taskBoard");

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), formContainer);

tasksBoardPresenter.init();
