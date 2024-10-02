//Ul
import { createElement } from "../framework/render.js";

// function createTasksListComponentTemplate() {
//   return ` <div>
//             <ul class = "tasklist">
//               <div class = "list_title">Название Бэклога</div>
//             </ul>
//           </div>`;
// }

function createTasksListComponentTemplate(status) {
  const { status_title, label } = status;
  return ` <div class="list-shell-header-${status_title}">
              <label class="list-title title-${status_title}">${label}</label>
              </div>`;
}

export default class TasksListComponent {
  constructor({ task_status }) {
    this.status = task_status;
  }
  getTemplate() {
    return createTasksListComponentTemplate(this.status);
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
