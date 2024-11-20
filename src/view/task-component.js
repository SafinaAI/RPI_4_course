import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
  const { title, status } = task;

  return `
     <p class="list-shell-header-item">${title}</p>`;
}

export default class TaskComponent extends AbstractComponent {
  // constructor({ task }) {
  //   super();
  //   this.task = task;
  // }

  //---
  constructor({ task }) {
    super();
    this.task = task;
    this.#afterCreateElement();
  }
  //--

  get template() {
    return createTaskComponentTemplate(this.task);
  }
  //-----
  #afterCreateElement() {
    this.#makeTaskDraggable();
  }
  #makeTaskDraggable() {
    this.element.setAttribute(`draggable`, true);

    this.element.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.task.id);
    });
  }
  //---

  removeElement() {
    this.element = null;
  }
}
