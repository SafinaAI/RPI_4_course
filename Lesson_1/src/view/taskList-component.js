// 
import { createElement } from "../framework/render.js";

function createTaskListComponentTemplate() {
  return ` <div">
            <ul id = "tasklist">
              <div id = "list_title">Название Бэклога</div>
              <li>Задача</li>
              <li>Задача</li>
              <li>Задача</li>
            </ul>
          </div>`;
}

export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate();
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
