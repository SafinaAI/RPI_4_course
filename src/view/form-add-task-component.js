import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate() {
  return ` 
            <form action="" method="get" class="form">
            <h2 class="add-task-title">Новая задача</h2><br>
                <input
                  class="task_form"
                  name="task"
                  type="text"
                  placeholder="Название задачи"
                />
              <button type="submit" class="task_but">+Добавить</button>
            </form>
            `;
}

export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
    return createFormAddTaskComponentTemplate();
  }
}
