//Ul
import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTasksListComponentTemplate(status) {
  const { status_title, label } = status;
  return ` <div class="list-shell-header-${status_title}">
              <label class="list-title title-${status_title}">${label}</label>
              </div>`;
}

export default class TasksListComponent extends AbstractComponent {
  constructor({ task_status }) {
    super();
    this.status = task_status;
  }
  get template() {
    return createTasksListComponentTemplate(this.status);
  }
}
