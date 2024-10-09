import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createPlugComponentTemplate() {
  return ` <div class="empty_task">
          <p class="empty_task-title">Перетащите карточку</p>
        </div>`;
}

export default class PlugComponent extends AbstractComponent {
  get template() {
    return createPlugComponentTemplate();
  }
}
