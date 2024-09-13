import { createElement } from "../framework/render.js";

function createFormAddTaskComponentTemplate() {
  return `<div class="form_new_task-wrapper">
              <h2 class="form_new_task-title">Новая задача</h2>
              <form action="" method="get" class="form">
                <p>
                  <input
                    class="task_form"
                    name="task"
                    type="text"
                    placeholder="Название задачи"
                  />
                </p>
                <button type="submit" class="task_but">+Добавить</button>
              </form>
            </div>`;
}

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
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
