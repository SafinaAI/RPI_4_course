import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate() {
  return ` 
            <form action="" method="get" class="form">
            <h2 class="add-task-title">Новая задача</h2><br>
                <input
                  id = "add-task"
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
  #handleClick = null;

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  constructor({ onClick }) {
    super();
    
    this.#handleClick = onClick;
    this.element.addEventListener("submit", this.#clickHandler);
  }
  get template() {
    return createFormAddTaskComponentTemplate();
  }

  removeElement() {
    this.element = null;
  }
}
