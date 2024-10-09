import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
  const { title, status } = task;

  return `
     <p class="list-shell-header-item">${title}</p>`;
}

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    super();
    this.task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }
}
