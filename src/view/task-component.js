import { createElement } from "../framework/render.js";

function createTaskComponentTemplate(task) {
  const { title, status } = task;

  return `
     <p class="list-shell-header-item">${title}</p>`;
}

export default class TaskComponent {
  constructor({ task }) {
    this.task = task;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.task);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
