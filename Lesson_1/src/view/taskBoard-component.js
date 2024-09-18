import { createElement } from "../framework/render.js";

function createTaskBoardComponentTemplate() {
  return ` <ul class="list-shell-header-backlog">
              <label class="list-title title-backlog">Бэклог</label>
              <li class="list-shell-header-item">Выучить JS</li>
              <li class="list-shell-header-item">Выучить React</li>
              <li class="list-shell-header-item">Выучить домашку</li>
            </ul>

            <ul class="list-shel-header-process">
              <label class="list-title title-process">В процессе</label>
              <li class="list-shell-header-item">Выпить смузи</li>
              <li class="list-shell-header-item">Попить воды</li>
            </ul>

            <ul class="list-shell-header-ready">
              <label class="list-title title-ready">Готово</label>
              <li class="list-shell-header-item">Позвонить маме</li>
              <li class="list-shell-header-item">Погладить кота</li>
            </ul>

            <ul class="list-shell-header-basket">
              <label class="list-title title-basket">Корзина</label>
              <li class="list-shell-header-item">Сходить погулять</li>
              <li class="list-shell-header-item">Прочитать Войну и мир</li>
              <button class="cancel" type="button">X Очистить</button>
            </ul>`;
}

export default class TaskBoardComponent {
  getTemplate() {
    return createTaskBoardComponentTemplate();
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
