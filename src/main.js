import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TaskComponent from "./view/task-component.js";
import TaskBoardComponent from "./view/taskBoard-component.js";
import TasksListComponent from "./view/taskList-component.js";
import TasksModel from "./model/task-model.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import { render, RenderPosition } from "./framework/render.js";
import TasksApiService from "./task-api-service.js";

const END_POINT = "https://6718ae427fc4c5ff8f4a8a9e.mockapi.io/";
const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const tasksBoardContainer = document.querySelector(".taskBoard");
const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService(END_POINT),
});

const formAddTaskComponent = new FormAddTaskComponent({
  onClick: handleNewTaskButtonClick,
});
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer);

tasksBoardPresenter.init();

function handleNewTaskButtonClick() {
  tasksBoardPresenter.createTask();
}
